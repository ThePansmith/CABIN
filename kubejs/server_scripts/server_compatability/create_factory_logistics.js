if(Platform.isLoaded("create_factory_logistics")) {
    ServerEvents.recipes(event => {
        leadMachine(event,Item.of("create_factory_logistics:jar_packager", 1), "create:fluid_tank")

        event.replaceInput( {id: "create_factory_logistics:factory_fluid_gauge"}, "create_factory_logistics:fluid_mechanism", "kubejs:sealed_mechanism" )
    })
}
