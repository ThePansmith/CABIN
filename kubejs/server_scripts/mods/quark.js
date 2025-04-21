if(Platform.isLoaded("quark")) {

    // Add quark wood types to the arrays of wood types
    wood_types.push("quark:ancient")
    wood_types.push("quark:azalea")
    wood_types.push("quark:blossom")

    ServerEvents.recipes(event => {
        // Unwanted duplicate compressed block recipes
        event.remove({ id: "quark:building/crafting/compressed/charcoal_block"})
        event.remove({ id: "quark:building/crafting/compressed/sugar_cane_block"})
        event.remove({ id: "quark:building/crafting/compressed/gunpowder_sack"})
        event.remove({ id: "quark:building/crafting/compressed/apple_crate"})
        event.remove({ id: "quark:building/crafting/compressed/potato_crate"})
        event.remove({ id: "quark:building/crafting/compressed/carrot_crate"})
        event.remove({ id: "quark:building/crafting/compressed/beetroot_crate"})
        event.remove({ id: "quark:building/crafting/compressed/bamboo_block"})

        // Tree resin
        addTreeOutput(event, "quark:blossom_log", "quark:blue_blossom_leaves")
        addTreeOutput(event, "quark:blossom_log", "quark:lavender_blossom_leaves")
        addTreeOutput(event, "quark:blossom_log", "quark:orange_blossom_leaves")
        addTreeOutput(event, "quark:blossom_log", "quark:yellow_blossom_leaves")
        addTreeOutput(event, "quark:blossom_log", "quark:red_blossom_leaves")

        // Stone generation
        event.custom({
            "type": "thermal:rock_gen",
            "adjacent": "kubejs:chromatic_waste",
            "below": "minecraft:end_stone",
            "result": { "item": "quark:myalite"}
        })
        event.custom({
            "type": "thermal:rock_gen",
            "adjacent": "kubejs:chromatic_waste",
            "below": "minecraft:clay",
            "result": { "item": "quark:shale"}
        })
        event.custom({
            "type": "thermal:rock_gen",
            "adjacent": "kubejs:chromatic_waste",
            "below": "minecraft:quartz_block",
            "result": { "item": "quark:jasper"}
        })

        // Modify quark easy sticks recipe to prevent conflicts with decorative blocks wood beams
        event.replaceInput({ id: "quark:tweaks/crafting/utility/misc/easy_sticks" }, "#minecraft:logs", "#kubejs:easy_sticks_logs")
    })

    ServerEvents.tags("block", event => {

        event.add("create:wrench_pickup", "quark:ender_watcher")
        // I really don't know why these blocks are missing the pressure plate tag
        // All the other pressure plates from quark and forbidden have the tag.
        event.add("minecraft:pressure_plates", "quark:obsidian_pressure_plate")
    })

    ServerEvents.tags("item", event => {
        // Create a new set of tags for logs ok to use for the easy sticks recipe
        const easy_sticks = event.get("minecraft:logs").getObjectIds()
        const easy_sticks_blacklist = Ingredient.of("/.*stripped.*/")
        easy_sticks.forEach(easy_sticks => {
            if (!easy_sticks_blacklist.test(easy_sticks)) event.add("kubejs:easy_sticks_logs", easy_sticks)
        })
        // We only want to remove stripped logs, not stripped wood
        event.add("kubejs:easy_sticks_logs", "#forge:stripped_wood")
    })

    ServerEvents.lowPriorityData(event => {
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/limestone", [
            "create:limestone",
            "quark:limestone",
            "quark:polished_limestone",
            "quark:limestone_bricks",
            "quark:chiseled_limestone_bricks",
            "quark:limestone_pillar"
        ])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/apple_block", ["thermal:apple_block", "quark:apple_crate"])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/beetroot_block", ["farmersdelight:beetroot_crate", "quark:beetroot_crate"])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/carrot_block", ["farmersdelight:carrot_crate", "quark:carrot_crate"])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/charcoal_block", ["thermal:charcoal_block", "quark:charcoal_block"])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/gunpowder_block", ["thermal:gunpowder_block", "quark:gunpowder_sack"])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/potato_block", ["farmersdelight:potato_crate", "quark:potato_crate"])
        addChiselingRecipe(event, "kubejs:chiseling_recipes/compat/quark/sugar_cane_block", ["thermal:sugar_cane_block", "quark:sugar_cane_block"])

        // Remove the Forgotten Hat from the forgotten's drop pool (spawns in strongholds with integrated strongholds)
        event.addJson("quark:loot_tables/entities/forgotten", {
            "type": "minecraft:entity",
            "pools": [
                {
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "functions": [
                                {
                                    "function": "minecraft:set_count",
                                    "count": {"min": 4.0, "max": 8.0, "type": "minecraft:uniform"}
                                },
                                {
                                    "function": "minecraft:looting_enchant",
                                    "count": {"min": 1.0, "max": 2.0}
                                }
                            ],
                            "name": "minecraft:arrow"
                        }
                    ]
                },
                {
                    "rolls": 1,
                    "entries": [
                        {
                            "type": "minecraft:item",
                            "functions": [
                                {
                                    "function": "minecraft:set_count",
                                    "count": {"min": 2.0, "max": 3.0, "type": "minecraft:uniform"}
                                },
                                {
                                    "function": "minecraft:looting_enchant",
                                    "count": {"min": 0.0, "max": 1.0}
                                }
                            ],
                            "name": "minecraft:bone"
                        }
                    ]
                }
            ]
        })

        // remove soul beads
        event.addJson("quark:loot_tables/entities/wraith", {})
    })
}
