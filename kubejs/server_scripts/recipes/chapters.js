// priority: 2
function ifiniDeploying(event, output, input, tool) {
    return {
        "type": "create:deploying",
        "ingredients": [
            Ingredient.of(input).toJson(),
            Ingredient.of(tool).toJson()
        ],
        "results": [
            Item.of(output)
        ],
        "keepHeldItem": true
    }
}

ServerEvents.recipes(event => {
    /**
	 * Used to store the name of an item when making sequenced assembly recipes
	 * @type {string}
	*/
    let transitional
    // - - - - - Chapter 1 - - - - -
    // Wood slab cutting
    let plankCutting = (wood) => {
        let planks = wood + "_planks"
        let slab = wood + "_slab"
        if (!Item.exists(slab)) {
            // Some mods name their wood slabs 'planks slab' for some reason
            slab = wood + "_planks_slab"
        }
        event.recipes.createCutting(Item.of(slab, 2), planks).processingTime(150)
    }
    wood_types.forEach(plankCutting)

    // Remove andesite recipe (and granite and diorite)
    event.remove({ id: MC("diorite") })
    event.remove({ id: MC("andesite") })
    event.remove({ id: MC("granite") })
    // algal blend
    event.remove({ id: AP("algal_blend") })
    event.shaped(Item.of(AP("algal_blend"), 4), [
        "SS",
        "AA"
    ], {
        A: "minecraft:clay_ball",
        S: ["minecraft:kelp", "minecraft:seagrass"]
    })
    event.shaped(Item.of(AP("algal_blend"), 4), [
        "AA",
        "SS"
    ], {
        A: "minecraft:clay_ball",
        S: ["minecraft:kelp", "minecraft:seagrass"]
    })
    event.recipes.createMixing(Item.of(AP("algal_blend"), 2), ["minecraft:clay_ball", ["minecraft:kelp", "minecraft:seagrass"]])
    // algal brick
    event.remove({ output: AP("algal_brick") })
    event.smelting(AP("algal_brick"), AP("algal_blend")).xp(0).cookingTime(120)
    // Andesite alloy
    event.remove({ id: TC("compat/create/andesite_alloy_iron") })
    event.remove({ id: CR("crafting/materials/andesite_alloy") })
    event.remove({ id: CR("crafting/materials/andesite_alloy_from_zinc") })
    event.remove({ id: CR("mixing/andesite_alloy") })
    event.remove({ id: CR("mixing/andesite_alloy_from_zinc") })
    event.remove({ id: TE("compat/create/smelter_create_alloy_andesite_alloy") })
    event.remove({ id: TE("compat/create/smelter_create_alloy_andesite_alloy") })
    event.remove({ id: TC("compat/create/andesite_alloy_zinc") })
    event.remove({ id: TC("compat/create/andesite_alloy_iron") })
    event.shaped(Item.of(CR("andesite_alloy"), 2), [
        "SS",
        "AA"
    ], {
        A: "minecraft:andesite",
        S: AP("algal_brick")
    })
    event.shaped(Item.of(CR("andesite_alloy"), 2), [
        "AA",
        "SS"
    ], {
        A: "minecraft:andesite",
        S: AP("algal_brick")
    })
    event.recipes.createMixing(Item.of(CR("andesite_alloy"), 2), [AP("algal_brick"), "minecraft:andesite"])
    // kinetic assembly
    transitional = "kubejs:incomplete_kinetic_mechanism"
    event.recipes.createSequencedAssembly([
        "kubejs:kinetic_mechanism",
    ], "#minecraft:wooden_slabs", [
        event.recipes.createDeploying(transitional, [transitional, CR("andesite_alloy")]),
        event.recipes.createDeploying(transitional, [transitional, CR("andesite_alloy")]),
        event.recipes.createDeploying(transitional, [transitional, KJ("#saws")])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:kinetic_mechanism")
    // Handcrafting recipe
    event.shapeless(KJ("kinetic_mechanism"), [KJ("#saws"), CR("cogwheel"), CR("andesite_alloy"), "#minecraft:logs"]).id("kubejs:kinetic_mechanism_manual_only")

    // Andesite machines
    donutCraft(event, KJ("andesite_machine"), CR("andesite_casing"), KJ("kinetic_mechanism"))
    // secondary materials
    event.replaceInput({ id: CR("crafting/kinetics/brass_hand") }, "#forge:plates/brass", CR("golden_sheet"))
    event.remove({ output: TE("drill_head") })
    event.shaped(TE("drill_head"), [
        "NN ",
        "NLP",
        " PL"
    ], {
        N: MC("iron_nugget"),
        P: CR("iron_sheet"),
        L: TE("lead_ingot")
    })

    event.remove({ output: TE("saw_blade") })
    event.shaped(TE("saw_blade"), [
        "NPN",
        "PLP",
        "NPN"
    ], {
        N: MC("iron_nugget"),
        P: CR("iron_sheet"),
        L: TE("lead_ingot")
    })

    // Machine Crafting
    andesiteMachine(event, Item.of("create:portable_storage_interface", 2))
    andesiteMachine(event, Item.of("create:encased_fan", 1), CR("propeller"))
    andesiteMachine(event, Item.of("create:mechanical_press", 1), MC("iron_block"))
    andesiteMachine(event, Item.of("mbd2:strainer", 1), MC("iron_bars"))
    andesiteMachine(event, Item.of("create:mechanical_mixer", 1), CR("whisk"))
    andesiteMachine(event, Item.of("create:mechanical_drill", 1), TE("drill_head"))
    andesiteMachine(event, Item.of("create:mechanical_saw", 1), TE("saw_blade"))
    if (Platform.isLoaded("createdeco")) { andesiteMachine(event, Item.of("create:mechanical_roller", 1), "createdeco:andesite_hull") } else { andesiteMachine(event, Item.of("create:mechanical_roller", 1), "create:andesite_alloy_block") }
    if (Platform.isLoaded("rechiseledcreate")) { andesiteMachine(event, Item.of("rechiseledcreate:mechanical_chisel", 1), "rechiseled:chisel") }
    andesiteMachine(event, Item.of("create:deployer", 1), CR("brass_hand"))
    andesiteMachine(event, Item.of("create:mechanical_harvester", 2))
    andesiteMachine(event, Item.of("create:mechanical_plough", 2))
    andesiteMachine(event, Item.of("create:contraption_controls", 1))
    andesiteMachine(event, Item.of("thermal:device_tree_extractor", 1), MC("bucket"))
    andesiteMachine(event, Item.of(AE2("meteorite_compass"), 1), MC("compass"))
    andesiteMachine(event, Item.of(AE2("charger"), 1), AE2("certus_quartz_crystal"))
    andesiteMachine(event, Item.of("thermal:dynamo_stirling", 1), TE("rf_coil"))
    andesiteMachine(event, Item.of("create:andesite_funnel", 4))
    andesiteMachine(event, Item.of("create:andesite_tunnel", 4))
    andesiteMachine(event, Item.of("kubejs:pipe_module_utility", 4))
    // Gourmand Upgrade
    createMachine(TE("dynamo_stirling"), event, TE("dynamo_gourmand"), MC("golden_carrot"))
    createMachine(TE("dynamo_stirling"), event, TE("dynamo_gourmand"), MC("golden_apple"))

    // - - - - - Chapter 1A - - - - -
    event.remove({ type: "thermal:tree_extractor" })
    wood_types.forEach(wood => {
        if (Item.exists(wood + "_log") && Item.exists(wood + "_leaves") && Item.exists(wood + "_sapling")) {
            addTreeOutput(event, wood + "_log", wood + "_leaves").id("kubejs:devices/tree_extractor/tree_extractor_" + wood.split(":")[1])
        }
    })
    // addTreeOutput( TC('greenheart_log'), TC('earth_slime_leaves'), {fluid: TC("earth_slime"), amount: 10})
    // addTreeOutput( TC('skyroot_log'), TC('sky_slime_leaves'), {fluid: TC("sky_slime"), amount: 10})

    // Rubber
    event.remove({ id: "thermal:rubber_3" })
    event.remove({ id: "thermal:rubber_from_dandelion" })
    event.remove({ id: "thermal:rubber_from_vine" })

    event.custom({
        "type": "create:mixing",
        "ingredients": [
            { "item": "minecraft:vine", "count": 4 },
            { "fluid": "minecraft:water", "amount": 250 }
        ],
        "results": [
            { "item": "thermal:rubber" }
        ]
    })
    event.custom({
        "type": "create:mixing",
        "ingredients": [
            { "tag": "minecraft:flowers", "count": 4 },
            { "fluid": "minecraft:water", "amount": 250 }
        ],
        "results": [
            { "item": "thermal:rubber" }
        ]
    })
    event.custom({
        "type": "create:compacting",
        "ingredients": [
            { "fluid": "thermal:resin", "amount": 250 }
        ],
        "results": [
            { "item": "thermal:rubber" }
        ]
    })

    // Belts
    event.remove({ id: CR("crafting/kinetics/belt_connector") })
    event.shaped(CR("belt_connector", 3), [
        "SSS",
        "SSS"
    ], {
        S: TE("cured_rubber")
    })

    // Sealed mechanism assembly
    transitional = KJ("incomplete_sealed_mechanism")
    event.recipes.createSequencedAssembly([
        KJ("sealed_mechanism"),
    ], KJ("kinetic_mechanism"), [
        event.recipes.createDeploying(transitional, [transitional, TE("cured_rubber")]),
        event.recipes.createDeploying(transitional, [transitional, TE("cured_rubber")]),
        event.recipes.createDeploying(transitional, [transitional, F("#slimeballs")])// .keepHeldItem(true)
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:sealed_mechanism")
    // manual crafting
    event.shaped(KJ("sealed_mechanism"), [
        "SCS"
    ], {
        C: KJ("kinetic_mechanism"),
        S: TE("cured_rubber")
    })

    // Copper Machines
    donutCraft(event, KJ("copper_machine"), CR("copper_casing"), KJ("sealed_mechanism"))

    // Machine Crafting
    copperMachine(event, Item.of("create:copper_backtank", 1), MC("copper_block"))
    copperMachine(event, Item.of("create:portable_fluid_interface", 2))
    copperMachine(event, Item.of("create:spout", 1), MC("hopper"))
    copperMachine(event, Item.of("thermal:upgrade_augment_1", 1), MC("redstone"))
    copperMachine(event, Item.of("create:hose_pulley", 1))
    copperMachine(event, Item.of("create:item_drain", 1), MC("iron_bars"))
    copperMachine(event, Item.of("thermal:dynamo_magmatic", 1), TE("rf_coil"))
    copperMachine(event, Item.of("thermal:device_water_gen", 1), MC("bucket"))
    copperMachine(event, Item.of("create:smart_fluid_pipe", 2))
    copperMachine(event, Item.of("kubejs:attachment_base", 1), CR("mechanical_pump"))
    // smeltery controller recipe
    event.remove({ id: TC("smeltery/casting/seared/smeltery_controller") })
    event.remove({ id: TC("smeltery/melting/metal/copper/smeltery_controller") })
    donutCraft(event, TC("smeltery_controller"), TC("#seared_blocks"), KJ("sealed_mechanism")).modifyResult((grid, result) => {
        let item = grid.find(TC("#seared_blocks"))
        return result.withNBT({ texture: item.id })
    })

    // - - - - - Chapter 1B - - - - -
    // Sturdy sheets are not used. It is replaced by reinforced mechanisms
    event.remove({ id: CR("sequenced_assembly/sturdy_sheet") })
    // Magma blocks
    event.blasting(MC("magma_block"), MC("deepslate"))
    // Magma to obsidian is a vanilla create recipe
    // reinforced mechanism assembly
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": {
            "item": "kubejs:kinetic_mechanism"
        },
        "loops": 1,
        "results": [
            {
                "item": "kubejs:reinforced_mechanism"
            }
        ],
        "sequence": [
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "kubejs:incomplete_reinforced_mechanism"
                    },
                    {
                        "item": "minecraft:obsidian"
                    }
                ],
                "results": [
                    {
                        "item": "kubejs:incomplete_reinforced_mechanism"
                    }
                ]
            },
            {
                "type": "create:deploying",
                "ingredients": [
                    {
                        "item": "kubejs:incomplete_reinforced_mechanism"
                    },
                    {
                        "item": "minecraft:obsidian"
                    }
                ],
                "results": [
                    {
                        "item": "kubejs:incomplete_reinforced_mechanism"
                    }
                ]
            },
            {
                "type": "create:pressing",
                "ingredients": [
                    {
                        "item": "kubejs:incomplete_reinforced_mechanism"
                    }
                ],
                "results": [
                    {
                        "item": "kubejs:incomplete_reinforced_mechanism"
                    }
                ]
            }
        ],
        "transitionalItem": {
            "item": "kubejs:incomplete_reinforced_mechanism"
        }
    })
    // manual crafting
    event.shaped(KJ("reinforced_mechanism"), [
        "OCO"
    ], {
        C: KJ("kinetic_mechanism"),
        O: MC("obsidian")
    })
    // Gold machine
    donutCraft(event, KJ("gold_machine"), CR("railway_casing"), KJ("reinforced_mechanism"))

    // Machine Crafting
    goldMachine(event, Item.of("create:controls", 1), MC("lever"))
    goldMachine(event, Item.of("create:track_station", 2))
    goldMachine(event, Item.of("create:track_signal", 4))
    goldMachine(event, Item.of("create:schedule", 4))
    goldMachine(event, Item.of("create:track_observer", 2))

    if (Platform.isLoaded("railways")) {
        goldMachine(event, Item.of("railways:semaphore", 4))
        goldMachine(event, Item.of("railways:conductor_whistle", 4))
        goldMachine(event, Item.of("railways:track_coupler", 2))
        goldMachine(event, Item.of("railways:track_switch_andesite", 1), "create:andesite_alloy")
        goldMachine(event, Item.of("railways:track_switch_brass", 1), "create:brass_ingot")
    }

    // - - - - - Chapter 2 - - - - -
    event.remove({ id: CR("milling/compat/ae2/sky_stone_block") })
    event.remove({ id: CR("milling/compat/ae2/nether_quartz") })
    event.remove({ id: CR("milling/compat/ae2/certus_quartz") })
    event.remove({ id: CR("crafting/materials/electron_tube") })
    event.remove({ id: CR("crafting/materials/rose_quartz") })
    event.remove({ id: CR("sandpaper_polishing/rose_quartz") })
    event.remove({ id: CR("sandpaper_polishing/rose_quartz") })

    { // This is a part of the chapter 2 script for some reason
        let redstoneTransmute = (input, output) => {
            event.custom({
                "type": "tconstruct:casting_basin",
                "cast": { "item": input },
                "cast_consumed": true,
                "fluid": {
                    "name": "thermal:redstone",
                    "amount": 50
                },
                "result": output,
                "cooling_time": 30
            })
        }

        redstoneTransmute(MC("cobblestone"), MC("netherrack"))
        redstoneTransmute(MC("sand"), MC("red_sand"))
    }

    // Infinite Sky Stone

    event.recipes.createMilling([AE2("sky_dust"), AE2("sky_stone_block")], AE2("sky_stone_block")).processingTime(1000)

    // Infinite Certus Quartz
    event.shapeless("2x kubejs:certus_crystal_seed", [AE2("certus_quartz_dust"), MC("#sand")])
    event.remove({ id: AE2("transform/certus_quartz_crystals") })
    event.recipes.createMilling([AE2("certus_quartz_dust")], AE2("#all_certus_quartz")).processingTime(200)
    event.recipes.createMilling([TE("quartz_dust")], MC("quartz")).processingTime(200)

    event.recipes.createMechanicalCrafting(Item.of(KJ("certus_crystal_seed"), 2), ["A"], { A: AE2("certus_quartz_crystal") })
    event.recipes.createMechanicalCrafting(Item.of(KJ("fluix_crystal_seed"), 2), ["A"], { A: AE2("fluix_crystal") })

    let grow = (from, via, to) => {
        event.custom({
            "type": "create:sequenced_assembly",
            "ingredient": { "item": from },
            "loops": 4,
            "results": [{ "item": to }],
            "sequence": [
                {
                    "type": "create:filling",
                    "ingredients": [
                        { "item": via },
                        { "fluid": "minecraft:water", "amount": 500 }
                    ],
                    "results": [{ "item": via }]
                }
            ],
            "transitionalItem": { "item": via }
        }).id("kubejs:grow_" + to.split(":")[1])
    }
    grow(KJ("certus_crystal_seed"), KJ("growing_certus_seed"), KJ("tiny_certus_crystal"))
    grow(KJ("fluix_crystal_seed"), KJ("growing_fluix_seed"), KJ("tiny_fluix_crystal"))
    grow(KJ("tiny_certus_crystal"), KJ("growing_tiny_certus_crystal"), KJ("small_certus_crystal"))
    grow(KJ("tiny_fluix_crystal"), KJ("growing_tiny_fluix_crystal"), KJ("small_fluix_crystal"))
    grow(KJ("small_certus_crystal"), KJ("growing_small_certus_crystal"), AE2("certus_quartz_crystal"))
    grow(KJ("small_fluix_crystal"), KJ("growing_small_fluix_crystal"), AE2("fluix_crystal"))

    // Volatile Sky Solution
    event.custom({
        "type": "create:mixing",
        "ingredients": [
            { "item": "ae2:sky_dust", "count": 4 },
            { "fluid": "minecraft:water", "amount": 500 }
        ],
        "results": [
            { "fluid": "kubejs:volatile_sky_solution", "amount": 500 }
        ]
    })
    // Destabilized Redstone
    event.custom({
        "type": "create:mixing",
        "ingredients": [
            { "item": "ae2:charged_certus_quartz_crystal" },
            { "fluid": "kubejs:volatile_sky_solution", "amount": 250 }
        ],
        "results": [
            { "item": "ae2:certus_quartz_crystal" },
            { "fluid": "thermal:redstone", "amount": 250 }
        ]
    })
    // Rose Quartz
    event.shapeless("create:rose_quartz", [[MC("quartz"), AE2("certus_quartz_crystal"), AE2("charged_certus_quartz_crystal")], MC("redstone"), MC("redstone"), MC("redstone"), MC("redstone")])
    // Polished Rose Quartz
    event.custom({
        "type": "create:mixing",
        "ingredients": [
            { "item": "ae2:certus_quartz_crystal" },
            { "fluid": "thermal:redstone", "amount": 250 }
        ],
        "results": [
            { "item": "create:polished_rose_quartz" }
        ]
    })
    // Electron tubes
    event.custom({
        "type": "create:filling",
        "ingredients": [
            { "item": "create:polished_rose_quartz" },
            { "fluid": "tconstruct:molten_iron", "amount": 10 }
        ],
        "results": [
            { "item": "create:electron_tube" }
        ]
    })

    // Precision mechanisms
    event.remove({ id: CR("sequenced_assembly/precision_mechanism") })
    transitional = CR("incomplete_precision_mechanism")
    event.recipes.createSequencedAssembly([
        CR("precision_mechanism"),
    ], KJ("kinetic_mechanism"), [
        event.recipes.createDeploying(transitional, [transitional, CR("electron_tube")]),
        event.recipes.createDeploying(transitional, [transitional, CR("electron_tube")]),
        event.recipes.createDeploying(transitional, [transitional, KJ("#screwdrivers")])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:precision_mechanism")

    // Brass Machines
    donutCraft(event, KJ("brass_machine"), CR("brass_casing"), CR("precision_mechanism"))

    // Machine Crafting
    brassMachine(event, Item.of("create:mechanical_crafter", 3), MC("crafting_table"))
    brassMachine(event, Item.of("create:sequenced_gearshift", 2))
    brassMachine(event, Item.of("create:steam_engine", 1))
    brassMachine(event, Item.of("create:rotation_speed_controller", 1))
    brassMachine(event, Item.of("create:mechanical_arm", 1))
    brassMachine(event, Item.of("create:stockpile_switch", 2))
    brassMachine(event, Item.of("create:content_observer", 2))
    brassMachine(event, Item.of("thermal:machine_press", 1), MC("dropper"))
    brassMachine(event, Item.of("torchmaster:feral_flare_lantern", 1), MC("glowstone_dust"))
    brassMachine(event, Item.of("thermal:dynamo_numismatic", 1), TE("rf_coil"))
    brassMachine(event, Item.of("create:brass_funnel", 4))
    brassMachine(event, Item.of("create:brass_tunnel", 4))
    brassMachine(event, Item.of("create:elevator_pulley", 1))
    brassMachine(event, Item.of("kubejs:pipe_module_tier_1", 4))
    // Lapidary Upgrade
    createMachine(TE("dynamo_numismatic"), event, Item.of(TE("dynamo_lapidary"), 1), TE("lapis_gear"))

    // - - - - - Chapter 2A - - - - -
    // Vine Transmutation
    donutCraft(event, MC("weeping_vines"), "forbidden_arcanus:rune", MC("twisting_vines"))
    donutCraft(event, MC("twisting_vines"), "forbidden_arcanus:rune", MC("weeping_vines"))
    // Liquid soul sand
    event.remove({ id: TC("smeltery/melting/soul/sand") })
    event.recipes.createMixing(Fluid.of(TC("liquid_soul"), 500), [MC("twisting_vines"), MC("weeping_vines")]).heated()

    // Infernal Mechanisms
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": CR("precision_mechanism") },
        "loops": 6,
        "results": [
            { "item": KJ("infernal_mechanism") }
        ],
        "sequence": [
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_infernal_mechanism") },
                    { "fluid": TC("liquid_soul"), "amount": 500 }
                ],
                "results": [
                    { "item": KJ("incomplete_infernal_mechanism") }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_infernal_mechanism") },
                    { "fluid": MC("lava"), "amount": 1000 }
                ],
                "results": [
                    { "item": KJ("incomplete_infernal_mechanism") }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_infernal_mechanism") },
                    { "fluid": MC("lava"), "amount": 1000 }
                ],
                "results": [
                    { "item": KJ("incomplete_infernal_mechanism") }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_infernal_mechanism") },
                    { "fluid": MC("lava"), "amount": 1000 }
                ],
                "results": [
                    { "item": KJ("incomplete_infernal_mechanism") }
                ]
            }
        ],
        "transitionalItem": { "item": KJ("incomplete_infernal_mechanism") }
    }).id("kubejs:infernal_mechanism")

    // Zinc Machines
    donutCraft(event, KJ("zinc_machine"), KJ("zinc_casing"), KJ("infernal_mechanism"))
    // Machine Crafting
    zincMachine(event, Item.of(TE("device_rock_gen"), 1), MC("piston"))
    zincMachine(event, Item.of(TE("device_collector"), 1), MC("ender_pearl"))
    zincMachine(event, Item.of(TE("device_nullifier"), 1), MC("lava_bucket"))
    zincMachine(event, Item.of(TE("device_potion_diffuser"), 1), MC("glass_bottle"))
    zincMachine(event, Item.of("torchmaster:megatorch", 1), MC("torch"))
    zincMachine(event, Item.of("thermal:upgrade_augment_2", 1), MC("redstone"))
    // Foundry Controller Recipe
    event.remove({ id: TC("smeltery/casting/scorched/foundry_controller") })
    event.remove({ id: TC("smeltery/melting/obsidian/foundry_controller") })
    donutCraft(event, TC("foundry_controller"), TC("#scorched_blocks"), KJ("infernal_mechanism")).modifyResult((grid, result) => {
        let item = grid.find(TC("#scorched_blocks"))
        return result.withNBT({ texture: item.id })
    })

    // - - - - - Chapter 2b - - - - -

    // Logistic Mechanisms
    // TODO: make the line for this, uses above as a placeholder


    // Liquid Pulp
    event.custom({
        "type": "create:mixing",
        "heatRequirement": "heated",
        "ingredients": [
            { "item": "create:pulp", "count": 2 },
            { "fluid": "minecraft:water", "amount": 500 }
        ],
        "results": [
            { "fluid": "kubejs:liquid_pulp", "amount": 500 }
        ]
    })

    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": CR("precision_mechanism") },
        "loops": 4,
        "results": [
            { "item": KJ("logistic_mechanism") }
        ],
        "sequence": [
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_logistic_mechanism") },
                    { "fluid": "create:potion", "nbt": { "Bottle": "REGULAR", "Potion": "kubejs:haste" }, "amount": 1000 }
                ],
                "results": [
                    { "item": KJ("incomplete_logistic_mechanism") }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_logistic_mechanism") },
                    { "fluid": "kubejs:liquid_pulp", "amount": 300 }
                ],
                "results": [
                    { "item": KJ("incomplete_logistic_mechanism") }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_logistic_mechanism") },
                    { "fluid": "kubejs:liquid_pulp", "amount": 300 }
                ],
                "results": [
                    { "item": KJ("incomplete_logistic_mechanism") }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_logistic_mechanism") },
                    { "fluid": "kubejs:liquid_pulp", "amount": 300 }
                ],
                "results": [
                    { "item": KJ("incomplete_logistic_mechanism") }
                ]
            }
        ],
        "transitionalItem": { "item": KJ("incomplete_logistic_mechanism") }
    }).id("kubejs:logistic_mechanism")

    donutCraft(event, KJ("lead_machine"), KJ("lead_casing"), KJ("logistic_mechanism"))

    leadMachine(event, Item.of("create:package_frogport", 1), MC("slime_ball"))
    leadMachine(event, Item.of("create:item_hatch", 4))
    leadMachine(event, Item.of("create:packager", 1), "create:cardboard_block")
    leadMachine(event, Item.of("create:repackager", 1), "create:bound_cardboard_block")
    leadMachine(event, Item.of("create:redstone_requester", 1), "create:stock_link")
    leadMachine(event, Item.of("create:factory_gauge", 2))

    // Stock Link Recipe
    event.replaceInput({ id: "create:crafting/logistics/stock_link" }, CR("item_vault"), KJ("lead_casing"))

    // - - - - - Chapter 3 - - - - -
    // Fern Transmutation
    let fern1 = KJ("ender_slimy_fern_leaf")
    let fern2 = KJ("sky_slimy_fern_leaf")
    let fern3 = KJ("earth_slimy_fern_leaf")
    event.shapeless(fern1, ["forbidden_arcanus:rune", fern2, fern2, fern2, fern2, fern3, fern3, fern3, fern3])
    event.shapeless(fern2, ["forbidden_arcanus:rune", fern3, fern3, fern3, fern3, fern1, fern1, fern1, fern1])
    event.shapeless(fern3, ["forbidden_arcanus:rune", fern2, fern2, fern2, fern2, fern1, fern1, fern1, fern1])
    // Fern Cutting
    let chop = (type, output) => {
        event.custom({
            "type": "farmersdelight:cutting",
            "ingredients": [{ "item": TC(type + "_slime_fern") }],
            "tool": { "tag": "forge:tools/knives" },
            "result": [Item.of(KJ(type + "_slimy_fern_leaf"), 2)]
        }).id(`kjs:cutting/${type}_slime_fern_leaf`)
        event.custom(ifiniDeploying(event, KJ(type + "_slimy_fern_leaf", 2), TC(type + "_slime_fern"), "#forge:tools/knives"))
        event.custom({
            "type": "occultism:spirit_fire",
            "ingredient": { "item": KJ(type + "_slimy_fern_leaf") },
            "result": { "item": TC(type + "_slime_fern") }
        })
        event.recipes.createMilling([KJ(type + "_slime_fern_paste")], KJ(type + "_slimy_fern_leaf"))
        event.campfireCooking(output, KJ(type + "_slime_fern_paste")).cookingTime(300)
    }
    chop("earth", MC("gunpowder"))
    chop("sky", MC("bone_meal"))
    chop("ender", AE2("ender_dust"))
    // Crushing Wheel Recipe... Does this belong with chapter 2?
    event.remove({ id: CR("mechanical_crafting/crushing_wheel") })
    event.recipes.createMechanicalCrafting(Item.of(CR("crushing_wheel"), 2), [
        " AAA ",
        "AABAA",
        "ABBBA",
        "AABAA",
        " AAA "
    ], {
        A: F("#cobblestone"),
        B: MC("stick")
    })
    // Singularties
    event.recipes.createCrushing([Item.of(AE2("singularity")).withChance(1)], CR("crushing_wheel")).processingTime(250)
    // Quantum Entangled Singularties are from ae2
    // Dye Entangled Singularties
    let dyes = [MC("orange_dye"), MC("magenta_dye"), MC("light_blue_dye"), MC("yellow_dye"), MC("lime_dye"), MC("pink_dye"), MC("cyan_dye"), MC("purple_dye"), MC("blue_dye"), MC("brown_dye"), MC("green_dye"), MC("red_dye")]
    event.recipes.createCompacting("1x " + KJ("dye_entangled_singularity"), [dyes, Item.of(AE2("quantum_entangled_singularity"), 1)])
    // The mysterious conversion jei entry for entangled singularities has been moved moved to client scripts
    // Paint Balls
    event.remove({ id: /ae2:tools\/paintballs.*/ })
    event.recipes.createCrushing([
        Item.of(AE2("red_paint_ball"), 1).withChance(.90),
        Item.of(AE2("yellow_paint_ball"), 1).withChance(.80),
        Item.of(AE2("green_paint_ball"), 1).withChance(.70),
        Item.of(AE2("blue_paint_ball"), 1).withChance(.60),
        Item.of(AE2("magenta_paint_ball"), 1).withChance(.50)],
    KJ("dye_entangled_singularity")).processingTime(50)
    // Paint Ball Depleting
    let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
    for (let index = 0; index < colors.length; index++) {
        let element = colors[index];
        if (index == colors.length - 1)
            continue;
        event.recipes.createEmptying([AE2(colors[index + 1] + "_paint_ball"), Fluid.of(KJ("chromatic_waste"), 250)], AE2(element + "_paint_ball"))
    }
    // Chromatic Compound
    event.recipes.createMechanicalCrafting(CR("chromatic_compound"), [
        "AA",
        "AA"
    ], {
        A: AE2("magenta_paint_ball")
    })
    // Easy Torch Recipe for those who can't afford beacons
    event.campfireCooking(MC("torch"), MC("stick")).cookingTime(20)
    // Radiant Coils
    event.recipes.createPressing(KJ("radiant_sheet"), CR("refined_radiance"))
    event.recipes.createMechanicalCrafting(KJ("radiant_coil"), ["A"], { A: KJ("radiant_sheet") })
    // Chromatic Resonator
    event.shaped(KJ("chromatic_resonator"), [
        " R ",
        "R S",
        "LS "
    ], {
        R: TE("ruby"),
        L: TE("lead_ingot"),
        S: TE("sapphire")
    })
    // Inductive Mechanisms
    transitional = KJ("incomplete_inductive_mechanism")
    event.recipes.createSequencedAssembly([
        KJ("inductive_mechanism"),
    ], CR("precision_mechanism"), [
        event.recipes.createDeploying(transitional, [transitional, KJ("radiant_coil")]),
        event.recipes.createDeploying(transitional, [transitional, KJ("radiant_coil")]),
        event.recipes.createDeploying(transitional, [transitional, KJ("#chromatic_resonators")])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:inductive_mechanism")
    // Invar line is included in metallury.js
    // Invar Machines
    event.remove({ output: TE("machine_frame") })
    donutCraft(event, TE("machine_frame"), KJ("invar_casing"), KJ("inductive_mechanism"))
    // Machine Crafting
    invarMachine(event, Item.of(TE("dynamo_compression"), 1), TE("rf_coil"))
    invarMachine(event, Item.of("kubejs:pipe_module_tier_2", 4))
    // Disenchantment Upgrade
    createMachine(TE("dynamo_compression"), event, Item.of(TE("dynamo_disenchantment"), 1), "forbidden_arcanus:rune")
    // Default thermal machine recipes are kept in.
    // Check older versions of the script to see commented out code for thermal machine crafting recipes

    // - - - - - Chapter 3A - - - - -
    // Chorus Fruit comes from the default thermal insolator recipe
    // Gold and Silver melting, might belong with market recipes
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "tag": "forge:coins/silver" },
        "result": {
            "fluid": "tconstruct:molten_silver",
            "amount": 10
        },
        "temperature": 790,
        "time": 40
    })
    event.custom({ // worth it!
        "type": "tconstruct:melting",
        "ingredient": { "tag": "forge:coins/gold" },
        "result": {
            "fluid": "tconstruct:molten_gold",
            "amount": 10
        },
        "temperature": 790,
        "time": 40
    })
    // Enderium Ingots
    thermalSmelter(event, TE("enderium_ingot"), [F("#ingots/silver"), "minecraft:chorus_fruit", MC("ender_pearl")], 10000)
    thermalSmelter(event, TE("enderium_ingot"), [F("#ingots/silver"), "minecraft:chorus_fruit", AE2("ender_dust", 4)], 10000)
    // Abstruse Mechanisms
    thermalSmelter(event, KJ("abstruse_mechanism"), [KJ("inductive_mechanism"), TE("enderium_ingot")], 2000)
    // Ender Slime Ball?
    event.recipes.createMixing(["tconstruct:ender_slime_ball"], ["minecraft:chorus_fruit", "#forge:slimeballs"])
    // Enderium Machines
    donutCraft(event, KJ("enderium_machine"), KJ("enderium_casing"), KJ("abstruse_mechanism"))
    // Machine Crafting
    enderiumMachine(event, Item.of("enderstorage:ender_chest", 1), MC("chest"))
    enderiumMachine(event, Item.of("enderstorage:ender_tank", 1), CR("fluid_tank"))
    enderiumMachine(event, Item.of(TE("upgrade_augment_3"), 1), MC("redstone"))
    enderiumMachine(event, Item.of(AE2("quantum_ring"), 1), AE2("energy_cell"))
    enderiumMachine(event, Item.of(AE2("quantum_link"), 1), AE2("fluix_pearl"))
    enderiumMachine(event, Item.of(TE("fluid_duct"), 16), CR("fluid_pipe"))
    enderiumMachine(event, Item.of("kubejs:pipe_module_tier_3", 4))

    // Fluid Cells moved to enderium due to being able to transport fluids more efficiently than pipes
    event.replaceInput({ id: TE("fluid_cell_frame") }, F("#glass"), [TE("fluid_duct"), TE("fluid_duct_windowed")])
    // Windowed fluiducts
    event.remove({ output: TE("fluid_duct_windowed") })
    event.shapeless(TE("fluid_duct_windowed"), [TE("fluid_duct")])
    event.shapeless(TE("fluid_duct"), [TE("fluid_duct_windowed")])
    // - - - - - Chapter 4 - - - - -
    // Circuit Scraps
    event.stonecutting(AE2("silicon_press"), KJ("circuit_scrap"))
    event.stonecutting(AE2("engineering_processor_press"), KJ("circuit_scrap"))
    event.stonecutting(AE2("calculation_processor_press"), KJ("circuit_scrap"))
    event.stonecutting(AE2("logic_processor_press"), KJ("circuit_scrap"))
    event.shaped(KJ("circuit_scrap", 2), [" A ", "ABA", " A "], { A: TE("invar_ingot"), B: KJ("#circuit_press") })
    // Pyrolyzer charcoal
    event.remove({ id: TE("machines/pyrolyzer/pyrolyzer_logs") })
    thermalPyrolyzer(event, [MC("charcoal", 2), Fluid.of(TE("creosote"), 50)], MC("#logs"), 1000, { experience: 0.15 })
    // Coal Coke
    thermalPyrolyzer(event, [TE("coal_coke"), Fluid.of(TE("creosote"), 50)], MC("charcoal"), 2000, { experience: 0.15 })
    // Coke Chunk
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": TE("coal_coke") },
        "loops": 2,
        "results": [{ "item": KJ("coke_chunk") }],
        "sequence": [
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": KJ("incomplete_coke_chunk") },
                    { "fluid": "minecraft:water", "amount": 250 }
                ],
                "results": [{ "item": KJ("incomplete_coke_chunk") }]
            },
            {
                "type": "create:cutting",
                "ingredients": [{ "item": KJ("incomplete_coke_chunk") }],
                "results": [{ "item": KJ("incomplete_coke_chunk") }],
                "processingTime": 100
            }
        ],
        "transitionalItem": { "item": KJ("incomplete_coke_chunk") }
    }).id("kubejs:coke_cutting")
    // Sand Ball
    event.recipes.createSplashing([
        Item.of(KJ("sand_ball")).withChance(0.125)
    ], "minecraft:sandstone")
    thermalBottler(event, KJ("sand_ball"), [Fluid.of(MC("water"), 50), F("#sand/colorless")], 1000)
    // Sand Chunks
    event.recipes.createEmptying([KJ("rough_sand"), Fluid.of(KJ("fine_sand"), 500)], KJ("sand_ball"))
    // Basalz Powder
    event.remove({ output: TE("basalz_powder") })
    event.custom({
        "type": "thermal:pulverizer",
        "ingredient": { "item": "thermal:basalz_rod" },
        "energy": 800,
        "result": [
            { "item": "thermal:basalz_powder", "chance": 2.5 },
            { "item": "thermal:slag", "chance": 0.125 }
        ]
    })
    // Entropy manipulator (for blizz cubes)
    event.remove({ id: AE2("tools/misctools_entropy_manipulator") })
    event.shaped(AE2("entropy_manipulator"), [
        "S  ",
        " M ",
        "  M"
    ], {
        M: TE("lead_plate"),
        S: AE2("fluix_crystal")
    })
    // Blizz Powder
    event.remove({ output: TE("blizz_powder") })
    event.custom({
        "type": "thermal:pulverizer",
        "ingredient": { "item": "thermal:blizz_rod" },
        "energy": 800,
        "result": [
            { "item": "thermal:blizz_powder", "chance": 2.5 },
            { "item": "thermal:niter", "chance": 0.125 }
        ]
    })
    let blizz = TE("blizz_powder"); let basalz = TE("basalz_powder")
    // Crushing powder recipes
    event.recipes.createCrushing([Item.of(blizz, 1), Item.of(blizz, 1).withChance(.5)], TE("blizz_rod"))
    event.recipes.createCrushing([Item.of(basalz, 1), Item.of(basalz, 1).withChance(.5)], TE("basalz_rod"))
    // Ice and Earth Charges
    event.remove({ id: TE("ice_charge_3") })
    event.remove({ id: TE("earth_charge_3") })
    event.recipes.createCompacting(TE("ice_charge"), [blizz, blizz, blizz, blizz, blizz, blizz, blizz, blizz])
    event.recipes.createCompacting(TE("earth_charge"), [basalz, basalz, basalz, basalz, basalz, basalz, basalz, basalz])
    // Purified Sand
    thermalSmelter(event,
        [KJ("purified_sand")],
        [KJ("rough_sand"), TE("earth_charge")],
        5000)
    // Silicon Compound
    event.custom({
        "type": "create:compacting",
        "ingredients": [
            { "fluid": "kubejs:fine_sand", "amount": 500 },
            { "item": "kubejs:purified_sand" },
            { "item": "kubejs:coke_chunk" }
        ],
        "results": [
            { "item": "kubejs:silicon_compound" }
        ]
    })
    // Silicon
    thermalSmelter(event,
        [AE2("silicon")],
        [KJ("silicon_compound"), TE("ice_charge")],
        5000)
    event.remove({ output: AE2("silicon") })

    // Goodbye Inscriber
    event.remove({ id: AE2("network/blocks/inscribers") })
    event.remove({ type: AE2("inscriber") })
    // all gem melting recipes are automatically ported to megma crucible recipe in thermal.js
    // Printed Processors
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": { "item": AE2("calculation_processor_press") },
        "cast_consumed": false,
        "fluid": { "tag": "tconstruct:molten_copper", "amount": 90 },
        "result": { "item": AE2("printed_calculation_processor") },
        "cooling_time": 150
    })
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": { "item": AE2("logic_processor_press") },
        "cast_consumed": false,
        "fluid": { "tag": "tconstruct:molten_gold", "amount": 90 },
        "result": { "item": AE2("printed_logic_processor") },
        "cooling_time": 150
    })
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": { "item": AE2("engineering_processor_press") },
        "cast_consumed": false,
        "fluid": { "tag": "tconstruct:molten_diamond", "amount": 100 },
        "result": { "item": AE2("printed_engineering_processor") },
        "cooling_time": 150
    })
    // Chiller recipes for printed processors
    thermalChiller(event, AE2("printed_calculation_processor"), [Fluid.of("tconstruct:molten_copper", 90), AE2("calculation_processor_press")], 5000)
    thermalChiller(event, AE2("printed_logic_processor"), [Fluid.of("tconstruct:molten_gold", 90), AE2("logic_processor_press")], 5000)
    thermalChiller(event, AE2("printed_engineering_processor"), [Fluid.of("tconstruct:molten_diamond", 100), AE2("engineering_processor_press")], 5000)
    // Printed Silicon
    event.custom(ifiniDeploying(event, AE2("printed_silicon"), AE2("silicon"), AE2("silicon_press")))
    // Processors
    let processorTypes = ["calculation", "logic", "engineering"]
    processorTypes.forEach(e => {
        event.custom({
            "type": "create:sequenced_assembly",
            "ingredient": {
                "item": AE2("printed_silicon")
            },
            "loops": 1,
            "results": [
                {
                    "item": AE2(e + "_processor")
                }
            ],
            "sequence": [
                {
                    "type": "create:deploying",
                    "ingredients": [
                        {
                            "item": KJ("incomplete_" + e + "_processor")
                        },
                        {
                            "item": AE2("printed_" + e + "_processor")
                        }
                    ],
                    "results": [
                        {
                            "item": KJ("incomplete_" + e + "_processor")
                        }
                    ]
                },
                {
                    "type": "create:filling",
                    "ingredients": [
                        {
                            "item": KJ("incomplete_" + e + "_processor")
                        },
                        {
                            "fluid": TE("redstone"),
                            "amount": 250
                        }
                    ],
                    "results": [
                        {
                            "item": KJ("incomplete_" + e + "_processor")
                        }
                    ]
                },
                {
                    "type": "create:pressing",
                    "ingredients": [
                        {
                            "item": KJ("incomplete_" + e + "_processor")
                        }
                    ],
                    "results": [
                        {
                            "item": KJ("incomplete_" + e + "_processor")
                        }
                    ]
                }
            ],
            "transitionalItem": {
                "item": KJ("incomplete_" + e + "_processor")
            }
        }).id("kubejs:" + e + "_processor")
    })
    // Flash Drive
    event.shaped(KJ("flash_drive"), [
        "SCA"
    ], {
        A: TC("cobalt_ingot"),
        C: AE2("logic_processor"),
        S: MC("iron_ingot")
    })
    // Calculation Mechanisms
    transitional = KJ("incomplete_calculation_mechanism")
    event.recipes.createSequencedAssembly([
        KJ("calculation_mechanism"),
    ], KJ("inductive_mechanism"), [
        event.recipes.createDeploying(transitional, [transitional, AE2("printed_silicon")]),
        event.recipes.createDeploying(transitional, [transitional, AE2("printed_silicon")]),
        event.recipes.createDeploying(transitional, [transitional, KJ("#flash_drives")])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:calculation_mechanism")
    // Quartz Glass
    event.remove({ output: AE2("quartz_glass") })
    thermalSmelter(event, AE2("quartz_glass"), [[AE2("certus_quartz_dust"), TE("quartz_dust")]])
    // Fluix Crystals
    thermalSmelter(event, AE2("fluix_crystal", 2), [MC("quartz"), AE2("charged_certus_quartz_crystal"), MC("redstone")], 4000)
    // ME Controller
    event.remove({ output: AE2("controller") })
    donutCraft(event, AE2("controller"), KJ("fluix_casing"), KJ("calculation_mechanism"))
    // Machine Crafting
    fluixMachine(event, Item.of(AE2("condenser"), 1), AE2("fluix_pearl"))
    fluixMachine(event, Item.of(AE2("drive"), 1), AE2("engineering_processor"))
    fluixMachine(event, Item.of(AE2("formation_core"), 4), AE2("logic_processor"))
    fluixMachine(event, Item.of(AE2("annihilation_core"), 4), AE2("calculation_processor"))
    fluixMachine(event, Item.of(AE2("chest"), 1), MC("chest"))
    // Recipe Tweaks
    event.replaceInput({ type: "minecraft:crafting_shaped", id: /ae2:.*/ }, F("#ingots/iron"), TE("lead_plate"))
    event.replaceInput({ id: AE2("network/cells/item_storage_components_cell_1k_part") }, MC("redstone"), KJ("calculation_mechanism"))
    event.replaceInput({ id: AE2("network/cells/item_storage_components_cell_1k_part") }, AE2("logic_processor"), F("#dusts/redstone"))
    event.replaceInput({ id: AE2("network/cells/spatial_components") }, MC("glowstone_dust"), KJ("calculation_mechanism"))
    event.replaceInput({ id: AE2("network/cells/spatial_components") }, AE2("engineering_processor"), F("#dusts/glowstone"))
    event.replaceInput({ id: AE2("network/crafting/patterns_blank") }, MC("glowstone_dust"), KJ("calculation_mechanism"))

    // - - - - - Finale (Chapter 5) - - - - -
    // Chiller Casts
    event.remove({ id: TE("chiller_ball_cast") })
    event.remove({ id: TE("chiller_rod_cast") })
    event.remove({ id: TE("chiller_ingot_cast") })
    event.stonecutting(TE("chiller_ball_cast"), TE("nickel_plate"))
    event.stonecutting(TE("chiller_rod_cast"), TE("nickel_plate"))
    event.stonecutting(TE("chiller_ingot_cast"), TE("nickel_plate"))
    // Printable Integers and Operators
    let castTypes = ["three", "eight", "plus", "minus", "multiply", "divide"]
    castTypes.forEach(e => {
        event.stonecutting(KJ(e + "_cast"), TE("nickel_plate"))
        event.custom({
            "type": "tconstruct:casting_table",
            "cast": {
                "item": KJ(e + "_cast")
            },
            "fluid": {
                "name": "kubejs:raw_logic",
                "amount": 1
            },
            "result": Item.of(KJ(e)),
            "cooling_time": 10
        })
        event.custom({
            "type": "thermal:chiller",
            "ingredients": [
                Fluid.of(KJ("raw_logic"), 1).toJson(),
                Item.of(KJ(e + "_cast")).toJson()
            ],
            "result": [
                Item.of(KJ(e))
            ],
            "energy": 100,
        })
    })
    // Math Operations
    let nums = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    let ops = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b, (a, b) => b == 0 ? "error" : a / b]
    let opNames = ["plus", "minus", "multiply", "divide"]

    for (let a = 0; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
            for (let op = 0; op < ops.length; op++) {

                let result = ops[op](a, b)
                let output;

                if (result == "error")
                    output = KJ("missingno")
                else if (result < 0)
                    continue
                else if (result > 9)
                    continue
                else if (result % 1 != 0)
                    continue
                else
                    output = KJ(nums[result])

                event.custom({
                    "type": "create:mechanical_crafting",
                    "pattern": [
                        "AOB"
                    ],
                    "key": {
                        "A": {
                            "item": KJ(nums[a])
                        },
                        "O": {
                            "item": KJ(opNames[op])
                        },
                        "B": {
                            "item": KJ(nums[b])
                        }
                    },
                    "result": {
                        "item": output
                    },
                    "acceptMirrored": false
                })

                event.custom({
                    "type": "create:mechanical_crafting",
                    "pattern": [
                        "A",
                        "O",
                        "B"
                    ],
                    "key": {
                        "A": {
                            "item": KJ(nums[a])
                        },
                        "O": {
                            "item": KJ(opNames[op])
                        },
                        "B": {
                            "item": KJ(nums[b])
                        }
                    },
                    "result": {
                        "item": output
                    },
                    "acceptMirrored": false
                })

            }
        }
    }
    // Digit Melting
    let meltOrCrucible = (id, out, outAmount) => {
        thermalCrucible(event, Fluid.of(out, outAmount), [id], 20)
        event.custom({
            "type": "tconstruct:melting",
            "ingredient": { "item": id },
            "result": {
                "fluid": out,
                "amount": outAmount
            },
            "temperature": 200,
            "time": 20
        })
    }
    meltOrCrucible(KJ("calculation_mechanism"), KJ("raw_logic"), 30)
    meltOrCrucible(KJ("zero"), KJ("number_0"), 1)
    meltOrCrucible(KJ("one"), KJ("number_1"), 1)
    meltOrCrucible(KJ("two"), KJ("number_2"), 1)
    meltOrCrucible(KJ("three"), KJ("number_3"), 1)
    meltOrCrucible(KJ("four"), KJ("number_4"), 1)
    meltOrCrucible(KJ("five"), KJ("number_5"), 1)
    meltOrCrucible(KJ("six"), KJ("number_6"), 1)
    meltOrCrucible(KJ("seven"), KJ("number_7"), 1)
    meltOrCrucible(KJ("eight"), KJ("number_8"), 1)
    meltOrCrucible(KJ("nine"), KJ("number_9"), 1)
    // Liquid Matrix
    let alloyAmount = 10
    let outAmount = 50
    event.custom({
        "type": "tconstruct:alloy",
        "inputs": [
            { "name": "kubejs:number_0", "amount": alloyAmount },
            { "name": "kubejs:number_1", "amount": alloyAmount },
            { "name": "kubejs:number_2", "amount": alloyAmount },
            { "name": "kubejs:number_3", "amount": alloyAmount },
            { "name": "kubejs:number_4", "amount": alloyAmount },
            { "name": "kubejs:number_5", "amount": alloyAmount },
            { "name": "kubejs:number_6", "amount": alloyAmount },
            { "name": "kubejs:number_7", "amount": alloyAmount },
            { "name": "kubejs:number_8", "amount": alloyAmount },
            { "name": "kubejs:number_9", "amount": alloyAmount }
        ],
        "result": {
            "fluid": "kubejs:matrix",
            "amount": outAmount
        },
        "temperature": 200
    })
    // Computation Matrix
    event.custom({
        "type": "tconstruct:casting_basin",
        "fluid": {
            "name": "kubejs:matrix",
            "amount": 1000
        },
        "result": Item.of(KJ("computation_matrix")),
        "cooling_time": 20
    })

    //	Remove all the recipes we don't want from Ad Astra
    //	We're in an awkward situation where we want half of the recipes and don't want the other half
    let begoneEarth = [
        "nasa_workbenching/tier1", "nasa_workbenching/tier2", "nasa_workbenching/tier3", "nasa_workbenching/tier4", "rover",
        "oxygen_mask", "space_suit", "space_leggings", "space_boots",
        "hammer", "iron_stick", "oxygen_gear", "oxygen_tank", "wheel", "engine_frame", "engine_fan", "rocket_nose_cone",
        "iron_engine", "gold_engine", "diamond_engine", "calorite_engine",
        "iron_tank", "gold_tank", "diamond_tank", "calorite_tank",
        "rocket_fin", "iron_plate", "desh_plate",
        "rocket_launch_pad", "nasa_workbench",
        "solar_panel", "coal_generator", "compressor", "fuel_refinery", "oxygen_loader", "oxygen_distributer", "water_pump"
    ]
    begoneEarth.forEach(begone => { event.remove({ output: AA(begone) }) })
    // Matter Plastics
    event.recipes.createCompacting(KJ("matter_plastics"), [AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball")]).superheated()
    // Saves a lot of code to reuse an object with the materials here
    let materials = {
        A: KJ("matter_plastics"),
        M: AE2("controller"),
        G: TE("diamond_gear"),
        S: KJ("computation_matrix")
    }
    // Navigation Computer
    event.recipes.createMechanicalCrafting("kubejs:navigation_computer", [
        "AAAAA",
        "ASSSA",
        "GS SG",
        "ASSSA",
        "AAMAA"
    ], materials)
    // Oxygen Loader
    materials.S = MC("bucket")
    event.recipes.createMechanicalCrafting("ad_astra:oxygen_loader", [
        "AAA",
        "GSG",
        "AMA"
    ], materials)
    // Oxygen Bubble Distributor
    materials.S = CR("propeller")
    event.recipes.createMechanicalCrafting("ad_astra:oxygen_distributor", [
        "AAA",
        "GSG",
        "AMA"
    ], materials)
    // Lander Deployer
    materials.S = CR("empty_schematic")
    event.recipes.createMechanicalCrafting("kubejs:lander_deployer", [
        "AAA",
        "GSG",
        "AMA"
    ], materials)

    // Space Suit.
    let pattern = [
        " A ",
        "GSG",
        " A "
    ];

    materials = {
        A: KJ("matter_plastics"),
        G: F("#plates/gold"),
        S: MC("iron_chestplate")
    }
    // chestplate
    event.recipes.createMechanicalCrafting("ad_astra:space_suit", pattern, materials)
    // helmet
    materials.S = MC("iron_helmet")
    event.recipes.createMechanicalCrafting("ad_astra:space_helmet", pattern, materials)
    // leggings
    materials.S = MC("iron_leggings")
    event.recipes.createMechanicalCrafting("ad_astra:space_pants", pattern, materials)
    // boots
    materials.S = MC("iron_boots")
    event.recipes.createMechanicalCrafting("ad_astra:space_boots", pattern, materials)

    // Rocket Launch Pad
    createMachine(AP("heavy_stone_bricks"), event, Item.of("ad_astra:launch_pad"), KJ("matter_plastics"))

    //	oil refining
    event.custom({
        "type": "thermal:refinery",
        "ingredient": { "fluid": "kubejs:crude_oil", "amount": 100 },
        "result": [
            { "fluid": "thermal:heavy_oil", "amount": 40 },
            { "fluid": "thermal:light_oil", "amount": 60 },
            { "item": "thermal:bitumen", "chance": 0.10 }
        ],
        "energy": 6000
    })
    event.custom({
        "type": "thermal:refinery",
        "ingredient": { "fluid": "ad_astra:oil", "amount": 100 },
        "result": [
            { "fluid": "thermal:heavy_oil", "amount": 40 },
            { "fluid": "thermal:light_oil", "amount": 60 },
            { "item": "thermal:bitumen", "chance": 0.10 }
        ],
        "energy": 6000
    })
    // Rocket Fuel
    event.custom({
        "type": "create:mixing",
        "heatRequirement": "heated",
        "ingredients": [
            { "fluid": "thermal:refined_fuel", "amount": 30 },
            { "fluid": "thermal:heavy_oil", "amount": 20 }
        ],
        "results": [
            { "fluid": "ad_astra:fuel", "amount": 2 }
        ]
    })

    // The Rocket
    event.recipes.createMechanicalCrafting("ad_astra:tier_1_rocket", [
        "    I    ",
        "   IPI   ",
        "   IGI   ",
        "   IGI   ",
        "  IPNPI  ",
        "  IPLPI  ",
        " IPPPPPI ",
        "  IIIII  ",
        "  C C C  "
    ], {
        I: "minecraft:iron_block",
        P: "create:iron_sheet",
        G: "#forge:glass_panes/colorless",
        N: "kubejs:navigation_computer",
        L: "kubejs:lander_deployer",
        C: "thermal:dynamo_compression"
    })
})
