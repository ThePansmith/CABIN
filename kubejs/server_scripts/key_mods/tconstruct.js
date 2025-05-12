// priority: 1

wood_types.push("tconstruct:greenheart")
wood_types.push("tconstruct:skyroot")
wood_types.push("tconstruct:bloodshroom")
wood_types.push("tconstruct:enderbark")

ServerEvents.recipes(event => {

    // It is possible to duplicate rails in 1.20.1 Minecraft, so we need to remove rail melting
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": [
            {
                "item": "minecraft:iron_bars"
            }
        ],
        "result": {
            "amount": 30,
            "tag": "forge:molten_iron"
        },
        "temperature": 800,
        "time": 35
    }).id("tconstruct:smeltery/melting/metal/iron/nugget_3")
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": [
            {
                "item": "minecraft:stonecutter"
            },
            {
                "item": "minecraft:piston"
            },
            {
                "item": "minecraft:sticky_piston"
            }
        ],
        "result": {
            "amount": 90,
            "tag": "forge:molten_iron"
        },
        "temperature": 800,
        "time": 60
    }).id("tconstruct:smeltery/melting/metal/iron/ingot_1")
    event.remove({ id: "tconstruct:smeltery/melting/metal/gold/powered_rail" })

    // Obsidian pane crafting
    // Not sure where the original recipe went
    event.shaped(Item.of("tconstruct:obsidian_pane", 8), [
        "SSS",
        "SSS"
    ], {
        S: "minecraft:obsidian"
    })
    // melt blaze rods into blazing blood
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "tag": "forge:rods/blaze" },
        "result": { "fluid": "tconstruct:blazing_blood", "amount": 100 },
        "temperature": 790,
        "time": 40
    })
    // Melt redstone into destabilized redstone
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "item": "minecraft:redstone" },
        "result": { "fluid": "thermal:redstone", "amount": 100 },
        "temperature": 300,
        "time": 10
    });
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "item": "minecraft:redstone_block" },
        "result": { "fluid": "thermal:redstone", "amount": 900 },
        "temperature": 500,
        "time": 90
    });
    // Remove coin cast
    event.remove({ id: "tconstruct:smeltery/casts/sand_casts/coins" })
    event.remove({ id: "tconstruct:smeltery/casts/red_sand_casts/coins" })
    event.remove({ id: "tconstruct:smeltery/casts/gold_casts/coins" })

    let coinMaterials = [
        "iron",
        "gold",
        "copper",
        "netherite",
        "tin",
        "lead",
        "silver",
        "nickel",
        "bronze",
        "electrum",
        "invar",
        "constantan",
        "signalum",
        "lumium",
        "enderium"
    ];
    coinMaterials.forEach(material => {
        event.remove({ id: `tconstruct:smeltery/casting/metal/${material}/coin_gold_cast` })
        event.remove({ id: `tconstruct:smeltery/casting/metal/${material}/coin_sand_cast` })
    })
    // Chains can be crafted using Zinc
    event.remove({ id: "tconstruct:smeltery/melting/metal/iron/chain" })
    // Remove enchanted apple melting recipe
    event.remove({ id: "tconstruct:smeltery/melting/metal/gold/enchanted_apple" })
    // Remove Tconstruct cheese since it only costs milk to craft and cheese already exists on the moon.
    event.remove({ id: "tconstruct:smeltery/casting/cheese_block" })
    event.remove({ id: "tconstruct:smeltery/casting/cheese_ingot_gold_cast" })
    event.remove({ id: "tconstruct:smeltery/casting/cheese_ingot_sand_cast" })
})

ServerEvents.tags("item", event => {
    // zinc anvils
    event.get("tconstruct:anvil_metal").add("create:zinc_block")
    event.remove("tconstruct:anvil_metal", "#forge:storage_blocks/bronze")

    event.add("forge:ingots/seared_brick", "tconstruct:seared_brick")
    event.add("forge:ingots/scorched_brick", "tconstruct:scorched_brick")
})

