if(Platform.isLoaded("create_factory_logistics")) {
    ServerEvents.recipes(event => {
        leadMachine(event,Item.of("create_factory_logistics:jar_packager", 1), "thermal:fluid_cell_frame")
        event.shapeless("create_factory_logistics:factory_fluid_gauge", ["create:factory_gauge", "kubejs:sealed_mechanism"]).id("create_factory_logistics:factory_fluid_gauge")
    })
}
