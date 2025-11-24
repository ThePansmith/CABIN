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
        // Some mods name their wood slabs 'planks_slab' for some reason
        // Mods that do this don't get given auto-generated slab cutting recipes by Create
        if (!Item.exists(wood + "_slab")) {
            let planks = wood + "_planks"
            let slab = wood + "_planks_slab"
            event.recipes.create.cutting(Item.of(slab, 2), planks).processingTime(150).id(`kubejs:cutting/${wood.split(":")[1]}_slab`)
        }
    }
    wood_types.forEach(plankCutting)

    // Remove andesite recipe (and granite and diorite)
    event.remove({ id: "minecraft:diorite" })
    event.remove({ id: "minecraft:andesite" })
    event.remove({ id: "minecraft:granite" })
    // algal blend
    event.remove({ id: "architects_palette:algal_blend" })
    event.shaped(Item.of("architects_palette:algal_blend", 4), [
        "SS",
        "AA"
    ], {
        A: "minecraft:clay_ball",
        S: ["minecraft:kelp", "minecraft:seagrass"]
    })
    event.shaped(Item.of("architects_palette:algal_blend", 4), [
        "AA",
        "SS"
    ], {
        A: "minecraft:clay_ball",
        S: ["minecraft:kelp", "minecraft:seagrass"]
    })
    event.recipes.create.mixing(Item.of("architects_palette:algal_blend", 2), ["minecraft:clay_ball", ["minecraft:kelp", "minecraft:seagrass"]])
    // algal brick
    event.remove({ output: "architects_palette:algal_brick" })
    event.smelting("architects_palette:algal_brick", "architects_palette:algal_blend").xp(0).cookingTime(120)
    // Andesite alloy
    event.remove({ id: "tconstruct:compat/create/andesite_alloy_iron" })
    event.remove({ id: "create:crafting/materials/andesite_alloy" })
    event.remove({ id: "create:crafting/materials/andesite_alloy_from_zinc" })
    event.remove({ id: "create:mixing/andesite_alloy" })
    event.remove({ id: "create:mixing/andesite_alloy_from_zinc" })
    event.remove({ id: "thermal:compat/create/smelter_create_alloy_andesite_alloy" })
    event.remove({ id: "thermal:compat/create/smelter_create_alloy_andesite_alloy" })
    event.remove({ id: "tconstruct:compat/create/andesite_alloy_zinc" })
    event.remove({ id: "tconstruct:compat/create/andesite_alloy_iron" })
    event.shaped(Item.of("create:andesite_alloy", 2), [
        "SS",
        "AA"
    ], {
        A: "minecraft:andesite",
        S: "architects_palette:algal_brick"
    })
    event.shaped(Item.of("create:andesite_alloy", 2), [
        "AA",
        "SS"
    ], {
        A: "minecraft:andesite",
        S: "architects_palette:algal_brick"
    })
    event.recipes.create.mixing(Item.of("create:andesite_alloy", 2), ["architects_palette:algal_brick", "minecraft:andesite"])
    // kinetic assembly
    transitional = "kubejs:incomplete_kinetic_mechanism"
    event.recipes.create.sequenced_assembly([
        "kubejs:kinetic_mechanism",
    ], "#minecraft:wooden_slabs", [
        event.recipes.create.deploying(transitional, [transitional, "create:andesite_alloy"]),
        event.recipes.create.deploying(transitional, [transitional, "create:andesite_alloy"]),
        event.recipes.create.deploying(transitional, [transitional, "#kubejs:saws"])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:kinetic_mechanism")
    // Handcrafting recipe
    event.shapeless("kubejs:kinetic_mechanism", ["#kubejs:saws", "create:cogwheel", "create:andesite_alloy", "#minecraft:logs"]).id("kubejs:kinetic_mechanism_manual_only")

    // Andesite machines
    donutCraft(event, "kubejs:andesite_machine", "create:andesite_casing", "kubejs:kinetic_mechanism")
    // secondary materials
    event.replaceInput({ id: "create:crafting/kinetics/brass_hand" }, "#forge:plates/brass", "create:golden_sheet")
    event.remove({ output: "thermal:drill_head" })
    event.shaped("thermal:drill_head", [
        "NN ",
        "NLP",
        " PL"
    ], {
        N: "minecraft:iron_nugget",
        P: "create:iron_sheet",
        L: "thermal:lead_ingot"
    })

    event.remove({ output: "thermal:saw_blade" })
    event.shaped("thermal:saw_blade", [
        "NPN",
        "PLP",
        "NPN"
    ], {
        N: "minecraft:iron_nugget",
        P: "create:iron_sheet",
        L: "thermal:lead_ingot"
    })

    // Machine Crafting
    andesiteMachine(event, Item.of("create:portable_storage_interface", 2))
    andesiteMachine(event, Item.of("create:encased_fan", 1), "create:propeller")
    andesiteMachine(event, Item.of("create:mechanical_press", 1), "minecraft:iron_block")
    andesiteMachine(event, Item.of("mbd2:strainer", 1), "minecraft:iron_bars")
    andesiteMachine(event, Item.of("create:mechanical_mixer", 1), "create:whisk")
    andesiteMachine(event, Item.of("create:mechanical_drill", 1), "thermal:drill_head")
    andesiteMachine(event, Item.of("create:mechanical_saw", 1), "thermal:saw_blade")
    if (Platform.isLoaded("createdeco")) { andesiteMachine(event, Item.of("create:mechanical_roller", 1), "createdeco:andesite_hull") } else { andesiteMachine(event, Item.of("create:mechanical_roller", 1), "create:andesite_alloy_block") }
    if (Platform.isLoaded("rechiseledcreate")) { andesiteMachine(event, Item.of("rechiseledcreate:mechanical_chisel", 1), "rechiseled:chisel") }
    andesiteMachine(event, Item.of("create:deployer", 1), "create:brass_hand")
    andesiteMachine(event, Item.of("create:mechanical_harvester", 2))
    andesiteMachine(event, Item.of("create:mechanical_plough", 2))
    andesiteMachine(event, Item.of("create:contraption_controls", 1))
    andesiteMachine(event, Item.of("thermal:device_tree_extractor", 1), "minecraft:bucket")
    andesiteMachine(event, Item.of("ae2:meteorite_compass", 1), "minecraft:compass")
    andesiteMachine(event, Item.of("ae2:charger", 1), "ae2:certus_quartz_crystal")
    andesiteMachine(event, Item.of("thermal:dynamo_stirling", 1), "thermal:rf_coil")
    andesiteMachine(event, Item.of("create:andesite_funnel", 4))
    andesiteMachine(event, Item.of("create:andesite_tunnel", 4))
    andesiteMachine(event, Item.of("kubejs:pipe_module_utility", 4))
    // Gourmand Upgrade
    createMachine("thermal:dynamo_stirling", event, "thermal:dynamo_gourmand", "minecraft:golden_carrot")
    createMachine("thermal:dynamo_stirling", event, "thermal:dynamo_gourmand", "minecraft:golden_apple")

    // - - - - - Chapter 1A - - - - -
    event.remove({ type: "thermal:tree_extractor" })
    wood_types.forEach(wood => {
        if (Item.exists(wood + "_log") && Item.exists(wood + "_leaves") && Item.exists(wood + "_sapling")) {
            addTreeOutput(event, wood + "_log", wood + "_leaves").id("kubejs:devices/tree_extractor/tree_extractor_" + wood.split(":")[1])
        }
    })
    // addTreeOutput( "tconstruct:greenheart_log", "tconstruct:earth_slime_leaves", {fluid: "tconstruct:earth_slime", amount: 10})
    // addTreeOutput( "tconstruct:skyroot_log", "tconstruct:sky_slime_leaves", {fluid: "tconstruct:sky_slime", amount: 10})

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
    event.remove({ id: "create:crafting/kinetics/belt_connector" })
    event.shaped(Item.of("create:belt_connector", 3), [
        "SSS",
        "SSS"
    ], {
        S: "thermal:cured_rubber"
    })

    // Sealed mechanism assembly
    transitional = "kubejs:incomplete_sealed_mechanism"
    event.recipes.create.sequenced_assembly([
        "kubejs:sealed_mechanism",
    ], "kubejs:kinetic_mechanism", [
        event.recipes.create.deploying(transitional, [transitional, "thermal:cured_rubber"]),
        event.recipes.create.deploying(transitional, [transitional, "thermal:cured_rubber"]),
        event.recipes.create.pressing(transitional, [transitional])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:sealed_mechanism")
    // manual crafting
    event.shaped("kubejs:sealed_mechanism", [
        "SCS"
    ], {
        C: "kubejs:kinetic_mechanism",
        S: "thermal:cured_rubber"
    }).id("kubejs:sealed_mechanism_manual_only")

    // Copper Machines
    donutCraft(event, "kubejs:copper_machine", "create:copper_casing", "kubejs:sealed_mechanism")

    // Machine Crafting
    copperMachine(event, Item.of("create:copper_backtank", 1), "minecraft:copper_block")
    copperMachine(event, Item.of("create:portable_fluid_interface", 2))
    copperMachine(event, Item.of("create:spout", 1), "minecraft:hopper")
    copperMachine(event, Item.of("thermal:upgrade_augment_1", 1), "minecraft:redstone")
    copperMachine(event, Item.of("create:hose_pulley", 1))
    copperMachine(event, Item.of("create:item_drain", 1), "minecraft:iron_bars")
    copperMachine(event, Item.of("thermal:dynamo_magmatic", 1), "thermal:rf_coil")
    copperMachine(event, Item.of("thermal:device_water_gen", 1), "minecraft:bucket")
    copperMachine(event, Item.of("create:smart_fluid_pipe", 2))
    copperMachine(event, Item.of("kubejs:attachment_base", 1), "create:mechanical_pump")
    // smeltery controller recipe
    event.remove({ id: "tconstruct:smeltery/casting/seared/smeltery_controller" })
    event.remove({ id: "tconstruct:smeltery/melting/metal/copper/smeltery_controller" })
    donutCraft(event, "tconstruct:smeltery_controller", "#tconstruct:seared_blocks", "kubejs:sealed_mechanism").modifyResult((grid, result) => {
        let item = grid.find("#tconstruct:seared_blocks")
        return result.withNBT({ texture: item.id })
    })

    // - - - - - Chapter 1B - - - - -
    // Sturdy sheets are not used. It is replaced by reinforced mechanisms
    event.remove({ id: "create:sequenced_assembly/sturdy_sheet" })
    // Magma blocks
    event.blasting("minecraft:magma_block", "minecraft:deepslate")
    // Magma to obsidian is a vanilla create recipe
    // reinforced mechanism assembly
    transitional = "kubejs:incomplete_reinforced_mechanism"
    event.recipes.create.sequenced_assembly([
        "kubejs:reinforced_mechanism",
    ], "kubejs:kinetic_mechanism", [
        event.recipes.create.deploying(transitional, [transitional, "minecraft:obsidian"]),
        event.recipes.create.deploying(transitional, [transitional, "minecraft:obsidian"]),
        event.recipes.create.pressing(transitional, [transitional])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:reinforced_mechanism")
    // manual crafting
    event.shaped("kubejs:reinforced_mechanism", [
        "OCO"
    ], {
        C: "kubejs:kinetic_mechanism",
        O: "minecraft:obsidian"
    }).id("kubejs:reinforced_mechanism_manual_only")
    // Gold machine
    donutCraft(event, "kubejs:gold_machine", "create:railway_casing", "kubejs:reinforced_mechanism")

    // Machine Crafting
    goldMachine(event, Item.of("create:controls", 1), "minecraft:lever")
    goldMachine(event, Item.of("create:track_station", 2))
    goldMachine(event, Item.of("create:track_signal", 4))
    goldMachine(event, Item.of("create:schedule", 4))
    goldMachine(event, Item.of("create:track_observer", 2))

    if (Platform.isLoaded("railways")) {
        goldMachine(event, Item.of("railways:semaphore", 4))
        goldMachine(event, Item.of("railways:conductor_whistle", 4))
        goldMachine(event, Item.of("railways:track_coupler", 2))
        goldMachine(event, Item.of("railways:portable_fuel_interface", 2))
        goldMachine(event, Item.of("railways:track_switch_andesite", 1), "create:andesite_alloy")
        goldMachine(event, Item.of("railways:track_switch_brass", 1), "create:brass_ingot")
        goldMachine(event, Item.of("railways:fuel_tank", 1), "create:fluid_tank")
    }

    // - - - - - Chapter 2 - - - - -
    event.remove({ id: "create:milling/compat/ae2/sky_stone_block" })
    event.remove({ id: "create:milling/compat/ae2/nether_quartz" })
    event.remove({ id: "create:milling/compat/ae2/certus_quartz" })
    event.remove({ id: "create:crafting/materials/electron_tube" })
    event.remove({ id: "create:crafting/materials/rose_quartz" })
    event.remove({ id: "create:sandpaper_polishing/rose_quartz" })
    event.remove({ id: "create:sandpaper_polishing/rose_quartz" })

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

        redstoneTransmute("minecraft:cobblestone", "minecraft:netherrack")
        redstoneTransmute("minecraft:sand", "minecraft:red_sand")
    }

    // Infinite Sky Stone

    event.recipes.create.milling(["ae2:sky_dust", "ae2:sky_stone_block"], "ae2:sky_stone_block").processingTime(1000)

    // Infinite Certus Quartz
    event.shapeless("2x kubejs:certus_crystal_seed", ["ae2:certus_quartz_dust", "#minecraft:sand"])
    event.remove({ id: "ae2:transform/certus_quartz_crystals" })
    event.recipes.create.milling(["ae2:certus_quartz_dust"], "#ae2:all_certus_quartz").processingTime(200)
    event.recipes.create.milling(["thermal:quartz_dust"], "minecraft:quartz").processingTime(200)

    event.recipes.create.mechanical_crafting(Item.of("kubejs:certus_crystal_seed", 2), ["A"], { A: "ae2:certus_quartz_crystal" })
    event.recipes.create.mechanical_crafting(Item.of("kubejs:fluix_crystal_seed", 2), ["A"], { A: "ae2:fluix_crystal" })

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
    grow("kubejs:certus_crystal_seed", "kubejs:growing_certus_seed", "kubejs:tiny_certus_crystal")
    grow("kubejs:fluix_crystal_seed", "kubejs:growing_fluix_seed", "kubejs:tiny_fluix_crystal")
    grow("kubejs:tiny_certus_crystal", "kubejs:growing_tiny_certus_crystal", "kubejs:small_certus_crystal")
    grow("kubejs:tiny_fluix_crystal", "kubejs:growing_tiny_fluix_crystal", "kubejs:small_fluix_crystal")
    grow("kubejs:small_certus_crystal", "kubejs:growing_small_certus_crystal", "ae2:certus_quartz_crystal")
    grow("kubejs:small_fluix_crystal", "kubejs:growing_small_fluix_crystal", "ae2:fluix_crystal")

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
    event.shapeless("create:rose_quartz", [["minecraft:quartz", "ae2:certus_quartz_crystal", "ae2:charged_certus_quartz_crystal"], "minecraft:redstone", "minecraft:redstone", "minecraft:redstone", "minecraft:redstone"])
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
    event.remove({ id: "create:sequenced_assembly/precision_mechanism" })
    transitional = "create:incomplete_precision_mechanism"
    event.recipes.create.sequenced_assembly([
        "create:precision_mechanism",
    ], "kubejs:kinetic_mechanism", [
        event.recipes.create.deploying(transitional, [transitional, "create:electron_tube"]),
        event.recipes.create.deploying(transitional, [transitional, "create:electron_tube"]),
        event.recipes.create.deploying(transitional, [transitional, "#kubejs:screwdrivers"])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:precision_mechanism")

    // Brass Machines
    donutCraft(event, "kubejs:brass_machine", "create:brass_casing", "create:precision_mechanism")

    // Machine Crafting
    brassMachine(event, Item.of("create:mechanical_crafter", 3), "minecraft:crafting_table")
    brassMachine(event, Item.of("create:sequenced_gearshift", 2))
    brassMachine(event, Item.of("create:steam_engine", 1))
    brassMachine(event, Item.of("create:rotation_speed_controller", 1))
    brassMachine(event, Item.of("create:mechanical_arm", 1))
    brassMachine(event, Item.of("create:stockpile_switch", 2))
    brassMachine(event, Item.of("create:content_observer", 2))
    brassMachine(event, Item.of("thermal:machine_press", 1), "minecraft:dropper")
    brassMachine(event, Item.of("torchmaster:feral_flare_lantern", 1), "minecraft:glowstone_dust")
    brassMachine(event, Item.of("thermal:dynamo_numismatic", 1), "thermal:rf_coil")
    brassMachine(event, Item.of("create:brass_funnel", 4))
    brassMachine(event, Item.of("create:brass_tunnel", 4))
    brassMachine(event, Item.of("create:elevator_pulley", 1))
    brassMachine(event, Item.of("kubejs:pipe_module_tier_1", 4))
    // Lapidary Upgrade
    createMachine("thermal:dynamo_numismatic", event, Item.of("thermal:dynamo_lapidary", 1), "thermal:lapis_gear")

    // - - - - - Chapter 2A - - - - -
    // Vine Transmutation
    donutCraft(event, "minecraft:weeping_vines", "occultism:spirit_attuned_gem", "minecraft:twisting_vines")
    donutCraft(event, "minecraft:twisting_vines", "occultism:spirit_attuned_gem", "minecraft:weeping_vines")
    // Liquid soul sand
    event.remove({ id: "tconstruct:smeltery/melting/soul/sand" })
    event.recipes.create.mixing(Fluid.of("tconstruct:liquid_soul", 500), ["minecraft:twisting_vines", "minecraft:weeping_vines"]).heated()

    // Infernal Mechanisms
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": "create:precision_mechanism" },
        "loops": 1,
        "results": [
            { "item": "kubejs:infernal_mechanism" }
        ],
        "sequence": [
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_infernal_mechanism" },
                    { "fluid": "tconstruct:liquid_soul", "amount": 500 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_infernal_mechanism" }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_infernal_mechanism" },
                    { "fluid": "minecraft:lava", "amount": 1000 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_infernal_mechanism" }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_infernal_mechanism" },
                    { "fluid": "minecraft:lava", "amount": 1000 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_infernal_mechanism" }
                ]
            },
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_infernal_mechanism" },
                    { "fluid": "minecraft:lava", "amount": 1000 }
                ],
                "results": [
                    { "item": "kubejs:incomplete_infernal_mechanism" }
                ]
            }
        ],
        "transitionalItem": { "item": "kubejs:incomplete_infernal_mechanism" }
    }).id("kubejs:infernal_mechanism")

    // Zinc Machines
    donutCraft(event, "kubejs:zinc_machine", "kubejs:zinc_casing", "kubejs:infernal_mechanism")
    // Machine Crafting
    zincMachine(event, Item.of("thermal:device_rock_gen", 1), "minecraft:piston")
    zincMachine(event, Item.of("thermal:device_collector", 1), "minecraft:ender_pearl")
    zincMachine(event, Item.of("thermal:device_nullifier", 1), "minecraft:lava_bucket")
    zincMachine(event, Item.of("thermal:device_potion_diffuser", 1), "minecraft:glass_bottle")
    zincMachine(event, Item.of("torchmaster:megatorch", 1), "minecraft:torch")
    zincMachine(event, Item.of("thermal:upgrade_augment_2", 1), "minecraft:redstone")
    // Foundry Controller Recipe
    event.remove({ id: "tconstruct:smeltery/casting/scorched/foundry_controller" })
    event.remove({ id: "tconstruct:smeltery/melting/obsidian/foundry_controller" })
    donutCraft(event, "tconstruct:foundry_controller", "#tconstruct:scorched_blocks", "kubejs:infernal_mechanism").modifyResult((grid, result) => {
        let item = grid.find("#tconstruct:scorched_blocks")
        return result.withNBT({ texture: item.id })
    })

    // - - - - - Chapter 2b - - - - -

    // Logistic Mechanisms

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

    function logisticMechanismRecipe(event, fluidType, recipeId) {
        event.custom({
            type: "create:sequenced_assembly",
            ingredient: { item: "create:precision_mechanism" },
            loops: 4,
            results: [
                { item: "kubejs:logistic_mechanism" }
            ],
            sequence: [
                {
                    type: "create:filling",
                    ingredients: [
                        { item: "kubejs:incomplete_logistic_mechanism" },
                        { fluid: "create:potion", nbt: { Bottle: "REGULAR", Potion: "kubejs:haste" }, amount: 125 }
                    ],
                    results: [{ item: "kubejs:incomplete_logistic_mechanism" }]
                },
                {
                    type: "create:filling",
                    ingredients: [
                        { item: "kubejs:incomplete_logistic_mechanism" },
                        { fluid: "kubejs:liquid_pulp", amount: 30 }
                    ],
                    results: [{ item: "kubejs:incomplete_logistic_mechanism" }]
                },
                {
                    type: "create:filling",
                    ingredients: [
                        { item: "kubejs:incomplete_logistic_mechanism" },
                        { fluid: "kubejs:liquid_pulp", amount: 30 }
                    ],
                    results: [{ item: "kubejs:incomplete_logistic_mechanism" }]
                },
                {
                    type: "create:filling",
                    ingredients: [
                        { item: "kubejs:incomplete_logistic_mechanism" },
                        { fluid: "kubejs:liquid_pulp", amount: 30 }
                    ],
                    results: [{ item: "kubejs:incomplete_logistic_mechanism" }]
                }
            ],
            transitionalItem: { item: "kubejs:incomplete_logistic_mechanism" }
        }).id(recipeId);
    }

    // Usage:
    logisticMechanismRecipe(event, "create:potion", "kubejs:logistic_mechanism");
    logisticMechanismRecipe(event, "tconstruct:potion", "kubejs:logistic_mechanism_duplicate");
    logisticMechanismRecipe(event, "cofh_core:potion", "kubejs:logistic_mechanism_duplicate_2");


    donutCraft(event, "kubejs:lead_machine", "kubejs:lead_casing", "kubejs:logistic_mechanism")

    leadMachine(event, Item.of("create:package_frogport", 1), "#forge:slimeballs")
    leadMachine(event, Item.of("create:packager", 1), "create:cardboard_block")
    leadMachine(event, Item.of("create:repackager", 1), "create:bound_cardboard_block")
    leadMachine(event, Item.of("create:redstone_requester", 1), "create:stock_link")
    leadMachine(event, Item.of("create:factory_gauge", 2))

    // Stock Link Recipe
    event.replaceInput({ id: "create:crafting/logistics/stock_link" }, "create:item_vault", "kubejs:lead_casing")

    // - - - - - Chapter 3 - - - - -
    // Fern Transmutation
    let fern1 = "kubejs:ender_slimy_fern_leaf"
    let fern2 = "kubejs:sky_slimy_fern_leaf"
    let fern3 = "kubejs:earth_slimy_fern_leaf"
    event.shapeless(fern1, ["occultism:spirit_attuned_gem", fern2, fern2, fern2, fern2, fern3, fern3, fern3, fern3])
    event.shapeless(fern2, ["occultism:spirit_attuned_gem", fern3, fern3, fern3, fern3, fern1, fern1, fern1, fern1])
    event.shapeless(fern3, ["occultism:spirit_attuned_gem", fern2, fern2, fern2, fern2, fern1, fern1, fern1, fern1])
    // Fern Cutting
    let chop = (type, output) => {
        let fern = `tconstruct:${type}_slime_fern`
        let leaf = `kubejs:${type}_slimy_fern_leaf`
        let paste = `kubejs:${type}_slime_fern_paste`
        event.custom({
            "type": "farmersdelight:cutting",
            "ingredients": [{ "item": fern }],
            "tool": { "tag": "forge:tools/knives" },
            "result": [Item.of(leaf, 2)]
        }).id(`kubejs:cutting/${type}_slime_fern_leaf`)
        event.custom(ifiniDeploying(event, Item.of(leaf, 2), fern, "#forge:tools/knives")).id(`kubejs:deploying/${type}_slime_fern_leaf_using_deployer`)
        event.custom({
            "type": "occultism:spirit_fire",
            "ingredient": { "item": leaf },
            "result": { "item": fern }
        })
        event.recipes.create.milling([paste], leaf)
        event.campfireCooking(output, paste).cookingTime(300)
    }
    chop("earth", "minecraft:gunpowder")
    chop("sky", "minecraft:bone_meal")
    chop("ender", "ae2:ender_dust")
    // Crushing Wheel Recipe... Does this belong with chapter 2?
    event.remove({ id: "create:mechanical_crafting/crushing_wheel" })
    event.recipes.create.mechanical_crafting(Item.of("create:crushing_wheel", 2), [
        " AAA ",
        "AABAA",
        "ABBBA",
        "AABAA",
        " AAA "
    ], {
        A: "#forge:cobblestone",
        B: "minecraft:stick"
    })
    // Singularties
    event.recipes.create.crushing([Item.of("ae2:singularity").withChance(1)], "create:crushing_wheel").processingTime(250)
    // Quantum Entangled Singularties are from ae2
    // Dye Entangled Singularties
    let dyes = ["minecraft:orange_dye", "minecraft:magenta_dye", "minecraft:light_blue_dye", "minecraft:yellow_dye", "minecraft:lime_dye", "minecraft:pink_dye", "minecraft:cyan_dye", "minecraft:purple_dye", "minecraft:blue_dye", "minecraft:brown_dye", "minecraft:green_dye", "minecraft:red_dye"]
    event.recipes.create.compacting("1x " + "kubejs:dye_entangled_singularity", [dyes, Item.of("ae2:quantum_entangled_singularity", 1)])
    // The mysterious conversion jei entry for entangled singularities has been moved moved to client scripts
    // Paint Balls
    event.remove({ id: /ae2:tools\/paintballs.*/ })
    event.recipes.create.crushing([
        Item.of("ae2:red_paint_ball", 1).withChance(.90),
        Item.of("ae2:yellow_paint_ball", 1).withChance(.80),
        Item.of("ae2:green_paint_ball", 1).withChance(.70),
        Item.of("ae2:blue_paint_ball", 1).withChance(.60),
        Item.of("ae2:magenta_paint_ball", 1).withChance(.50)],
    "kubejs:dye_entangled_singularity").processingTime(50)
    // Paint Ball Depleting
    let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
    for (let index = 0; index < colors.length; index++) {
        let element = colors[index];
        if (index == colors.length - 1)
            continue;
        event.recipes.create.emptying([`ae2:${colors[index + 1]}_paint_ball`, Fluid.of("kubejs:chromatic_waste", 250)], `ae2:${element}_paint_ball`)
    }
    // Chromatic Compound
    event.recipes.create.mechanical_crafting("create:chromatic_compound", [
        "AA",
        "AA"
    ], {
        A: "ae2:magenta_paint_ball"
    })
    // Easy Torch Recipe for those who can't afford beacons
    event.campfireCooking("minecraft:torch", "minecraft:stick").cookingTime(20)
    // Radiant Coils
    event.recipes.create.pressing("kubejs:radiant_sheet", "create:refined_radiance")
    event.recipes.create.mechanical_crafting("kubejs:radiant_coil", ["A"], { A: "kubejs:radiant_sheet" })
    // Chromatic Resonator
    event.shaped("kubejs:chromatic_resonator", [
        " R ",
        "R S",
        "LS "
    ], {
        R: "thermal:ruby",
        L: "thermal:lead_ingot",
        S: "thermal:sapphire"
    })
    // Inductive Mechanisms
    transitional = "kubejs:incomplete_inductive_mechanism"
    event.recipes.create.sequenced_assembly([
        "kubejs:inductive_mechanism",
    ], "create:precision_mechanism", [
        event.recipes.create.deploying(transitional, [transitional, "kubejs:radiant_coil"]),
        event.recipes.create.deploying(transitional, [transitional, "kubejs:radiant_coil"]),
        event.recipes.create.deploying(transitional, [transitional, "#kubejs:chromatic_resonators"])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:inductive_mechanism")
    // Invar line is included in metallury.js
    // Invar Machines
    event.remove({ output: "thermal:machine_frame" })
    donutCraft(event, "thermal:machine_frame", "kubejs:invar_casing", "kubejs:inductive_mechanism")
    // Machine Crafting
    invarMachine(event, Item.of("thermal:dynamo_compression", 1), "thermal:rf_coil")
    invarMachine(event, Item.of("kubejs:pipe_module_tier_2", 4))
    // Disenchantment Upgrade
    createMachine("thermal:dynamo_compression", event, Item.of("thermal:dynamo_disenchantment", 1), "occultism:spirit_attuned_gem")
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
    event.recipes.thermal.smelter("thermal:enderium_ingot", ["#forge:ingots/silver", "minecraft:chorus_fruit", "minecraft:ender_pearl"], 0, 10000)
    event.recipes.thermal.smelter("thermal:enderium_ingot", ["#forge:ingots/silver", "minecraft:chorus_fruit", Item.of("ae2:ender_dust", 4)], 0, 10000)
    // Abstruse Mechanisms
    event.recipes.thermal.smelter("kubejs:abstruse_mechanism", ["kubejs:inductive_mechanism", "thermal:enderium_ingot"], 0, 2000)
    // Ender Slime Ball?
    event.recipes.create.mixing(["tconstruct:ender_slime_ball"], ["minecraft:chorus_fruit", "#forge:slimeballs"])
    // Enderium Machines
    donutCraft(event, "kubejs:enderium_machine", "kubejs:enderium_casing", "kubejs:abstruse_mechanism")
    // Machine Crafting
    enderiumMachine(event, Item.of("enderstorage:ender_chest", 1), "minecraft:chest")
    enderiumMachine(event, Item.of("enderstorage:ender_tank", 1), "create:fluid_tank")
    enderiumMachine(event, Item.of("thermal:upgrade_augment_3", 1), "minecraft:redstone")
    enderiumMachine(event, Item.of("ae2:quantum_ring", 1), "ae2:energy_cell")
    enderiumMachine(event, Item.of("ae2:quantum_link", 1), "ae2:fluix_pearl")
    enderiumMachine(event, Item.of("thermal:fluid_duct", 16), "create:fluid_pipe")
    enderiumMachine(event, Item.of("kubejs:pipe_module_tier_3", 4))

    // Fluid Cells moved to enderium due to being able to transport fluids more efficiently than pipes
    event.replaceInput({ id: "thermal:fluid_cell_frame" }, "#forge:glass", ["thermal:fluid_duct", "thermal:fluid_duct_windowed"])
    // Windowed fluiducts
    event.remove({ output: "thermal:fluid_duct_windowed" })
    event.shapeless("thermal:fluid_duct_windowed", ["thermal:fluid_duct"])
    event.shapeless("thermal:fluid_duct", ["thermal:fluid_duct_windowed"])
    // - - - - - Chapter 4 - - - - -
    // Circuit Scraps
    event.stonecutting("ae2:silicon_press", "kubejs:circuit_scrap")
    event.stonecutting("ae2:engineering_processor_press", "kubejs:circuit_scrap")
    event.stonecutting("ae2:calculation_processor_press", "kubejs:circuit_scrap")
    event.stonecutting("ae2:logic_processor_press", "kubejs:circuit_scrap")
    event.shaped(Item.of("kubejs:circuit_scrap", 2), [" A ", "ABA", " A "], { A: "thermal:invar_ingot", B: "#kubejs:circuit_press" })
    // Pyrolyzer charcoal
    event.remove({ id: "thermal:machines/pyrolyzer/pyrolyzer_logs" })
    event.recipes.thermal.pyrolyzer([Item.of("minecraft:charcoal", 2), Fluid.of("thermal:creosote", 50)], "#minecraft:logs", 0.15, 1000)
    // Coal Coke
    event.recipes.thermal.pyrolyzer(["thermal:coal_coke", Fluid.of("thermal:creosote", 50)], "minecraft:charcoal", 0.15, 2000)
    // Coke Chunk
    event.custom({
        "type": "create:sequenced_assembly",
        "ingredient": { "item": "thermal:coal_coke" },
        "loops": 2,
        "results": [{ "item": "kubejs:coke_chunk" }],
        "sequence": [
            {
                "type": "create:filling",
                "ingredients": [
                    { "item": "kubejs:incomplete_coke_chunk" },
                    { "fluid": "minecraft:water", "amount": 250 }
                ],
                "results": [{ "item": "kubejs:incomplete_coke_chunk" }]
            },
            {
                "type": "create:cutting",
                "ingredients": [{ "item": "kubejs:incomplete_coke_chunk" }],
                "results": [{ "item": "kubejs:incomplete_coke_chunk" }],
                "processingTime": 100
            }
        ],
        "transitionalItem": { "item": "kubejs:incomplete_coke_chunk" }
    }).id("kubejs:coke_cutting")
    // Sand Ball
    event.recipes.create.splashing([
        Item.of("kubejs:sand_ball").withChance(0.125)
    ], "minecraft:sandstone")
    event.recipes.thermal.bottler("kubejs:sand_ball", [Fluid.of("minecraft:water", 50), "#forge:sand/colorless"], 0, 1000)
    // Sand Chunks
    event.recipes.create.emptying(["kubejs:rough_sand", Fluid.of("kubejs:fine_sand", 500)], "kubejs:sand_ball")
    // Entropy manipulator (for blizz cubes)
    event.remove({ id: "ae2:tools/misctools_entropy_manipulator" })
    event.shaped("ae2:entropy_manipulator", [
        "S  ",
        " M ",
        "  M"
    ], {
        M: "thermal:lead_plate",
        S: "ae2:fluix_crystal"
    })
    let blizz = "thermal:blizz_powder"; let basalz = "thermal:basalz_powder"
    // remove handcrafting recipes for blizz and basalz powder
    event.remove({ id:blizz })
    event.remove({ id:basalz })
    event.remove({ id:"thermal:machines/pulverizer/pulverizer_blizz_rod" })
    event.remove({ id:"thermal:machines/pulverizer/pulverizer_basalz_rod" })
    event.recipes.thermal.pulverizer([Item.of(blizz).withChance(2.5), Item.of("minecraft:snowball").withChance(0.25)], "thermal:blizz_rod", 0, 800).id("kubejs:machines/pulverizer/blizz_powder")
    event.recipes.thermal.pulverizer([Item.of(basalz).withChance(2.5), Item.of("thermal:slag").withChance(0.25)], "thermal:basalz_rod", 0, 800).id("kubejs:machines/pulverizer/basalz_powder")
    // Crushing powder recipes
    event.recipes.create.crushing([Item.of(blizz, 1), Item.of(blizz, 1).withChance(.5)], "thermal:blizz_rod")
    event.recipes.create.crushing([Item.of(basalz, 1), Item.of(basalz, 1).withChance(.5)], "thermal:basalz_rod")
    // Ice and Earth Charges
    event.remove({ id: "thermal:ice_charge_3" })
    event.remove({ id: "thermal:earth_charge_3" })
    event.recipes.create.compacting("thermal:ice_charge", [blizz, blizz, blizz, blizz, blizz, blizz, blizz, blizz])
    event.recipes.create.compacting("thermal:earth_charge", [basalz, basalz, basalz, basalz, basalz, basalz, basalz, basalz])
    // Purified Sand
    event.recipes.thermal.smelter(
        ["kubejs:purified_sand"],
        ["kubejs:rough_sand", "thermal:earth_charge"],
        0,
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
    event.recipes.thermal.smelter(
        ["ae2:silicon"],
        ["kubejs:silicon_compound", "thermal:ice_charge"],
        0,
        5000)
    event.remove({ output: "ae2:silicon" })

    // Goodbye Inscriber
    event.remove({ id: "ae2:network/blocks/inscribers" })
    event.remove({ type: "ae2:inscriber" })
    // all gem melting recipes are automatically ported to megma crucible recipe in thermal.js
    // Printed Processors
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": { "item": "ae2:calculation_processor_press" },
        "cast_consumed": false,
        "fluid": { "tag": "tconstruct:molten_copper", "amount": 90 },
        "result": { "item": "ae2:printed_calculation_processor" },
        "cooling_time": 150
    })
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": { "item": "ae2:logic_processor_press" },
        "cast_consumed": false,
        "fluid": { "tag": "tconstruct:molten_gold", "amount": 90 },
        "result": { "item": "ae2:printed_logic_processor" },
        "cooling_time": 150
    })
    event.custom({
        "type": "tconstruct:casting_table",
        "cast": { "item": "ae2:engineering_processor_press" },
        "cast_consumed": false,
        "fluid": { "tag": "tconstruct:molten_diamond", "amount": 100 },
        "result": { "item": "ae2:printed_engineering_processor" },
        "cooling_time": 150
    })
    // Chiller recipes for printed processors
    event.recipes.thermal.chiller("ae2:printed_calculation_processor", [Fluid.of("tconstruct:molten_copper", 90), "ae2:calculation_processor_press"], 0, 5000)
    event.recipes.thermal.chiller("ae2:printed_logic_processor", [Fluid.of("tconstruct:molten_gold", 90), "ae2:logic_processor_press"], 0, 5000)
    event.recipes.thermal.chiller("ae2:printed_engineering_processor", [Fluid.of("tconstruct:molten_diamond", 100), "ae2:engineering_processor_press"], 0, 5000)
    // Printed Silicon
    event.custom(ifiniDeploying(event, "ae2:printed_silicon", "ae2:silicon", "ae2:silicon_press"))
    // Processors
    let processorTypes = ["calculation", "logic", "engineering"]
    processorTypes.forEach(e => {
        let transitional = `kubejs:incomplete_${e}_processor`
        event.custom({
            "type": "create:sequenced_assembly",
            "ingredient": {
                "item": "ae2:printed_silicon"
            },
            "loops": 1,
            "results": [
                {
                    "item": `ae2:${e}_processor`
                }
            ],
            "sequence": [
                {
                    "type": "create:deploying",
                    "ingredients": [
                        {
                            "item": transitional
                        },
                        {
                            "item": `ae2:printed_${e}_processor`
                        }
                    ],
                    "results": [
                        {
                            "item": transitional
                        }
                    ]
                },
                {
                    "type": "create:filling",
                    "ingredients": [
                        {
                            "item": transitional
                        },
                        {
                            "fluid": "thermal:redstone",
                            "amount": 250
                        }
                    ],
                    "results": [
                        {
                            "item": transitional
                        }
                    ]
                },
                {
                    "type": "create:pressing",
                    "ingredients": [
                        {
                            "item": transitional
                        }
                    ],
                    "results": [
                        {
                            "item": transitional
                        }
                    ]
                }
            ],
            "transitionalItem": {
                "item": transitional
            }
        }).id("kubejs:" + e + "_processor")
    })
    // Flash Drive
    event.shaped("kubejs:flash_drive", [
        "SCA"
    ], {
        A: "tconstruct:cobalt_ingot",
        C: "ae2:logic_processor",
        S: "minecraft:iron_ingot"
    })
    // Calculation Mechanisms
    transitional = "kubejs:incomplete_calculation_mechanism"
    event.recipes.create.sequenced_assembly([
        "kubejs:calculation_mechanism",
    ], "kubejs:inductive_mechanism", [
        event.recipes.create.deploying(transitional, [transitional, "ae2:printed_silicon"]),
        event.recipes.create.deploying(transitional, [transitional, "ae2:printed_silicon"]),
        event.recipes.create.deploying(transitional, [transitional, "#kubejs:flash_drives"])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:calculation_mechanism")
    // Quartz Glass
    event.remove({ output: "ae2:quartz_glass" })
    event.recipes.thermal.smelter("ae2:quartz_glass", [["ae2:certus_quartz_dust", "thermal:quartz_dust"]])
    // Fluix Crystals
    event.recipes.thermal.smelter(Item.of("ae2:fluix_crystal", 2), ["minecraft:quartz", "ae2:charged_certus_quartz_crystal", "minecraft:redstone"])
    // ME Controller
    event.remove({ output: "ae2:controller" })
    donutCraft(event, "ae2:controller", "kubejs:fluix_casing", "kubejs:calculation_mechanism")
    // Machine Crafting
    fluixMachine(event, Item.of("ae2:condenser", 1), "ae2:fluix_pearl")
    fluixMachine(event, Item.of("ae2:drive", 1), "ae2:engineering_processor")
    fluixMachine(event, Item.of("ae2:formation_core", 4), "ae2:logic_processor")
    fluixMachine(event, Item.of("ae2:annihilation_core", 4), "ae2:calculation_processor")
    fluixMachine(event, Item.of("ae2:chest", 1), "minecraft:chest")
    // Recipe Tweaks
    event.replaceInput({ type: "minecraft:crafting_shaped", id: /ae2:.*/ }, "#forge:ingots/iron", "thermal:lead_plate")
    event.replaceInput({ id: "ae2:network/cells/item_storage_components_cell_1k_part" }, "minecraft:redstone", "kubejs:calculation_mechanism")
    event.replaceInput({ id: "ae2:network/cells/item_storage_components_cell_1k_part" }, "ae2:logic_processor", "#forge:dusts/redstone")
    event.replaceInput({ id: "ae2:network/cells/spatial_components" }, "minecraft:glowstone_dust", "kubejs:calculation_mechanism")
    event.replaceInput({ id: "ae2:network/cells/spatial_components" }, "ae2:engineering_processor", "#forge:dusts/glowstone")
    event.replaceInput({ id: "ae2:network/crafting/patterns_blank" }, "minecraft:glowstone_dust", "kubejs:calculation_mechanism")

    // - - - - - Finale (Chapter 5) - - - - -
    // Chiller Casts
    event.remove({ id: "thermal:chiller_ball_cast" })
    event.remove({ id: "thermal:chiller_rod_cast" })
    event.remove({ id: "thermal:chiller_ingot_cast" })
    event.stonecutting("thermal:chiller_ball_cast", "thermal:nickel_plate")
    event.stonecutting("thermal:chiller_rod_cast", "thermal:nickel_plate")
    event.stonecutting("thermal:chiller_ingot_cast", "thermal:nickel_plate")
    // Printable Integers and Operators
    let castTypes = ["three", "eight", "plus", "minus", "multiply", "divide"]
    castTypes.forEach(e => {
        let cast = `kubejs:${e}_cast`
        let result = `kubejs:${e}`
        event.stonecutting(cast, "thermal:nickel_plate")
        event.custom({
            "type": "tconstruct:casting_table",
            "cast": {
                "item": cast
            },
            "fluid": {
                "name": "kubejs:raw_logic",
                "amount": 1
            },
            "result": Item.of(result),
            "cooling_time": 10
        })
        event.custom({
            "type": "thermal:chiller",
            "ingredients": [
                Fluid.of("kubejs:raw_logic", 1).toJson(),
                Item.of(cast).toJson()
            ],
            "result": [
                Item.of(result)
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
                    output = "kubejs:missingno"
                else if (result < 0)
                    continue
                else if (result > 9)
                    continue
                else if (result % 1 != 0)
                    continue
                else
                    output = "kubejs:" + nums[result]

                event.custom({
                    "type": "create:mechanical_crafting",
                    "pattern": [
                        "AOB"
                    ],
                    "key": {
                        "A": {
                            "item": "kubejs:" + nums[a]
                        },
                        "O": {
                            "item": "kubejs:" + opNames[op]
                        },
                        "B": {
                            "item": "kubejs:" + nums[b]
                        }
                    },
                    "result": {
                        "item": output
                    },
                    "acceptMirrored": false
                }).id(`kubejs:calculation/${nums[a]}_${opNames[op]}_${nums[b]}_equals_${nums[result]}`)

                event.custom({
                    "type": "create:mechanical_crafting",
                    "pattern": [
                        "A",
                        "O",
                        "B"
                    ],
                    "key": {
                        "A": {
                            "item": "kubejs:" + nums[a]
                        },
                        "O": {
                            "item": "kubejs:" + opNames[op]
                        },
                        "B": {
                            "item": "kubejs:" + nums[b]
                        }
                    },
                    "result": {
                        "item": output
                    },
                    "acceptMirrored": false
                }).id(`kubejs:calculation/${nums[a]}_${opNames[op]}_${nums[b]}_equals_${nums[result]}_vertical`)

            }
        }
    }
    // Digit Melting
    let meltOrCrucible = (id, out, outAmount) => {
        event.recipes.thermal.crucible(Fluid.of(out, outAmount), [id], 0, 100)
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
    meltOrCrucible("kubejs:calculation_mechanism", "kubejs:raw_logic", 30)
    meltOrCrucible("kubejs:zero", "kubejs:number_0", 1)
    meltOrCrucible("kubejs:one", "kubejs:number_1", 1)
    meltOrCrucible("kubejs:two", "kubejs:number_2", 1)
    meltOrCrucible("kubejs:three", "kubejs:number_3", 1)
    meltOrCrucible("kubejs:four", "kubejs:number_4", 1)
    meltOrCrucible("kubejs:five", "kubejs:number_5", 1)
    meltOrCrucible("kubejs:six", "kubejs:number_6", 1)
    meltOrCrucible("kubejs:seven", "kubejs:number_7", 1)
    meltOrCrucible("kubejs:eight", "kubejs:number_8", 1)
    meltOrCrucible("kubejs:nine", "kubejs:number_9", 1)
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
        "result": Item.of("kubejs:computation_matrix"),
        "cooling_time": 20
    })

    // Ad Astra Recipe Removals are found in ad_astra.js

    // Matter Plastics
    event.recipes.create.compacting("kubejs:matter_plastics", ["ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball", "ae2:matter_ball"]).superheated()
    // Saves a lot of code to reuse an object with the materials here
    let materials = {
        A: "kubejs:matter_plastics",
        M: "ae2:controller",
        G: "thermal:diamond_gear",
        S: "kubejs:computation_matrix"
    }
    // Navigation Computer
    event.recipes.create.mechanical_crafting("kubejs:navigation_computer", [
        "AAAAA",
        "ASSSA",
        "GS SG",
        "ASSSA",
        "AAMAA"
    ], materials)
    // Oxygen Loader
    materials.S = "minecraft:bucket"
    event.recipes.create.mechanical_crafting("ad_astra:oxygen_loader", [
        "AAA",
        "GSG",
        "AMA"
    ], materials)
    // Oxygen Bubble Distributor
    materials.S = "create:propeller"
    event.recipes.create.mechanical_crafting("ad_astra:oxygen_distributor", [
        "AAA",
        "GSG",
        "AMA"
    ], materials)
    // Oxygen Sensor
    event.recipes.create.mechanical_crafting("ad_astra:oxygen_sensor", [
        "AAA",
        "GSG",
        "AMA"
    ], Object.assign(materials, {M:"minecraft:redstone_block"}))
    // Lander Deployer
    materials.S = "create:empty_schematic"
    event.recipes.create.mechanical_crafting("kubejs:lander_deployer", [
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
        A: "kubejs:matter_plastics",
        G: "#forge:plates/gold",
        S: "minecraft:iron_chestplate"
    }
    // chestplate
    event.recipes.create.mechanical_crafting("ad_astra:space_suit", pattern, materials)
    // helmet
    materials.S = "minecraft:iron_helmet"
    event.recipes.create.mechanical_crafting("ad_astra:space_helmet", pattern, materials)
    // leggings
    materials.S = "minecraft:iron_leggings"
    event.recipes.create.mechanical_crafting("ad_astra:space_pants", pattern, materials)
    // boots
    materials.S = "minecraft:iron_boots"
    event.recipes.create.mechanical_crafting("ad_astra:space_boots", pattern, materials)

    // Gas Tanks
    materials = {
        A: "kubejs:matter_plastics",
        G: "#forge:plates/gold"
    }
    event.recipes.create.mechanical_crafting("ad_astra:gas_tank", [
        "G",
        "A",
        "A"
    ], materials)
    materials.A = "#forge:ingots/invar"
    materials.T = "ad_astra:gas_tank"
    event.recipes.create.mechanical_crafting("ad_astra:large_gas_tank", [
        " G ",
        "ATA",
        "ATA"
    ], materials)

    // Zip Gun
    materials.T = "ad_astra:large_gas_tank"
    event.recipes.create.mechanical_crafting("ad_astra:zip_gun", [
        "AAG",
        "T  "
    ], materials)

    // Rocket Launch Pad
    event.recipes.create.deploying(Item.of("ad_astra:launch_pad"), ["architects_palette:heavy_stone_bricks", "kubejs:matter_plastics"])

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
    event.recipes.create.mechanical_crafting("ad_astra:tier_1_rocket", [
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

    // Solar Panel
    event.recipes.create.mechanical_crafting("ad_astra:solar_panel", [
        "CCC",
        "DMD",
        "DDD"
    ], {
        C: "ad_astra:photovoltaic_etrium_cell",
        M: "ae2:controller",
        D: "#forge:plates/desh"
    })

    // Gravity Normalizer
    transitional = "kubejs:incomplete_gravity_normalizer"
    event.recipes.create.sequenced_assembly([
        "ad_astra:gravity_normalizer",
    ], "kubejs:computation_matrix", [
        event.recipes.create.deploying(transitional, [transitional, "kubejs:enderium_machine"]),
        event.recipes.create.deploying(transitional, [transitional, "thermal:flux_capacitor"]),
        event.recipes.create.deploying(transitional, [transitional, "#forge:plates/desh"]),
        event.recipes.create.deploying(transitional, [transitional, "#forge:plates/desh"]),
        event.recipes.create.deploying(transitional, [transitional, "#forge:plates/desh"])
    ]).transitionalItem(transitional)
        .loops(1)
        .id("kubejs:gravity_normalizer")
})
