ServerEvents.recipes(event => {
    let alchemy_mix = (output, catalyst, r1, r2, amount) => {
        event.recipes.createMixing([Item.of(KJ("substrate_" + output, amount ? amount : 1)), KJ("substrate_" + catalyst)], [KJ("substrate_" + catalyst), KJ("substrate_" + r1, 2), KJ("substrate_" + r2)]).heated()
    }

    let alchemy_smelt = (output, catalyst, r1, r2, amount) => {
        thermalSmelter(event, [Item.of(KJ("substrate_" + output, amount ? amount : 1)), KJ("substrate_" + catalyst)], [KJ("substrate_" + r1, 2), KJ("substrate_" + catalyst), KJ("substrate_" + r2)], 4000)
    }

    alchemy_mix("red", "herbal", "diorite", "andesite")
    alchemy_mix("orange", "herbal", "granite", "diorite")
    alchemy_mix("yellow", "herbal", "cobblestone", "granite")
    alchemy_mix("green", "herbal", "basalt", "cobblestone")
    alchemy_mix("blue", "herbal", "scoria", "basalt")
    alchemy_mix("magenta", "herbal", "andesite", "scoria")

    alchemy_smelt("nether", "volatile", "red", "scoria")
    alchemy_smelt("blaze", "volatile", "orange", "andesite")
    alchemy_smelt("gunpowder", "volatile", "yellow", "diorite")
    alchemy_smelt("slime", "volatile", "green", "granite")
    alchemy_smelt("prismarine", "volatile", "blue", "cobblestone")
    alchemy_smelt("obsidian", "volatile", "magenta", "basalt")

    alchemy_mix("arcane", "crystal", "nether", "magenta")
    alchemy_mix("niter", "crystal", "blaze", "red")
    alchemy_mix("quartz", "crystal", "gunpowder", "orange")
    alchemy_mix("sulfur", "crystal", "slime", "yellow")
    alchemy_mix("apatite", "crystal", "prismarine", "green")
    alchemy_mix("certus", "crystal", "obsidian", "blue")

    alchemy_smelt("lead", "metal", "arcane", "obsidian")
    alchemy_smelt("copper", "metal", "niter", "nether")
    alchemy_smelt("gold", "metal", "quartz", "blaze")
    alchemy_smelt("nickel", "metal", "sulfur", "gunpowder")
    alchemy_smelt("zinc", "metal", "apatite", "slime")
    alchemy_smelt("iron", "metal", "certus", "prismarine")


    alchemy_smelt("andesite", "igneous", "emerald", "iron", 20)
    alchemy_smelt("diorite", "igneous", "sapphire", "lead", 20)
    alchemy_smelt("granite", "igneous", "diamond", "copper", 20)
    alchemy_smelt("cobblestone", "igneous", "lapis", "gold", 20)
    alchemy_smelt("basalt", "igneous", "ruby", "nickel", 20)
    alchemy_smelt("scoria", "igneous", "cinnabar", "zinc", 20)

    let mundane = (id, outputs) => {
        let jsonOut = []
        if (outputs[0] > 0)
            jsonOut.push({
                "item": "supplementaries:ash",
                "count": outputs[0]
            })
        if (outputs[1] > 0)
            jsonOut.push({
                "item": MC("redstone"),
                "count": outputs[1]
            })
        if (outputs[2] > 0)
            jsonOut.push({
                "item": MC("glowstone_dust"),
                "count": outputs[2]
            })
        event.custom({
            "type": "thermal:centrifuge",
            "ingredient": {
                "item": KJ(`failed_alchemy_${id}`)
            },
            "result": jsonOut
        })
    }

    let i = 0;

    mundane(i++, [4, 0, 0])
    mundane(i++, [3, 1, 0])
    mundane(i++, [3, 0, 1])
    mundane(i++, [2, 2, 0])
    mundane(i++, [2, 0, 2])

    mundane(i++, [2, 1, 1])
    mundane(i++, [1, 3, 0])
    mundane(i++, [1, 0, 3])
    mundane(i++, [1, 2, 1])
    mundane(i++, [1, 1, 2])

    mundane(i++, [0, 4, 0])
    mundane(i++, [0, 0, 4])
    mundane(i++, [0, 3, 1])
    mundane(i++, [0, 1, 3])
    mundane(i++, [0, 2, 2])

    // Subtrate bottling and extracting
    event.remove({ type: TE("sawmill") })
    event.remove({ type: TE("centrifuge") })

    global.substrates.forEach(a => {
        a.forEach(e => {
            if (!e.ingredient)
                return
            event.custom({
                "type": "thermal:bottler",
                "ingredients": [Ingredient.of(e.ingredient).toJson(), { "fluid": "tconstruct:molten_glass", "amount": 100 }],
                "result": [{ "item": e.id }]
            })
            event.custom({
                "type": "thermal:sawmill",
                "ingredient": { "item": e.id },
                "result": [{ "item": e.outputItem ? e.outputItem : typeof e.ingredient == "string" ? e.ingredient : e.ingredient[0], "chance": 0.75 }],
                "energy": 2000
            })
        })
    })

    // Silicon and silver special cases
    event.custom({
        "type": "thermal:sawmill",
        "ingredient": { "item": "kubejs:substrate_silicon" },
        "result": [{ "item": AE2("silicon"), "count": 1 }],
        "energy": 2000
    })

    event.custom({
        "type": "thermal:sawmill",
        "ingredient": { "item": "kubejs:substrate_silver" },
        "result": [{ "item": TE("silver_dust"), "count": 1 }],
        "energy": 2000
    })

    // Accelerators
    event.custom({
        "type": "thermal:bottler",
        "ingredients": [
            { "item": TE("signalum_nugget") },
            { "fluid": "tconstruct:molten_glass", "amount": 100 }
        ],
        "result": [{ "item": "kubejs:accellerator_redstone" }]
    })

    event.custom({
        "type": "thermal:bottler",
        "ingredients": [
            { "item": TE("lumium_nugget") },
            { "fluid": "tconstruct:molten_glass", "amount": 100 }
        ],
        "result": [{ "item": "kubejs:accellerator_glowstone" }]
    })

    // Not sure why silver subtrate has a recipe
    event.custom({
        "type": "thermal:bottler",
        "ingredients": [
            { "item": TE("silver_dust") },
            { "fluid": "tconstruct:molten_glass", "amount": 100 }
        ],
        "result": [{ "item": "kubejs:substrate_silver" }]
    })
})