ServerEvents.tags("block", event => {
    event.remove("tconstruct:anvil_metal", "#forge:storage_blocks/bronze")

    event.get("tconstruct:mineable/melting_blacklist")
        .add("#forge:storage_blocks/raw_iron")
        .add("#forge:storage_blocks/raw_copper")
        .add("#forge:storage_blocks/raw_gold")
        .add("#forge:storage_blocks/raw_zinc")
        .add("#forge:storage_blocks/raw_lead")
        .add("#forge:storage_blocks/raw_nickel")
})

ServerEvents.highPriorityData(event => {
    // Use crushed ore instead of raw ore for the autosmelt modifier
    event.addJson("tconstruct:recipes/tools/modifiers/ability/autosmelt", {
        "type": "tconstruct:modifier",
        "allow_crystal": true,
        "check_trait_level": true,
        "inputs": [
            { "tag": "create:crushed_raw_materials" },
            { "item": "minecraft:blast_furnace" },
            { "tag": "forge:ingots" },
            { "tag": "forge:storage_blocks/coal" },
            { "tag": "forge:storage_blocks/coal" }
        ],
        "level": 1,
        "result": "tconstruct:autosmelt",
        "slots": { "abilities": 1 },
        "tools": { "tag": "tconstruct:modifiable/harvest" }
    })

    // Make Melting exclusive to the melting pan
    event.addJson("tconstruct:recipes/tools/modifiers/ability/melting", {
        "type": "tconstruct:modifier",
        "allow_crystal": true,
        "check_trait_level": true,
        "inputs": [
            {
                "item": "minecraft:blaze_rod"
            },
            {
                "ingredient": [
                    {
                        "item": "tconstruct:seared_melter"
                    },
                    {
                        "item": "tconstruct:smeltery_controller"
                    },
                    {
                        "item": "tconstruct:foundry_controller"
                    }
                ]
            },
            {
                "item": "minecraft:blaze_rod"
            },
            {
                "item": "minecraft:lava_bucket"
            },
            {
                "item": "minecraft:lava_bucket"
            }
        ],
        "level": 1,
        "result": "tconstruct:melting",
        "slots": {
            "abilities": 1
        },
        "tools": [
            {
                "item": "tconstruct:melting_pan"
            }
        ]
    })

    event.addJson("tconstruct:tinkering/tool_definitions/melting_pan", {
        "modules": [
            {
                "type": "tconstruct:material_stats",
                "primary_part": 0,
                "stat_types": [
                    "tconstruct:plating_shield",
                    "tconstruct:limb"
                ]
            },
            {
                "type": "tconstruct:default_materials",
                "materials": [
                    {
                        "type": "tconstruct:random"
                    },
                    {
                        "type": "tconstruct:random"
                    }
                ]
            },
            {
                "type": "tconstruct:material_traits",
                "hooks": [
                    "tconstruct:rebalanced_trait"
                ],
                "material_index": 1,
                "stat_type": "tconstruct:limb"
            },
            {
                "type": "tconstruct:base_stats",
                "stats": {
                    "tconstruct:block_amount": 10.0,
                    "tconstruct:harvest_tier": "minecraft:iron",
                    "tconstruct:knockback_resistance": 0.1,
                    "tconstruct:mining_speed": 6.0
                }
            },
            {
                "type": "tconstruct:modifier_slots",
                "slots": {
                    "abilities": 2,
                    "defense": 1,
                    "upgrades": 1
                }
            },
            {
                "type": "tconstruct:melting_fluid_effective",
                "ignore_tier": false,
                "inverted_type": "mantle:tag",
                "predicate_type": "mantle:inverted",
                "tag": "tconstruct:mineable/melting_blacklist",
                "temperature": 1500
            },
            {
                "type": "tconstruct:volatile_flag",
                "flag": "tconstruct:force_melting"
            },
            {
                "type": "tconstruct:vein_aoe",
                "max_distance": 0
            },
            {
                "type": "tconstruct:traits",
                "traits": [
                    {
                        "level": 2,
                        "name": "tconstruct:melting"
                    },
                    {
                        "level": 1,
                        "name": "tconstruct:tank"
                    }
                ]
            },
            {
                "type": "tconstruct:dual_option_interaction"
            }
        ]
    })
})
