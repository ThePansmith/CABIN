if (Platform.isLoaded("createrailwaysnavigator")) {
    ServerEvents.recipes(event => {
        goldMachine(event,Item.of("createrailwaysnavigator:advanced_display", 1), "create:display_board")
        goldMachine(event,Item.of("createrailwaysnavigator:train_station_clock", 1), "minecraft:clock")
        goldMachine(event,Item.of("createrailwaysnavigator:navigator", 1), "create:display_link")
    })
}
