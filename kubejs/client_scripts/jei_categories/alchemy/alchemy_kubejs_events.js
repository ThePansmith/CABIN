JEIAddedEvents.registerCategories((event) => {
    event.custom("kubejs:alchemy", (category) => {
        let guiHelper = category.jeiHelpers.getGuiHelper();
        global.jeiCategories.alchemy.recipeType = category.recipeType;
        global.jeiCategories.alchemy.loadResources(guiHelper);

        category.title("Alchemical Laser")
            .background(guiHelper.createBlankDrawable(146, 70))
            .icon(guiHelper.createDrawableItemStack(Item.of("kubejs:alchemical_laser")))
            .setIsRecipeHandledByCategory((recipe) => {
                return global.jeiCategories.alchemy.handlers["verifyRecipe"](category.jeiHelpers, recipe);
            })
            .setSetRecipeHandler((builder, recipe, focuses) => {
                global.jeiCategories.alchemy.handlers["setRecipe"](category.jeiHelpers, builder, recipe, focuses);
            })
            .setDrawHandler((recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
                global.jeiCategories.alchemy.handlers["draw"](category.jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY);
            })
            .setTooltipHandler((recipe, recipeSlotsView, mouseX, mouseY) => {
                return global.jeiCategories.alchemy.handlers["tooltips"](category.jeiHelpers, recipe, recipeSlotsView, mouseX, mouseY);
            })
    });
});

JEIAddedEvents.registerRecipeCatalysts(event => {
    let addRecipeCatalyst = function(ingredient, recipeTypes) {
        return event.data["addRecipeCatalyst(net.minecraft.world.item.ItemStack,mezz.jei.api.recipe.RecipeType[])"](ingredient, recipeTypes);
    }
    addRecipeCatalyst(Item.of("thermal:machine_frame"), [global.jeiCategories.alchemy.recipeType]);
    addRecipeCatalyst(Item.of("kubejs:alchemical_laser"), [global.jeiCategories.alchemy.recipeType]);
    addRecipeCatalyst(Item.of("minecraft:hopper_minecart"), [global.jeiCategories.alchemy.recipeType]);
})

JEIAddedEvents.registerRecipes((event) => {
    event.custom("kubejs:alchemy")
        .add({input: ["thermal:flux_magnet", "minecraft:basalt"], output: "thermal:basalz_rod", energy: 80})
        .add({input: ["ae2:entropy_manipulator", "minecraft:snowball"], output: "thermal:blizz_rod", energy: 160});
});
