// priority: 1
onEvent('recipes', event => {
	// Expanded Caves --- This mod is alpha and it really shows in some places
	//Dev forgot to add pressure plate recipes to the mod so we add them ourselves.
	let pressurePlateMaterials = ["sediment_stone", "lavastone", "polished_lavastone", "dirtstone", "dirtstone_cobble", "marlstone", "bricks_ice", "bricks_snow"]
	pressurePlateMaterials.forEach(str=>{
		event.shaped(`expcaves:${str}_pressure_plate`, [
			'SS'
		], {
			S: `expcaves:${str}`
		}).id(`kubejs:expcaves/${str}_pressure_plate`)
	})

	//snow and ice brick --- these are probably intended for the structures that never got ported. But we'll give them recipes
	event.shaped(Item.of('expcaves:bricks_snow',4), [
		'SS',
		'SS'
	], {
		S: `minecraft:snow_block`
	}).id(`kubejs:expcaves/bricks_snow`)

	event.shaped(Item.of('expcaves:bricks_ice',4), [
		'SS',
		'SS'
	], {
		S: `architects_palette:polished_packed_ice`
	}).id(`kubejs:expcaves/bricks_ice`)

	//broken stone
	event.recipes.createPressing(['expcaves:broken_stone'], 'minecraft:stone').id('kubejs:pressing/broken_stone')
	event.recipes.createPressing(['expcaves:broken_deepslate'], 'minecraft:deepslate').id('kubejs:pressing/broken_deepslate')

	//flint rock
	event.custom({ "type": "create:haunting",
	"ingredients": [{"item": "minecraft:flint"}],
		"results": [
			{
			"item": "expcaves:rock_flint"
			}
		]
	}).id('kubejs:haunting/rock_flint')

	//stalagmites
	let stalagmites = ["stone", "andesite", "diorite", "granite", "tuff", "deepslate", "packed_ice", "netherrack", "blackstone"]
	stalagmites.forEach(str=>{
		event.stonecutting(Item.of(`expcaves:${str}_stalagmite`, 2), `minecraft:${str}`).id(`kubejs:stonecutting/${str}_stalagmite`)
		event.stonecutting(Item.of(`expcaves:${str}_stalactite`, 2), `minecraft:${str}`).id(`kubejs:stonecutting/${str}_stalactite`)
		event.stonecutting(`expcaves:${str}_tall_stalagmite`, `minecraft:${str}`).id(`kubejs:stonecutting/${str}_tall_stalagmite`)
		event.stonecutting(`expcaves:${str}_tall_stalactite`, `minecraft:${str}`).id(`kubejs:stonecutting/${str}_tall_stalactite`)
	})
	stalagmites = ["sediment_stone", "lavastone"]
	stalagmites.forEach(str=>{
		event.stonecutting(Item.of(`expcaves:${str}_stalagmite`, 2), `expcaves:${str}`).id(`kubejs:stonecutting/${str}_stalagmite`)
		event.stonecutting(Item.of(`expcaves:${str}_stalactite`, 2), `expcaves:${str}`).id(`kubejs:stonecutting/${str}_stalactite`)
		event.stonecutting(`expcaves:${str}_tall_stalagmite`, `expcaves:${str}`).id(`kubejs:stonecutting/${str}_tall_stalagmite`)
		event.stonecutting(`expcaves:${str}_tall_stalactite`, `expcaves:${str}`).id(`kubejs:stonecutting/${str}_tall_stalactite`)
	})
})

