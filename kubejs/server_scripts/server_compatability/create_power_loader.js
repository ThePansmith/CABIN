if (Platform.isLoaded("create_power_loader")) {
    onEvent("recipes", event => {
        andesiteMachine(event,Item.of("create_power_loader:empty_andesite_chunk_loader", 1), "minecraft:ghast_tear")
        brassMachine(event,Item.of("create_power_loader:empty_brass_chunk_loader", 1), "minecraft:nether_star")
    })
}
