//Script file for recipes unrelated to progression involving the main mods in the pack
onEvent('recipes', event => {

	//Ae2
	event.remove({ output: AE2('vibration_chamber') })

	//Architect's palette tweaks
	event.remove({ id: AP('smelting/charcoal_block_from_logs_that_burn_smoking') })
	event.remove({ id: AP("charcoal_block") })
	event.stonecutting(AP("charcoal_block"), MC('charcoal'))
	donutCraft(event, AP('plating_block', 8), CR('iron_sheet'), MC('stone'))
	event.replaceInput({ id: "architects_palette:wither_lamp" }, AP('withered_bone'), TC('necrotic_bone'))
	event.replaceInput({ id: "architects_palette:withered_bone_block" }, AP('withered_bone'), TC('necrotic_bone'))
	event.remove({ id: "architects_palette:withered_bone" })
	
	//Create
	//casing recipe changes
	let tweak_casing = (name, mats, mod) => {
		event.remove({ output: mod(name + "_casing") })
		event.shapeless(Item.of(mod(name + "_casing"), 2), mats)
	}
	tweak_casing('andesite', [CR('andesite_alloy'), '#minecraft:logs'], CR)
	tweak_casing('copper', [CR('copper_sheet'), '#minecraft:logs'], CR)
	tweak_casing('railway', [CR('golden_sheet'), 'minecraft:deepslate'], CR)
	tweak_casing('brass', [CR('brass_sheet'), '#minecraft:logs'], CR)
	tweak_casing('zinc', [CD('zinc_sheet'), 'minecraft:stone'], KJ)
	tweak_casing('invar', [TE('invar_ingot'), 'minecraft:stone'], KJ)
	tweak_casing('enderium', [MC('ender_pearl'), 'minecraft:obsidian'], KJ)
	tweak_casing('fluix', [TE('lead_plate'), 'minecraft:blackstone'], KJ)
	tweak_casing('steel', [AL('steel_sheet'), '#minecraft:logs'], AL)
	tweak_casing('refined_radiance', [CR('refined_radiance'), '#minecraft:logs'], CR)
	tweak_casing('shadow_steel', [CR('shadow_steel'), '#minecraft:logs'], CR)
	//recipe changes
	event.replaceInput({ id: CR('crafting/kinetics/adjustable_chain_gearshift') }, CR('electron_tube'), MC('redstone'))
	event.replaceInput({ id: CR('crafting/kinetics/rope_pulley') }, '#forge:wool', '#supplementaries:ropes')
	//windmill recipe tweaks
	event.remove({ id: CR('crafting/kinetics/white_sail') })
	event.shaped('2x create:white_sail', [
		'SSS',
		'NAN',
		'SSS'
	], {
		A: '#forge:wool',
		N: 'minecraft:iron_nugget',
		S: 'minecraft:stick'
	})
	//tweak obsidian crushing recipe
	event.remove({ id: CR("crushing/obsidian") })
	event.recipes.createCrushing(CR("powdered_obsidian"), MC("obsidian"))
	//recompacting obsidian dust into their resources
	event.recipes.createCompacting(F("#dusts/obsidian"), MC("obsidian"))
	
	//Gravel and sand washing buff
	event.remove({ id: CR('splashing/gravel') })
	event.recipes.createSplashing([
		Item.of(MC('iron_nugget', 2)).withChance(0.125),
		Item.of(MC('flint')).withChance(0.25)
	], 'minecraft:gravel')
	
	event.remove({ id: CR('splashing/red_sand') })
	event.recipes.createSplashing([
		Item.of(MC('gold_nugget', 2)).withChance(0.125),
		Item.of(MC('dead_bush')).withChance(0.05)
	], 'minecraft:red_sand')
	
		//Farmer's delight
		//Fix farmer's delight recipe conflict with rechiseled
		event.remove({ id: FD("flint_knife") })
		event.remove({ id: FD("iron_knife") })
		event.remove({ id: FD("golden_knife") })
		event.remove({ id: FD("diamond_knife") })
		event.remove({ id: AL("mechanical_crafting/steel_knife") }) //mechanical crafting exclusive for some reason
		event.shaped(FD('flint_knife'), ['S ', ' M'], { M: MC("flint"), S: F('#rods/wooden') })
		event.shaped(FD('iron_knife'), ['S ', ' M'], { M: MC("iron_ingot"), S: F('#rods/wooden') })
		event.shaped(FD('golden_knife'), ['S ', ' M'], { M: MC("gold_ingot"), S: F('#rods/wooden') })
		event.shaped(FD('diamond_knife'), ['S ', ' M'], { M: MC("diamond"), S: F('#rods/wooden') })
		event.shaped(AL('steel_knife'), ['S ', ' M'], { M: F("#ingots/steel"), S: F('#rods/wooden') })
	
		//Modify farmer's delight log stripping
		event.remove({ input: '#minecraft:logs', type: 'farmersdelight:cutting' })
		//laziness and its consequences have been a distaster for the human race
		wood_types.forEach(wood => {
			let log = wood +'_log'
			if (!Item.exists(log)) {
				log = wood +'_stem'
			}
			let woodLog = wood +'_wood'
			if (!Item.exists(woodLog)) {
				woodLog = wood +'_hyphae'
			}
			let strippedLog = log.replace(':',':stripped_')
			let strippedWood = woodLog.replace(':',':stripped_')
				if (Item.exists(log) && Item.exists(strippedLog)) {
				event.custom({
					"type": "farmersdelight:cutting",
					"ingredients": [{ "item": log }],
					"tool": { "tag": "forge:tools/axes" },
					"result": [{ "item": strippedLog }, { "item": "farmersdelight:tree_bark" }]
				})
			}
			if (Item.exists(woodLog) && Item.exists(strippedWood)) {
				event.custom({
					"type": "farmersdelight:cutting",
					"ingredients": [{ "item": woodLog }],
					"tool": { "tag": "forge:tools/axes" },
					"result": [{ "item": strippedWood }, { "item": "farmersdelight:tree_bark" }]
				})
			}
		})
	
	//Forbidden and Arcanus
	event.remove({ id: "forbidden_arcanus:edelwood_bucket" })

	event.remove({ id: "forbidden_arcanus:edelwood_stick" })
	event.shaped("3x forbidden_arcanus:edelwood_stick", [
		'S',
		'A',
		'S'
	], {
		S: 'forbidden_arcanus:edelwood_planks',
		A: MC('stick')
	})
	//Eternal stella
	event.remove({ id: "forbidden_arcanus:eternal_stella" })
	event.shaped("forbidden_arcanus:eternal_stella", [
		'PEP',
		'SDS',
		'PEP'
	], {
		P: "forbidden_arcanus:xpetrified_orb",
		E: "minecraft:emerald",
		S: "forbidden_arcanus:stellarite_piece",
		D: "rubber_duck:rubber_duck_item"
	})
	//The hephaestus forge recipe is edited using a datapack

	//Ftbquests
	event.remove({ id:'ftbquests:loot_crate_opener'})

	//Occultism
	event.replaceOutput({ id: OC('crushing/obsidian_dust') }, OC('obsidian_dust'), CR('powdered_obsidian'))

	//Project Red Core
	event.remove({ mod: 'projectred_core' })
	event.recipes.createCompacting([PR_C('red_ingot')], [MC('copper_ingot'), Fluid.of(TE("redstone"), 250)])
	event.recipes.createCompacting([PR_C('red_ingot')], [MC('copper_ingot'), MC("redstone"), MC("redstone"), MC("redstone"), MC("redstone")])
	event.recipes.thermal.smelter(PR_C('red_ingot'), [MC("copper_ingot"), MC("redstone")])

	event.smelting(PR_C('plate', 2), 'minecraft:smooth_stone')

	colours.forEach(c=>{
		event.shapeless(PR_C(c+'_illumar'), [MC('glowstone_dust'), MC('glowstone_dust'), F('#dyes/'+c), F('#dyes/'+c)])

	})

	event.shaped(PR_C('screwdriver'), [
		'I  ',
		' IB',
		' BI'
	], {
		I: F('#ingots/iron'),
		B: F('#dyes/blue')
	})

	//The projectred transmission script replaces red ingot with red alloy wire
	event.shapeless(PR_C('platformed_plate'), [PR_C('plate'), PR_C('red_ingot'), CR("andesite_alloy")]).id('kubejs:platformed_plate')

	//Circuit cutting. Projectred Transmission circuit recipes are done in the circuit script
	let circuit = (id, override) => {
		if (override)
			event.remove({ output: id })
		event.stonecutting(Item.of(id, 1), PR_C('platformed_plate'))
	}

	circuit(MC("repeater"), false)
	circuit(MC("comparator"), false)
	circuit(CR("pulse_repeater"), true)
	circuit(CR("pulse_extender"), true)
	circuit(CR("powered_latch"), true)
	circuit(CR("powered_toggle_latch"), true)

	//Reliquary
	event.forEachRecipe({id: /alkahestry/}, recipe => {
		recipe.id(recipe.getId() + '_manual_only')
	})
	
	//Thermal Recipe Tweaks
	event.remove({ id: TE("augments/item_filter_augment") })
	event.shapeless(TE("item_filter_augment"), [CR("filter"), TE("lapis_gear")])
	//Energy duct recipe change
	event.remove({ output: TE('energy_duct') })
	event.shaped("8x thermal:energy_duct", [ 'PMP' ],
	{
		P: TE('invar_ingot'),
		M: MC('redstone')
	})
	//Augments that do nothing in 1.18.2
	event.remove({ id: TE("augments/rs_control_augment") })
	event.remove({ id: TE("augments/side_config_augment") })
	//why are these even recipes?
	event.remove({ id: TE('lightning_charge/zombified_piglin_from_pig')})
	event.remove({ id: TE('lightning_charge/witch_from_villager')})
	//duplicate storage block recipes
	event.remove({ id: TE('storage/carrot_block') })
	event.remove({ id: TE('storage/potato_block') })
	event.remove({ id: TE('storage/beetroot_block') })
	event.remove({ id: TE('building/crafting/compressed/bamboo_block')})
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
	//Gourmand fuel recipes for farmer's delight crates (the main food storage crates in the pack)
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('carrot_crate')}, 'energy': 48000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('potato_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('beetroot_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('cabbage_crate')}, 'energy': 32000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('onion_crate')}, 'energy': 32000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('tomato_crate')}, 'energy': 16000})
	//Igneous Extruder recipe
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

	//Tinker's construct
	//Obsidian pane crafting
	//Not sure where the original recipe went
	event.shaped(TC('obsidian_pane', 8), [
		'SSS',
		'SSS'
	], {
		S: MC('obsidian')
	})
	//melt blaze rods into blazing blood
	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:rods/blaze"	},
		"result": { "fluid": "tconstruct:blazing_blood", "amount": 100 },
		"temperature": 790,
		"time": 40
	})
	//Melt redstone into destabilized redstone
	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "item": MC('redstone') },
		"result": { "fluid": TE('redstone'), "amount": 100 },
		"temperature": 300,
		"time": 10
	});
	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "item": MC('redstone_block') },
		"result": { "fluid": TE('redstone'), "amount": 900 },
		"temperature": 500,
		"time": 90
	});
	//Remove enchanted apple melting recipe
	event.remove({ id: TC('smeltery/melting/metal/gold/enchanted_apple') })
	//Remove Tconstruct cheese since it only costs milk to craft and cheese already exists on the moon.
	event.remove({ id: TC('smeltery/casting/cheese_block')})
	event.remove({ id: TC('smeltery/casting/cheese_ingot_gold_cast')})
	event.remove({ id: TC('smeltery/casting/cheese_ingot_sand_cast')})

	//Water strainer
	//Might be considered a part of chapter 1
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
	{ A: FD('canvas'), M: FD('canvas'), S: 'minecraft:stick' })
	event.shaped('waterstrainer:strainer_fisherman', strainerPattern,
	{ A: FD('canvas'), M: FD('canvas'), S: MC('bamboo') })
	event.shaped('waterstrainer:strainer_fisherman_reinforced', strainerPattern,
	{ A: AC('neptunium_ingot'), M: FD('canvas'), S: MC('bamboo') })
})