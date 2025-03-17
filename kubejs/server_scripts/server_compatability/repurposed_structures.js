if (Platform.isLoaded("repurposed_structures")) {
    ServerEvents.tags("worldgen/structure_set", event => {
        event.get("cabin:overworld_surface_avoid")
            .add("repurposed_structures:fortresses_overworld")
            .add("repurposed_structures:mansions_overworld")
            .add("repurposed_structures:mansions_mangrove")
            .add("repurposed_structures:villages_overworld")
            .add("repurposed_structures:outposts_overworld")
            .add("repurposed_structures:cities_overworld")
            .add("repurposed_structures:pyramids_overworld")
            .add("repurposed_structures:witch_huts_overworld")
    })
}
