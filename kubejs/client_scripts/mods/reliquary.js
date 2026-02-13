if (Platform.isLoaded("reliquary")) {
    ClientEvents.highPriorityAssets(event => {
        let json = {
            "filters": [
                // Hide alkahestry in the crafting category because alkahestry has its own emi categories
                {
                    "id": "/reliquary:alkahestry\\//",
                    "category": "minecraft:crafting"
                },
                {
                    "id": "/kubejs:alkahestry\\//",
                    "category": "minecraft:crafting"
                },
                // Hide removed alkahestry recipes because they stick aroung for some reason?
                {
                    "id": "jei:/reliquary/alkahestry/crafting/tin_ingot",
                    "category": "reliquary:alkahestry_crafting"
                },
                {
                    "id": "jei:/reliquary/alkahestry/crafting/silver_ingot",
                    "category": "reliquary:alkahestry_crafting"
                }
            ]
        }
        event.add("emi:recipe/filters/reliquary", json)
    })
}
