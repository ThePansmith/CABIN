if(Platform.isLoaded("reliquary")) {
	onEvent('recipes', event => {
		event.forEachRecipe({id: /alkahestry/}, recipe => {
			recipe.id(recipe.getId() + '_manual_only')
		})

		//Vials contain fluid
		let vialAmount = 240 //Should be mod 3, < 250
		let container = RQ('empty_potion_vial')
		let vials = ['glowing_water','angelheart_vial','aphrodite_potion','fertile_potion']
		let ingredients = [
			[Fluid.of(MC('water'),vialAmount),MC('glowstone_dust'),MC('nether_wart'),MC('gunpowder')],
			[Fluid.of(MC('milk'),vialAmount),RQ('infernal_claw'),RQ('fertile_essence',2)],
			[Fluid.of(MC('water'),vialAmount),RQ('fertile_essence'),MC('red_dye'),MC('cocoa_beans')],
			[Fluid.of(MC('water'),vialAmount),RQ('slime_pearl'),RQ('catalyzing_gland'),RQ('rib_bone')]
		]
		for (let i = 0; i < vials.length; i++) {
			var potion = Fluid.of(KJ(vials[i]),vialAmount)
			event.recipes.createFilling(RQ(vials[i]), [container, potion])
			event.recipes.createEmptying([container, potion], RQ(vials[i]))
			event.recipes.createMixing(potion, ingredients[i])
		}

		//Recipes
		event.recipes.createFilling(RQ('glowing_bread'),[F('#bread'),Fluid.of(KJ('fertile_potion'),vialAmount/3)])
		event.recipes.createMixing(RQ('holy_hand_grenade',4),[Fluid.of(KJ('glowing_water'),vialAmount),MC('gold_nugget'),MC('tnt'),RQ('catalyzing_gland')])

		event.recipes.createFilling(RQ('phoenix_down'), [RQ('angelic_feather'),Fluid.of(KJ('angelheart_vial'),vialAmount*3)])

		event.recipes.createFilling(RQ('fertile_essence'),[MC('green_dye'),Fluid.of(KJ('fertile_potion'),vialAmount)])
		event.recipes.createEmptying([MC('green_dye'),Fluid.of(KJ('fertile_potion'),vialAmount)], RQ('fertile_essence'))
		event.recipes.createMixing(RQ('witherless_rose'),[MC('rose_bush'),Fluid.of(KJ('fertile_potion'),vialAmount*4),F('#nether_stars',4)])
		event.recipes.createFilling(RQ('fertile_lily_pad'),[MC('lily_pad'),Fluid.of(KJ('fertile_potion'),vialAmount*3)])

	})
}