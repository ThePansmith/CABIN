// let MysteriousItemConversionCategory = Java.loadClass('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')
const ConversionRecipe = Java.loadClass('com.simibubi.create.compat.jei.ConversionRecipe')

//We have to brute force things since the kubejs create guide doesn't work at all
JEIEvents.removeRecipes(event => {
    const mysteryConversion = global.jeiRuntime.jeiHelpers.getRecipeType('create:mystery_conversion').get()
		global.jeiRuntime.recipeManager.addRecipes(mysteryConversion, [
			//Chapter 3 singularity recipe
			new ConversionRecipe.create('ae2:singularity', 'ae2:quantum_entangled_singularity'),
			//Refined radiance mysterious conversion
			new ConversionRecipe.create('create:chromatic_compound', 'create:refined_radiance'),
			new ConversionRecipe.create('create:chromatic_compound', 'create:shadow_steel')
		]);
})