//chiseling recipes
onEvent('server.datapack.first', event => {
	addChiselingRecipe(event, 'rechiseled:chiseling_recipes/basalt', ["expcaves:lavastone", "expcaves:polished_lavastone"])
	addChiselingRecipe(event, 'rechiseledcreate:chiseling_recipes/limestone', ["expcaves:sediment_stone"])
})
onEvent('block.loot_tables', event => {
	// --- Fixing Expanded Caves' buggy loot tables ---
	//remove plant fibre from expanded caves drops since it has no uses
	let shears_drops_self = {
		type: "minecraft:block",
		pools: [
			{
				rolls: 1,
				bonus_rolls: 0,
				entries: [
					{
						type: "minecraft:item",
						name: "expcaves:dry_moss",
						conditions: [
							{
								condition: "minecraft:match_tool",
								predicate: {
									items: [ "minecraft:shears"	]
								}
							}
						]
					}
				]
			}
		]
	}

	event.addJson("expcaves:dry_moss", shears_drops_self)
	shears_drops_self.pools[0].entries[0].name = "expcaves:cave_vine_end"
	event.addJson("expcaves:cave_vine", shears_drops_self)
	event.addJson("expcaves:cave_vine_end", shears_drops_self)

	//stalactites with broken drops
	let stalagmite = {
		type: "minecraft:block",
		pools: [
			{
				rolls: 1,
				bonus_rolls: 0,
				entries: [
					{
						type: "minecraft:alternatives",
						children: [
							{
								type: "minecraft:item",
								name: "expcaves:packed_ice_stalagmite",
								conditions: [
									{
										condition: "minecraft:match_tool",
										predicate: {
											enchantments: [
												{
													enchantment: "minecraft:silk_touch",
													levels: { min: 1 }
												}
											]
										}
									}
								]
							}
						]
					}
				]
			}
		]
	}

	event.addJson("expcaves:packed_ice_stalagmite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:packed_ice_stalactite"
	event.addJson("expcaves:packed_ice_stalactite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:packed_ice_tall_stalagmite"
	event.addJson("expcaves:packed_ice_tall_stalagmite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:packed_ice_tall_stalactite"
	event.addJson("expcaves:packed_ice_tall_stalactite", stalagmite)

	stalagmite.pools[0].entries[0].children.push({
		type: "minecraft:item",
		name: "expcaves:netherrack_pebble",
		functions: [
			{ function: "minecraft:set_count", count: 3 }
		],
		conditions: [
			{ condition: "minecraft:survives_explosion" }
		]
	})

	stalagmite.pools[0].entries[0].children[0].name = "expcaves:netherrack_stalagmite"
	event.addJson("expcaves:netherrack_stalagmite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:netherrack_stalactite"
	event.addJson("expcaves:netherrack_stalactite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:netherrack_tall_stalagmite"
	stalagmite.pools[0].entries[0].children[1].functions[0].count = 5
	event.addJson("expcaves:netherrack_tall_stalagmite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:netherrack_tall_stalactite"
	event.addJson("expcaves:netherrack_tall_stalactite", stalagmite)

	stalagmite.pools[0].entries[0].children[1].name = "expcaves:blackstone_pebble"
	stalagmite.pools[0].entries[0].children[1].functions[0].count = 3
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:blackstone_stalagmite"
	event.addJson("expcaves:blackstone_stalagmite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:blackstone_stalactite"
	event.addJson("expcaves:blackstone_stalactite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:blackstone_tall_stalagmite"
	stalagmite.pools[0].entries[0].children[1].functions[0].count = 5
	event.addJson("expcaves:blackstone_tall_stalagmite", stalagmite)
	stalagmite.pools[0].entries[0].children[0].name = "expcaves:blackstone_tall_stalactite"
	event.addJson("expcaves:blackstone_tall_stalactite", stalagmite)

	//Fix broken deepslate dropping cobblestone
	event.addJson("expcaves:broken_deepslate", {
		type: "minecraft:block",
		pools: [
			{
				rolls: 1,
				bonus_rolls: 0,
				entries: [
					{
						type: "minecraft:alternatives",
						children: [
							{
								type: "minecraft:item",
								name: "expcaves:broken_deepslate",
								conditions: [
									{
										condition: "minecraft:match_tool",
										predicate: {
											enchantments: [
												{
													enchantment: "minecraft:silk_touch",
													levels: { min: 1 }
												}
											]
										}
									}
								]
							},
							{
								type: "minecraft:item",
								name: "minecraft:cobbled_deepslate",
								conditions: [
									{ condition: "minecraft:survives_explosion" }
								]
							}
						]
					}
				]
			}
		]
	})
})