if (Platform.isLoaded("integrated_stronghold")) {
    ServerEvents.tags("worldgen/structure_set", event => {
        event.add("trials:trial_chambers_avoid", "integrated_stronghold:stronghold")
        event.add("dungeoncrawl:dungeons_avoid", "integrated_stronghold:stronghold")
    })
}
