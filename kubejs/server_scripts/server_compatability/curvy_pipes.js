if (Platform.isLoaded("curvy_pipes")) {
    // Downcrafting/conversion recipes are done in curvy pipes config
    ServerEvents.recipes(event => {
        brassMachine(event, Item.of("curvy_pipes:small_item_pipe", 8), "create:package_frogport")
        copperMachine(event, Item.of("curvy_pipes:small_fluid_pipe", 4), "minecraft:lapis_block")
        event.shaped("8x curvy_pipes:small_energy_pipe", ["P", "M", "P"], {
            P: "thermal:invar_ingot",
            M: "minecraft:redstone"
        })
    })
}