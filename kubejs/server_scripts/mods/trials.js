// Trial Chamber backport
if (Platform.isLoaded("trials")) {
    ServerEvents.lowPriorityData(event => {

        // Make a Trial Processor using IntegratedAPI and Lithostitched
        // Integrated API's waterlog fix processor is used to fix blocks being waterlogged when the structure generates over water
        // Lithostitched is used to swap blocks while copying over properties. (without it this processor would be almost 3000 lines long)
        event.addJson("trials:worldgen/processor_list/generic", {
            "processors": [
                {
                    "processor_type": "integrated_api:waterlogging_fix_processor"
                },
                {
                    "processor_type": "lithostitched:block_swap",
                    "blocks": {
                        "minecraft:waxed_copper_block": "kubejs:trial_copper_block",
                        "minecraft:waxed_cut_copper": "kubejs:trial_cut_copper",
                        "trials:waxed_chiseled_copper": "kubejs:trial_chiseled_copper",
                        "trials:waxed_copper_grate": "kubejs:trial_copper_grate",
                        "minecraft:waxed_cut_copper_stairs": "kubejs:trial_cut_copper_stairs",
                        "minecraft:waxed_cut_copper_slab": "kubejs:trial_cut_copper_slab",
                        "minecraft:waxed_oxidized_copper": "kubejs:trial_oxidized_copper",
                        "minecraft:waxed_oxidized_cut_copper": "kubejs:trial_oxidized_cut_copper",
                        "trials:waxed_chiseled_copper_oxidized": "kubejs:trial_chiseled_copper_oxidized",
                        "trials:waxed_copper_grate_oxidized": "kubejs:trial_copper_grate_oxidized",
                        "minecraft:waxed_oxidized_cut_copper_stairs": "kubejs:trial_oxidized_cut_copper_stairs",
                        "minecraft:waxed_oxidized_cut_copper_slab": "kubejs:trial_oxidized_cut_copper_slab"
                    }
                }
            ]
        })

        event.addJson("trials:worldgen/structure_set/trial_chambers", {
            "structures": [
                {
                    "structure": "trials:trials_chambers",
                    "weight": 1
                }
            ],
            "placement": {
                "type": "integrated_api:advanced_random_spread",
                "super_exclusion_zone": {
                    "chunk_count": 12,
                    "other_set": "#trials:trial_chambers_avoid"
                },
                "spacing": 32,
                "separation": 21,
                "salt": 412788945
            }
        })

        // Loot Tables are changed in the data folder.

        // We need to change the type of loot tables to 'chest' so that emi Loot chooses to render it
        // The loot tables still work in trial vaults when they're set to the 'chest' type
        // Even if Lootjs were good in this version, we would still likely need to use a datapack to change the loot type
    })
}
