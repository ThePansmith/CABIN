const AC = (id, x) => MOD("aquaculture", id, x)
if(Platform.isLoaded("aquaculture")) {
	unregistered_axes.push("aquaculture:neptunium_axe")
	
	onEvent('recipes', event => {
		event.recipes.createCrushing([Item.of(AC('neptunium_ingot', 2)), Item.of(AC('neptunium_nugget', 5)).withChance(.5)], AC('neptunes_bounty')).processingTime(500)
		
		//we have to overwrite the recipe, replaceInput doesn't work for whatever reason
		event.shaped('waterstrainer:strainer_fisherman_reinforced', ['SSS', 'MAM', 'SSS'],
		{ A: AC('neptunium_ingot'), M: FD('canvas'), S: MC('bamboo') }).id('kubejs:specialty_strainer')
	})
}
