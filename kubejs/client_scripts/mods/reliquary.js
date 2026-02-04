if (Platform.isLoaded("reliquary")) {
    JEIEvents.removeRecipes(event => {
        // Hide alkahestry recipes from the vanilla crafting category
        event.remove("minecraft:crafting", /reliquary:alkahestry\//)
        event.remove("minecraft:crafting", /kubejs:alkahestry\//)

        // Stuck around for some reason
        event.remove("reliquary:alkahestry_crafting", "reliquary:alkahestry/crafting/tin_ingot")
        event.remove("reliquary:alkahestry_crafting", "reliquary:alkahestry/crafting/silver_ingot")
    })
}
