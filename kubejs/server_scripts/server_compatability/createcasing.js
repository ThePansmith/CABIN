// Create Encased
if (Platform.isLoaded("createcasing")) {
    ServerEvents.recipes(event => {

        // Cleanup
        event.remove({ input: "minecraft:iron_block", mod: "createcasing" }) // Removes Presses
        event.remove({ input: "create:whisk", mod: "createcasing" }) // Removes Mixers
        event.remove({ input: "#forge:stripped_logs", mod: "createcasing" }) // Removes Wooden Shafts
        event.remove({ input: "create:brass_ingot", mod: "createcasing" }) // Removes Brass Shaft
        event.remove({ input: "minecraft:glass", mod: "createcasing" }) // Removes Glass Shaft
        event.remove({ output: "createcasing:andesite_configurable_gearbox" })

        let encasedcasings = [
            { suffix: "brass", casing: "create:brass_casing" },
            { suffix: "copper", casing: "create:copper_casing" },
            { suffix: "industrial_iron", casing: "create:industrial_iron_block" },
            { suffix: "refined_radiance", casing: "create:refined_radiance_casing" },
            { suffix: "weathered_iron", casing: "create:weathered_iron_block" },
            { suffix: "shadow_steel", casing: "create:shadow_steel_casing" },
            { suffix: "railway", casing: "create:railway_casing" },
            { suffix: "creative", casing: "createcasing:creative_casing" }
        ]

        encasedcasings.forEach(item => {
            let suffix = item.suffix
            let casing = item.casing
            createMachine("create:mechanical_mixer", event, `createcasing:${suffix}_mixer`, casing)
            createMachine("create:mechanical_press", event, `createcasing:${suffix}_press`, casing)
            createMachine("create:gearbox", event, `createcasing:${suffix}_gearbox`, casing)
            createMachine("create:vertical_gearbox", event, `createcasing:vertical_${suffix}_gearbox`, casing)
            createMachine("create:depot", event, `createcasing:${suffix}_depot`, casing)
            createMachine("create:encased_chain_drive", event, `createcasing:${suffix}_encased_chain_drive`, casing)
            createMachine("create:adjustable_chain_gearshift", event, `createcasing:${suffix}_adjustable_chain_gearshift`, casing)
            createMachine("create:chain_conveyor", event, `createcasing:${suffix}_chain_conveyor`, casing)
            createMachine("create:gearshift", event, `createcasing:${suffix}_gearshift`, casing)
            createMachine("create:clutch", event, `createcasing:${suffix}_clutch`, casing)
            createMachine("create:deployer", event, `createcasing:${suffix}_deployer`, casing)
            createMachine("create:portable_storage_interface", event, `createcasing:${suffix}_portable_storage_interface`, casing)
            createMachine("create:encased_fan", event, `createcasing:${suffix}_encased_fan`, casing)
            createMachine("create:mechanical_harvester", event, `createcasing:${suffix}_mechanical_harvester`, casing)
            createMachine("create:mechanical_saw", event, `createcasing:${suffix}_mechanical_saw`, casing)
            createMachine("create:mechanical_drill", event, `createcasing:${suffix}_mechanical_drill`, casing)
            createMachine("create:mechanical_plough", event, `createcasing:${suffix}_mechanical_plough`, casing)
            createMachine("create:mechanical_roller", event, `createcasing:${suffix}_mechanical_roller`, casing)
            
            event.remove({ output: `createcasing:${suffix}_configurable_gearbox` })
        })

        // Adjustable Chain Gearshifts
        event.replaceInput(
            { input: "create:electron_tube", mod: "createcasing" },
            "create:electron_tube",
            "minecraft:redstone"
        )

        // chorium
        event.remove({ id: "createcasing:sequenced_assembly/chorium_ingot" })
        event.recipes.createSequencedAssembly([
            "createcasing:chorium_ingot",
        ], "create:polished_rose_quartz", [
            event.custom({
                type: "create:filling",
                ingredients: [
                    { item: "createcasing:processing_chorium" },
                    { type: "fluid_stack", amount: 125, fluid: "kubejs:matrix" },
                ],
                results: [Item.of("createcasing:processing_chorium")],
            }),
            event.recipes.create.deploying("createcasing:processing_chorium", ["createcasing:processing_chorium", "minecraft:popped_chorus_fruit"]),
            event.recipes.create.pressing("createcasing:processing_chorium", "createcasing:processing_chorium")
        ]).loops(4)
            .transitionalItem("createcasing:processing_chorium")
            .id("kubejs:compat/createcasing/chorium_ingot")
    })
}
