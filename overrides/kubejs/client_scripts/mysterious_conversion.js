let MysteriousItemConversionCategory = java('com.simibubi.create.compat.jei.category.MysteriousItemConversionCategory')
let ConversionRecipe = java('com.simibubi.create.compat.jei.ConversionRecipe')
//Chapter 3 singularity recipe
MysteriousItemConversionCategory.RECIPES.add(ConversionRecipe.create('ae2:quantum_entangled_singularity', 'ae2:singularity')).id('kubejs:mysterious_conversion/quantum_entangled_singularity')
//Refined radiance mysterious conversion
MysteriousItemConversionCategory.RECIPES.add(ConversionRecipe.create('create:chromatic_compound', 'create:refined_radiance')).id('kubejs:mysterious_conversion/refined_radiance')