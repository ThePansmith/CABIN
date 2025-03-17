/**
 * Configuration of Sophisticated Storage
 */
ServerEvents.recipes(event => {
    const modids = ["sophisticatedstorage", "sophisticatedbackpacks"]

    // Remove XP pump upgrades
    event.remove({ id: "sophisticatedstorage:xp_pump_upgrade" })
    event.remove({ id: "sophisticatedbackpacks:xp_pump_upgrade" })

    // There is dupe glitch involving this.
    event.remove({ id: "sophisticatedstorage:packing_tape" })

    // Remove Limited barrels
    event.remove({ id: /^sophisticatedstorage:.*limited.+barrel.+$/ })
    event.remove({ output: /^sophisticatedstorage:limited_barrel.+$/ })

    // Remove Copper tier storage (not used)
    event.remove({ output: "sophisticatedstorage:copper_barrel" })
    event.remove({ output: "sophisticatedstorage:copper_chest" })
    event.remove({ output: "sophisticatedstorage:copper_shulker_box" })
    // Remove Copper tier upgrades
    event.remove({ output: /^sophisticatedstorage:.*copper.*tier_upgrade$/ })
    event.remove({ input: /^sophisticatedstorage:.*copper.*tier_upgrade$/ })

    // Barrel, Chest, Shulker Box upgrading
    const sophStorageMaterials = [
        ["", null, null],
        // ["copper_", "tconstruct:steel_ingot", "lead"],
        ["iron_", "thermal:bronze_ingot", "lead"],
        ["gold_", "thermal:invar_ingot", "tin"],
        ["diamond_", "tconstruct:manyullyn_ingot", "copper"],
        ["netherite_", "forbidden_arcanus:dark_rune", "gold"],
    ]
    const sophStorageTypes = [
        ["", "barrel"],
        ["", "chest"],
        ["", "shulker_box"]
    ]

    sophStorageMaterials.forEach((material, toIndex) => {
        if (toIndex == 0) return;

        // Tier upgrade items
        for (let fromIndex = 0; fromIndex < toIndex; fromIndex++) {
            let fromTierName = (fromIndex == 0 ? "basic_" : sophStorageMaterials[fromIndex][0]);
            let prevTierName = (toIndex - 1 == 0 ? "basic_" : sophStorageMaterials[toIndex - 1][0]);
            let toTierName = material[0];

            event.shaped(`sophisticatedstorage:${fromTierName}to_${toTierName}tier_upgrade`, [
                "III",
                "ICI",
                "III"
            ], {
                I: `${material[1]}`,
                C: (fromTierName == prevTierName ? "minecraft:redstone_torch" : `sophisticatedstorage:${fromTierName}to_${prevTierName}tier_upgrade`)
            }).id(`sophisticatedstorage:${fromTierName}to_${toTierName}tier_upgrade`)
        }

        // Barrel-in-table upgrades
        sophStorageTypes.forEach(storageType => {
            // Works for upgrades as the recipe type implies, but doesn't work for making new barrels/chests/boxes from scratch
            let outputStorage = `sophisticatedstorage:${storageType[0]}${material[0]}${storageType[1]}`
            let inputStorage = `sophisticatedstorage:${storageType[0]}${sophStorageMaterials[toIndex - 1][0]}${storageType[1]}`
            event.remove({ mod: "sophisticatedstorage", output: outputStorage })
            event.custom({
                "type": "sophisticatedstorage:storage_tier_upgrade",
                "conditions": [
                    {
                        "type": "sophisticatedcore:item_enabled",
                        "itemRegistryName": outputStorage
                    }
                ],
                "pattern": [
                    "III",
                    "ICI",
                    "III"
                ],
                "key": {
                    "I": {
                        "item": (`${material[1]}`)
                    },
                    "C": {
                        "item": inputStorage
                    }
                },
                "result": {
                    "item": outputStorage
                }
            });
        })
    })

    enderiumMachine(event, Item.of("sophisticatedstorage:controller", 1), "functionalstorage:storage_controller")
    enderiumMachine(event, Item.of("sophisticatedstorage:controller", 1), "functionalstorage:controller_extension")
    leadMachine(event, Item.of("sophisticatedstorage:storage_input", 1))
    leadMachine(event, Item.of("sophisticatedstorage:storage_output", 1))
    event.remove({ id: "sophisticatedbackpacks:inception_upgrade"})
    event.remove({ id: "sophisticatedbackpacks:inception_upgrade"})

    // Stack upgrades
    let stackupgrade = [
        ["stack_upgrade_tier_1", "create:brass_ingot", "upgrade_base"],
        ["stack_upgrade_tier_2", "thermal:invar_ingot", "stack_upgrade_tier_1"],
        ["stack_upgrade_tier_3", "thermal:enderium_ingot", "stack_upgrade_tier_2"],
        ["stack_upgrade_tier_4", "kubejs:calculation_mechanism", "stack_upgrade_tier_3"]
    ]
    event.remove({ output: "sophisticatedbackpacks:stack_upgrade_starter_tier" })
    event.remove({ output: "sophisticatedstorage:stack_upgrade_tier_1_plus" })

    stackupgrade.forEach(material => {
        modids.forEach(mod => {
            event.remove({ output: `${mod}:${material[0]}` })
            event.shaped(`${mod}:${material[0]}`, [
                "III",
                "IUI",
                "III"
            ], {
                I: `${material[1]}`,
                U: `${mod}:${material[2]}`
            })
        })
    })

    event.remove({ output: "sophisticatedstorage:stack_upgrade_tier_5" })
    event.remove({ output: "sophisticatedstorage:stack_upgrade_omega_tier" })
    event.remove({ output: "sophisticatedbackpacks:stack_upgrade_tier_5" })

    // Upgrades
    brassMachine(event, "sophisticatedstorage:advanced_hopper_upgrade", 2)
})
