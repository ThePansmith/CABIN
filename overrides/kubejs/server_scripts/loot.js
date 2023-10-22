let metal_ores_drop_dust = (id, dust_id) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "enchantments": [
                                            {
                                                "enchantment": "minecraft:silk_touch",
                                                "levels": {
                                                    "min": 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ],
                            "name": id
                        },
                        {
                            "type": "minecraft:item",
                            "name": dust_id,
                            "functions": [
                                {
                                    "function": "minecraft:explosion_decay"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "conditions": [
                        {
                            "condition": "minecraft:table_bonus",
                            "enchantment": "minecraft:fortune",
                            "chances": [
                                0.0,
                                0.125,
                                0.25,
                                0.35,
                                0.5
                            ]
                        }
                    ],
                    "name": dust_id
                }
            ]
        }
    ]
})

let mystery_leaves_but_no_gapples =
{
    "type": "minecraft:block",
    "pools": [
        {
            "name": "forbidden_arcanus:mysterywood_leaves",
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:alternative",
                                    "terms": [
                                        {
                                            "condition": "minecraft:match_tool",
                                            "predicate": {
                                                "tag": "forge:shears"
                                            }
                                        },
                                        {
                                            "condition": "minecraft:match_tool",
                                            "predicate": {
                                                "enchantments": [
                                                    {
                                                        "enchantment": "minecraft:silk_touch",
                                                        "levels": {
                                                            "min": 1
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ],
                            "name": "forbidden_arcanus:mysterywood_leaves"
                        },
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:survives_explosion"
                                },
                                {
                                    "condition": "minecraft:table_bonus",
                                    "enchantment": "minecraft:fortune",
                                    "chances": [
                                        0.05,
                                        0.0625,
                                        0.083333336,
                                        0.1
                                    ]
                                }
                            ],
                            "name": "forbidden_arcanus:mysterywood_sapling"
                        }
                    ]
                }
            ]
        },
        {
            "name": "forbidden_arcanus:mysterywood_leaves",
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "conditions": [
                        {
                            "condition": "minecraft:table_bonus",
                            "enchantment": "minecraft:fortune",
                            "chances": [
                                0.02,
                                0.022222223,
                                0.025,
                                0.033333335,
                                0.1
                            ]
                        }
                    ],
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "count": {
                                "min": 1.0,
                                "max": 2.0,
                                "type": "minecraft:uniform"
                            }
                        },
                        {
                            "function": "minecraft:explosion_decay"
                        }
                    ],
                    "name": "minecraft:stick"
                }
            ],
            "conditions": [
                {
                    "condition": "minecraft:inverted",
                    "term": {
                        "condition": "minecraft:alternative",
                        "terms": [
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "tag": "forge:shears"
                                }
                            },
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "enchantments": [
                                        {
                                            "enchantment": "minecraft:silk_touch",
                                            "levels": {
                                                "min": 1
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            "name": "forbidden_arcanus:mysterywood_leaves",
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "conditions": [
                        {
                            "condition": "minecraft:survives_explosion"
                        },
                        {
                            "condition": "minecraft:table_bonus",
                            "enchantment": "minecraft:fortune",
                            "chances": [
                                0.005,
                                0.0055555557,
                                0.00625,
                                0.008333334,
                                0.025
                            ]
                        }
                    ],
                    "name": "minecraft:gold_nugget"
                }
            ],
            "conditions": [
                {
                    "condition": "minecraft:inverted",
                    "term": {
                        "condition": "minecraft:alternative",
                        "terms": [
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "tag": "forge:shears"
                                }
                            },
                            {
                                "condition": "minecraft:match_tool",
                                "predicate": {
                                    "enchantments": [
                                        {
                                            "enchantment": "minecraft:silk_touch",
                                            "levels": {
                                                "min": 1
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ]
}

let slabs = (id) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:item",
                    "functions": [
                        {
                            "function": "minecraft:set_count",
                            "conditions": [
                                {
                                    "condition": "minecraft:block_state_property",
                                    "block": id,
                                    "properties": {
                                        "type": "double"
                                    }
                                }
                            ],
                            "count": 2
                        },
                        {
                            "function": "minecraft:explosion_decay"
                        }
                    ],
                    "name": id
                }
            ]
        }
    ]
})

let cobble = (id, cobbleId) => ({
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:alternatives",
                    "children": [
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:match_tool",
                                    "predicate": {
                                        "enchantments": [
                                            {
                                                "enchantment": "minecraft:silk_touch",
                                                "levels": {
                                                    "min": 1
                                                }
                                            }
                                        ]
                                    }
                                }
                            ],
                            "name": id
                        },
                        {
                            "type": "minecraft:item",
                            "conditions": [
                                {
                                    "condition": "minecraft:survives_explosion"
                                }
                            ],
                            "name": cobbleId
                        }
                    ]
                }
            ]
        }
    ]
})

onEvent('block.loot_tables', event => {

    event.addSimpleBlock('minecraft:twisting_vines', 'minecraft:twisting_vines')
    event.addSimpleBlock('minecraft:weeping_vines', 'minecraft:weeping_vines')

    let extra_ores = ['minecraft:', 'minecraft:deepslate_']

    extra_ores.forEach(e => {
        let iron = e + "iron_ore"
        event.addJson(iron, metal_ores_drop_dust(iron, CR('crushed_raw_iron')))
        let gold = e + "gold_ore"
        event.addJson(gold, metal_ores_drop_dust(gold, CR('crushed_raw_gold')))
    })
    event.addJson(MC('copper_ore'), metal_ores_drop_dust(CR('copper_ore'), CR('crushed_raw_copper')))
	event.addJson(MC('deep_slate_copper_ore'), metal_ores_drop_dust(CR('copper_ore'), CR('crushed_raw_copper')))
    event.addJson(CR('zinc_ore'), metal_ores_drop_dust(CR('zinc_ore'), CR('crushed_raw_zinc')))
	event.addJson(CR('deepslate_zinc_ore'), metal_ores_drop_dust(CR('zinc_ore'), CR('crushed_raw_zinc')))
    event.addJson(TE('nickel_ore'), metal_ores_drop_dust(TE('nickel_ore'), CR('crushed_raw_nickel')))
	event.addJson(TE('deepslate_nickel_ore'), metal_ores_drop_dust(TE('nickel_ore'), CR('crushed_raw_nickel')))
    event.addJson(TE('lead_ore'), metal_ores_drop_dust(TE('lead_ore'), CR('crushed_raw_lead')))
	event.addJson(TE('deepslate_lead_ore'), metal_ores_drop_dust(TE('lead_ore'), CR('crushed_raw_lead')))

    event.addJson("forbidden_arcanus:mysterywood_leaves", mystery_leaves_but_no_gapples)

})