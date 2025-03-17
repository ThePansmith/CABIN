JEIAddedEvents.registerCategories((event) => {
    event.custom("kubejs:straining", (category) => {
        let guiHelper = category.jeiHelpers.getGuiHelper();
        global.jeiCategories.straining.recipeType = category.recipeType;
        global.jeiCategories.straining.loadResources(guiHelper);

        category.title("Straining")
            .background(guiHelper.createBlankDrawable(146, 30))
            .icon(guiHelper.createDrawableItemStack(Item.of("mbd2:strainer")))
            .setIsRecipeHandledByCategory((recipe) => {
                return global.jeiCategories.straining.handlers["verifyRecipe"](category.jeiHelpers, recipe);
            })
            .setSetRecipeHandler((builder, recipe, focuses) => {
                global.jeiCategories.straining.handlers["setRecipe"](category.jeiHelpers, builder, recipe, focuses);
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                global.jeiCategories.straining.handlers["draw"](category.jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY);
            })
            .setTooltipHandler((recipe, recipeSlotsView, mouseX, mouseY) => {
                return global.jeiCategories.straining.handlers["tooltips"](category.jeiHelpers, recipe, recipeSlotsView, mouseX, mouseY);
            })
    });
});

JEIAddedEvents.registerRecipeCatalysts(event => {
    let addRecipeCatalyst = function(ingredient, recipeTypes) {
        return event.data["addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])"](ingredient, recipeTypes);
    }
    addRecipeCatalyst(Item.of("mbd2:strainer"), [global.jeiCategories.straining.recipeType]);
})

JEIAddedEvents.registerRecipes((event) => {
    let strainer_filter = Item.of("kubejs:strainer_filter"); strainer_filter.setDamageValue(1);
    event.custom("kubejs:straining")
        .add({input: strainer_filter, output: [{Item: "#kubejs:strainer/sands", Chance: 0.75}, {Item: "minecraft:clay_ball", Chance: 0.25}]})
});
