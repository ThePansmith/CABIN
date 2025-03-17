
global.cachedSeed = undefined
global.cachedAlchemyData = {}

function colourMap(c) {
    switch (c) {
    case "white": return [255, 255, 255]
    case "orange": return [255, 150, 0]
    case "magenta": return [255, 39, 255]
    case "light_blue": return [170, 202, 255]

    case "yellow": return [255, 255, 0]
    case "lime": return [160, 255, 0]
    case "pink": return [255, 109, 183]
    case "gray": return [127, 127, 127]

    case "light_gray": return [223, 223, 223]
    case "cyan": return [0, 205, 205]
    case "purple": return [140, 0, 255]
    case "blue": return [29, 29, 255]

    case "brown": return [119, 59, 0]
    case "green": return [12, 203, 0]
    case "red": return [244, 22, 9]
    default: return [47, 47, 47]
    }
}

function shuffle(array, random) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = random.nextInt(i + 1);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function attackNearby(level, x, y, z) {
    // let aabb = AABB.CUBE.func_72317_d(x - .5, y + .5, z - .5).func_72321_a(-3, -3, -3).func_72321_a(3, 3, 3)
    // let list = level.minecraftLevel.func_217394_a(null, aabb, e => true)

    let entities = level.getEntitiesWithin(AABB.of(x - 3,y - 3,z - 3,x + 3,y + 3,z + 3))

    entities.forEach(e => {
        let entity = e
        if (!entity.isLiving())
            return
        entity.attack(entity.level.damageSources().generic(), 6)
    })
}

