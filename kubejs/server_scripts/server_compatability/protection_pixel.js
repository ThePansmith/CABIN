if (Platform.isLoaded('protection_pixel')) { // Mod ID goes here
    ServerEvents.recipes(event => {
        // Cleanup Old Recipes
        event.remove({ id: "protection_pixel:armorkit" })
        event.remove({ id: "protection_pixel:equipmentkit" })
        event.remove({ id: "protection_pixel:plagueasloot" })
        event.remove({ id: "protection_pixel:lancerasloot" })
        event.remove({ id: "protection_pixel:hammerasloot" })
        event.remove({ id: "protection_pixel:hunterasloot" })
        event.remove({ id: "protection_pixel:closeasloot" })
        event.remove({ id: "protection_pixel:bloodprisonerasloot" })
        event.remove({ id: "protection_pixel:nightdemonasloot" })
        event.remove({ id: "protection_pixel:breakerasloot" })
        event.remove({ id: "protection_pixel:prismasloot" })
        event.remove({ id: "protection_pixel:workerasloot" })
        event.remove({ id: "protection_pixel:magneticasloot" })
        event.remove({ id: "protection_pixel:pioneerasloot" })
        event.remove({ id: "protection_pixel:hellsnakeasloot" })
        event.remove({ id: "protection_pixel:falconnestasloot" })
        event.remove({ id: "protection_pixel:typhoonasloot" })
        event.remove({ id: "protection_pixel:floatshieldloot" })
        event.remove({ id: "protection_pixel:slingshotasloot" })
        event.remove({ id: "protection_pixel:anchorpointasloot" })
        event.remove({ id: "protection_pixel:buoyancyasloot" })
        event.remove({ id: "protection_pixel:cannonloot" })

        // Handled automaticaly by helper method.
        // event.remove({ id: "protection_pixel:watertankloot"})
        // event.remove({ id: "protection_pixel:reactorloot" })

        // Machine Cutting Recipes
        copperMachine(event, Item.of("protection_pixel:emptywatertank", 2)) // protection_pixel:watertankloot
        copperMachine(event, Item.of("protection_pixel:powerengine", 1), "create:blaze_burner")

        // Mechanical Crafting Recipes
        event.recipes.create.mechanical_crafting("protection_pixel:armorplatekit", [
            "AB CA",
            "DBECD",
            "DFFFD"], {
            C: "minecraft:blaze_rod",
            B: "#forge:ingots/brass",
            D: "minecraft:dried_kelp",
            A: "minecraft:iron_ingot",
            E: "minecraft:slime_ball",
            F: "kubejs:reinforced_mechanism",
        })

        event.recipes.create.mechanical_crafting("protection_pixel:equipmentkit", [
            "AB CA",
            "DBECD",
            "DFFFD"], {
            C: "minecraft:blaze_rod",
            B: "minecraft:iron_ingot",
            D: "minecraft:dried_kelp",
            A: "minecraft:iron_ingot",
            E: "create:brass_hand",
            F: "kubejs:reinforced_mechanism",
        })

        event.recipes.create.mechanical_crafting("protection_pixel:floatshield_chestplate", [
            "AB BA",
            "BCBCB",
            "DEFED",
            "BGHGB",
            " IJI "], {
            A: "minecraft:lightning_rod",
            B: "kubejs:reinforced_mechanism",
            C: "minecraft:copper_ingot",
            D: "create:copper_sheet",
            E: "create:andesite_alloy",
            F: "protection_pixel:chestplatelining",
            G: "create:cogwheel",
            H: "minecraft:heart_of_the_sea",
            I: "minecraft:netherite_scrap",
            J: "create:precision_mechanism",
        })

        event.recipes.create.mechanical_crafting("protection_pixel:cannonarm", [
            "AFBFA",
            "BCDCB",
            "EC CE"], {
            A: "create:potato_cannon",
            B: "minecraft:iron_ingot",
            C: "create:andesite_alloy",
            D: "create:gantry_shaft",
            E: "create:cogwheel",
            F: "kubejs:reinforced_mechanism",
        }
        )


        // Sequenced Assembly Recipes. (Couldn't get replaceInput to work, so using custom filling recipe)
        event.recipes.createSequencedAssembly([
            "protection_pixel:plagueas_helmet",
        ], "protection_pixel:plague_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:plague_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompleteplague")],
            }),
            event.recipes.create.pressing("protection_pixel:incompleteplague", "protection_pixel:incompleteplague"),
            event.recipes.create.deploying("protection_pixel:incompleteplague", ["protection_pixel:incompleteplague", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteplague", ["protection_pixel:incompleteplague", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteplague", ["protection_pixel:incompleteplague", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteplague", ["protection_pixel:incompleteplague", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompleteplague")
            .id("kubejs:protection_pixel/plagueas_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:lanceras_helmet",
        ], "protection_pixel:lancer_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:lancer_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletelancer")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletelancer", "protection_pixel:incompletelancer"),
            event.recipes.create.deploying("protection_pixel:incompletelancer", ["protection_pixel:incompletelancer", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletelancer", ["protection_pixel:incompletelancer", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletelancer", ["protection_pixel:incompletelancer", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletelancer", ["protection_pixel:incompletelancer", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompletelancer")
            .id("kubejs:protection_pixel/lanceras_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:hammeras_helmet",
        ], "protection_pixel:hammer_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:hammer_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletehammer")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletehammer", "protection_pixel:incompletehammer"),
            event.recipes.create.deploying("protection_pixel:incompletehammer", ["protection_pixel:incompletehammer", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehammer", ["protection_pixel:incompletehammer", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehammer", ["protection_pixel:incompletehammer", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehammer", ["protection_pixel:incompletehammer", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompletehammer")
            .id("kubejs:protection_pixel/hammeras_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:hunteras_helmet",
        ], "protection_pixel:hunter_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:hunter_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletehunter")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletehunter", "protection_pixel:incompletehunter"),
            event.recipes.create.deploying("protection_pixel:incompletehunter", ["protection_pixel:incompletehunter", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehunter", ["protection_pixel:incompletehunter", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehunter", ["protection_pixel:incompletehunter", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehunter", ["protection_pixel:incompletehunter", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompletehunter")
            .id("kubejs:protection_pixel/hunteras_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:closedas_helmet",
        ], "protection_pixel:closed_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:closed_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompleteclosed")],
            }),
            event.recipes.create.pressing("protection_pixel:incompleteclosed", "protection_pixel:incompleteclosed"),
            event.recipes.create.deploying("protection_pixel:incompleteclosed", ["protection_pixel:incompleteclosed", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteclosed", ["protection_pixel:incompleteclosed", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteclosed", ["protection_pixel:incompleteclosed", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteclosed", ["protection_pixel:incompleteclosed", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompleteclosed")
            .id("kubejs:protection_pixel/closedas_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:bloodprisoneras_helmet",
        ], "protection_pixel:bloodprisoner_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:bloodprisoner_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletebloodprisoner")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletebloodprisoner", "protection_pixel:incompletebloodprisoner"),
            event.recipes.create.deploying("protection_pixel:incompletebloodprisoner", ["protection_pixel:incompletebloodprisoner", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebloodprisoner", ["protection_pixel:incompletebloodprisoner", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebloodprisoner", ["protection_pixel:incompletebloodprisoner", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebloodprisoner", ["protection_pixel:incompletebloodprisoner", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompletebloodprisoner")
            .id("kubejs:protection_pixel/bloodprisoneras_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:nightdemonas_helmet",
        ], "protection_pixel:nightdemon_helmet", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:nightdemon_helmet" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletenightdemon")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletenightdemon", "protection_pixel:incompletenightdemon"),
            event.recipes.create.deploying("protection_pixel:incompletenightdemon", ["protection_pixel:incompletenightdemon", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletenightdemon", ["protection_pixel:incompletenightdemon", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletenightdemon", ["protection_pixel:incompletenightdemon", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletenightdemon", ["protection_pixel:incompletenightdemon", "protection_pixel:smallnetheritesheet"]),
        ]).loops(1)
            .transitionalItem("protection_pixel:incompletenightdemon")
            .id("kubejs:protection_pixel/nightdemonas_helmet");

        event.recipes.createSequencedAssembly([
            "protection_pixel:breakeras_chestplate",
        ], "protection_pixel:breaker_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:breaker_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletebreaker")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletebreaker", "protection_pixel:incompletebreaker"),
            event.recipes.create.deploying("protection_pixel:incompletebreaker", ["protection_pixel:incompletebreaker", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebreaker", ["protection_pixel:incompletebreaker", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebreaker", ["protection_pixel:incompletebreaker", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebreaker", ["protection_pixel:incompletebreaker", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletebreaker")
            .id("kubejs:protection_pixel/breakeras_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:wingsofprismas_chestplate",
        ], "protection_pixel:wingsofprism_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:wingsofprism_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletewingsofprism")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletewingsofprism", "protection_pixel:incompletewingsofprism"),
            event.recipes.create.deploying("protection_pixel:incompletewingsofprism", ["protection_pixel:incompletewingsofprism", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletewingsofprism", ["protection_pixel:incompletewingsofprism", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletewingsofprism", ["protection_pixel:incompletewingsofprism", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletewingsofprism", ["protection_pixel:incompletewingsofprism", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletewingsofprism")
            .id("kubejs:protection_pixel/wingsofprismas_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:workerhornetas_chestplate",
        ], "protection_pixel:workerhornet_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:workerhornet_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompleteworkerhornet")],
            }),
            event.recipes.create.pressing("protection_pixel:incompleteworkerhornet", "protection_pixel:incompleteworkerhornet"),
            event.recipes.create.deploying("protection_pixel:incompleteworkerhornet", ["protection_pixel:incompleteworkerhornet", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteworkerhornet", ["protection_pixel:incompleteworkerhornet", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteworkerhornet", ["protection_pixel:incompleteworkerhornet", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteworkerhornet", ["protection_pixel:incompleteworkerhornet", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompleteworkerhornet")
            .id("kubejs:protection_pixel/workerhornetas_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:magneticstormas_chestplate",
        ], "protection_pixel:magneticstorm_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:magneticstorm_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletemagneticstorm")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletemagneticstorm", "protection_pixel:incompletemagneticstorm"),
            event.recipes.create.deploying("protection_pixel:incompletemagneticstorm", ["protection_pixel:incompletemagneticstorm", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletemagneticstorm", ["protection_pixel:incompletemagneticstorm", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletemagneticstorm", ["protection_pixel:incompletemagneticstorm", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletemagneticstorm", ["protection_pixel:incompletemagneticstorm", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletemagneticstorm")
            .id("kubejs:protection_pixel/magneticstormas_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:pioneeras_chestplate",
        ], "protection_pixel:pioneer_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:pioneer_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletepioneer")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletepioneer", "protection_pixel:incompletepioneer"),
            event.recipes.create.deploying("protection_pixel:incompletepioneer", ["protection_pixel:incompletepioneer", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletepioneer", ["protection_pixel:incompletepioneer", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletepioneer", ["protection_pixel:incompletepioneer", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletepioneer", ["protection_pixel:incompletepioneer", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletepioneer")
            .id("kubejs:protection_pixel/pioneeras_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:hellsnakeas_chestplate",
        ], "protection_pixel:hellsnake_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:hellsnake_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletehellsnake")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletehellsnake", "protection_pixel:incompletehellsnake"),
            event.recipes.create.deploying("protection_pixel:incompletehellsnake", ["protection_pixel:incompletehellsnake", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehellsnake", ["protection_pixel:incompletehellsnake", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehellsnake", ["protection_pixel:incompletehellsnake", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletehellsnake", ["protection_pixel:incompletehellsnake", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletehellsnake")
            .id("kubejs:protection_pixel/hellsnakeas_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:falconnestas_chestplate",
        ], "protection_pixel:falconnest_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:falconnest_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletefalconnest")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletefalconnest", "protection_pixel:incompletefalconnest"),
            event.recipes.create.deploying("protection_pixel:incompletefalconnest", ["protection_pixel:incompletefalconnest", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletefalconnest", ["protection_pixel:incompletefalconnest", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletefalconnest", ["protection_pixel:incompletefalconnest", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletefalconnest", ["protection_pixel:incompletefalconnest", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletefalconnest")
            .id("kubejs:protection_pixel/falconnestas_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:typhoonas_chestplate",
        ], "protection_pixel:typhoon_chestplate", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:typhoon_chestplate" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletetyphoon")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletetyphoon", "protection_pixel:incompletetyphoon"),
            event.recipes.create.deploying("protection_pixel:incompletetyphoon", ["protection_pixel:incompletetyphoon", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletetyphoon", ["protection_pixel:incompletetyphoon", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletetyphoon", ["protection_pixel:incompletetyphoon", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletetyphoon", ["protection_pixel:incompletetyphoon", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletetyphoon")
            .id("kubejs:protection_pixel/typhoonas_chestplate");

        event.recipes.createSequencedAssembly([
            "protection_pixel:slingshotas_leggings",
        ], "protection_pixel:slingshot_leggings", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:slingshot_leggings" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompleteslingshot")],
            }),
            event.recipes.create.pressing("protection_pixel:incompleteslingshot", "protection_pixel:incompleteslingshot"),
            event.recipes.create.deploying("protection_pixel:incompleteslingshot", ["protection_pixel:incompleteslingshot", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteslingshot", ["protection_pixel:incompleteslingshot", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteslingshot", ["protection_pixel:incompleteslingshot", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteslingshot", ["protection_pixel:incompleteslingshot", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompleteslingshot")
            .id("kubejs:protection_pixel/slingshotas_leggings");

        event.recipes.createSequencedAssembly([
            "protection_pixel:anchorpointas_leggings",
        ], "protection_pixel:anchorpoint_leggings", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:anchorpoint_leggings" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompleteanchorpoint")],
            }),
            event.recipes.create.pressing("protection_pixel:incompleteanchorpoint", "protection_pixel:incompleteanchorpoint"),
            event.recipes.create.deploying("protection_pixel:incompleteanchorpoint", ["protection_pixel:incompleteanchorpoint", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteanchorpoint", ["protection_pixel:incompleteanchorpoint", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteanchorpoint", ["protection_pixel:incompleteanchorpoint", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompleteanchorpoint", ["protection_pixel:incompleteanchorpoint", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompleteanchorpoint")
            .id("kubejs:protection_pixel/anchorpointas_leggings");

        event.recipes.createSequencedAssembly([
            "protection_pixel:buoyancyas_leggings",
        ], "protection_pixel:buoyancy_leggings", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "protection_pixel:buoyancy_leggings" },
                    { type: "fluid_stack", amount: 250, fluid: "minecraft:lava" },
                ],
                results: [Item.of("protection_pixel:incompletebuoyancy")],
            }),
            event.recipes.create.pressing("protection_pixel:incompletebuoyancy", "protection_pixel:incompletebuoyancy"),
            event.recipes.create.deploying("protection_pixel:incompletebuoyancy", ["protection_pixel:incompletebuoyancy", "kubejs:reinforced_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebuoyancy", ["protection_pixel:incompletebuoyancy", "protection_pixel:heatoverlockingmechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebuoyancy", ["protection_pixel:incompletebuoyancy", "create:precision_mechanism"]),
            event.recipes.create.deploying("protection_pixel:incompletebuoyancy", ["protection_pixel:incompletebuoyancy", "protection_pixel:smallnetheritesheet"]),
        ]).loops(2)
            .transitionalItem("protection_pixel:incompletebuoyancy")
            .id("kubejs:protection_pixel/buoyancyas_leggings");



    })
}