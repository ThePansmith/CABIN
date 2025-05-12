// Create Diesel Generators
if (Platform.isLoaded("createdieselgenerators")) {
    ServerEvents.recipes(event => {

        // Pumpjack Output
        event.replaceOutput({ output: "createdieselgenerators:crude_oil" },
            "createdieselgenerators:crude_oil",
            "thermal:crude_oil")


        // Duplicated Oils
        event.remove({ id: "createdieselgenerators:mixing/biodiesel" })
        event.remove({ id: "createdieselgenerators:compacting/plant_oil" })
        event.remove({ id: "createdieselgenerators:distillation/crude_oil" }) // Distillation outputs can"t be changed with scripts

        // Crude Distilation
        event.custom({
            "type": "createdieselgenerators:distillation",
            "ingredients": [
                { "fluid": "thermal:crude_oil", "amount": 200 }
            ],
            "heatRequirement": "heated",
            "processingTime": 200,
            "results": [
                { "fluid": "thermal:heavy_oil", "amount": 80 },
                { "fluid": "thermal:light_oil", "amount": 120 },
            ]
        })

        // Crude Extraction
        copperMachine(event, Item.of("createdieselgenerators:pumpjack_hole", 1))
        invarMachine(event, Item.of("createdieselgenerators:pumpjack_crank", 1), "create:zinc_block")
        invarMachine(event, Item.of("createdieselgenerators:oil_scanner", 1), "ae2:charged_certus_quartz_crystal")
        event.replaceInput({ id: "createdieselgenerators:crafting/pumpjack_bearing" },
            "create:andesite_alloy",
            "thermal:invar_ingot")
        event.replaceInput({ id: "createdieselgenerators:crafting/pumpjack_head" },
            "create:zinc_ingot",
            "thermal:invar_ingot")

        // Oil Engines
        event.remove({ id: "createdieselgenerators:crafting/engine_piston" }) // This one uses a Shaft instead of an Iron Rod
        event.remove({ id: "createdieselgenerators:crafting/diesel_engine" })
        event.recipes.create.mechanical_crafting("createdieselgenerators:diesel_engine", [
            " BLB ",
            "PPSPP",
            " BTB "], {
            L: "createdieselgenerators:lighter",
            P: "createdieselgenerators:engine_piston",
            B: "create:brass_ingot",
            S: "create:shaft",
            T: "create:fluid_tank",
        })
        zincMachine(event, Item.of("createdieselgenerators:large_diesel_engine", 1), "createdieselgenerators:diesel_engine")
        invarMachine(event, Item.of("createdieselgenerators:huge_diesel_engine", 1), "create:brass_block")

        // Wooden Chips Patch
        event.remove({ id: "createdieselgenerators:crafting/chip_wood_block" }),
        event.shaped("createdieselgenerators:chip_wood_block", [
            "CCC",
            "CCC",
            "CCC"], {
            C: "createdieselgenerators:wood_chip" // Now uses 9 instead of 4 in order to prevent duping exploits
        })

        // Asphalt from Bucket
        event.replaceInput({ id: "createdieselgenerators:crafting/asphalt_block" },
            "createdieselgenerators:crude_oil_bucket",
            "thermal:crude_oil_bucket")
    })

    CDGEvents.fuelTypes((event) => {
        event.add("thermal:creosote").normalSpeed(64).normalStrength(2048).normalBurn(2)
            .modularSpeed(32).modularStrength(3072).normalBurn(6)
            .hugeSpeed(32).hugeStrength(3072).normalBurn(6)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("thermal:heavy_oil").normalSpeed(64).normalStrength(2048).normalBurn(2)
            .modularSpeed(96).modularStrength(6144).normalBurn(3)
            .hugeSpeed(128).hugeStrength(12288).normalBurn(4)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("thermal:light_oil").normalSpeed(64).normalStrength(3072).normalBurn(2)
            .modularSpeed(128).modularStrength(6144).normalBurn(3)
            .hugeSpeed(96).hugeStrength(6144).normalBurn(6)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("thermal:refined_fuel").normalSpeed(64).normalStrength(4096).normalBurn(1)
            .modularSpeed(128).modularStrength(8192).normalBurn(2)
            .hugeSpeed(128).hugeStrength(16384).normalBurn(4)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("thermal:tree_oil").normalSpeed(32).normalStrength(1024).normalBurn(1)
            .modularSpeed(64).modularStrength(2048).normalBurn(2)
            .hugeSpeed(64).hugeStrength(3072).normalBurn(6)
            .soundSpeed(1).burnerStrength(1).build();
        event.add("#forge:biofuel").normalSpeed(64).normalStrength(4096).normalBurn(3)
            .modularSpeed(128).modularStrength(8192).normalBurn(6)
            .hugeSpeed(128).hugeStrength(12288).normalBurn(12)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("#forge:diesel").normalSpeed(64).normalStrength(2048).normalBurn(2)
            .modularSpeed(96).modularStrength(6144).normalBurn(3)
            .hugeSpeed(128).hugeStrength(12288).normalBurn(4)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("#forge:gasoline").normalSpeed(64).normalStrength(2048).normalBurn(2)
            .modularSpeed(32).modularStrength(3072).normalBurn(6)
            .hugeSpeed(32).hugeStrength(3072).normalBurn(6)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("#forge:ethanol").normalSpeed(64).normalStrength(3072).normalBurn(3)
            .modularSpeed(96).modularStrength(6144).normalBurn(6)
            .hugeSpeed(96).hugeStrength(6144).normalBurn(12)
            .soundSpeed(2).burnerStrength(1).build();
        event.add("#forge:gasoline").normalSpeed(64).normalStrength(3072).normalBurn(2)
            .modularSpeed(128).modularStrength(6144).normalBurn(3)
            .hugeSpeed(96).hugeStrength(6144).normalBurn(6)
            .soundSpeed(3).burnerStrength(1).build();
        event.add("#forge:plantoil").normalSpeed(32).normalStrength(1024).normalBurn(1)
            .modularSpeed(64).modularStrength(2048).normalBurn(2)
            .hugeSpeed(64).hugeStrength(3072).normalBurn(6)
            .soundSpeed(1).burnerStrength(1).build();
    });
}
