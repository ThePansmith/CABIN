if(Platform.isLoaded("extra_gauges")) {
    ServerEvents.recipes(event => {
        event.replaceInput( {mod: "extra_gauges"}, "create:precision_mechanism", "create:factory_gauge" )
        event.replaceInput( {mod: "extra_gauges"}, "create:sturdy_sheet", "minecraft:obsidian" )
    })
}
