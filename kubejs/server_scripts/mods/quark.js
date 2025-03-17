const QU = (id, x) => MOD("quark", id, x)
if(Platform.isLoaded("quark")) {

    // Add quark wood types to the arrays of wood types
    wood_types.push(QU("azalea"))
    wood_types.push(QU("blossom"))

    ServerEvents.recipes(event => {
        // Unwanted duplicate compressed block recipes
        event.remove({ id: QU("building/crafting/compressed/charcoal_block")})
        event.remove({ id: QU("building/crafting/compressed/sugar_cane_block")})
        event.remove({ id: QU("building/crafting/compressed/gunpowder_sack")})
        event.remove({ id: QU("building/crafting/compressed/apple_crate")})
        event.remove({ id: QU("building/crafting/compressed/potato_crate")})
        event.remove({ id: QU("building/crafting/compressed/carrot_crate")})
        event.remove({ id: QU("building/crafting/compressed/beetroot_crate")})
        event.remove({ id: QU("building/crafting/compressed/bamboo_block")})

        // Tree resin
        addTreeOutput(event, QU("blossom_log"), QU("blue_blossom_leaves"))
        addTreeOutput(event, QU("blossom_log"), QU("lavender_blossom_leaves"))
        addTreeOutput(event, QU("blossom_log"), QU("orange_blossom_leaves"))
        addTreeOutput(event, QU("blossom_log"), QU("yellow_blossom_leaves"))
        addTreeOutput(event, QU("blossom_log"), QU("red_blossom_leaves"))
        addTreeOutput(event, QU("blossom_log"), QU("snowblossom_leaves"))

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
    })

    ServerEvents.tags("block", event => {

        event.add("create:wrench_pickup", "quark:ender_watcher")
        // I really don't know why these blocks are missing the pressure plate tag
        // All the other pressure plates from quark and forbidden have the tag.
        event.add("minecraft:pressure_plates", "quark:obsidian_pressure_plate")
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
