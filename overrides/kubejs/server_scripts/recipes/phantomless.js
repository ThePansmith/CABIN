onEvent('recipes', event => {
		//phantom membrane alternatives
		event.replaceInput({ id: "forbidden_arcanus:mundabitur_dust" }, MC('phantom_membrane'), TE('apatite_dust'))
		event.recipes.createFilling("railways:track_phantom", [CR('track'), Fluid.of(CR('potion'), 50, '{Potion:"minecraft:invisibility"}')])
		event.recipes.createFilling("railways:track_phantom", [CR('track'), Fluid.of(CR('potion'), 50, '{Potion:"minecraft:long_invisibility"}')])
		event.recipes.createFilling("railways:track_phantom", [CR('track'), Fluid.of('cofh_core:potion', 50, '{Potion:"minecraft:invisibility"}')])
		event.recipes.createFilling("railways:track_phantom", [CR('track'), Fluid.of('cofh_core:potion', 50, '{Potion:"minecraft:long_invisibility"}')])

		event.shapeless("moreminecarts:levitation_powder", TE("blitz_powder"))
		event.recipes.createCrushing([Item.of("moreminecarts:levitation_powder"), Item.of("moreminecarts:levitation_powder", 1).withChance(.5)], TE("blitz_powder"))
})

//slow fall potion is in startup script potions.js