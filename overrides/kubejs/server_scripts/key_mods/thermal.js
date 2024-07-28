// priority: 1
onEvent('recipes', event => {
	//filter augment recipe change
	event.remove({ id: TE("augments/item_filter_augment") })
	event.shapeless(TE("item_filter_augment"), [CR("filter"), TE("lapis_gear")])
	//Augments that do nothing in 1.18.2
	event.remove({ id: TE("augments/rs_control_augment") })
	event.remove({ id: TE("augments/side_config_augment") })
	//Silver replacements
	event.replaceInput({ id: TE('augments/rf_coil_storage_augment') }, F('#ingots/silver'), F('#ingots/iron'))
	event.replaceInput({ id: TE('augments/rf_coil_xfer_augment') }, F('#ingots/silver'), F('#ingots/iron'))
	event.replaceInput({ id: TE('augments/rf_coil_augment') }, F('#ingots/silver'), F('#ingots/iron'))
	event.replaceInput({ id: TE('tools/detonator') }, F('#ingots/silver'), F('#ingots/lead'))
	//why are these even recipes?
	event.remove({ id: TE('lightning_charge/zombified_piglin_from_pig')})
	event.remove({ id: TE('lightning_charge/witch_from_villager')})
	//duplicate storage block recipes
	event.remove({ id: TE('storage/carrot_block') })
	event.remove({ id: TE('storage/potato_block') })
	event.remove({ id: TE('storage/beetroot_block') })
	//Obsidian pulverizing
	event.recipes.thermal.pulverizer([CR("powdered_obsidian")], F("#obsidian")).energy(7000)
	//Ender pearl pulverizing
	event.replaceOutput({ id: TE('machines/pulverizer/pulverizer_ender_pearl') }, TE('ender_pearl_dust'), AE2('ender_dust'))
	event.replaceOutput({ id: TE('earth_charge/ender_pearl_dust_from_ender_pearl') }, TE('ender_pearl_dust'), AE2('ender_dust'))
	//Bitumen crushing recipes
	event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("sand")).withChance(0.25)], TE("oil_sand"))
	event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("red_sand")).withChance(0.25)], TE("oil_red_sand"))
	//ruby and sapphire block recipes
	let blockTemplate = [ 'III', 'III',	'III'	]
	event.shaped(TE('ruby_block', 1), blockTemplate, { I: F('#gems/ruby')	})
	event.shapeless(TE('ruby', 9), [F('#storage_blocks/ruby')])
	event.shaped(TE('sapphire_block', 1), blockTemplate, { I: F('#gems/sapphire')	})
	event.shapeless(TE('sapphire', 9), [F('#storage_blocks/sapphire')])
	//Make molten glass with the cruicible
	event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), F("#sand")).energy(6000)
	event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), F("#glass/colorless")).energy(3000)
	//Gourmand fuel recipes for farmer's delight crates
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('carrot_crate')}, 'energy': 48000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('potato_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('beetroot_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('cabbage_crate')}, 'energy': 32000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('onion_crate')}, 'energy': 32000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('tomato_crate')}, 'energy': 16000})
	//Igneous Extruder recipes
	let bedrock_cobblegen = (adjacent, output) => {
		event.custom({
			"type": "thermal:rock_gen",
			"adjacent": adjacent,
			"below": "minecraft:bedrock",
			"result": { "item": output }
		})
	}
	bedrock_cobblegen(MC("packed_ice"), MC("andesite"))
	bedrock_cobblegen(AP("polished_packed_ice"), MC("granite"))
	bedrock_cobblegen(AP("chiseled_packed_ice"), MC("diorite"))
	//Also add igneous extruder recipes for the 2 create stone gen recipes
	event.custom({
		"type": "thermal:rock_gen",
		"adjacent": "create:chocolate",
		"result": { "item": "create:scoria"}
	})
	event.custom({
		"type": "thermal:rock_gen",
		"adjacent": "create:honey",
		"result": { "item": "create:limestone"}
	})

	//thermal dynamics stuff
	//thermal dynamics might be split into a compatability mod eventually

	//Energy duct recipe change
	event.remove({ output: TE('energy_duct') })
	event.shaped("8x thermal:energy_duct", [ 'PMP' ],
	{
		P: TE('invar_ingot'),
		M: MC('redstone')
	})
})