function process(level, block, entity, face) {

    if (global.cachedSeed != level.getSeed()) {
        global.cachedSeed = level.getSeed()
        let random = new Java.loadClass("java.util.Random")(level.getSeed())
        let next = () => random.nextInt(6)
        let generateCode = () => [next(), next(), next(), next()]
        for (let cat = 0; cat < 7; cat++) {
            global.cachedAlchemyData[cat] = {
                code: generateCode(),
                result: cat == 6 ? "kubejs:substrate_chaos" : global.substrates[6][cat].id,
                mappings: shuffle(Array(0, 1, 2, 3, 4, 5), random)
            }
        }
        let total = []
        global.cachedAlchemyData["chaos_mapping"] = []
        for (let i = 0; i < 38; i++) {
            total.push(i)
            global.cachedAlchemyData["chaos_mapping"].push(0)
        }
        shuffle(total, random)
        for (let i = 0; i < 38; i += 2) {
            if (total[i] >= 36 && total[i + 1] >= 36) { // must not map silver-silicon
                if (i == 0) {
                    let swap = total[i + 2]
                    total[i + 2] = total[i + 1]
                    total[i + 1] = swap
                } else {
                    let swap = total[i - 1]
                    total[i - 1] = total[i]
                    total[i] = swap
                }
            }
        }
        for (let i = 0; i < 38; i += 2) {
            global.cachedAlchemyData["chaos_mapping"][total[i]] = total[i + 1]
            global.cachedAlchemyData["chaos_mapping"][total[i + 1]] = total[i]
        }
    }

    let nbt = entity.nbt
    let items = nbt.Items

    // Laser Recipe

    let validForProcessing = true
    let validTool = undefined
    let toProcess = undefined
    let processAmount = 0
    let magnet = "thermal:flux_magnet"
    let staff = "ae2:charged_staff"
    let entropy = "ae2:entropy_manipulator"

    items.forEach(e => {
        if (!validForProcessing)
            return
        if (e.id.startsWith(magnet) || e.id.startsWith(staff) || e.id.startsWith(entropy)) {
            if (validTool)
                validForProcessing = false
            validTool = e
            return
        }
        if (toProcess && toProcess != e.id) {
            validForProcessing = false
            return
        }
        toProcess = e.id
        processAmount += e.Count
    })

    if (validTool && validForProcessing && toProcess) {
        let resultItem = undefined
        let particle = "effect"

        if (!validTool.tag)
            return

        if (validTool.id.startsWith(magnet)) {
            if (!toProcess.equals("minecraft:basalt"))
                return
            let energy = validTool.tag.getInt("Energy") - 80 * processAmount
            if (energy < 0)
                return
            validTool.tag.putInt("Energy", energy)
            resultItem = "thermal:basalz_rod"
            particle = "flame"
        }
        // if (validTool.id.startsWith(staff)) {
        //     if (!toProcess.equals("kubejs:smoke_mote"))
        //         return
        //     let energy = validTool.tag.getDouble("internalCurrentPower") - 40 * processAmount
        //     if (energy < 0)
        //         return
        //     validTool.tag.putDouble("internalCurrentPower", energy)
        //     resultItem = "thermal:blitz_rod"
        //     particle = "firework"
        // }
        if (validTool.id.startsWith(entropy)) {
            if (!toProcess.equals("minecraft:snowball"))
                return
            let energy = validTool.tag.getDouble("internalCurrentPower") - 80 * processAmount
            if (energy < 0)
                return
            validTool.tag.putDouble("internalCurrentPower", energy)
            resultItem = "thermal:blizz_rod"
            particle = "spit"
        }

        if (!resultItem)
            return

        level.server.runCommandSilent(`/particle minecraft:flash ${entity.x} ${entity.y + .5} ${entity.z} 0 0 0 .01 1`)
        level.server.runCommandSilent(`/particle ae2:matter_cannon_fx ${entity.x} ${entity.y + .5} ${entity.z}`)
        level.server.runCommandSilent(`/particle minecraft:${particle} ${entity.x} ${entity.y + .5} ${entity.z} .65 .65 .65 0 10`)
        level.server.runCommandSilent(`/playsound minecraft:block.enchantment_table.use block @a ${entity.x} ${entity.y} ${entity.z} 0.95 1.5`)
        attackNearby(level, entity.x, entity.y, entity.z)

        let resultCount = Math.ceil(processAmount / 2.0)
        nbt.Items.clear()

        let actualIndex = 0
        for (let i = 0; i < 5; i++) {
            if (i == validTool.Slot) {
                nbt.Items.add(actualIndex, validTool)
                actualIndex++
                continue
            }
            if (resultCount <= 0)
                continue

            let resultItemNBT = Utils.newMap();
            resultItemNBT.put("Slot", i)
            resultItemNBT.put("id", resultItem)
            resultItemNBT.put("Count", Math.min(64, resultCount))
            nbt.Items.add(actualIndex, resultItemNBT)
            actualIndex++

            resultCount = resultCount - 64
        }

        entity.setNbt(nbt)
        return
    }

    // Chaos Transmutation

    let validForTransmutation = true
    let catalyst = undefined
    let toTransmute = undefined
    let transmuteAmount = 0
    let catalystId = 0

    items.forEach(e => {
        if (!validForTransmutation)
            return
        if (!e.id.startsWith("kubejs:substrate_")) {
            validForTransmutation = false
            return
        }
        let mapping = global.substrate_mapping[e.id.replace("kubejs:substrate_", "")]
        if (e.id != "kubejs:substrate_silicon" && e.id != "kubejs:substrate_silver" && (!mapping || mapping.category == 6)) {
            if (catalyst || mapping) {
                validForTransmutation = false
                return
            }
            catalyst = e
            catalystId = mapping ? mapping.index : -1
            return
        }
        if (toTransmute && toTransmute != e.id) {
            validForTransmutation = false
            return
        }
        toTransmute = e.id
        transmuteAmount += e.Count
    })

    if (validForTransmutation && catalyst && toTransmute) {
        let categoryMapping = global.substrate_mapping[toTransmute.replace("kubejs:substrate_", "")]

        let id1
        // let id2
        // if (catalystId == -1) {
        if (toTransmute == "kubejs:substrate_silicon")
            categoryMapping = { category: 5, index: 6 }
        if (toTransmute == "kubejs:substrate_silver")
            categoryMapping = { category: 5, index: 7 }
        let data = global.cachedAlchemyData["chaos_mapping"]
        // let dataReversed = global.cachedAlchemyData["reverse_chaos_mapping"]
        let i1 = data[categoryMapping.category * 6 + categoryMapping.index]
        // let i2 = dataReversed[categoryMapping.category * 6 + categoryMapping.index]
        id1 = i1 == 36 ? "kubejs:substrate_silicon" : i1 == 37 ? "kubejs:substrate_silver" : global.substrates[Math.floor(i1 / 6)][i1 % 6].id
        // id2 = i2 == 36 ? "kubejs:substrate_silicon" : global.substrates[Math.floor(i2 / 6)][i2 % 6].id
        // }
        // else {
        //     if (!categoryMapping || (categoryMapping.category + 1) % 6 != catalystId)
        //         return
        //     let data = global.cachedAlchemyData[catalystId]
        //     id1 = global.substrates[catalystId][data.mappings[categoryMapping.index]].id
        //     if (catalystId != 1) { // search for backwards connection
        //         let prevCat = catalystId - 1;
        //         if (catalystId == 0)
        //             prevCat += 6
        //         for (let i = 0; i < 6; i++)
        //             if (global.cachedAlchemyData[prevCat].mappings[i] == categoryMapping.index)
        //                 id2 = global.substrates[prevCat - 1][i].id
        //     }
        //     if (id1 == "kubejs:substrate_cobblestone")
        //         id1 = "kubejs:substrate_silicon"
        // }
        let resultItems = [id1]// , id2]

        level.server.runCommandSilent(`/particle minecraft:flash ${entity.x} ${entity.y + .5} ${entity.z} 0 0 0 .01 1`)
        level.server.runCommandSilent(`/particle ae2:matter_cannon_fx ${entity.x} ${entity.y + .5} ${entity.z}`)
        level.server.runCommandSilent(`/particle minecraft:effect ${entity.x} ${entity.y + .5} ${entity.z} .75 .75 .75 .75 10`)
        level.server.runCommandSilent(`/playsound minecraft:block.enchantment_table.use block @a ${entity.x} ${entity.y} ${entity.z} 0.95 1.5`)
        attackNearby(level, entity.x, entity.y, entity.z)

        let random = new Java.loadClass("java.util.Random")()
        let resultCounts = [0]// , 0]

        for (let i = 0; i < transmuteAmount; i++) {
            let next = random.nextInt(8)
            if (next < (catalystId == -1 ? 4 : 2))
                continue
            let index = 0// next == 11 ? 1 : 0
            resultCounts[index] = resultCounts[index] + 1
        }

        nbt.Items.clear()

        let actualIndex = 0
        let itemIndex = 0
        for (let i = 0; i < 5; i++) {
            if (i == catalyst.Slot) {
                nbt.Items.add(actualIndex, catalyst)
                actualIndex++
                continue
            }
            if (resultCounts[itemIndex] <= 0) {
                if (itemIndex == 0)// 1)
                    continue
                itemIndex++
                if (!resultItems[itemIndex])
                    continue
            }

            let resultItemNBT = Utils.newMap();
            resultItemNBT.put("Slot", i)
            resultItemNBT.put("id", resultItems[itemIndex])
            resultItemNBT.put("Count", Math.min(64, resultCounts[itemIndex]))
            nbt.Items.add(actualIndex, resultItemNBT.toNBT())
            actualIndex++

            resultCounts[itemIndex] = resultCounts[itemIndex] - 64
        }

        entity.setNbt(nbt)
        return
    }

    // Catalyst Mastermind

    let catCode = -1;
    let guessedSet = []
    let reagents = []
    let guessedString = ""
    let count = 0;
    let redstoneAccellerator = false
    let glowstoneAccellerator = false
    let valid = true

    if (items.length < 4)
        return

    items.forEach(e => {
        if (e.Count > 1) {
            valid = false
            return
        }
        if (e.id.startsWith("kubejs:accellerator_redstone")) {
            redstoneAccellerator = true
            return
        }
        if (e.id.startsWith("kubejs:accellerator_glowstone")) {
            glowstoneAccellerator = true
            return
        }
        if (!e.id.startsWith("kubejs:substrate_")) {
            valid = false
            return
        }
        let mapping = global.substrate_mapping[e.id.replace("kubejs:substrate_", "")]
        if (!mapping)
            return
        if (catCode != -1 && catCode != mapping.category)
            return
        catCode = mapping.category
        guessedSet.push(mapping.index)
        reagents.push(e.id)
        count++
        guessedString = guessedString + "§6" + mapping.name + "§7" + (count < 4 ? ", " : "")
    })

    if (!valid)
        return
    if (count != 4)
        return
    if (!global.cachedAlchemyData[catCode])
        return

    let data = global.cachedAlchemyData[catCode]
    let unmatchedCorrectSet = data.code.slice()
    let unmatchedGuessedSet = guessedSet.slice()
    let result = [0, 0, 0]
    let resultEval = [0, 0, 0, 0]
    let trueFalse = [true, false]
    let retain = -1

    trueFalse.forEach(exact => {
        for (let digit = 0; digit < 4; digit++) {
            let guessed = unmatchedGuessedSet[digit]
            for (let digit2 = 0; digit2 < unmatchedCorrectSet.length; digit2++) {
                let correct = unmatchedCorrectSet[digit2]
                if (correct != guessed)
                    continue
                if (exact && digit != digit2)
                    continue

                resultEval[digit] = exact ? 2 : 1
                result[exact ? 2 : 1] = result[exact ? 2 : 1] + 1
                unmatchedGuessedSet[digit] = -2
                unmatchedCorrectSet[digit2] = -1
                break
            }
        }
    })

    if (glowstoneAccellerator || redstoneAccellerator) {
        let random = new Java.loadClass("java.util.Random")()
        let shuffled = shuffle(Array(0, 1, 2, 3), random)
        for (let i = 0; i < 4; i++) {
            let j = shuffled[i]
            if (glowstoneAccellerator && resultEval[j] == 2) {
                retain = j
                break
            }
            if (redstoneAccellerator && resultEval[j] == 1) {
                retain = j
                break
            }
        }
    }

    result[0] = 4 - result[2] - result[1]

    // console.log("Correct: " + data.code)
    // console.log("Guessed: " + guessedSet)
    // console.log("Result: " + result)
    // console.log("Retained: " + retain)

    let errorId = -1

    if (result[0] == 4)
        errorId = 0
    if (result[0] == 3) {
        if (result[1] == 1)
            errorId = 1
        if (result[1] == 0)
            errorId = 2
    }
    if (result[0] == 2) {
        if (result[1] == 2)
            errorId = 3
        if (result[1] == 0)
            errorId = 4
        if (result[1] == 1)
            errorId = 5
    }
    if (result[0] == 1) {
        if (result[1] == 3)
            errorId = 6
        if (result[1] == 0)
            errorId = 7
        if (result[1] == 2)
            errorId = 8
        if (result[1] == 1)
            errorId = 9
    }
    if (result[0] == 0) {
        if (result[1] == 4)
            errorId = 10
        if (result[1] == 3)
            errorId = 12
        if (result[1] == 1)
            errorId = 13
        if (result[1] == 2)
            errorId = 14
    }

    let success = errorId == -1
    let resultItem = success ? data.result : `kubejs:failed_alchemy_${errorId}`
    level.server.runCommandSilent(`/particle minecraft:flash ${entity.x} ${entity.y + .5} ${entity.z} 0 0 0 .01 1`)
    level.server.runCommandSilent(`/particle ae2:matter_cannon_fx ${entity.x} ${entity.y + .5} ${entity.z}`)
    level.server.runCommandSilent(`/particle minecraft:dust 0 1 1 1 ${entity.x} ${entity.y + .5} ${entity.z} .75 .75 .75 .75 ${success ? "80" : "6"}`)
    level.server.runCommandSilent(`/playsound minecraft:block.enchantment_table.use block @a ${entity.x} ${entity.y} ${entity.z} 0.95 ${success ? "2" : "1.25"}`)
    attackNearby(level, entity.x, entity.y, entity.z)
    if (success)
        level.server.runCommandSilent(`/playsound minecraft:block.beacon.activate block @a ${entity.x} ${entity.y} ${entity.z} 0.95 1.5`)
    nbt.Items.clear()

    let resultItemNBT = Utils.newMap();
    let resultItemTagNBT = Utils.newMap();
    let resultItemLoreNBT = Utils.newMap();
    let resultItemLoreList = Utils.newList();

    resultItemLoreList.add('{"text": "' + guessedString + '", "italic": false}')
    resultItemLoreNBT.put("Lore", resultItemLoreList.toNBT())
    resultItemTagNBT.put("display", resultItemLoreNBT.toNBT())

    resultItemNBT.put("Slot", 0)
    resultItemNBT.put("id", resultItem)
    resultItemNBT.put("Count", 1)
    if (errorId != -1)
        resultItemNBT.put("tag", resultItemTagNBT.toNBT())
    nbt.Items.add(0, resultItemNBT.toNBT())

    if (retain != -1) {
        resultItemNBT = Utils.newMap();
        resultItemNBT.put("Slot", 1)
        resultItemNBT.put("id", reagents[retain])
        resultItemNBT.put("Count", 1)
        nbt.Items.add(1, resultItemNBT.toNBT())
    }

    entity.setNbt(nbt)

}

