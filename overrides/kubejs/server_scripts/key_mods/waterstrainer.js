// priority: 1
onEvent('recipes', event => {
	//Might be considered as part of chapter 1
	event.remove({ id: 'waterstrainer:string_mesh' })
	event.remove({ id: 'waterstrainer:iron_mesh' })
	event.remove({ id: 'waterstrainer:obsidian_mesh' })
	event.remove({ id: 'waterstrainer:strainer_survivalist' })
	event.remove({ id: 'waterstrainer:strainer_survivalist_solid' })
	event.remove({ id: 'waterstrainer:strainer_survivalist_reinforced' })
	event.remove({ id: 'waterstrainer:strainer_fisherman' })
	event.remove({ id: 'waterstrainer:strainer_fisherman_solid' })
	event.remove({ id: 'waterstrainer:strainer_fisherman_reinforced' })
	
	let strainerPattern = ['SSS', 'MAM', 'SSS']
	event.shaped('waterstrainer:strainer_survivalist', strainerPattern,
	{ A: FD('canvas'), M: FD('canvas'), S: 'minecraft:stick' }).id('kubejs:sediment_strainer')
	event.shaped('waterstrainer:strainer_fisherman', strainerPattern,
	{ A: FD('canvas'), M: FD('canvas'), S: MC('bamboo') }).id('kubejs:fishing_strainer')

	//The Aquaculture mod script tweaks this recipe to use neptunium
	event.shaped('waterstrainer:strainer_fisherman_reinforced', strainerPattern,
	{ A: MC('heart_of_the_sea'), M: FD('canvas'), S: MC('bamboo') }).id('kubejs:specialty_strainer')
})