/**
 * Configuration of Sophisticated Storage
 */
ServerEvents.recipes(event => {
    // const modids = ["sophisticatedstorage", "sophisticatedbackpacks"]

    // Remove XP pump upgrades
    event.remove({ id: "sophisticatedstorage:xp_pump_upgrade" })
    event.remove({ id: "sophisticatedbackpacks:xp_pump_upgrade" })

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
        ["iron_", "bronze"],
        ["gold_", "invar"],
        ["diamond_", "slimesteel"],
        ["netherite_", "manyullyn"],
    ]
    const sophStorageTypes = [
        ["", "barrel"],
        ["", "chest"],
        ["", "shulker_box"]
    ]

    let upgradePattern = ["NIN", "NCN", "NIN"]

    sophStorageMaterials.forEach((material, toIndex) => {
        if (toIndex == 0) return;

        // Tier upgrade items
        for (let fromIndex = 0; fromIndex < toIndex; fromIndex++) {
            let fromTierName = (fromIndex == 0 ? "basic_" : sophStorageMaterials[fromIndex][0]);
            let prevTierName = (toIndex - 1 == 0 ? "basic_" : sophStorageMaterials[toIndex - 1][0]);
            let toTierName = material[0];

            event.shaped(`sophisticatedstorage:${fromTierName}to_${toTierName}tier_upgrade`,
                upgradePattern, {
                    N: `#forge:nuggets/${material[1]}`,
                    I: `#forge:ingots/${material[1]}`,
                    C: (fromTierName == prevTierName ? "minecraft:redstone_torch" : `sophisticatedstorage:${fromTierName}to_${prevTierName}tier_upgrade`),
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
                "pattern": upgradePattern,
                "key": {
                    "N": {
                        "tag": `forge:nuggets/${material[1]}`
                    },
                    "I": {
                        "tag": `forge:ingots/${material[1]}`
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

    enderiumMachine(event, Item.of("sophisticatedstorage:controller", 1), "minecraft:emerald")
    enderiumMachine(event, Item.of("sophisticatedstorage:storage_link", 1), "thermal:lead_ingot")
    leadMachine(event, Item.of("sophisticatedstorage:storage_input", 1))
    leadMachine(event, Item.of("sophisticatedstorage:storage_output", 1))

    // Stack upgrades
    let stackupgrade = [
        ["", "create:andesite_alloy", ""],
        ["stack_upgrade_tier_1", "create:brass_ingot", "upgrade_base"],
        ["stack_upgrade_tier_2", "thermal:invar_ingot", "stack_upgrade_tier_1"],
        ["stack_upgrade_tier_3", "thermal:enderium_ingot", "stack_upgrade_tier_2"],
        ["stack_upgrade_tier_4", "kubejs:calculation_mechanism", "stack_upgrade_tier_3"]
    ]

    event.remove({ output: "sophisticatedstorage:stack_upgrade_tier_1_plus" })

    for (let i = 1;i < stackupgrade.length;++i) {
        let upgrade = stackupgrade[i][0]
        let baseUpgrade = stackupgrade[i][2]

        let ingredient = stackupgrade[i][1]
        let previousIngredient = stackupgrade[i - 1][1]

        event.remove({ output: `sophisticatedstorage:${upgrade}` })
        donutCraft(event, `sophisticatedstorage:${upgrade}`, `sophisticatedstorage:${baseUpgrade}`, `${previousIngredient}`)
        event.remove({ output: `sophisticatedbackpacks:${upgrade}` })
        donutCraft(event, `sophisticatedbackpacks:${upgrade}`, `sophisticatedbackpacks:${baseUpgrade}`, `${ingredient}`)
    }

    // Sophisticated Backpacks starter upgrade
    event.remove({ output: "sophisticatedbackpacks:stack_upgrade_starter_tier" })
    donutCraft(event, "sophisticatedbackpacks:stack_upgrade_starter_tier", "sophisticatedbackpacks:upgrade_base", "create:andesite_alloy")
    donutCraft(event, "sophisticatedbackpacks:stack_upgrade_tier_1", "sophisticatedbackpacks:stack_upgrade_starter_tier", "create:brass_ingot")
    // Sophisticated Storage tier 5 upgrade
    event.remove({ output: "sophisticatedstorage:stack_upgrade_tier_5" })
    donutCraft(event, "sophisticatedstorage:stack_upgrade_tier_5", "sophisticatedstorage:stack_upgrade_tier_4", "kubejs:calculation_mechanism")

    event.remove({ id: "sophisticatedbackpacks:inception_upgrade"})
    event.remove({ id: "sophisticatedbackpacks:stack_upgrade_omega_tier"})
    event.remove({ output: "sophisticatedstorage:stack_upgrade_omega_tier" })

    // Upgrades
    andesiteMachine(event, Item.of("sophisticatedstorage:hopper_upgrade", 2))

    event.remove({ id: "sophisticatedstorage:advanced_hopper_upgrade" })

    // Remove Magnet upgrades
    event.remove({ id: "sophisticatedbackpacks:magnet_upgrade" })
    event.remove({ id: "sophisticatedbackpacks:advanced_magnet_upgrade" })
    event.remove({ id: "sophisticatedstorage:magnet_upgrade" })
    event.remove({ id: "sophisticatedstorage:advanced_magnet_upgrade" })
})
