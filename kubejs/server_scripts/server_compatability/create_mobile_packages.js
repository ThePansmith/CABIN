if(Platform.isLoaded("create_mobile_packages")) {
    ServerEvents.recipes(event => {
        leadMachine(event,Item.of("create_mobile_packages:robo_bee", 1), "minecraft:honeycomb")
    })
}