BlockEvents.leftClicked(event => {

    let block = event.getBlock()
    let tags = block.getTags()

    if (!block.id.startsWith("thermal:machine_frame"))
        return

    let level = event.getLevel()
    let clickedFace = event.getFacing()
    let item = event.getItem()
    let player = event.getPlayer()


    if (!item.empty)
        return

    //    if (player.name.text != "Deployer")
    //        return


    let sound = false

    Direction.ALL.values().forEach(face => {
        if (clickedFace == face)
            return
        let laser = block.offset(face)


        if (!laser.hasTag("kubejs:alchemical_laser_lamp"))
            return

        let color = ""

        if (laser.hasTag("kubejs:alchemical_laser_lamp/white")) color = "white";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/orange")) color = "orange";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/magenta")) color = "magenta";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/light_blue")) color = "light_blue";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/yellow")) color = "yellow";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/lime")) color = "lime";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/pink")) color = "pink";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/gray")) color = "gray";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/light_gray")) color = "light_gray";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/cyan")) color = "cyan";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/purple")) color = "purple";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/blue")) color = "blue";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/brown")) color = "brown";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/green")) color = "green";
        else if (laser.hasTag("kubejs:alchemical_laser_lamp/red")) color = "red";

        // let te = laser.getEntity()
        // if (!te)
        //     return
        // let nbt = Utils.newMap().toNBT()
        // te.func_189515_b(nbt)
        // let parts = nbt.func_150295_c("parts", 10)
        // let color = ""
        // if (parts) {
        //     parts.forEach(part => {
        //         if (!part.id.endsWith("_cage_light"))
        //             return
        //         if (part.pow == part.id.contains("inverted"))
        //             return
        //         if (part.side != face.getOpposite().ordinal())
        //             return
        //         valid = true
        //         color = part.id.replace("_inverted", "").replace("_cage_light", "").replace("projectred-illumination:", "")
        //     })
        // }

        // if (!valid)
        //     return

        let x = laser.x
        let y = laser.y
        let z = laser.z
        // let aabb = AABB.CUBE.func_72317_d(x, y, z).func_72321_a(4 * face.x, 4 * face.y, 4 * face.z)

        // let list = level.minecraftWorld.func_217394_a(null, aabb, e => true)

        let entities = level.getEntitiesWithin(AABB.of(x - 2,y - 2,z - 2,x + 2,y + 2,z + 2))

        entities.forEach(e => {
            let entity = e
            if (!entity.type.equals("minecraft:hopper_minecart")) {
                if (!entity.type.equals("minecraft:item"))
                    entity.attack(entity.level.damageSources().generic(), 6)
                return
            }
            process(level, block, entity, face)
            entity.attack(entity.level.damageSources().generic(), 1)
        })

        sound = true
        let rgb = colourMap(color)
        for (let i = 0; i < 22; i++) {
            let offset = (i / 20.0) * 4
            level.server.runCommandSilent(`/particle dust ${rgb[0] / 256} ${rgb[1] / 256} ${rgb[2] / 256} 1 ${x + .5 + face.x * offset} ${y + .5 + face.y * offset} ${z + .5 + face.z * offset} 0 0 0 .001 1`)
        }
        level.server.runCommandSilent(`/particle minecraft:end_rod ${x + .5 + face.x * 2} ${y + .5 + face.y * 2} ${z + .5 + face.z * 2} ${face.x * 2} ${face.y * 2} ${face.z * 2} .1 10`)

    })

    if (sound)
        level.server.runCommandSilent(`/playsound minecraft:entity.firework_rocket.blast block @a ${block.x} ${block.y} ${block.z} 0.55 0.5`)


})

PlayerEvents.inventoryChanged(event => {
    let entity = event.getEntity()
    if (event.getItem().id == "kubejs:missingno") {
        event.player.inventory.clear("kubejs:missingno")
        event.getLevel().getBlock(entity.x, entity.y, entity.z)
            .createExplosion()
            .explosionMode(Level.ExplosionInteraction.TNT)
            .causesFire(true)
            .strength(4)
            .explode()
    }
})
