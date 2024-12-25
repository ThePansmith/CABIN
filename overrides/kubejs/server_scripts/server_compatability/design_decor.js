if(Platform.isLoaded("design_decor")) {
	let decorStones = [
		['minecraft', 'granite'],
		['minecraft', 'diorite'],
		['minecraft', 'andesite'],
		['minecraft', 'calcite'],
		['minecraft', 'dripstone'],
		['minecraft', 'deepslate'],
		['minecraft', 'tuff'],
		['create', 'asurine'],
		['create', 'crimsite'],
		['create', 'limestone'],
		['create', 'ochrum'],
		['create', 'scoria'],
		['create', 'scorchia'],
		['create', 'veridium']
	]
	onEvent('recipes', event => {

		// Missing Recipes Fix
		event.shaped('2x design_decor:copper_floodlight',[
			'MLM',
			' O '
		],{
			M: '#forge:ingots/copper',
			L: 'minecraft:redstone_torch',
			O: 'create:andesite_alloy'
		})
		event.stonecutting('4x design_decor:queen_slime_large_chain', '#forge:ingots/queens_slime')

		//Missing castel stone recipes
		decorStones.forEach(stoneName=>{
			let castelTypes = ['brick', 'tile']
			for (let i=0;i<castelTypes.length;++i) {
				event.shaped(Item.of(`design_decor:${stoneName[1]}_castel_${castelTypes[i]}_stairs`, 4), [
					'S  ',
					'SS ',
					'SSS'
				], {
					S: `design_decor:${stoneName[1]}_castel_${castelTypes[i]}s`
				})
				event.shaped(Item.of(`design_decor:${stoneName[1]}_castel_${castelTypes[i]}_slab`, 6), [
					'SSS'
				], {
					S: `design_decor:${stoneName[1]}_castel_${castelTypes[i]}s`
				})
				event.shaped(Item.of(`design_decor:${stoneName[1]}_castel_${castelTypes[i]}_wall`, 6), [
					'SSS',
					'SSS'
				], {
					S: `design_decor:${stoneName[1]}_castel_${castelTypes[i]}s`
				})
				event.shapeless(`design_decor:${stoneName[1]}_castel_${castelTypes[i]}s`, [`design_decor:${stoneName[1]}_castel_${castelTypes[i]}_slab`, `design_decor:${stoneName[1]}_castel_${castelTypes[i]}_slab`])
			}
		})
	})
	//Chiseling recipes
	onEvent('server.datapack.first', event => {
		decorStones.forEach(stoneName=>{
			addChiselingRecipe(event, `kubejs:chiseling_recipes/compat/design_decor/${stoneName[1]}`, [
				`${stoneName[0]}:${stoneName[1]}`, `design_decor:${stoneName[1]}_castel_bricks`, `design_decor:${stoneName[1]}_castel_tiles`
			])
		})
	})
}