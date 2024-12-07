if(Platform.isLoaded("design_decor")) {
	onEvent('recipes', event => {

		// Missing Recipes Fix
		event.shaped('2x design_decor:copper_floodlight',[
			'MLM',
			' O '],{
			M: '#forge:ingots/copper',
			L: 'minecraft:redstone_torch',
			O: 'create:andesite_alloy'
		})
		event.stonecutting('4x design_decor:queen_slime_large_chain', '#forge:ingots/queens_slime')
	})
}