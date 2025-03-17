if (Platform.isLoaded("dungeoncrawl")) {
    ServerEvents.lowPriorityData(event => {
        event.addJson("dungeoncrawl:worldgen/structure_set/dungeons", {
            "structures": [
                {
                    "structure": "dungeoncrawl:dungeon",
                    "weight": 1
                }
            ],
            "placement": {
                "type": "integrated_api:advanced_random_spread",
                "super_exclusion_zone": {
                    "chunk_count": 12,
                    "other_set": "#dungeoncrawl:dungeons_avoid"
                },
                "salt": 10387313,
                "spacing": 32,
                "separation": 12
            }
        })
    })

    ServerEvents.tags("worldgen/structure_set", event => {
        event.add("cabin:overworld_surface_avoid", "dungeoncrawl:dungeons")
        event.add("trials:trial_chambers_avoid", "dungeoncrawl:dungeons")
    })
}
