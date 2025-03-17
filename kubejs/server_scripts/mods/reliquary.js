if(Platform.isLoaded("reliquary")) {
    ServerEvents.recipes(event => {
        event.forEachRecipe({id: /alkahestry/}, recipe => {
            recipe.id(recipe.getId() + "_manual_only")
        })
    })
}
