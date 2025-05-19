// Create: Crafts and Additions
if (Platform.isLoaded("createaddition")) {
    ServerEvents.recipes(event => {
        andesiteMachine(event, Item.of("createaddition:rolling_mill", 1), "create:shaft")
        brassMachine(event, Item.of("createaddition:portable_energy_interface", 2))
        brassMachine(event, Item.of("createaddition:tesla_coil", 1), "createaddition:copper_spool")
        brassMachine(event, Item.of("createaddition:modular_accumulator", 1), "thermal:energy_cell_frame")

        event.replaceOutput({}, "#forge:nuggets/electrum", "createaddition:electrum_nugget")
        event.replaceOutput({}, "#forge:ingots/electrum", "createaddition:electrum_ingot")
        event.replaceOutput({}, "#forge:plates/electrum", "createaddition:electrum_sheet")
        event.replaceOutput({}, "#forge:storage_blocks/electrum", "createaddition:electrum_block")
        event.replaceOutput({}, "#forge:dusts/diamond", "createaddition:diamond_grit")

        // event.replaceOutput({ id: "kubejs:machines/smelter/electrum_ingot" }, "thermal:electrum_ingot", "createaddition:electrum_ingot")

        // Duplicate Electrum Recipes
        event.remove({ id: "createaddition:crafting/electrum_nugget" })
        event.remove({ id: "createaddition:crafting/electrum"})
        event.remove({ id: "createaddition:crafting/electrum_ingot"})
        event.remove({ id: "createaddition:crafting/electrum_block" })

        // Motor & Alternator
        invarMachine(event, Item.of("createaddition:electric_motor", 1), "createaddition:tesla_coil")
        enderiumMachine(event, Item.of("createaddition:alternator", 1), "createaddition:electric_motor")

        // Remove capacitors
        event.remove({ output: "createaddition:capacitor" })

        // Redstone Relay
        event.remove({ output: "createaddition:redstone_relay" })
        event.shapeless("createaddition:redstone_relay", ["projectred_core:platformed_plate", "createaddition:connector"])
            .id("kubejs:compat/createaddition/redstone_relay_manual_only")
        event.recipes.create.deploying("createaddition:redstone_relay", ["projectred_core:platformed_plate", "createaddition:connector"])

        // Remove heated basin ingot recipes
        event.remove({ id: "createaddition:mixing/electrum" })

        // Connectors
        event.remove({ id: "createaddition:crafting/small_connector_copper" })
        event.remove({ id: "createaddition:crafting/large_connector_gold" })
        event.remove({ id: "createaddition:crafting/large_connector_electrum" })
        event.recipes.createSequencedAssembly(
            [Item.of("createaddition:connector", 4)],
            "create:andesite_alloy",
            [
                event.recipes.create.deploying("kubejs:incomplete_connector", ["kubejs:incomplete_connector", "#forge:rods/copper"]),
                event.recipes.create.deploying("kubejs:incomplete_connector", ["kubejs:incomplete_connector", "#forge:plates/iron"]),
                event.recipes.create.pressing("kubejs:incomplete_connector", "kubejs:incomplete_connector")
            ]
        ).transitionalItem("kubejs:incomplete_connector").loops(1)

        event.recipes.createSequencedAssembly(
            [Item.of("createaddition:large_connector", 1)],
            "create:andesite_alloy",
            [
                event.recipes.create.deploying("kubejs:incomplete_connector", ["kubejs:incomplete_connector", "#forge:rods/gold"]),
                event.recipes.create.deploying("kubejs:incomplete_connector", ["kubejs:incomplete_connector", "#forge:plates/iron"]),
                event.recipes.create.pressing("kubejs:incomplete_connector", "kubejs:incomplete_connector"),
                event.recipes.create.deploying("kubejs:incomplete_connector", ["kubejs:incomplete_connector", "#forge:plates/iron"]),
                event.recipes.create.pressing("kubejs:incomplete_connector", "kubejs:incomplete_connector")
            ]
        ).transitionalItem("kubejs:incomplete_large_connector").loops(1)

        // Bioethanol & Seed Oil in the Compression Dynamo
        event.recipes.thermal.compression_fuel(Fluid.of("createaddition:bioethanol", 1000)).energy(1000000)
        event.recipes.thermal.compression_fuel(Fluid.of("createaddition:seed_oil", 1000)).energy(30000)
    })

    ServerEvents.tags("item", event => {
        event.get("kubejs:cake_slices")
            .add("create_central_kitchen:chocolate_cake_slice")
            .add("create_central_kitchen:honey_cake_slice")

        event.add("forge:storage_blocks/electrum", "createaddition:electrum_block")
        event.add("tconstruct:anvil_metal", "createaddition:electrum_block")
    })
    ServerEvents.tags("block", event => {
        event.add("minecraft:mineable/pickaxe", "createaddition:electrum_block")
        event.add("minecraft:needs_iron_tool", "createaddition:electrum_block")
        event.add("minecraft:beacon_base_blocks", "createaddition:electrum_block")
        event.add("tconstruct:anvil_metal", "createaddition:electrum_block")
    })

    ServerEvents.blockLootTables(event => {
        event.addSimpleBlock("createaddition:electrum_block")
    })
}
