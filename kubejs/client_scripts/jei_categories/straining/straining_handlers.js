if (!global.jeiCategories.straining) global.jeiCategories.straining = {
    recipeType: null,
    resources: {
        jeiArrow: null
    },
    handlers: {
        verifyRecipe: undefined,
        setRecipe: undefined,
        draw: undefined,
        tooltips: undefined
    },
    loadResources: undefined
};

/**
 * @param {Internal.IGuiHelper} guiHelper
 */
global.jeiCategories.straining.loadResources = function(guiHelper) {
    global.jeiCategories.straining.resources.jeiArrow = guiHelper.createAnimatedDrawable(
        guiHelper.getRecipeArrowFilled(),
        60,
        JEIIDrawableAnimated.StartDirection.LEFT,
        false
    );
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers
 * @param {any} recipe
 * @returns
 */
global.jeiCategories.straining.handlers.verifyRecipe = function (jeiHelpers, recipe) {
    // IMPORTANT: Always return true or false. If you do not, it could crash the game or cause JEI to not work properly.
    if (!recipe) return false;
    if (!recipe.data) return false;
    if (!recipe.data.input) return false;
    if (!recipe.data.output) return false;

    return true;
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers
 * @param {Internal.IRecipeLayoutBuilder} builder
 * @param {any} recipe
 * @param {Internal.IFocusGroup} focuses
 */
global.jeiCategories.straining.handlers.setRecipe = function (jeiHelpers, builder, recipe, focuses) {
    let guiHelper = jeiHelpers.getGuiHelper()
    let inputItem = recipe.data.input;
    let outputItems = recipe.data.output;

    builder.addSlot("CATALYST", 8, 6)
        .addItemStack(Item.of(inputItem))
        .setStandardSlotBackground()
        .setBackground(guiHelper.getSlotDrawable(), -1, -1);

    for(let i = 0;i < 4;++i) {
        let slotBuilder = builder.addSlot("OUTPUT", 68 + (18 * i), 6)
        slotBuilder.setStandardSlotBackground()
        slotBuilder.setBackground(guiHelper.getSlotDrawable(), -1, -1);

        if (i < outputItems.length) {
            let itemName = outputItems[i].Item;
            let chance = outputItems[i].Chance;

            if (itemName.startsWith("#")) {
                slotBuilder.addItemStacks(Ingredient.of(itemName).getStacks().toArray());
            } else {
                slotBuilder.addItemStack(Item.of(itemName));
            }

            slotBuilder.addRichTooltipCallback((recipeSlotView, tooltip) => {
                let chancePercent = (Math.round(chance * 100)).toString();
                let text = Component.translatable("create.recipe.processing.chance", chancePercent).withStyle(ChatFormatting.GOLD)
                tooltip.add(text);
            });
        }
    }
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers
 * @param {any} recipe
 * @param {Internal.IRecipeSlotsView} recipeSlotsView
 * @param {Internal.GuiGraphics} guiGraphics
 * @param {number} mouseX
 * @param {number} mouseY
 */
global.jeiCategories.straining.handlers.draw = function (jeiHelpers, recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) {
    let guiHelper = jeiHelpers.getGuiHelper();
    guiHelper.getRecipeArrow().draw(guiGraphics, 34, 6);
    global.jeiCategories.straining.resources.jeiArrow.draw(guiGraphics, 34, 6);
}

/**
 * @param {Internal.IJeiHelpers} jeiHelpers
 * @param {any} recipe
 * @param {Internal.IRecipeSlotsView} recipeSlotsView
 * @param {number} mouseX
 * @param {number} mouseY
 * @returns {[Internal.Component]}
 */
global.jeiCategories.straining.handlers.tooltips = function(jeiHelpers, recipe, recipeSlotsView, mouseX, mouseY) {
    return [];
}
