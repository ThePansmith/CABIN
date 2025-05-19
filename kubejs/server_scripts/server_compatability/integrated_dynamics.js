if (Platform.isLoaded("integrateddynamics") && Platform.isLoaded("integratedtunnels") && Platform.isLoaded("integratedterminals")) {
    ServerEvents.recipes(event => {
        // Note that all items allowing automation within the mod have been removed.
        // Players can technically use vault-style automation from an Item Interface, but this would be very expensive.
        // This is purely to serve as a nice item storage/access terminal system before the player gets AE2.

        // Remove all base recipes but wood-related ones
        event.remove({
            mod: "integrateddynamics", not: {
                output: [
                    "integrateddynamics:menril_wood",
                    "integrateddynamics:menril_log_filled",
                    "integrateddynamics:menril_planks",
                    "integrateddynamics:menril_planks_stairs",
                    "integrateddynamics:menril_slab",
                    "integrateddynamics:menril_fence",
                    "integrateddynamics:menril_fence_gate",
                    "integrateddynamics:facade",
                ]
            }
        })
        event.remove({ mod: "integratedterminals" })
        event.remove({ mod: "integratedtunnels" })

        // Menril is obtained via the menril tree, which needs certus quartz production and having looted a sky slime sapling.
        event.recipes.create.compacting("integrateddynamics:crystalized_menril_block", "4x integrateddynamics:menril_log")
        event.recipes.create.compacting("integrateddynamics:crystalized_menril_block", "integrateddynamics:menril_log_filled")
        event.recipes.create.compacting("integrateddynamics:crystalized_menril_block", "9x integrateddynamics:crystalized_menril_chunk")
        event.recipes.create.crushing("9x integrateddynamics:crystalized_menril_chunk", "integrateddynamics:crystalized_menril_block")
        event.recipes.create.milling("9x integrateddynamics:crystalized_menril_chunk", "integrateddynamics:crystalized_menril_block")
        event.recipes.create.deploying("integrateddynamics:menril_sapling", ["tconstruct:sky_slime_sapling", "ae2:certus_quartz_crystal"])

        // Made decently expensive to avoid giant networks
        event.shaped(
            Item.of("integrateddynamics:cable", 2),
            [
                "MMM",
                "SES",
                "MMM",
            ],
            {
                M: "integrateddynamics:crystalized_menril_chunk",
                S: "create:brass_sheet",
                E: "create:electron_tube",
            }
        )

        // Only need a few of these (one per storage system, i.e. Vault, Drawer Controller, etc.)
        // Made fairly expensive to avoid abusing for automation
        event.shaped(
            "integratedtunnels:part_interface_item",
            [
                "MEM",
                "BXB",
                "MEM",
            ],
            {
                E: "create:electron_tube",
                B: "minecraft:barrel",
                M: "integrateddynamics:crystalized_menril_block",
                X: "kubejs:brass_machine",
            }
        )

        // Not automatable, so made relatively cheap.
        event.shaped(
            "integratedterminals:part_terminal_storage",
            [
                "BEB",
                "CGC",
                "BEB",
            ],
            {
                E: "create:electron_tube",
                C: "integrateddynamics:cable",
                G: "minecraft:glass",
                B: "integrateddynamics:crystalized_menril_block",
            }
        )
    })
} else if (Platform.isLoaded("integrateddynamics") || Platform.isLoaded("integratedtunnels") || Platform.isLoaded("integratedterminals")) {
    throw "Missing IntegratedDynamics addon mods! Ensure all of the following are installed:\nIntegratedTunnels, IntegratedTerminals, IntegratedDynamics, Cyclops Core, CommonCapabilities."
}