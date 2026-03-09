if (Platform.isLoaded("createcasing")) {
    JEIEvents.hideItems(event => {
        let woods = ["oak", "spruce", "birch", "jungle", "acacia", "dark_oak", "crimson", "warped", "cherry", "bamboo", "mangrove"]
        let types = ["shaft", "cogwheel", "large_cogwheel"]

        woods.forEach(wood => {
            types.forEach(type => {
                event.hide(`createcasing:${wood}_${type}`)
            })
        })

        event.hide("createcasing:glass_shaft")
        event.hide("createcasing:brass_shaft")

        let encasedcasings = [ "andesite", "railway", "creative", "brass", "copper", "industrial_iron", "refined_radiance", "weathered_iron", "shadow_steel"]

        encasedcasings.forEach(casing => {
            event.hide(`createcasing:${casing}_configurable_gearbox`)
        })
    })
}
