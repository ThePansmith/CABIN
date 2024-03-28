// priority: 1

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

var seed
var log = []

// Mod shortcuts
let MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')
let AE2 = (id, x) => MOD("ae2", id, x)
let TE = (id, x) => MOD("thermal", id, x)
let AP = (id, x) => MOD("architects_palette", id, x)
let LV = (id, x) => MOD("libvulpes", id, x)
let CR = (id, x) => MOD("create", id, x)
let CD = (id, x) => MOD("createdeco", id, x)
let TC = (id, x) => MOD("tconstruct", id, x)
let MC = (id, x) => MOD("minecraft", id, x)
let KJ = (id, x) => MOD("kubejs", id, x)
let EG = (id, x) => MOD("endergetic", id, x)
let FD = (id, x) => MOD("farmersdelight", id, x)
let BOP = (id, x) => MOD("biomesoplenty", id, x)
let PR_C = (id, x) => MOD("projectred_core", id, x)
let PR_T = (id, x) => MOD("projectred_transmission", id, x)
let PR_I = (id, x) => MOD("projectred_illumination", id, x)
let RQ = (id, x) => MOD("reliquary", id, x)
let SD = (id, x) => MOD("storagedrawers", id, x)
let SP = (id, x) => MOD("supplementaries", id, x)
let F = (id, x) => MOD("forge", id, x)
let AC = (id, x) => MOD("aquaculture", id, x)
let PP = (id, x) => MOD("prettypipes", id, x)
let OC = (id, x) => MOD("occultism", id, x)
let BE = (id, x) => MOD("beyond_earth", id, x)
let AL = (id, x) => MOD("alloyed", id, x)
let QU = (id, x) => MOD("quark", id, x)
//

let colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']
let native_metals = ['iron', 'zinc', 'lead', 'copper', 'nickel', 'gold']
let wood_types = [MC('oak'), MC('spruce'), MC('birch'), MC('jungle'), MC('acacia'), MC('dark_oak'), MC('crimson'), MC('warped'), BOP('fir'), BOP('redwood'), BOP('cherry'), BOP('mahogany'), BOP('jacaranda'), BOP('palm'), BOP('willow'), BOP('dead'), BOP('magic'), BOP('umbran'), BOP('hellbark'), AP('twisted')]

let donutCraft = (event, output, center, ring) => {
	return event.shaped(output, [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: center,
		S: ring
	})
}

function ifiniDeploying(output, input, tool) {
	return {
		"type": "create:deploying",
		"ingredients": [
			Ingredient.of(input).toJson(),
			Ingredient.of(tool).toJson()
		],
		"results": [
			Item.of(output).toResultJson()
		],
		"keepHeldItem": true
	}
}

onEvent('recipes', event => {
	log.push('Registering Recipes')
	beforeNuke(event)
	unwantedRecipes(event)
	tweaks(event)
	unify(event)
	trickierWindmills(event)
	rubberMatters(event)
	prettierpipes(event)
	algalAndesite(event)
	oreProcessing(event)
	alloys(event)
	electronTube(event)
	andesiteMachine(event)
	goldMachine(event)
	copperMachine(event)
	brassMachine(event)
	zincMachine(event)
	invarMachine(event)
	enderMachine(event)
	fluixMachine(event)
	circuits(event)
	madMaths(event)
	alchemy(event)
	barrels(event)
	rocketScience(event)
	drawersop(event)
	trading(event)
	glitch(event)
	stripping(event)
	log.push('Recipes Updated')
})

onEvent('item.tags', event => {

	colours.forEach(element => {
		event.get(F('glazed_terracotta')).add(MC(`${element}_glazed_terracotta`))
	});

	global.trades.forEach(element => {
		event.get('forge:trade_cards').add(`kubejs:trade_card_${element}`)
	});

	global.professions.forEach(element => {
		event.get('forge:profession_cards').add(`kubejs:profession_card_${element}`)
	});

	event.get("farmersdelight:offhand_equipment").add("forbidden_arcanus:obsidian_skull_shield")

//	event.get("forge:raw_chicken").add("exoticbirds:raw_birdmeat")
	let unregistered_axes = [
		"ae2:certus_quartz_axe",
		"ae2:nether_quartz_axe",
		"ae2:fluix_axe",
		"tconstruct:hand_axe",
		"tconstruct:mattock",
		"tconstruct:broad_axe",
		"buddycards:buddysteel_axe",
		"thermal:flux_saw",
		"aquaculture:neptunium_axe",
		"forbidden_arcanus:draco_arcanus_axe",
		"forbidden_arcanus:arcane_golden_axe",
		"forbidden_arcanus:reinforced_arcane_golden_axe",
		"alloyed:steel_axe"
	]
	
	unregistered_axes.forEach(axe => {
		event.get("forge:tools/axes").add(axe)
	});
	
	event.get("forge:vines").add(MC("vine")).add(BOP("willow_vine")).add(BOP("spanish_moss"))
	event.get("forge:recycling")
//		.add("extcaves:rusty_pickaxe")
//		.add("extcaves:rusty_sword")
//		.add("extcaves:iron_dagger")
//		.add("extcaves:gourmet_spoon")
//		.add("extcaves:gourmet_fork")
//		.add("extcaves:chef_knife")
//		.add("extcaves:butcher_knife")

	event.get("forge:circuit_press")
		.add(AE2("name_press"))
		.add(AE2("silicon_press"))
		.add(AE2("logic_processor_press"))
		.add(AE2("engineering_processor_press"))
		.add(AE2("calculation_processor_press"))

	event.get("forbidden_arcanus:modifier/eternal_incompatible")
		.add(/exchangers:.*/)
//		.add(/advancedrocketry:.*/)
		.add(/reliquary:.*/)
		.add(/waterstrainer:.*/)
		.add(OC("#miners/ores"))
		.add(PR_C("draw_plate"))
		.add(PR_C("multimeter"))

	event.get("minecraft:planks").add("forbidden_arcanus:mysterywood_planks").add("forbidden_arcanus:cherrywood_planks")
	event.get("minecraft:logs_that_burn").add("#forbidden_arcanus:mysterywood_logs").add("#forbidden_arcanus:cherrywood_logs")

	event.get('kubejs:saws').add('cb_microblock:stone_saw').add('cb_microblock:iron_saw').add('cb_microblock:diamond_saw')
	event.get('kubejs:screwdrivers').add(PR_C('screwdriver'))
	event.get('kubejs:chromatic_resonators').add(KJ('chromatic_resonator'))
	event.get('kubejs:flash_drives').add(KJ('flash_drive'))
	//event.get('kubejs:ender_staffs').add(RQ('ender_staff'))
	//event.get('kubejs:cross_of_mercys').add(KJ('mercy_cross'))
	//event.get('kubejs:super_glues').add(CR('super_glue'))
	//event.get('kubejs:wrenches').add(CR('wrench'))
	event.get('forge:tools/wrench').add(CR('wrench'))
	event.get('thermal:crafting/dies').add('#forge:trade_cards')
	event.get('thermal:crafting/dies').add('#forge:profession_cards')
	event.get('thermal:crafting/casts').add(KJ("three_cast")).add(KJ("eight_cast")).add(KJ("plus_cast")).add(KJ("minus_cast")).add(KJ("multiply_cast")).add(KJ("divide_cast")).add(F("#circuit_press"))

	event.get('create:upright_on_belt')
		.add(AE2("red_paint_ball"))
		.add(AE2("yellow_paint_ball"))
		.add(AE2("green_paint_ball"))
		.add(AE2("blue_paint_ball"))
		.add(AE2("magenta_paint_ball"))
		.add(AE2("black_paint_ball"))

	event.get('tconstruct:anvil_metal').add(CR('zinc_block'))

//	event.get('chisel:basalt').add('extcaves:lavastone').add('extcaves:polished_lavastone')
//	event.get('chisel:limestone').add('extcaves:sedimentstone').add('darkerdepths:limestone').add('darkerdepths:aridrock')

//	let stones = ["limestone", "dolomite"]
//	stones.forEach(e => {
//		event.get(e == "dolomite" ? "chisel:marble" : 'chisel:' + e)
//			.add(CR(`${e}`))
//			.add(CR(`polished_${e}`))
//			.add(CR(`${e}_bricks`))
//			.add(CR(`fancy_${e}_bricks`))
//			.add(CR(`${e}_pillar`))
//			.add(CR(`paved_${e}`))
//			.add(CR(`layered_${e}`))
//			.add(CR(`chiseled_${e}`))
//			.add(CR(`mossy_${e}`))
//			.add(CR(`overgrown_${e}`))
//	})

//	let v_stones = ["andesite", "diorite", "granite"]
//	v_stones.forEach(e => {
//		event.get('chisel:' + e)
//			.add(CR(`${e}_bricks`))
//			.add(CR(`fancy_${e}_bricks`))
//			.add(CR(`${e}_pillar`))
//			.add(CR(`paved_${e}`))
//			.add(CR(`layered_${e}`))
//			.add(CR(`mossy_${e}`))
//			.add(CR(`overgrown_${e}`))
//	})

	event.get("forge:treasure1")
		.add(MC('cobweb'))
		.add(MC('dandelion'))
		.add(MC('poppy'))
		.add(MC('jungle_sapling'))
		.add(MC('brown_mushroom'))
		.add(MC('red_mushroom'))
		.add(MC('bamboo'))
		.add(MC('ladder'))
		.add(MC('chain'))
		.add(MC('flower_pot'))
		.add(MC('painting'))
		.add(MC('iron_nugget'))
		.add(MC('gold_nugget'))
		.add(CR('copper_nugget'))
		.add(CR('zinc_nugget'))
		.add(MC('charcoal'))
		.add(MC('rotten_flesh'))
		.add(MC('pumpkin_seeds'))
		.add(MC('melon_seeds'))
		.add(MC('bone_meal'))
		.add(MC('paper'))
		.add(FD('raw_pasta'))
		.add(AP('algal_blend'))
		.add(FD('tree_bark'))
		.add(CR('cogwheel'))
		.add(KJ('sky_slimy_fern_leaf'))
		.add(KJ('earth_slimy_fern_leaf'))
		.add(KJ('ender_slimy_fern_leaf'))
		.add(TE('rubber'))
		.add(TE('phytogro'))
		.add(CR('andesite_alloy'))
		.add(MC('poisonous_potato'))

	event.get("forge:treasure2")
		.add(MC('lantern'))
		.add(MC('redstone'))
		.add(MC('bow'))
		.add(FD('rice'))
		.add(SP('copper_lantern'))
		.add(SP('brass_lantern'))
		.add(SP('sconce'))
		.add(SP('rope_arrow'))
		.add(SP('slingshot'))
		.add(SP('flax_seeds'))
		.add(SP('bomb'))
		.add(FD('sweet_berry_cookie'))
		.add(FD('cabbage_seeds'))
		.add(FD('tomato_seeds'))
		.add(MC('scute'))
		.add(MC('iron_ingot'))
		.add(MC('copper_ingot'))
		.add(CR('zinc_ingot'))
		.add(TE('rosin'))
		.add(MC('spider_eye'))
		.add(MC('nether_brick'))
		.add(MC('beetroot_seeds'))
		.add(MC('book'))
		.add(MC('name_tag'))
		.add(FD('rope'))
		.add(CR('cinder_flour'))
		.add(TC('seared_brick'))
		.add(FD('canvas'))
		.add(TE('cinnabar'))
		.add(TE('sulfur'))
		.add(TE('niter'))
		.add(TE('apatite'))
		.add(MC('compass'))
		.add(MC('experience_bottle'))
		.add(MC('golden_carrot'))
//		.add('antiqueatlas:empty_antique_atlas')

	event.get("forge:treasure3")
		.add(MC('skeleton_skull'))
		.add(MC('clock'))
		.add(MC('diamond'))
		.add(MC('lapis_lazuli'))
		.add(MC('zombie_head'))
		.add(CR('rose_quartz'))
		.add(CR('brass_hand'))
		.add(MC('saddle'))
		.add(AE2('certus_quartz_crystal'))
		.add(AE2('fluix_crystal'))
		.add(TE('ice_charge'))
		.add(TE('lightning_charge'))
		.add(TE('earth_charge'))
		.add(PR_C('red_ingot'))
		.add(TE('ruby'))
		.add(TE('sapphire'))
		.add(CR('peculiar_bell'))
		.add(MC('spectral_arrow'))
		.add(MC('gold_ingot'))
		.add(MC('magma_cream'))
		.add(MC('ghast_tear'))
		.add(MC('quartz'))
		.add(MC('prismarine_shard'))
		.add(MC('prismarine_crystals'))
		.add(MC('chorus_fruit'))
		.add(MC('blaze_powder'))

})

// Scripts

function beforeNuke(event) {
	event.replaceInput({ id: "occultism:ritual/summon_foliot_crusher" }, F("#ores/silver"), CR("zinc_ore"))
}

function unwantedRecipes(event) {
	event.remove({ output: AE2('grindstone') })
	event.remove({ output: TE('tin_block') })
	event.remove({ output: AE2('vibration_chamber') })
	event.remove({ output: AE2('inscriber') })
	event.remove({ output: AE2('quartz_glass') })
	event.remove({ output: CR('chromatic_compound') })
	event.remove({ input: '#forge:coins' })
	event.remove({ input: '#forge:ores/redstone' })
	event.remove({ input: '#create:crushed_raw_materials' })
	event.remove({ input: '#forge:ores/tin' })
	event.remove({ input: '#forge:ores/silver' })
	event.remove({ output: '#forge:plates/tin' })
	event.remove({ output: '#forge:gears/tin' })
	event.remove({ type: AE2('grinder') })
	event.remove({ type: TE('press') })
	event.remove({ id: /thermal:earth_charge\/.*/ })
	event.remove({ id: /thermal:machines\/smelter\/.*dust/ })
	event.remove({ id: /tconstruct:smeltery\/.*\/ore/ })
	event.remove({ id: "tconstruct:smeltery/entity_melting/ender" })
	event.remove({ id: "tconstruct:tables/tinkers_forge" })
	event.remove({ id: "tconstruct:tables/scorched_forge" })
	event.remove({ id: /tconstruct:smeltery\/melting\/ender\/.*/ })
	event.remove({ id: /tconstruct:smeltery\/casting\/ender\/.*/ })
	event.remove({ id: /tconstruct:smeltery\/.*\/coin.*/ })
	event.remove({ id: /tconstruct:smeltery\/.*\/tin.*/ })
	event.remove({ id: /ae2:tools\/paintballs.*/ })
	event.remove({ id: "grapplemod:repeller" })
	event.remove({ id: "grapplemod:forcefieldupgradeitem" })
	event.remove({ id: "grapplemod:rocketupgradeitem" })
	event.remove({ id: "grapplemod:rocketdoublemotorhook" })
	event.remove({ id: "grapplemod:magnethook" })
	event.remove({ id: "grapplemod:rockethook" })
	event.remove({ id: "forbidden_arcanus:eternal_stella" })
	event.remove({ id: OC('miner/ores/redstone_ore') })
	event.remove({ id: OC('miner/ores/aluminum_ore') })
	event.remove({ id: OC('miner/ores/tin_ore') })
	event.remove({ id: OC('miner/ores/silver_ore') })
	event.remove({ id: OC('miner/deeps/deepslate_redstone_ore') })
	event.remove({ id: OC('miner/deeps/deepslate_aluminum_ore') })
	event.remove({ id: OC('miner/deeps/deepslate_tin_ore') })
	event.remove({ id: OC('miner/deeps/deepslate_silver_ore') })
	event.remove({ id: MC('diorite') })
	event.remove({ id: MC('andesite') })
	event.remove({ id: MC('granite') })
	event.remove({ id: CR('mixing/brass_ingot') })
	event.remove({ id: TC('smeltery/melting/metal/gold/enchanted_apple') })
	event.remove({ id: CR('cutting/andesite_alloy') })
	event.remove({ id: QU('building/crafting/compressed/charcoal_block')})
	event.remove({ id: QU('building/crafting/compressed/sugar_cane_block')})
	event.remove({ id: TE('building/crafting/compressed/bamboo_block')})
	event.remove({ id: QU('building/crafting/compressed/gunpowder_sack')})
	event.remove({ id: TE('storage/silver_block')})
	event.remove({ id: TE('storage/silver_ingot_from_block')})
	event.remove({ id: TE('storage/silver_ingot_from_nuggets')})
	event.remove({ id: TE('storage/silver_nugget_from_ingot')})
	event.remove({ id: TE('storage/carrot_block') })
	event.remove({ id: TE('storage/potato_block') })
	event.remove({ id: TE('storage/beetroot_block') })
	event.remove({ id: AE2('misc/grindstone_woodengear') })
	event.remove({ id: AE2('tools/misctools_entropy_manipulator') })
	event.remove({ id: TE('fire_charge/invar_ingot_3') })
	event.remove({ id: TE('fire_charge/enderium_ingot_2') })
	event.remove({ id: TE('fire_charge/constantan_ingot_2') })
	event.remove({ id: TE('fire_charge/bronze_ingot_4') })
	event.remove({ id: TE('fire_charge/electrum_ingot_2') })
	event.remove({ id: TE('fire_charge/lumium_ingot_4') })
	event.remove({ id: TE('fire_charge/signalum_ingot_4') })
	event.remove({ id: TE('machines/pulverizer/pulverizer_cinnabar') })
	event.remove({ id: TE('machines/smelter/smelter_alloy_signalum') })
	event.remove({ id: TE('machines/smelter/smelter_alloy_lumium') })
	event.remove({ id: TE('machines/smelter/smelter_alloy_enderium') })
	event.remove({ id: TE('machines/smelter/smelter_alloy_invar') })
	event.remove({ id: TE('machines/smelter/smelter_alloy_bronze') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_brass') })
	event.remove({ id: TE('compat/tconstruct/smelter_alloy_tconstruct_rose_gold_ingot') })
	event.remove({ id: TE('machines/pulverizer/pulverizer_ender_pearl') })
	event.remove({ id: AP('smelting/charcoal_block_from_logs_that_burn_smoking') })
	event.remove({ id: 'portality:generator' })

	event.remove({ mod: 'portable_stonecutter' })
	event.remove({ mod: 'explorerscompass' })
	event.remove({ mod: 'extendedgears' })
	event.remove({ input: TE('signalum_dust'), output: TE('signalum_ingot') })
	event.remove({ output: TE('signalum_dust'), input: TE('signalum_ingot') })
	event.remove({ output: TE('lightning_charge') })
	event.remove({ output: TE('ice_charge') })
	event.remove({ output: TE('earth_charge') })
	event.remove({ input: TE('lightning_charge') })
	event.remove({ input: TE('ice_charge') })
	event.remove({ input: TE('earth_charge') })
	event.remove({ input: "forbidden_arcanus:edelwood_bucket" })
	event.remove({ output: "forbidden_arcanus:edelwood_bucket" })
	event.remove({ id: 'ravencoffee:croissant' })
	event.remove({ input: 'ravencoffee:croissant' })
	event.remove({ id: 'ravencoffee:bagel' })
	event.remove({ input: 'ravencoffee:bagel' })
	event.remove({ id: 'ravencoffee:melon_pan' })
	event.remove({ id: 'ravencoffee:muffin' })
	event.remove({ id: 'ravencoffee:popchorus' })
	event.remove({ id: 'ravencoffee:sandwich_ham' })
	event.remove({ id: 'ravencoffee:sandwich_beef' })
	event.remove({ id: 'ravencoffee:sandwich_chicken' })
	native_metals.forEach(e => {
		event.remove({ type: MC("smelting"), input: F("#dusts/" + e) })
		event.remove({ type: MC("blasting"), input: F("#dusts/" + e) })
		event.remove({ type: TC("melting"), input: F("#dusts/" + e) })
	})
	event.remove({ id: TE('smelting/silver_ingot_from_dust_smelting')})
	event.remove({ id: TE('smelting/silver_ingot_from_dust_blasting')})
}

function tweaks(event) {

	event.remove({ id: 'waterstrainer:string_mesh' })
	event.remove({ id: 'waterstrainer:iron_mesh' })
	event.remove({ id: 'waterstrainer:obsidian_mesh' })
	event.remove({ id: 'waterstrainer:strainer_survivalist' })
	event.remove({ id: 'waterstrainer:strainer_survivalist_solid' })
	event.remove({ id: 'waterstrainer:strainer_survivalist_reinforced' })
	event.remove({ id: 'waterstrainer:strainer_fisherman' })
	event.remove({ id: 'waterstrainer:strainer_fisherman_solid' })
	event.remove({ id: 'waterstrainer:strainer_fisherman_reinforced' })

	event.remove({ id: TE("augments/item_filter_augment") })
	event.shapeless(TE("item_filter_augment"), [CR("filter"), TE("lapis_gear")])

	event.remove({ id: CR("sequenced_assembly/sturdy_sheet") })
	event.remove({ id: 'create_central_kitchen:crafting/cooking_guide' })
	event.shapeless('create_central_kitchen:cooking_guide', [CR("schedule"), FD("canvas")])
	
	event.stonecutting(AE2("silicon_press"), KJ("circuit_scrap"))
	event.stonecutting(AE2("engineering_processor_press"), KJ("circuit_scrap"))
	event.stonecutting(AE2("calculation_processor_press"), KJ("circuit_scrap"))
	event.stonecutting(AE2("logic_processor_press"), KJ("circuit_scrap"))
	event.shaped(KJ("circuit_scrap", 2),
		[" A ", "ABA", " A "], { A: TE("invar_ingot"), B: F("#circuit_press") })

	event.remove({ id: FD("flint_knife") })
	event.remove({ id: FD("iron_knife") })
	event.remove({ id: FD("golden_knife") })
	event.remove({ id: FD("diamond_knife") })
//	event.remove({ id: "buddycards:fd/buddysteel_food_knife" })
	event.shaped(FD('flint_knife'), ['S ', ' M'], { M: MC("flint"), S: F('#rods/wooden') })
	event.shaped(FD('iron_knife'), ['S ', ' M'], { M: MC("iron_ingot"), S: F('#rods/wooden') })
	event.shaped(FD('golden_knife'), ['S ', ' M'], { M: MC("gold_ingot"), S: F('#rods/wooden') })
	event.shaped(FD('diamond_knife'), ['S ', ' M'], { M: MC("diamond"), S: F('#rods/wooden') })
//	event.shaped("buddycards:buddysteel_food_knife", ['S ', ' M'], { M: "buddycards:buddysteel_ingot", S: F('#rods/wooden') })




	event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("sand")).withChance(0.25)], TE("oil_sand"))
	event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("red_sand")).withChance(0.25)], TE("oil_red_sand"))

	event.remove({ id: "computercraft:turtle_advanced" })
	event.remove({ id: "computercraft:turtle_advanced_upgrade" })
	event.remove({ id: "computercraft:turtle_normal" })

	event.smithing("computercraft:turtle_normal", "computercraft:computer_normal", TE("invar_gear"))
	event.smithing("computercraft:turtle_advanced", "computercraft:computer_advanced", TE("invar_gear"))
	event.recipes.createMechanicalCrafting("computercraft:turtle_normal", "AB", { A: "computercraft:computer_normal", B: TE("invar_gear") })
	event.recipes.createMechanicalCrafting("computercraft:turtle_advanced", "AB", { A: "computercraft:computer_advanced", B: TE("invar_gear") })

	event.shaped("computercraft:turtle_advanced", [
		'SSS',
		'SMS',
		'S S'
	], {
		M: "computercraft:turtle_normal",
		S: MC('gold_ingot')
	})

	event.smithing("portable_stonecutter:portable_stonecutter", "cb_microblock:stone_rod", MC("stonecutter"))
	event.smithing("portable_stonecutter:ender_portable_stonecutter", "portable_stonecutter:portable_stonecutter", MC("ender_pearl"))

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

	donutCraft(event, MC("weeping_vines"), "forbidden_arcanus:rune", MC("twisting_vines"))
	donutCraft(event, MC("twisting_vines"), "forbidden_arcanus:rune", MC("weeping_vines"))

	event.shaped(AE2('entropy_manipulator'), [
		'S  ',
		' M ',
		'  M'
	], {
		M: TE("lead_plate"),
		S: AE2('fluix_crystal')
	})

	event.shaped('waterstrainer:strainer_survivalist', [
		'SSS',
		'MMM',
		'SSS'
	], {
		M: FD('canvas'),
		S: 'minecraft:stick'
	})

	event.shaped('waterstrainer:strainer_fisherman', [
		'SSS',
		'MMM',
		'SSS'
	], {
		M: FD('canvas'),
		S: MC('bamboo')
	})

	event.shaped('waterstrainer:strainer_fisherman_reinforced', [
		'SSS',
		'MAM',
		'SSS'
	], {
		A: AC('neptunium_ingot'),
		M: FD('canvas'),
		S: MC('bamboo')
	})

	event.remove({ output: TC('obsidian_pane') })
	event.shaped(TC('obsidian_pane', 8), [
		'SSS',
		'SSS'
	], {
		S: MC('obsidian')
	})

	event.replaceInput({ id: "architects_palette:wither_lamp" }, AP('withered_bone'), TC('necrotic_bone'))
	event.replaceInput({ id: "architects_palette:withered_bone_block" }, AP('withered_bone'), TC('necrotic_bone'))
	event.remove({ id: "architects_palette:withered_bone" })

	event.remove({ id: "extcaves:pebble_stone" })

	event.remove({ id: "forbidden_arcanus:edelwood_stick" })
	event.shaped("3x forbidden_arcanus:edelwood_stick", [
		'S',
		'A',
		'S'
	], {
		S: 'forbidden_arcanus:edelwood_planks',
		A: MC('stick')
	})

	event.forEachRecipe({id: /alkahestry/}, recipe => {
		recipe.id(recipe.getId() + '_manual_only')
	})
	
	event.replaceInput({ id: "computercraft:cable" }, MC('redstone'), PR_C('red_ingot'))
	event.replaceInput({ id: "computercraft:wired_modem" }, MC('redstone'), PR_C('red_ingot'))
	event.replaceInput({ id: /backpacks/ }, MC('redstone'), MC('copper_ingot'))
	event.replaceInput({ id: "forbidden_arcanus:mundabitur_dust" }, MC('phantom_membrane'), TE('apatite_dust'))
	event.replaceInput({ id: CR('crafting/kinetics/rope_pulley') }, '#forge:wool', '#supplementaries:ropes')
	event.replaceInput({ output: CR('adjustable_chain_gearshift') }, CR('electron_tube'), MC('redstone'))

	let tweak_casing = (name, mats, mod) => {
		event.remove({ output: mod(name + "_casing") })
		event.shapeless(Item.of(mod(name + "_casing"), 2), mats)
	}

	tweak_casing('andesite', [CR('andesite_alloy'), '#minecraft:logs'], CR)
	tweak_casing('copper', [CR('copper_sheet'), '#minecraft:logs'], CR)
	tweak_casing('brass', [CR('brass_sheet'), '#minecraft:logs'], CR)
	tweak_casing('refined_radiance', [CR('refined_radiance'), '#minecraft:logs'], CR)
	tweak_casing('shadow_steel', [CR('shadow_steel'), '#minecraft:logs'], CR)
	tweak_casing('zinc', [CD('zinc_sheet'), 'minecraft:stone'], KJ)
	tweak_casing('invar', [TE('invar_ingot'), 'minecraft:stone'], KJ)
	tweak_casing('enderium', [MC('ender_pearl'), 'minecraft:obsidian'], KJ)
	tweak_casing('fluix', [TE('lead_plate'), 'minecraft:blackstone'], KJ)
	tweak_casing('steel', [AL('steel_sheet'), '#minecraft:logs'], AL)
	tweak_casing('railway', [CR('golden_sheet'), 'minecraft:deepslate'], CR)

	let tweak_glass_casing = (name, mod) => {
		event.remove({ output: ("create_crystal_clear:" + name + "_glass_casing") })
		event.remove({ output: ("create_crystal_clear:" + name + "_clear_glass_casing") })
		event.shapeless("create_crystal_clear:" + name + "_glass_casing", [mod(name + "_casing"), MC("glass")])
		event.shapeless("create_crystal_clear:" + name + "_clear_glass_casing", [mod(name + "_casing"), TC("clear_glass")])
	}

	tweak_glass_casing('andesite', CR)
	tweak_glass_casing('copper', CR)
	tweak_glass_casing('brass', CR)

	let tweak_glass_casing_diffname = (name, name2, mod) => {
		event.remove({ output: ("create_crystal_clear:" + name + "_glass_casing") })
		event.remove({ output: ("create_crystal_clear:" + name + "_clear_glass_casing") })
		event.shapeless("create_crystal_clear:" + name + "_glass_casing", [mod(name2 + "_casing"), MC("glass")])
		event.shapeless("create_crystal_clear:" + name + "_clear_glass_casing", [mod(name2 + "_casing"), TC("clear_glass")])
	}
	tweak_glass_casing_diffname('train', 'railway', CR)

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:circuit_press" },
		"result": {
			"fluid": "tconstruct:molten_invar",
			"amount": 180
		},
		"temperature": 500,
		"time": 90
	})

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:recycling" },
		"result": {
			"fluid": "tconstruct:molten_iron",
			"amount": 30
		},
		"temperature": 500,
		"time": 40
	})

	event.remove({ output: TE("side_config_augment") })
	event.shaped(TE("side_config_augment"), [
		' S ',
		'PMP',
		' S '
	], {
		P: TE("invar_ingot"),
		M: TE("redstone_servo"),
		S: TE("gold_gear")
	})

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
	bedrock_cobblegen(AP("packed_ice_pillar"), CR("scoria"))

	event.recipes.createPressing([TE('nickel_plate')], TE('nickel_ingot'))

//	event.remove({ id: "chisel:charcoal/raw" })
	event.remove({ id: AP("charcoal_block") })
//	event.stonecutting("chisel:charcoal/raw", MC('charcoal'))
	event.stonecutting(AP("charcoal_block"), MC('charcoal'))

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

	event.recipes.createCrushing([Item.of(AC('neptunium_ingot', 2)), Item.of(AC('neptunium_nugget', 5)).withChance(.5)], AC('neptunes_bounty')).processingTime(500)

	donutCraft(event, AP('plating_block', 8), CR('iron_sheet'), MC('stone'))

	event.custom({
		"type": "thermal:refinery",
		"ingredient": {
			"fluid": "kubejs:crude_oil",
			"amount": 100
		},
		"result": [
			{
				"fluid": "thermal:heavy_oil",
				"amount": 40
			},
			{
				"fluid": "thermal:light_oil",
				"amount": 60
			},
			{
				"item": "thermal:bitumen",
				"chance": 0.10
			}
		],
		"energy": 6000
	})

	event.custom({
		"type": "thermal:refinery",
		"ingredient": {
			"fluid": "beyond_earth:oil",
			"amount": 100
		},
		"result": [
			{
				"fluid": "thermal:heavy_oil",
				"amount": 40
			},
			{
				"fluid": "thermal:light_oil",
				"amount": 60
			},
			{
				"item": "thermal:bitumen",
				"chance": 0.10
			}
		],
		"energy": 6000
	})


	let cast_block = (fluid, item) => {
		event.custom({
			"type": "tconstruct:casting_basin",
			"fluid": { "name": fluid, "amount": 810 },
			"result": { "item": item },
			"cooling_time": 150
		})
	}

	let cast = (type, fluid, amount, item, time) => {
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": { "tag": "tconstruct:casts/single_use/" + type },
			"cast_consumed": true,
			"fluid": { "name": fluid, "amount": amount },
			"result": { "item": item },
			"cooling_time": time
		})
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": { "tag": "tconstruct:casts/multi_use/" + type },
			"fluid": { "name": fluid, "amount": amount },
			"result": { "item": item },
			"cooling_time": time
		})
	}

	let remove_cast = (name) => {
		event.remove({ id: `${TC(name)}_sand_cast`})
		event.remove({ id:`${TC(name)}_gold_cast`})
	}

	event.remove({ id: TE("storage/copper_nugget_from_ingot")})
	event.remove({ id: TC("common/materials/copper_nugget_from_ingot")})
	event.remove({ id: TE("storage/copper_ingot_from_nuggets")})
	event.remove({ id: TC("common/materials/copper_ingot_from_nuggets")})

	remove_cast("smeltery/casting/metal/copper/nugget")

	cast("nugget", TC("molten_copper"), 10, CR("copper_nugget"), 17)

	event.remove({ id: TE("storage/netherite_nugget_from_ingot")})
	event.remove({ id: TC("common/materials/netherite_nugget_from_ingot")})
	event.remove({ id: TE("storage/netherite_ingot_from_nuggets")})
	event.remove({ id: TC("common/materials/netherite_ingot_from_nuggets")})

	remove_cast("smeltery/casting/metal/netherite/nugget")
	remove_cast("smeltery/casting/metal/netherite/plate")

	cast("nugget", TC("molten_netherite"), 10, CD("netherite_nugget"), 17)
	cast("plate", TC("molten_netherite"), 90, CD("netherite_sheet"), 75)

	event.remove({id: "alloyed:mixing/bronze_ingot"})
	event.remove({id: "alloyed:mixing/bronze_ingot_x3"})

	event.remove({ id: TE('storage/bronze_nugget_from_ingot')})
	event.remove({ id: TE('storage/bronze_ingot_from_nuggets')})
	event.remove({ id: TE('storage/bronze_ingot_from_block')})
	event.remove({ id: TE('storage/bronze_block')})

	remove_cast("smeltery/casting/metal/bronze/nugget")
	remove_cast("smeltery/casting/metal/bronze/ingot")
	remove_cast("smeltery/casting/metal/bronze/plate")
	event.remove({ id: TC("smeltery/casting/metal/bronze/block")})

	cast("nugget", TC("molten_bronze"), 10, "alloyed:bronze_nugget", 17)
	cast("ingot", TC("molten_bronze"), 90, "alloyed:bronze_ingot", 50)
	cast("plate", TC("molten_bronze"), 90, "alloyed:bronze_sheet", 50)
	cast_block(TC("molten_bronze"), "alloyed:bronze_block")

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
			"tag": "forge:rods/blaze"
		},
		"result": {
			"fluid": "tconstruct:blazing_blood",
			"amount": 100
		},
		"temperature": 790,
		"time": 40
	})

	event.custom({
		"type": "tconstruct:ore_melting",
		"ingredient": {
			"tag": "forge:ores/cobalt"
		},
		"result": {
			"fluid": "tconstruct:molten_cobalt",
			"amount": 90
		},
		"temperature": 950,
		"time": 97,
		"rate": "metal",
		"byproducts": [
			{
				"fluid": "tconstruct:molten_iron",
				"amount": 30
			}
		]
	})

	event.custom({
		"type": "tconstruct:ore_melting",
		"ingredient": {
			"tag": "forge:ores/netherite_scrap"
		},
		"result": {
			"fluid": "tconstruct:molten_debris",
			"amount": 90
		},
		"temperature": 1175,
		"time": 143,
		"rate": "metal",
		"byproducts": [
			{
				"fluid": "tconstruct:molten_diamond",
				"amount": 25
			},
			{
				"fluid": "tconstruct:molten_gold",
				"amount": 90
			}
		]
	})

	event.custom({
		"type": "thermal:refinery",
		"ingredient": {
			"fluid": "thermal:glowstone",
			"amount": 1000
		},
		"result": [
			{
				"item": "thermal:lumium_ingot"
			}
		],
		"energy": 2000
	})

	event.custom({
		"type": "thermal:refinery",
		"ingredient": {
			"fluid": "thermal:redstone",
			"amount": 1000
		},
		"result": [
			{
				"item": "thermal:signalum_ingot"
			}
		],
		"energy": 2000
	})

}

function prettierpipes(event) {

	event.remove({ output: PP('pipe') })
	event.remove({ output: PP('blank_module') })
	event.shaped(PP("pipe", 8), [
		'PMP'
	], {
		P: CR('brass_sheet'),
		M: CR('brass_ingot')
	})
	event.remove({ output: TE('fluid_duct') })
	event.remove({ output: TE('fluid_duct_windowed') })
	event.remove({ output: TE('energy_duct') })
	event.shaped("8x thermal:energy_duct", [
		'PMP'
	], {
		P: TE('invar_ingot'),
		M: MC('redstone')
	})
	
	event.shapeless(TE('fluid_duct_windowed'), [TE('fluid_duct'), MC('glass')])

	let module = (type, result) => {
		event.remove({ output: PP(result) })
		event.stonecutting(PP(result), 'kubejs:pipe_module_' + type)
	}

	module('utility', 'filter_increase_modifier')
	module('utility', 'tag_filter_modifier')
	module('utility', 'mod_filter_modifier')
	module('utility', 'nbt_filter_modifier')
	module('utility', 'damage_filter_modifier')
	module('utility', 'round_robin_sorting_modifier')
	module('utility', 'redstone_module')
	module('utility', 'stack_size_module')
	module('utility', 'low_high_priority_module')
	module('utility', 'medium_high_priority_module')
	module('utility', 'high_high_priority_module')
	module('utility', 'low_low_priority_module')
	module('utility', 'medium_low_priority_module')
	module('utility', 'high_low_priority_module')

	let tiers = ['low', 'medium', 'high']
	for (var i = 0; i < tiers.length; i++) {
		let tier = 'tier_' + (i + 1)
		let prefix = tiers[i] + "_"
		module(tier, prefix + 'extraction_module')
		module(tier, prefix + 'retrieval_module')
		module(tier, prefix + 'speed_module')
		module(tier, prefix + 'filter_module')
		module(tier, prefix + 'crafting_module')
	}

	let attachment_base = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:attachment_base', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:attachment_base', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:attachment_base')
	}
	attachment_base('thermal:turbo_servo_attachment', 1)
	attachment_base('thermal:filter_attachment', 1)
	attachment_base('thermal:energy_limiter_attachment', 1)
	
	// Fluid Cells use in fluid transportation replaced by TE pipes, may come back to this if i can find a way to just disable the autooutput part
	event.remove({ output: TE('fluid_cell') })
	event.remove({ output: TE('fluid_cell_frame') })
	
}

function barrels(event) {
	event.remove({ mod: "metalbarrels" })

	let smithAndMechCraft = (r, i1, i2) => {
		event.smithing(r, i1, i2)
		event.recipes.createMechanicalCrafting(r, "AB", { A: i1, B: i2 })
	}

	event.remove({ id: TE("dynamo_gourmand") })
	smithAndMechCraft(TE("dynamo_gourmand"), TE("dynamo_stirling"), [MC("golden_carrot")])
	smithAndMechCraft(TE("dynamo_gourmand"), TE("dynamo_stirling"), [MC("golden_apple")])
	event.remove({ id: TE("dynamo_lapidary") })
	smithAndMechCraft(TE("dynamo_lapidary"), TE("dynamo_numismatic"), [TE("lapis_gear")])
	event.remove({ id: TE("dynamo_disenchantment") })
	smithAndMechCraft(TE("dynamo_disenchantment"), TE("dynamo_compression"), ["forbidden_arcanus:rune"])

	smithAndMechCraft("metalbarrels:copper_barrel", MC("barrel"), "alloyed:bronze_ingot")
	smithAndMechCraft("metalbarrels:silver_barrel", MC("barrel"), "forbidden_arcanus:rune")
	smithAndMechCraft("metalbarrels:iron_barrel", MC("barrel"), "thermal:invar_ingot")
	smithAndMechCraft("metalbarrels:gold_barrel", MC("barrel"), TC("cobalt_ingot"))

	event.shapeless("metalbarrels:wood_to_copper", ["metalbarrels:copper_barrel"])
	event.shapeless("metalbarrels:wood_to_iron", ["metalbarrels:iron_barrel"])
	event.shapeless("metalbarrels:wood_to_silver", ["metalbarrels:silver_barrel"])
	event.shapeless("metalbarrels:wood_to_gold", ["metalbarrels:gold_barrel"])
}

function rocketScience(event) {

	event.remove({ id: BE("nasa_workbenching/tier1") })
	event.remove({ id: BE("nasa_workbenching/tier2") })
	event.remove({ id: BE("nasa_workbenching/tier3") })
	event.remove({ id: BE("nasa_workbenching/tier4") })
	event.remove({ id: BE("rover") })

	event.remove({ id: BE("oxygen_mask") })
	event.remove({ id: BE("space_suit") })
	event.remove({ id: BE("space_leggings") })
	event.remove({ id: BE("space_boots") })


	event.remove({ id: BE("hammer") })
	event.remove({ id: BE("iron_stick") })
	event.remove({ id: BE("oxygen_gear") })
	event.remove({ id: BE("wheel") })
	event.remove({ id: BE("engine_frame") })
	event.remove({ id: BE("engine_fan") })
	event.remove({ id: BE("rocket_nose_cone") })

	event.remove({ id: BE("iron_engine") })
	event.remove({ id: BE("gold_engine") })
	event.remove({ id: BE("diamond_engine") })
	event.remove({ id: BE("calorite_engine") })
	
	event.remove({ id: BE("iron_tank") })
	event.remove({ id: BE("gold_tank") })
	event.remove({ id: BE("diamond_tank") })
	event.remove({ id: BE("calorite_tank") })

	event.remove({ id: BE("rocket_fin") })

	event.remove({ id: BE("iron_plate") })
	event.remove({ id: BE("desh_plate") })

	event.remove({ id: BE("rocket_launch_pad") })
	event.remove({ id: BE("nasa_workbench") })

	event.remove({ id: BE("solar_panel") })
	event.remove({ id: BE("coal_generator") })
	event.remove({ id: BE("compressor") })
	event.remove({ id: BE("fuel_refinery") })
	event.remove({ id: BE("oxygen_loader") })
	event.remove({ id: BE("oxygen_bubble_distributer") })
	event.remove({ id: BE("water_pump") })

	event.recipes.createCompacting(KJ("matter_plastics"), [AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball"), AE2("matter_ball")]).superheated()

	let gear = TE("diamond_gear")
	let plastic = KJ("matter_plastics")
	let machine = AE2("controller")
	let matrix = KJ("computation_matrix")

	event.recipes.createMechanicalCrafting("kubejs:navigation_computer", [
		'AAAAA',
		'ASSSA',
		'GS SG',
		'ASSSA',
		'AAMAA'
	], {
		A: plastic,
		M: machine,
		G: gear,
		S: matrix
	})

	event.recipes.createMechanicalCrafting("beyond_earth:oxygen_loader", [
		'AAA',
		'GSG',
		'AMA'
	], {
		A: plastic,
		M: machine,
		G: gear,
		S: MC("bucket")
	})

	event.recipes.createMechanicalCrafting("beyond_earth:oxygen_bubble_distributor", [
		'AAA',
		'GSG',
		'AMA'
	], {
		A: plastic,
		M: machine,
		G: gear,
		S: CR("propeller")
	})

	event.recipes.createMechanicalCrafting("kubejs:lander_deployer", [
		'AAA',
		'GSG',
		'AMA'
	], {
		A: plastic,
		M: machine,
		G: gear,
		S: CR("empty_schematic")
	})

	let pattern = [
		' A ',
		'GSG',
		' A '
	];

	event.recipes.createMechanicalCrafting("beyond_earth:space_suit", pattern,
		{
			A: plastic,
			G: CR("golden_sheet"),
			S: MC("iron_chestplate")
		})

	event.recipes.createMechanicalCrafting("beyond_earth:oxygen_mask", pattern,
		{
			A: plastic,
			G: CR("golden_sheet"),
			S: MC("iron_helmet")
		})

	event.recipes.createMechanicalCrafting("beyond_earth:space_pants", pattern,
		{
			A: plastic,
			G: CR("golden_sheet"),
			S: MC("iron_leggings")
		})

	event.recipes.createMechanicalCrafting("beyond_earth:space_boots", pattern,
		{
			A: plastic,
			G: CR("golden_sheet"),
			S: MC("iron_boots")
		})

	let smithAndMechCraft = (r, i1, i2) => {
		event.smithing(r, i1, i2)
		event.recipes.createMechanicalCrafting(r, "AB", { A: i1, B: i2 })
	}

	event.recipes.createMechanicalCrafting('beyond_earth:rocket_t1', [
		'    I    ',
		'   IPI   ',
		'   IGI   ',
		'   IGI   ',
		'  IPNPI  ',
		'  IPLPI  ',
		' IPPPPPI ',
		'  IIIII  ',
		'  C C C  '
	], {
		I: 'minecraft:iron_block',
		P: 'create:iron_sheet',
		G: '#forge:glass_panes/colorless',
		N: 'kubejs:navigation_computer',
		L: 'kubejs:lander_deployer',
		C: 'thermal:dynamo_compression'
	})

	smithAndMechCraft("5x beyond_earth:rocket_launch_pad", AP('heavy_stone_bricks'), plastic)

	pattern = [
		'A',
		'S'
	];

	event.recipes.createMixing(
		[Fluid.of('beyond_earth:fuel', 2)],
		[Fluid.of(TE('refined_fuel'), 30), Fluid.of(TE('heavy_oil'), 20)]
	).heated()



}

function drawersop(event) {
	let drawer_types = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'warped', 'crimson']
	let drawer_sizes = ['1', '2', '4']
	event.replaceInput({ id: SD('compacting_drawers_3') }, MC('iron_ingot'), CR('zinc_ingot'))
	event.remove({ output: SD("upgrade_template") })

	drawer_types.forEach(e => {

		let trim = SD(`${e}_trim`)
		let plank = MC(`${e}_planks`)
		event.remove({ id: trim })
		event.shaped(Item.of(trim, 4), [
			'SSS',
			'PMP',
			'SSS'
		], {
			P: CR('zinc_ingot'),
			M: '#forge:chests/wooden',
			S: plank
		})

		event.stonecutting(SD("upgrade_template"), trim)

		drawer_sizes.forEach(size => {
			let full = SD(`${e}_full_drawers_${size}`)
			let half = SD(`${e}_half_drawers_${size}`)
			event.remove({ id: full })
			event.remove({ id: half })
			event.stonecutting(full, trim)
			event.stonecutting(Item.of(half, 2), trim)
		})
	})

}

function unify(event) {

	event.recipes.createMilling(TE("nickel_dust"), F("#ingots/nickel"))
	event.recipes.createMilling(TE("lead_dust"), F("#ingots/lead"))
	event.recipes.createMilling(TE("copper_dust"), F("#ingots/copper"))
	event.recipes.createMilling(KJ("zinc_dust"), F("#ingots/zinc"))

	event.replaceInput({ id: OC("ritual/summon_djinni_crusher") }, '#forge:dusts/silver', KJ('zinc_dust'))
	event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, '#forge:raw_materials/silver', KJ('zinc_dust'))
	event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, '#forge:raw_materials/iron', TE('iron_dust'))
	event.replaceInput({ id: OC("ritual/craft_miner_foliot_unspecialized") }, '#forge:raw_materials/iron', TE('iron_dust'))
	event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, '#forge:raw_materials/gold', TE('gold_dust'))
	event.replaceInput({ id: OC("ritual/craft_miner_dinji_unspecialized") }, '#forge:raw_materials/iron', TE('iron_dust'))
	event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, '#forge:raw_materials/copper', TE('copper_dust'))
	event.replaceOutput({ id: CR('compat/ae2/milling/gold') }, AE2('gold_dust'), TE('gold_dust'))
	event.replaceOutput({ id: CR('compat/ae2/milling/iron') }, AE2('iron_dust'), TE('iron_dust'))
	event.replaceOutput({ id: OC('crushing/iron_dust_from_ingot') }, OC('iron_dust'), TE('iron_dust'))
	event.replaceOutput({ id: OC('crushing/gold_dust_from_ingot') }, OC('gold_dust'), TE('gold_dust'))
	event.replaceOutput({ id: OC('crushing/obsidian_dust') }, OC('obsidian_dust'), CR('powdered_obsidian'))
	event.replaceInput({ id: OC('crafting/chalk_purple_impure') }, OC('obsidian_dust'), CR('powdered_obsidian'))
	event.replaceInput({ id: OC('ritual/craft_infused_lenses') }, F('#ingots/silver'), TE('nickel_ingot'))
	event.replaceInput({ id: OC('crafting/magic_lamp_empty') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: OC('crafting/lens_frame') }, F('#ingots/silver'), TE('nickel_ingot'))
	event.replaceInput({ id: TE('augments/rf_coil_storage_augment') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: TE('augments/rf_coil_xfer_augment') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: TE('augments/rf_coil_augment') }, F('#ingots/silver'), MC('iron_ingot'))
	event.replaceInput({ id: TE('tools/detonator') }, F('#ingots/silver'), TE('lead_ingot'))

	event.replaceInput({ id: TE("machines/smelter/smelter_alloy_constantan")}, F('#dusts/copper'), MC("copper_ingot"))
	event.replaceInput({ id: TE("machines/smelter/smelter_alloy_constantan")}, F('#dusts/nickel'), TE("nickel_ingot"))
	event.replaceInput({ id: TE("machines/smelter/smelter_alloy_electrum")}, F('#dusts/gold'), MC("gold_ingot"))
	event.replaceInput({ id: TE("machines/smelter/smelter_alloy_electrum")}, F('#dusts/silver'), TE("silver_ingot"))
	event.replaceInput({ id: TE("machines/smelter/smelter_alloy_netherite")}, F('#dusts/gold'), MC("gold_ingot"))

	event.replaceOutput({ type: OC("crushing") }, OC('copper_dust'), TE('copper_dust'))
	event.replaceOutput({ type: OC("crushing") }, OC('iron_dust'), TE('iron_dust'))
	event.replaceOutput({ type: OC("crushing") }, OC('gold_dust'), TE('gold_dust'))
	event.replaceOutput({ type: OC("crushing") }, OC('silver_dust'), TE('silver_dust'))

	event.replaceOutput({}, '#forge:nuggets/copper', CR('copper_nugget'))
	event.replaceOutput({}, '#forge:nuggets/netherite', CD('netherite_nugget'))
	event.replaceOutput({}, '#forge:nuggets/silver', TE('silver_nugget'))
	event.replaceOutput({}, '#forge:ingots/silver', TE('silver_ingot'))
	event.replaceOutput({}, '#forge:ingots/bronze', 'alloyed:bronze_ingot')
	event.replaceOutput({}, '#forge:storage_blocks/silver', TE('silver_block'))
	event.replaceInput({}, '#forge:gems/ruby', TE('ruby'))
	event.replaceInput({}, '#forge:gems/sapphire', TE('sapphire'))
	event.replaceInput({ id: "exchangers:thermal/thermal_exchanger_core_tier1" }, TE('ender_pearl_dust'), AE2('ender_dust'))

	event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25).toResultJson()], 'biomesoplenty:black_sand')
	event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25).toResultJson()], 'biomesoplenty:white_sand')
	event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25).toResultJson()], 'biomesoplenty:orange_sand')

	event.replaceInput({ type: "minecraft:crafting_shaped" }, '#forge:ingots/tin', CR('zinc_ingot'))

	event.replaceInput({}, '#forge:plates/bronze', TE('nickel_plate'))
	event.replaceInput({}, '#forge:plates/silver', TE('invar_plate'))
	event.replaceInput({}, '#forge:plates/constantan', TE('signalum_plate'))
	event.replaceInput({}, '#forge:plates/electrum', TE('constantan_plate'))
	event.replaceInput({}, '#forge:ingots/electrum', TE('constantan_ingot'))

	event.replaceInput({}, '#forge:gears/tin', TE('lead_gear'))
	event.replaceInput({}, '#forge:gears/bronze', TE('nickel_gear'))
	event.replaceInput({}, '#forge:gears/silver', TE('invar_gear'))
	event.replaceInput({}, '#forge:gears/constantan', TE('signalum_gear'))
	event.replaceInput({}, '#forge:gears/electrum', TE('constantan_gear'))

	event.replaceInput({}, '#forge:plates/invar', TE('invar_ingot'))

	event.recipes.createPressing([TE('lead_plate')], TE('lead_ingot'))
	event.recipes.createPressing([TE('enderium_plate')], TE('enderium_ingot'))
	event.recipes.createPressing([TE('lumium_plate')], TE('lumium_ingot'))
	event.recipes.createPressing([TE('signalum_plate')], TE('signalum_ingot'))
	event.recipes.createPressing([TE('constantan_plate')], TE('constantan_ingot'))
	
	event.remove( {id: TE('machines/pulverizer/pulverizer_invar_plate_to_dust') })
	event.replaceInput({ id: TE('machines/pulverizer/pulverizer_silver_plate_to_dust') }, TE('invar_ingot'), '#forge:plates/silver')
	event.replaceInput({ id: TE('machines/pulverizer/pulverizer_bronze_plate_to_dust') }, TE('nickel_plate'), '#forge:plates/bronze')
	event.replaceInput({ id: TE('machines/pulverizer/pulverizer_constantan_plate_to_dust') }, TE('signalum_plate'), '#forge:plates/constantan')
	event.replaceInput({ id: TE('machines/pulverizer/pulverizer_electrum_plate_to_dust') }, TE('constantan_plate'), '#forge:plates/electrum')

	event.remove( {id: TE('machines/smelter/smelter_invar_plate_to_ingot') })
	event.replaceInput({ id: TE('machines/smelter/smelter_silver_plate_to_ingot') }, TE('invar_ingot'), '#forge:plates/silver')
	event.replaceInput({ id: TE('machines/smelter/smelter_bronze_plate_to_ingot') }, TE('nickel_plate'), '#forge:plates/bronze')
	event.replaceInput({ id: TE('machines/smelter/smelter_constantan_plate_to_ingot') }, TE('signalum_plate'), '#forge:plates/constantan')
	event.replaceInput({ id: TE('machines/smelter/smelter_electrum_plate_to_ingot') }, TE('constantan_plate'), '#forge:plates/electrum')

	event.replaceInput({ id: OC('crushing/electrum_dust_from_ingot') }, TE('constantan_ingot'), '#forge:ingots/electrum')
	event.replaceInput({ id: TE('machines/pulverizer/pulverizer_electrum_ingot_to_dust') }, TE('constantan_ingot'), '#forge:ingots/electrum')
	
	event.replaceInput({ id: TE('parts/electrum_gear') }, TE('constantan_ingot'), '#forge:ingots/electrum')

	event.replaceInput({ id: TE('storage/electrum_nugget_from_ingot') }, TE('constantan_ingot'), '#forge:ingots/electrum')
	event.replaceInput({ id: TE('storage/electrum_block') }, TE('constantan_ingot'), '#forge:ingots/electrum')

	event.replaceInput({ id: AP('sheet_metal_block')}, F('#ingots/iron'), F('#plates/iron'))


	event.recipes.thermal.pulverizer([KJ('zinc_dust')], F('#ingots/zinc')).energy(2000)
	event.recipes.thermal.pulverizer([KJ('zinc_dust')], F('#plates/zinc')).energy(2000)
	event.recipes.thermal.smelter([CR('zinc_ingot')], F('#plates/zinc')).energy(1600)
	
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('carrot_crate')}, 'energy': 48000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('potato_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('beetroot_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('cabbage_crate')}, 'energy': 32000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('onion_crate')}, 'energy': 32000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': FD('tomato_crate')}, 'energy': 16000})
	event.custom({'type': 'thermal:gourmand_fuel', 'ingredient': {'item': 'buddycardsexp:buddybean_crate'}, 'energy': 32000})

	event.shaped(TE('ruby_block', 1), [
		'RRR',
		'RRR',
		'RRR'
	], {
		R: F('#gems/ruby')
	})
	event.shapeless(TE('ruby', 9), [F('#storage_blocks/ruby')])
	event.shaped(TE('sapphire_block', 1), [
		'SSS',
		'SSS',
		'SSS'
	], {
		S: F('#gems/sapphire')
	})
	event.shapeless(TE('sapphire', 9), [F('#storage_blocks/sapphire')])

	let woodcutting = (mod, log, planks, slab) => {
		event.recipes.createCutting([mod + ":stripped_" + log], mod + ":" + log).processingTime(50)
		event.recipes.createCutting([Item.of(mod + ":" + planks, 6)], mod + ":stripped_" + log).processingTime(50)
		event.recipes.createCutting([Item.of(mod + ":" + slab, 2)], mod + ":" + planks).processingTime(50)
	}

	let justplankwoodcutting = (mod, planks, slab) => {
		event.recipes.createCutting([Item.of(mod + ":" + slab, 2)], mod + ":" + planks).processingTime(50)
	}

	justplankwoodcutting("quark", "azalea_planks", "azalea_planks_slab")
	justplankwoodcutting("quark", "blossom_planks", "blossom_planks_slab")
}

function trickierWindmills(event) {
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
}

function rubberMatters(event) {
	let addTreeOutput = (trunk, leaf, fluid) => {
		event.custom({
			"type": "thermal:tree_extractor",
			"trunk": trunk,
			"leaves": leaf,
			"result": fluid || {
				"fluid": "thermal:resin",
				"amount": 25
			}
		})
	}
	let overrideTreeOutput = (id, trunk, leaf, fluid) => {
		event.remove({ id: id })
		addTreeOutput(trunk, leaf, fluid)
	}

	overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_jungle'), MC('jungle_log'), MC('jungle_leaves'))
	overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_spruce'), MC('spruce_log'), MC('spruce_leaves'))
	overrideTreeOutput(TE('devices/tree_extractor/tree_extractor_dark_oak'), MC('dark_oak_log'), MC('dark_oak_leaves'))

	addTreeOutput(MC('oak_log'), BOP('origin_leaves'))
	addTreeOutput(MC('oak_log'), BOP('flowering_oak_leaves'))
	addTreeOutput(MC('birch_log'), BOP('rainbow_birch_leaves'))
	addTreeOutput(MC('birch_log'), BOP('yellow_autumn_leaves'))
	addTreeOutput(MC('dark_oak_log'), BOP('orange_autumn_leaves'))
	addTreeOutput(MC('oak_log'), BOP('maple_leaves'))
	addTreeOutput(BOP('fir_log'), BOP('fir_leaves'))
	addTreeOutput(BOP('redwood_log'), BOP('redwood_leaves'))
	addTreeOutput(BOP('cherry_log'), BOP('white_cherry_leaves'))
	addTreeOutput(BOP('cherry_log'), BOP('pink_cherry_leaves'))
	addTreeOutput(BOP('mahogany_log'), BOP('mahogany_leaves'))
	addTreeOutput(BOP('jacaranda_log'), BOP('jacaranda_leaves'))
	addTreeOutput(BOP('palm_log'), BOP('palm_leaves'))
	addTreeOutput(BOP('willow_log'), BOP('willow_leaves'))
	addTreeOutput(BOP('dead_log'), BOP('dead_leaves'))
	addTreeOutput(BOP('magic_log'), BOP('magic_leaves'))
	addTreeOutput(BOP('umbran_log'), BOP('umbran_leaves'))
	addTreeOutput(BOP('hellbark_log'), BOP('hellbark_leaves'))

	addTreeOutput( QU('blossom_log'), QU('blue_blossom_leaves'))
	addTreeOutput( QU('blossom_log'), QU('lavender_blossom_leaves'))
	addTreeOutput( QU('blossom_log'), QU('orange_blossom_leaves'))
	addTreeOutput( QU('blossom_log'), QU('pink_blossom_leaves'))
	addTreeOutput( QU('blossom_log'), QU('yellow_blossom_leaves'))
	addTreeOutput( QU('blossom_log'), QU('red_blossom_leaves'))

	// addTreeOutput( TC('greenheart_log'), TC('earth_slime_leaves'), {fluid: TC("earth_slime"), amount: 10})
	// addTreeOutput( TC('skyroot_log'), TC('sky_slime_leaves'), {fluid: TC("sky_slime"), amount: 10})
	
	event.remove({ id: CR('crafting/kinetics/belt_connector') })
	event.shaped(CR('belt_connector', 3), [
		'SSS',
		'SSS'
	], {
		S: TE('cured_rubber')
	})

	event.recipes.createCompacting('1x ' + TE("rubber"), [Fluid.of(MC('water'), 250), F("#vines", 4)])
	event.recipes.createCompacting('1x ' + TE("rubber"), [Fluid.of(MC('water'), 250), '4x #minecraft:flowers'])
	event.recipes.createCompacting('1x ' + TE("rubber"), [Fluid.of(TE('resin'), 250)])

	event.remove({ id: 'thermal:rubber_3' })
	event.remove({ id: 'thermal:rubber_from_dandelion' })
	event.remove({ id: 'thermal:rubber_from_vine' })

}

function algalAndesite(event) {
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })
	event.remove({ id: CR('crafting/materials/andesite_alloy') })
	event.remove({ id: CR('crafting/materials/andesite_alloy_from_zinc') })
	event.remove({ id: CR('mixing/andesite_alloy') })
	event.remove({ id: CR('mixing/andesite_alloy_from_zinc') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TE('compat/create/smelter_create_alloy_andesite_alloy') })
	event.remove({ id: TC('compat/create/andesite_alloy_zinc') })
	event.remove({ id: TC('compat/create/andesite_alloy_iron') })

	event.remove({ output: AP('algal_brick') })
	event.smelting(AP('algal_brick'), AP('algal_blend')).xp(0).cookingTime(120)
	event.remove({ id: AP('algal_blend') })

	event.shaped(Item.of(AP('algal_blend'), 4), [
		'SS',
		'AA'
	], {
		A: 'minecraft:clay_ball',
		S: ['minecraft:kelp', 'minecraft:seagrass']
	})
	event.shaped(Item.of(AP('algal_blend'), 4), [
		'AA',
		'SS'
	], {
		A: 'minecraft:clay_ball',
		S: ['minecraft:kelp', 'minecraft:seagrass']
	})
	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'SS',
		'AA'
	], {
		A: ['minecraft:andesite', CR('andesite_cobblestone')],
		S: AP('algal_brick')
	})
	event.shaped(Item.of(CR('andesite_alloy'), 2), [
		'AA',
		'SS'
	], {
		A: ['minecraft:andesite', CR('andesite_cobblestone')],
		S: AP('algal_brick')
	})

	event.recipes.createMixing(Item.of(AP('algal_blend'), 2), ['minecraft:clay_ball', ['minecraft:kelp', 'minecraft:seagrass']])
	event.recipes.createMixing(Item.of(CR('andesite_alloy'), 2), [AP('algal_brick'), ['minecraft:andesite', CR('andesite_cobblestone')]])
}

function oreProcessing(event) {

	let stone = Item.of(MC("cobblestone"), 1).withChance(.5)

	let otherstone = Item.of(OC("otherstone"), 1).withChance(.5)



	event.recipes.createCrushing([Item.of("forbidden_arcanus:stellarite_piece", 1), Item.of("forbidden_arcanus:stellarite_piece", 1).withChance(.25), stone], "forbidden_arcanus:stella_arcanum")
	event.recipes.createCrushing([Item.of("forbidden_arcanus:xpetrified_orb", 2), Item.of("forbidden_arcanus:xpetrified_orb", 1).withChance(.25), stone], "forbidden_arcanus:xpetrified_ore")
	event.recipes.createCrushing([Item.of("buddycards:luminis_crystal", 2), Item.of("buddycards:luminis_crystal", 1).withChance(.25), stone], "buddycards:luminis_ore")
	event.recipes.createCrushing([Item.of("forbidden_arcanus:arcane_crystal", 2), Item.of("forbidden_arcanus:arcane_crystal_dust", 1).withChance(.25), stone], "forbidden_arcanus:arcane_crystal_ore")
	event.recipes.createCrushing([Item.of(TE("sapphire"), 2), Item.of(TE("sapphire"), 1).withChance(.25), stone], TE("sapphire_ore"))
	event.recipes.createCrushing([Item.of(TE("ruby"), 2), Item.of(TE("ruby"), 1).withChance(.25), stone], TE("ruby_ore"))

	event.recipes.createMilling(['4x ' + MC('redstone')], TE('cinnabar')).processingTime(700)
	event.recipes.createCrushing(['6x ' + MC('redstone')], TE('cinnabar')).processingTime(500)
	event.recipes.thermal.pulverizer(['8x ' + MC('redstone')], TE('cinnabar')).energy(10000)

	event.recipes.createMilling(['3x ' + MC('glowstone_dust')], 'buddycards:luminis_crystal').processingTime(700)
	event.recipes.createCrushing(['6x ' + MC('glowstone_dust')], 'buddycards:luminis_crystal').processingTime(500)
	event.recipes.thermal.pulverizer(['9x ' + MC('glowstone_dust')], 'buddycards:luminis_crystal').energy(10000)

	event.recipes.createMilling([TE('sulfur_dust')], F("#gems/sulfur")).processingTime(500)
	event.recipes.createMilling([TE('niter_dust')], F("#gems/niter")).processingTime(500)
	event.recipes.createMilling([TE('apatite_dust')], F("#gems/apatite")).processingTime(500)

	let dust_process = (name, ingot, nugget, dust, ore, byproduct, fluid_byproduct_name, rawore) => {
		let crushed = CR('crushed_' + 'raw_' + name)
		let oretag = ('#forge:ores/' + name)
		let dusttag = ('#forge:dusts/' + name)
		let fluid = TC("molten_" + name)
		let fluid_byproduct = TC("molten_" + fluid_byproduct_name)

		event.replaceInput({type: 'minecraft:crafting_shaped'}, rawore, crushed)
		event.replaceOutput({type: 'minecraft:crafting_shapeless'}, rawore, crushed)
		
		event.smelting(Item.of(nugget, 3), crushed)
		event.smelting(Item.of(nugget, 1), dusttag).cookingTime(40)
		event.recipes.createMilling([Item.of(crushed, 1), stone], oretag)
		event.recipes.createMilling([Item.of(dust, 3)], crushed)
		event.recipes.createCrushing([Item.of(dust, 3), Item.of(dust, 3).withChance(0.5)], crushed)
		event.recipes.thermal.pulverizer([Item.of(dust, 6)], crushed).energy(15000)
		event.recipes.thermal.pulverizer([crushed], oretag).energy(3000)
		event.recipes.thermal.crucible(Fluid.of(fluid, 90), ingot).energy(2000)

		event.recipes.thermal.crucible(Fluid.of(fluid, 30), dusttag).energy(3000)
		event.recipes.createSplashing([Item.of(nugget, 2)], dusttag)
		event.recipes.createMixing([Fluid.of(fluid, 180)], [Item.of(dusttag, 3), AE2('matter_ball')]).superheated()
		
		event.remove({ input: rawore })
		event.recipes.createMilling([Item.of(crushed, 5)], rawore)
		event.recipes.createCrushing([Item.of(crushed, 5), Item.of(crushed, 2).withChance(0.5)], rawore)


		event.remove({ input: oretag, type: TE("smelter") })
		event.remove({ input: oretag, type: TE("pulverizer") })
		event.remove({ input: oretag, type: MC("blasting") })
		event.remove({ input: oretag, type: MC("smelting") })
		event.remove({ input: oretag, type: CR("crushing") })
		event.remove({ input: oretag, type: CR("milling") })
		event.remove({ id: TC('smeltery/melting/metal/' + name + '/raw_block') })
		event.remove({ id: TC('smeltery/melting/metal/' + name + '/dust') })
		event.remove({ id: CR('crushing/raw_' + name + '_block') })	

		event.custom({
			"type": "thermal:smelter",
			"ingredient": {
				"item": crushed
			},
			"result": [
				{
					"item": nugget,
					"chance": 9.0
				},
				{
					"item": byproduct,
					"chance": (byproduct.endsWith('nugget') ? 1.8 : 0.2)
				},
				{
					"item": "thermal:rich_slag",
					"chance": 0.2
				}
			],
			"experience": 0.2,
			"energy": 20000
		})

		event.custom({
			"type": "tconstruct:melting",
			"ingredient": {
				"tag": dusttag.slice(1)
			},
			"result": {
				"fluid": fluid,
				"amount": 30
			},
			"temperature": 500,
			"time": 30,
			"byproducts": [
				{
					"fluid": fluid_byproduct,
					"amount": 10
				}
			]
		});
	}


	dust_process('nickel', TE('nickel_ingot'), TE('nickel_nugget'), TE('nickel_dust'), TE('nickel_ore'), CR('copper_nugget'), 'copper', TE('raw_nickel'))
	dust_process('lead', TE('lead_ingot'), TE('lead_nugget'), TE('lead_dust'), TE('lead_ore'), MC('iron_nugget'), 'iron', TE('raw_lead'))
	dust_process('iron', MC('iron_ingot'), MC('iron_nugget'), TE('iron_dust'), MC('iron_ore'), TE('nickel_nugget'), 'nickel', MC('raw_iron'))
	dust_process('gold', MC('gold_ingot'), MC('gold_nugget'), TE('gold_dust'), MC('gold_ore'), TE('cinnabar'), 'zinc', MC('raw_gold'))
	dust_process('copper', MC('copper_ingot'), CR('copper_nugget'), TE('copper_dust'), MC('copper_ore'), CR('copper_nugget'), 'copper', MC('raw_copper'))
	dust_process('zinc', CR('zinc_ingot'), CR('zinc_nugget'), KJ('zinc_dust'), CR('zinc_ore'), TE('sulfur'), 'lead', CR('raw_zinc'))

	event.remove({ input: TE("raw_silver") })
	//event.remove({ output: TE("raw_silver") })

	event.replaceInput({ id: TE("machine/smelter/smelter_iron_ore") }, MC('iron_ore'), CR('crushed_raw_iron'))
	event.replaceInput({ id: TE("machine/smelter/smelter_gold_ore") }, MC('gold_ore'), CR('crushed_raw_gold'))

}

function alloys(event) {

	event.remove({ id: TC('smeltery/alloys/molten_bronze') })
	event.remove({ id: TC('smeltery/alloys/molten_brass') })
	event.remove({ id: TC('smeltery/alloys/molten_invar') })
	event.remove({ id: TC('smeltery/alloys/molten_electrum') })
	event.remove({ id: TC('smeltery/alloys/molten_constantan') })
	event.remove({ id: TC('smeltery/alloys/molten_rose_gold') })
	event.remove({ id: TC('smeltery/alloys/molten_enderium') })
	event.remove({ id: TC('smeltery/alloys/molten_lumium') })
	event.remove({ id: TC('smeltery/alloys/molten_signalum') })

	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "tconstruct:molten_silver", "amount": 90 },
			{ "name": "tconstruct:molten_copper", "amount": 90 },
			{ "name": "thermal:redstone", "amount": 1000 }
		],
		"result": {
			"fluid": "tconstruct:molten_signalum",
			"amount": 90
		},
		"temperature": 1000
	})

	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "tconstruct:molten_silver", "amount": 90 },
			{ "name": "tconstruct:molten_copper", "amount": 90 },
			{ "name": "thermal:glowstone", "amount": 1000 }
		],
		"result": {
			"fluid": "tconstruct:molten_lumium",
			"amount": 90
		},
		"temperature": 1000
	})

	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "tconstruct:molten_copper", "amount": 270 },
			{ "name": "tconstruct:molten_glass", "amount": 1000 }
		],
		"result": {
			"fluid": "tconstruct:molten_bronze",
			"amount": 270
		},
		"temperature": 1000
	})

	event.remove({ type: MC("crafting_shapeless"), output: TE('constantan_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('electrum_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('lumium_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('signalum_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('enderium_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('bronze_dust') })
	event.remove({ type: MC("crafting_shapeless"), output: TE('invar_dust') })

	event.recipes.createMixing(Fluid.of(TC('molten_brass'), 3), [Fluid.of(TC('molten_copper'), 3), Fluid.of(TC('molten_zinc'), 3)]).processingTime(1)
	event.recipes.createMixing(Fluid.of(TC('molten_constantan'), 3), [Fluid.of(TC('molten_copper'), 3), Fluid.of(TC('molten_nickel'), 3)]).processingTime(1)
	event.recipes.createMixing(Fluid.of(TC('molten_rose_gold'), 3), [Fluid.of(TC('molten_copper'), 3), Fluid.of(TC('molten_gold'), 3)]).processingTime(1)
	event.recipes.createMixing(Fluid.of(TC('molten_electrum'), 3), [Fluid.of(TC('molten_silver'), 3), Fluid.of(TC('molten_gold'), 3)]).processingTime(1)

	event.recipes.thermal.smelter([KJ("invar_compound"), KJ("invar_compound")], [TE("nickel_ingot"), MC("iron_ingot")])
	event.recipes.thermal.smelter(CR("brass_ingot", 2), [MC("copper_ingot"), CR("zinc_ingot")])
	event.recipes.thermal.smelter(TC("rose_gold_ingot", 2), [MC("copper_ingot"), MC("gold_ingot")])
	event.recipes.thermal.smelter("3x alloyed:bronze_ingot", [MC("copper_ingot", 3), '#forge:sand'])

}

function electronTube(event) {

	event.recipes.createFilling(CR("electron_tube"), [CR('polished_rose_quartz'), Fluid.of(TC('molten_iron'), 10)])

	let redstone = MC('redstone')
	event.shapeless('create:rose_quartz', [[MC('quartz'), AE2('certus_quartz_crystal'), AE2('charged_certus_quartz_crystal')], redstone, redstone, redstone, redstone])

	event.recipes.createMilling([AE2('certus_quartz_dust')], AE2('#all_certus_quartz')).processingTime(200)
	event.recipes.createMilling([TE('quartz_dust')], MC("quartz")).processingTime(200)

	event.remove({ id: CR('compat/ae2/milling/sky_stone_block') })
	event.remove({ id: CR('compat/ae2/milling/nether_quartz') })
	event.remove({ id: CR('compat/ae2/milling/certus_quartz') })
	event.remove({ id: CR('crafting/materials/electron_tube') })
	event.remove({ id: CR('crafting/materials/rose_quartz') })
	event.remove({ id: CR('sandpaper_polishing/rose_quartz') })
	event.remove({ id: CR('sandpaper_polishing/rose_quartz') })

	event.remove({ id: TC('smeltery/alloys/molten_obsidian') })
	event.remove({ id: TC('smeltery/melting/metal/slimesteel/reinforcement') })
	event.remove({ id: TC('smeltery/melting/metal/iron/reinforcement') })
	event.remove({ id: TC('smeltery/melting/diamond/enchanting_table') })

	event.recipes.createMechanicalCrafting(Item.of(AE2('certus_crystal_seed'), 2), ['A'], { A: AE2('certus_quartz_crystal') })
	event.recipes.createMechanicalCrafting(Item.of(AE2('fluix_crystal_seed'), 2), ['A'], { A: AE2('fluix_crystal') })

	let grow = (from, via, to) => {
		event.recipes.createSequencedAssembly([to], from, [
			event.recipes.createFilling(via, [via, Fluid.of(MC("water"), 500)]),
		]).transitionalItem(via)
			.loops(4)
			.id('kubejs:grow_' + to.split(':')[1])
	}

	grow(AE2("certus_crystal_seed"), KJ('growing_certus_seed'), KJ('tiny_certus_crystal'))
	grow(AE2("fluix_crystal_seed"), KJ('growing_fluix_seed'), KJ('tiny_fluix_crystal'))

	grow(KJ("tiny_certus_crystal"), KJ('growing_tiny_certus_crystal'), KJ('small_certus_crystal'))
	grow(KJ("tiny_fluix_crystal"), KJ('growing_tiny_fluix_crystal'), KJ('small_fluix_crystal'))

	grow(KJ("small_certus_crystal"), KJ('growing_small_certus_crystal'), AE2('certus_quartz_crystal'))
	grow(KJ("small_fluix_crystal"), KJ('growing_small_fluix_crystal'), AE2('fluix_crystal'))

	event.recipes.createMixing(Fluid.of(KJ('volatile_sky_solution'), 500), [AE2('sky_dust'), AE2('sky_dust'), AE2('sky_dust'), AE2('sky_dust'), Fluid.of(MC('water'), 500)])
	event.recipes.createMixing([AE2('certus_quartz_crystal'), Fluid.of(TE("redstone"), 250)], [AE2('charged_certus_quartz_crystal'), Fluid.of(KJ('volatile_sky_solution'), 250)])
	event.recipes.createMixing(['create:polished_rose_quartz'], [AE2('certus_quartz_crystal'), Fluid.of(TE("redstone"), 250)])

}

function andesiteMachine(event) {

	event.replaceInput({ id: CR("crafting/kinetics/brass_hand") }, '#forge:plates/brass', CR('golden_sheet'))
	wood_types.forEach(wood => {
		event.recipes.createCutting('2x ' + wood + '_slab', wood + '_planks').processingTime(150)
	})

	let transitional = 'kubejs:incomplete_kinetic_mechanism'
	event.recipes.createSequencedAssembly([
		'kubejs:kinetic_mechanism',
	], '#minecraft:wooden_slabs', [
		event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
		event.recipes.createDeploying(transitional, [transitional, CR('andesite_alloy')]),
		event.recipes.createDeploying(transitional, [transitional, KJ('#saws')])
	]).transitionalItem(transitional)
		.loops(1)
		.id('kubejs:kinetic_mechanism')

	event.shapeless(KJ('kinetic_mechanism'), [KJ('#saws'), CR('cogwheel'), CR('andesite_alloy'), '#minecraft:logs']).id("kubejs:kinetic_mechanism_manual_only")

	// Andesite
	event.shaped(KJ('andesite_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('andesite_casing'),
		S: KJ('kinetic_mechanism')
	})

	let andesite_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:andesite_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:andesite_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:andesite_machine')
	}

	event.remove({ output: TE('drill_head') })
	event.shaped(TE('drill_head'), [
		'NN ',
		'NLP',
		' PL'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	event.remove({ output: TE('saw_blade') })
	event.shaped(TE('saw_blade'), [
		'NPN',
		'PLP',
		'NPN'
	], {
		N: MC('iron_nugget'),
		P: CR('iron_sheet'),
		L: TE('lead_ingot')
	})

	andesite_machine('create:portable_storage_interface', 2)
	andesite_machine('create:encased_fan', 1, CR('propeller'))
	andesite_machine('create:mechanical_press', 1, MC('iron_block'))
	andesite_machine('waterstrainer:strainer_base', 1, MC('iron_bars'))
	andesite_machine('create:mechanical_mixer', 1, CR('whisk'))
	andesite_machine('create:mechanical_drill', 1, TE('drill_head'))
	andesite_machine('create:mechanical_saw', 1, TE('saw_blade'))
	andesite_machine('create:mechanical_roller', 1, "createdeco:andesite_hull")
	andesite_machine('rechiseledcreate:mechanical_chisel', 1, "rechiseled:chisel")
	andesite_machine('create:deployer', 1, CR('brass_hand'))
	andesite_machine('create:mechanical_harvester', 2)
	andesite_machine('create:mechanical_plough', 2)
	andesite_machine('create:contraption_controls', 1)
	andesite_machine('thermal:device_tree_extractor', 1, MC('bucket'))
	andesite_machine(AE2('sky_compass'), 1, AE2('charged_certus_quartz_crystal'))
	andesite_machine(AE2('charger'), 1, AE2('certus_quartz_crystal'))
	andesite_machine('thermal:dynamo_stirling', 1, TE('rf_coil'))
	andesite_machine('create:andesite_funnel', 4)
	andesite_machine('create:andesite_tunnel', 4)
	andesite_machine('kubejs:pipe_module_utility', 4)

}

function goldMachine(event) {

	event.blasting(MC('magma_block'), MC('deepslate'))

	let t = KJ('incomplete_reinforced_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('reinforced_mechanism'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, MC('obsidian')]),
		event.recipes.createDeploying(t, [t, MC('obsidian')]),
		event.recipes.createPressing(t, [t])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:reinforced_mechanism')
	
	event.shaped(KJ('reinforced_mechanism'), [
		'OCO'
	], {
		C: KJ('kinetic_mechanism'),
		O: MC('obsidian')
	})
	donutCraft(event, KJ('gold_machine'), CR('railway_casing'), KJ('reinforced_mechanism'))

	let gold_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:gold_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:gold_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:gold_machine')
	}
	gold_machine('create:controls', 1)
	gold_machine('create:track_station', 2)
	gold_machine('create:track_signal', 4)
	gold_machine('railways:semaphore', 4)
	gold_machine('create:schedule', 4)
	gold_machine('create:track_observer', 2)
	gold_machine('railways:conductor_whistle', 4)
	gold_machine('railways:track_coupler', 2)
	gold_machine('railways:track_switch_andesite', 1, 'create:andesite_alloy')
	gold_machine('railways:track_switch_brass', 1, 'create:brass_ingot')
}


function copperMachine(event) {

	let t = KJ('incomplete_sealed_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('sealed_mechanism'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
		event.recipes.createDeploying(t, [t, TE('cured_rubber')]),
		event.recipes.createDeploying(t, [t, F('#slimeballs')]).keepHeldItem(true)
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:sealed_mechanism')

	event.shaped(KJ('sealed_mechanism'), [
		'SCS'
	], {
		C: KJ('kinetic_mechanism'),
		S: TE('cured_rubber')
	})

	event.shaped(KJ('copper_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('copper_casing'),
		S: KJ('sealed_mechanism')
	})

	event.remove({ id: TC("smeltery/casting/seared/smeltery_controller") })
	event.remove({ id: TC("smeltery/melting/copper/smeltery_controller") })

	donutCraft(event, TC('smeltery_controller'), TC('#seared_blocks'), KJ('sealed_mechanism')).modifyResult((grid, result) => {
		let item = grid.find(TC("#seared_blocks"))
		return result.withNBT({texture: item.id})
	})

	let copper_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:copper_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:copper_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:copper_machine')
	}

	copper_machine('create:copper_backtank', 1, MC("copper_block"))
	copper_machine('create:portable_fluid_interface', 2)
	copper_machine('create:spout', 1, MC('hopper'))
	copper_machine('thermal:upgrade_augment_1', 1, MC('redstone'))
	copper_machine('create:hose_pulley', 1)
	copper_machine('create:item_drain', 1, MC("iron_bars"))
	copper_machine('thermal:dynamo_magmatic', 1, TE('rf_coil'))
	copper_machine('thermal:device_water_gen', 1, MC('bucket'))
	copper_machine('create:smart_fluid_pipe', 2)
	copper_machine('kubejs:attachment_base', 1, CR('mechanical_pump'))

}

function brassMachine(event) {

	let redstoneTransmute = (input, output) => {
		event.custom({
			"type": "tconstruct:casting_basin",
			"cast": { "item": input },
			"cast_consumed": true,
			"fluid": {
				"name": "thermal:redstone",
				"amount": 50
			},
			"result": output,
			"cooling_time": 30
		})
	}

	redstoneTransmute(MC("cobblestone"), MC("netherrack"))
	redstoneTransmute(MC("sand"), MC("red_sand"))

	event.recipes.createMilling([AE2('sky_dust'), AE2('sky_stone_block')], AE2('sky_stone_block')).processingTime(1000)

	event.remove({ id: CR("sequenced_assembly/precision_mechanism") })
	let t = CR('incomplete_precision_mechanism')
	event.recipes.createSequencedAssembly([
		CR('precision_mechanism'),
	], KJ('kinetic_mechanism'), [
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, CR('electron_tube')]),
		event.recipes.createDeploying(t, [t, KJ('#screwdrivers')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:precision_mechanism')

	event.shaped(KJ('brass_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: CR('brass_casing'),
		S: CR('precision_mechanism')
	})

	let brass_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:brass_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:brass_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:brass_machine')
	}

	brass_machine('create:mechanical_crafter', 3, MC('crafting_table'))
	brass_machine('create:sequenced_gearshift', 2)
	brass_machine('create:steam_engine', 1)
	brass_machine('create:rotation_speed_controller', 1)
	brass_machine('create:mechanical_arm', 1)
	brass_machine('create:stockpile_switch', 2)
	brass_machine('create:content_observer', 2)
	brass_machine('thermal:machine_press', 1, MC('dropper'))
	brass_machine('torchmaster:feral_flare_lantern', 1, MC('glowstone_dust'))
	brass_machine('thermal:dynamo_numismatic', 1, TE('rf_coil'))
	brass_machine(PP('item_terminal'), 1, TE('diamond_gear'))
	brass_machine(PP('pressurizer'), 1, CR('propeller'))
	brass_machine('create:brass_funnel', 4)
	brass_machine('create:brass_tunnel', 4)
	brass_machine('create:elevator_pulley', 1)
	brass_machine('kubejs:pipe_module_tier_1', 4)

}

function zincMachine(event) {

	// event.custom({
	// 	"type": "tconstruct:casting_basin",
	// 	"cast": {
	// 		"item": "minecraft:basalt"
	// 	},
	// 	"cast_consumed": true,
	// 	"fluid": {
	// 		"name": "minecraft:lava",
	// 		"amount": 1000
	// 	},
	// 	"result": Item.of(TE("basalz_rod"), 2),
	// 	"cooling_time": 15
	// })

	// event.remove({ id: TE('basalz_powder') })
	// event.remove({ id: TC('smeltery/casting/scorched/stone_from_magma') })
	event.remove({ id: TC('smeltery/casting/scorched/foundry_controller') })
	// event.remove({ id: TC('smeltery/scorched/scorched_brick_kiln') })
	// event.remove({ id: TC('smeltery/scorched/scorched_brick') })
	// event.remove({ id: TC('smeltery/melting/scorched/grout') })
	event.remove({ id: TC('smeltery/melting/soul/sand') })
	// event.recipes.createMilling([Item.of(TE('basalz_powder'), 1)], TE("basalz_rod")).processingTime(300)

	donutCraft(event, TC('foundry_controller'), TC('#scorched_blocks'), KJ('infernal_mechanism')).modifyResult((grid, result) => {
		let item = grid.find(TC("#scorched_blocks"))
		return result.withNBT({texture: item.id})
	})

	event.recipes.createMixing(Fluid.of(TC("liquid_soul"), 500), [MC('twisting_vines'), MC('weeping_vines')]).heated()


	//

	let t = KJ('incomplete_infernal_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('infernal_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createFilling(t, [t, Fluid.of(TC("liquid_soul"), 500)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)]),
		event.recipes.createFilling(t, [t, Fluid.of(MC("lava"), 1000)])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:infernal_mechanism')

	event.shaped(KJ('zinc_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('zinc_casing'),
		S: KJ('infernal_mechanism')
	})

	let zinc_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:zinc_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:zinc_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:zinc_machine')
	}

	zinc_machine(TE('device_rock_gen'), 1, MC('piston'))
	zinc_machine(TE('device_collector'), 1, MC('ender_pearl'))
	zinc_machine(TE('device_nullifier'), 1, MC('lava_bucket'))
	zinc_machine(TE('device_potion_diffuser'), 1, MC('glass_bottle'))
	zinc_machine('storagedrawers:controller', 1, MC('diamond'))
	zinc_machine('storagedrawers:controller_slave', 1, MC('gold_ingot'))
	zinc_machine('torchmaster:megatorch', 1, MC('torch'))
	zinc_machine('thermal:upgrade_augment_2', 1, MC('redstone'))

}

function invarMachine(event) {

	let chop = (type, output) => {
		event.custom({
			"type": "farmersdelight:cutting",
			"ingredients": [{ "item": TC(type + "_slime_fern") }],
			"tool": { "tag": "forge:tools/knives" },
			"result": [Item.of(KJ(type + "_slimy_fern_leaf"), 2).toResultJson()]
		}).id(`kjs:cutting/${type}_slime_fern_leaf`)
		event.custom(ifiniDeploying(KJ(type + "_slimy_fern_leaf", 2), TC(type + "_slime_fern"), "#forge:tools/knives"))
		event.custom({
			"type": "occultism:spirit_fire",
			"ingredient": { "item": KJ(type + "_slimy_fern_leaf") },
			"result": { "item": TC(type + "_slime_fern") }
		})
		event.recipes.createMilling([KJ(type + "_slime_fern_paste")], KJ(type + "_slimy_fern_leaf"))
		event.campfireCooking(output, KJ(type + "_slime_fern_paste")).cookingTime(300)
	}

	let fern1 = KJ("ender_slimy_fern_leaf")
	let fern2 = KJ("sky_slimy_fern_leaf")
	let fern3 = KJ("earth_slimy_fern_leaf")
	event.shapeless(fern1, ["forbidden_arcanus:rune", fern2, fern2, fern2, fern2, fern3, fern3, fern3, fern3])
	event.shapeless(fern2, ["forbidden_arcanus:rune", fern3, fern3, fern3, fern3, fern1, fern1, fern1, fern1])
	event.shapeless(fern3, ["forbidden_arcanus:rune", fern2, fern2, fern2, fern2, fern1, fern1, fern1, fern1])

	chop("earth", MC('gunpowder'))
	chop("sky", MC('bone_meal'))
	chop("ender", AE2('ender_dust'))

	event.campfireCooking(MC("torch"), MC("stick")).cookingTime(20)

	event.shapeless(KJ('nickel_compound'), [TE('nickel_ingot'), TE("iron_dust"), TE("iron_dust"), TE("iron_dust"), TE("iron_dust")])
	event.blasting(KJ('invar_compound'), KJ('nickel_compound'))
	let s = KJ('invar_compound')
	event.recipes.createSequencedAssembly([
		TE('invar_ingot'),
	], KJ('invar_compound'), [
		event.recipes.createPressing(s, s)
	]).transitionalItem(s)
		.loops(16)
		.id('kubejs:invar')

	event.remove({ id: CR("mechanical_crafting/crushing_wheel") })
	event.recipes.createMechanicalCrafting(Item.of(CR('crushing_wheel'), 2), [
		' AAA ',
		'AABAA',
		'ABBBA',
		'AABAA',
		' AAA '
	], {
		A: F('#cobblestone'),
		B: MC('stick')
	})

	event.recipes.createCrushing([Item.of(AE2("singularity")).withChance(1)], CR('crushing_wheel')).processingTime(250)

	let dyes = [MC('orange_dye'), MC('magenta_dye'), MC('light_blue_dye'), MC('yellow_dye'), MC('lime_dye'), MC('pink_dye'), MC('cyan_dye'), MC('purple_dye'), MC('blue_dye'), MC('brown_dye'), MC('green_dye'), MC('red_dye')]
	event.recipes.createCompacting('1x ' + KJ("dye_entangled_singularity"), [dyes, Item.of(AE2('quantum_entangled_singularity'), 1)])
	event.recipes.createConversion([AE2('quantum_entangled_singularity')], AE2("singularity"))
	event.recipes.createCrushing([
		Item.of(AE2("red_paint_ball"), 1).withChance(.90),
		Item.of(AE2("yellow_paint_ball"), 1).withChance(.80),
		Item.of(AE2("green_paint_ball"), 1).withChance(.70),
		Item.of(AE2("blue_paint_ball"), 1).withChance(.60),
		Item.of(AE2("magenta_paint_ball"), 1).withChance(.50)],
		KJ('dye_entangled_singularity')).processingTime(50)

	let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
	for (let index = 0; index < colors.length; index++) {
		var element = colors[index];
		if (index == colors.length - 1)
			continue;
		event.recipes.createEmptying([AE2(colors[index + 1] + '_paint_ball'), Fluid.of(KJ('chromatic_waste'), 250)], AE2(element + '_paint_ball'))
	}

	event.recipes.createMechanicalCrafting(CR('chromatic_compound'), [
		'AA',
		'AA'
	], {
		A: AE2('magenta_paint_ball')
	})

	event.recipes.createPressing(KJ("radiant_sheet"), CR("refined_radiance"))
	event.recipes.createMechanicalCrafting(KJ('radiant_coil'), ['A'], { A: KJ('radiant_sheet') })

	//

	let t = KJ('incomplete_inductive_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('inductive_mechanism'),
	], CR('precision_mechanism'), [
		event.recipes.createDeploying(t, [t, KJ('radiant_coil')]),
		event.recipes.createDeploying(t, [t, KJ('radiant_coil')]),
		event.recipes.createDeploying(t, [t, KJ('#chromatic_resonators')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:inductive_mechanism')

	event.remove({ output: TE('machine_frame') })
	event.shaped(TE('machine_frame'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('invar_casing'),
		S: KJ('inductive_mechanism')
	})

	event.shaped(KJ('chromatic_resonator'), [
		' R ',
		'R S',
		'LS '
	], {
		R: TE('ruby'),
		L: TE('lead_ingot'),
		S: TE('sapphire')
	})

	let invar_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), TE('machine_frame'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: TE('machine_frame'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), TE('machine_frame'))
	}

	invar_machine(TE('dynamo_compression'), 1, TE('rf_coil'))
	invar_machine('kubejs:pipe_module_tier_2', 4)

	event.replaceInput({ type: "minecraft:crafting_shaped", id: /ae2:.*/ }, F("#ingots/iron"), TE("lead_plate"))

	// invar_machine(TE('machines_crucible'), 1, MC('nether_bricks'))
	// invar_machine(TE('machines_furnace'), 1, MC('bricks'))
	// invar_machine(TE('machines_chiller'), 1, MC('packed_ice'))
	// invar_machine(TE('machines_pyrolyzer'), 1, MC('blaze_rod'))
	// invar_machine(TE('machines_bottler'), 1, MC('bucket'))
	// invar_machine(TE('machines_centrifuge'), 1, MC('compass'))
	// invar_machine(TE('machines_refinery'), 1, '#forge:glass')
	// invar_machine(TE('machines_pulverizer'), 1, MC('flint'))
	// invar_machine(TE('machines_smelter'), 1, MC('blast_furnace'))
	// invar_machine(TE('machines_sawmill'), 1, TE('saw_blade'))
	// invar_machine(TE('machines_brewer'), 1, MC('brewing_stand'))
	// invar_machine(TE('machines_insolator'), 1, MC('dirt'))

}

function fluixMachine(event) {

	event.shaped(KJ('flash_drive'), [
		'SCA'
	], {
		A: TC('cobalt_ingot'),
		C: AE2('logic_processor'),
		S: MC('iron_ingot')
	})

	let t = KJ('incomplete_calculation_mechanism')
	event.recipes.createSequencedAssembly([
		KJ('calculation_mechanism'),
	], KJ('inductive_mechanism'), [
		event.recipes.createDeploying(t, [t, AE2('printed_silicon')]),
		event.recipes.createDeploying(t, [t, AE2('printed_silicon')]),
		event.recipes.createDeploying(t, [t, KJ('#flash_drives')])
	]).transitionalItem(t)
		.loops(1)
		.id('kubejs:calculation_mechanism')

	event.remove({ output: AE2('controller') })
	event.shaped(AE2('controller'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('fluix_casing'),
		S: KJ('calculation_mechanism')
	})

	let fluix_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), AE2('controller'), other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: AE2('controller'), B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), AE2('controller'))
	}

	fluix_machine(AE2('condenser'), 1, AE2("fluix_pearl"))
	fluix_machine(AE2('drive'), 1, AE2("engineering_processor"))
	fluix_machine(AE2('formation_core'), 4, AE2("logic_processor"))
	fluix_machine(AE2('annihilation_core'), 4, AE2("calculation_processor"))
	fluix_machine(AE2('chest'), 1, MC('chest'))

	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, MC("redstone"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dusts/redstone'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, MC("green_dye"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/fluid_storage_components_cell_1k_part") }, AE2("logic_processor"), F('#dyes/green'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.replaceInput({ id: AE2("network/cells/spatial_components") }, AE2("engineering_processor"), F('#dusts/glowstone'))
	event.replaceInput({ id: AE2("network/crafting/patterns_blank") }, MC("glowstone_dust"), KJ('calculation_mechanism'))
	event.recipes.thermal.smelter(AE2("fluix_crystal", 2), [MC("quartz"), AE2("charged_certus_quartz_crystal"), MC("redstone")]).energy(4000)

}

function enderMachine(event) {

	// event.remove({ id: TE("machine/crucible/crucible_ender_pearl") })
	// event.recipes.createMixing(Fluid.of(TE("ender"), 360), [Fluid.of('tconstruct:molten_silver', 90), Fluid.of('tconstruct:ender_slime', 1000)]).heated()

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:coins/silver" },
		"result": {
			"fluid": "tconstruct:molten_silver",
			"amount": 10
		},
		"temperature": 790,
		"time": 40
	})

	event.custom({ // worth it!
		"type": "tconstruct:melting",
		"ingredient": { "tag": "forge:coins/gold" },
		"result": {
			"fluid": "tconstruct:molten_gold",
			"amount": 10
		},
		"temperature": 790,
		"time": 40
	})

	// event.custom({
	// 	"type": "tconstruct:casting_table",
	// 	"cast": { "tag": "tconstruct:casts/multi_use/ingot" },
	// 	"fluid": {
	// 		"name": "thermal:ender",
	// 		"amount": 90
	// 	},
	// 	"result": { "item": TE("enderium_ingot") },
	// 	"cooling_time": 50
	// })

	// event.custom({
	// 	"type": "tconstruct:casting_table",
	// 	"cast": { "tag": "tconstruct:casts/single_use/ingot" },
	// 	"cast_consumed": true,
	// 	"fluid": {
	// 		"name": "thermal:ender",
	// 		"amount": 90
	// 	},
	// 	"result": { "item": TE("enderium_ingot") },
	// 	"cooling_time": 50
	// })

	// event.custom({
	// 	"type": "tconstruct:casting_table",
	// 	"cast": { "tag": "tconstruct:casts/multi_use/gear" },
	// 	"fluid": {
	// 		"name": TE("ender"),
	// 		"amount": 360
	// 	},
	// 	"result": { "item": TE("enderium_gear") },
	// 	"cooling_time": 114
	// })

	// event.custom({
	// 	"type": "tconstruct:casting_table",
	// 	"cast": { "tag": "tconstruct:casts/single_use/gear" },
	// 	"cast_consumed": true,
	// 	"fluid": {
	// 		"name": TE("ender"),
	// 		"amount": 360
	// 	},
	// 	"result": { "item": TE("enderium_gear") },
	// 	"cooling_time": 114
	// })

	//event.recipes.thermal.insolator(['endergetic:tall_poise_bush'], 'endergetic:poise_bush').water(1000)
	//event.recipes.thermal.insolator(['endergetic:poise_cluster'], 'endergetic:tall_poise_bush').water(1000)
	//event.recipes.thermal.insolator(['tconstruct:ender_slime_ball', '3x endergetic:poise_bush'], 'endergetic:poise_cluster').water(1000)
	

	event.recipes.createMixing(['tconstruct:ender_slime_ball'], ['minecraft:chorus_fruit', '#forge:slimeballs'])
	// let t = KJ('incomplete_abstruse_mechanism')
	// event.recipes.createSequencedAssembly([
	// 	KJ('abstruse_mechanism'),
	// ], KJ('inductive_mechanism'), [
	// 	event.recipes.createDeploying(t, [t, TE('enderium_gear')]),
	// 	event.recipes.createDeploying(t, [t, TE('enderium_gear')]),
	// 	event.recipes.createDeploying(t, [t, KJ('#ender_staffs')])
	// ]).transitionalItem(t)
	// 	.loops(1)
	// 	.id('kubejs:abstruse_mechanism')

	event.recipes.thermal.smelter(TE("enderium_ingot"), [F("#ingots/silver"), "minecraft:chorus_fruit", MC("ender_pearl")]).energy(10000)
	event.recipes.thermal.smelter(TE("enderium_ingot"), [F("#ingots/silver"), "minecraft:chorus_fruit", AE2("ender_dust", 4)]).energy(10000)
	event.recipes.thermal.smelter(KJ("abstruse_mechanism"), [KJ("inductive_mechanism"), TE("enderium_ingot")]).energy(2000)

	event.shaped(KJ('enderium_machine'), [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: KJ('enderium_casing'),
		S: KJ('abstruse_mechanism')
	})

	let ender_machine = (id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:enderium_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:enderium_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:enderium_machine')
	}

	ender_machine("enderstorage:ender_chest", 1, MC('chest'))
	ender_machine("enderstorage:ender_tank", 1, CR('fluid_tank'))
	ender_machine("portality:controller", 1, MC('diamond'))
	ender_machine(TE("upgrade_augment_3"), 1, MC('redstone'))
	ender_machine(AE2("quantum_ring"), 1, AE2('energy_cell'))
	ender_machine(AE2("quantum_link"), 1, AE2('fluix_pearl'))
	ender_machine(TE("fluid_duct"), 16, CR('fluid_pipe'))

	ender_machine('kubejs:pipe_module_tier_3', 4)

}

function circuits(event) {

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
			"item": MC('redstone')
		},
		"result": {
			"fluid": TE('redstone'),
			"amount": 100
		},
		"temperature": 300,
		"time": 10
	});

	event.custom({
		"type": "tconstruct:melting",
		"ingredient": {
			"item": MC('redstone_block')
		},
		"result": {
			"fluid": TE('redstone'),
			"amount": 900
		},
		"temperature": 500,
		"time": 90
	});

	event.remove({ output: PR_C('red_ingot') })
	event.remove({ output: PR_C('red_iron_comp') })
	event.remove({ input: PR_C('plate') })
	event.remove({ mod: 'projectred-illumination' })
	event.recipes.createCompacting([PR_C('red_ingot')], [MC('copper_ingot'), Fluid.of(TE("redstone"), 250)])
	event.recipes.createCompacting([PR_C('red_ingot')], [MC('copper_ingot'), MC("redstone"), MC("redstone"), MC("redstone"), MC("redstone")])
	event.recipes.thermal.smelter(PR_C('red_ingot'), [MC("copper_ingot"), MC("redstone")])
	event.shapeless(PR_C('platformed_plate'), [PR_C('plate'), PR_T('red_alloy_wire'), CR("andesite_alloy")])

	let convert = (c, id) => {
		event.shapeless(PR_I(c + "_inverted" + id), [PR_I(c + id)])
		event.shapeless(PR_I(c + id), [PR_I(c + "_inverted" + id)])
	}

	colours.forEach(c => {
		event.shaped(PR_I(c + '_illumar_lamp', 1), [
			'G',
			'C',
			'S'
		], {
			G: F('#glass/colorless'),
			C: PR_C(c + '_illumar'),
			S: MC('redstone')
		})

		event.stonecutting(PR_I(c + '_fixture_light', 4), PR_I(c + '_illumar_lamp'))
		event.stonecutting(PR_I(c + '_fallout_light', 4), PR_I(c + '_illumar_lamp'))
		event.stonecutting(PR_I(c + '_lantern', 4), PR_I(c + '_illumar_lamp'))
		event.stonecutting(PR_I(c + '_cage_light', 4), PR_I(c + '_illumar_lamp'))
		convert(c, '_illumar_lamp')
		convert(c, '_fallout_light')
		convert(c, '_lantern')
		convert(c, '_cage_light')
		convert(c, '_fixture_light')
	})

	let circuit = (id, override) => {
		if (override)
			event.remove({ output: id })
		event.stonecutting(Item.of(id, 1), PR_C('platformed_plate'))
	}

	let p_circuit = (id) => circuit("projectred_integration:" + id + "_gate", true)

	circuit(MC("repeater"), false)
	circuit(MC("comparator"), false)
	circuit(CR("pulse_repeater"), true)
	circuit(CR("pulse_extender"), true)
	circuit(CR("powered_latch"), true)
	circuit(CR("powered_toggle_latch"), true)

	p_circuit("or")
	p_circuit("nor")
	p_circuit("not")
	p_circuit("and")
	p_circuit("nand")
	p_circuit("xor")
	p_circuit("xnor")
	p_circuit("buffer")
	p_circuit("multiplexer")
	p_circuit("pulse")
	p_circuit("repeater")
	p_circuit("randomizer")
	p_circuit("sr_latch")
	p_circuit("toggle_latch")
	p_circuit("transparent_latch")
	p_circuit("light_sensor")
	p_circuit("rain_sensor")
	p_circuit("timer")
	p_circuit("sequencer")
	p_circuit("counter")
	p_circuit("state_cell")
	p_circuit("synchronizer")
	p_circuit("bus_transceiver")
	p_circuit("null_cell")
	p_circuit("invert_cell")
	p_circuit("buffer_cell")
	p_circuit("comparator")
	p_circuit("and_cell")
	p_circuit("bus_randomizer")
	p_circuit("bus_converter")
	p_circuit("bus_input_panel")
	p_circuit("segment_display")
	p_circuit("dec_randomizer")

	// AE2

	event.remove({ type: AE2('inscriber') })

	event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": AE2("calculation_processor_press") },
		"cast_consumed": false,
		"fluid": { "tag": "tconstruct:molten_copper", "amount": 90 },
		"result": { "item": AE2("printed_calculation_processor") },
		"cooling_time": 150
	})

	event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": AE2("logic_processor_press") },
		"cast_consumed": false,
		"fluid": { "tag": "tconstruct:molten_gold", "amount": 90 },
		"result": { "item": AE2("printed_logic_processor") },
		"cooling_time": 150
	})

	event.custom({
		"type": "tconstruct:casting_table",
		"cast": { "item": AE2("engineering_processor_press") },
		"cast_consumed": false,
		"fluid": { "tag": "tconstruct:molten_diamond", "amount": 100 },
		"result": { "item": AE2("printed_engineering_processor") },
		"cooling_time": 150
	})

	event.recipes.thermal.crucible(Fluid.of(TC("molten_diamond"), 100), MC("diamond")).energy(10000)

	event.recipes.thermal.chiller(AE2("printed_calculation_processor"), [Fluid.of("tconstruct:molten_copper", 90), AE2("calculation_processor_press")]).energy(5000)
	event.recipes.thermal.chiller(AE2("printed_logic_processor"), [Fluid.of("tconstruct:molten_gold", 90), AE2("logic_processor_press")]).energy(5000)
	event.recipes.thermal.chiller(AE2("printed_engineering_processor"), [Fluid.of("tconstruct:molten_diamond", 100), AE2("engineering_processor_press")]).energy(5000)

	event.custom(ifiniDeploying(AE2("printed_silicon"), AE2("silicon"), AE2("silicon_press")))

	let types = ["calculation", "logic", "engineering"]
	types.forEach(e => {
		let t = KJ('incomplete_' + e + '_processor')
		event.recipes.createSequencedAssembly([
			AE2(e + '_processor'),
		], AE2('printed_silicon'), [
			event.recipes.createDeploying(t, [t, AE2('printed_' + e + "_processor")]),
			event.recipes.createFilling(t, [t, Fluid.of(TE("redstone"), 250)]),
			event.recipes.createPressing(t, t)
		]).transitionalItem(t)
			.loops(1)
			.id('kubejs:' + e + "_processor")
	})

	event.recipes.thermal.smelter(AE2('quartz_glass'), [[AE2('certus_quartz_dust'), TE('quartz_dust')]])

}

function madMaths(event) {

	event.remove({ id: TE('compat/tconstruct/chiller_tconstruct_tin_ingot') })
	event.remove({ output: TE('chiller_ball_cast') })
	event.remove({ output: TE('chiller_rod_cast') })
	event.remove({ output: TE('chiller_ingot_cast') })

	event.stonecutting(TE('chiller_ball_cast'), TE('nickel_plate'))
	event.stonecutting(TE('chiller_rod_cast'), TE('nickel_plate'))
	event.stonecutting(TE('chiller_ingot_cast'), TE('nickel_plate'))

	let types = ["three", "eight", "plus", "minus", "multiply", "divide"]
	types.forEach(e => {
		event.stonecutting(KJ(e + '_cast'), TE('nickel_plate'))
		event.custom({
			"type": "tconstruct:casting_table",
			"cast": {
				"item": KJ(e + '_cast')
			},
			"fluid": {
				"name": "kubejs:raw_logic",
				"amount": 1
			},
			"result": Item.of(KJ(e)).toResultJson(),
			"cooling_time": 10
		})
		event.custom({
			"type": "thermal:chiller",
			"ingredients": [
				Fluid.of(KJ('raw_logic'), 1).toJson(),
				Item.of(KJ(e + '_cast')).toJson()
			],
			"result": [
				Item.of(KJ(e)).toResultJson()
			],
			"energy": 100,
		})
	})

	let meltOrCrucible = (id, out, outAmount) => {
		event.recipes.thermal.crucible(Fluid.of(out, outAmount), [id]).energy(20)
		event.custom({
			"type": "tconstruct:melting",
			"ingredient": { "item": id },
			"result": {
				"fluid": out,
				"amount": outAmount
			},
			"temperature": 200,
			"time": 20
		})
	}

	let alloyAmount = 10
	let outAmount = 50
	event.custom({
		"type": "tconstruct:alloy",
		"inputs": [
			{ "name": "kubejs:number_0", "amount": alloyAmount },
			{ "name": "kubejs:number_1", "amount": alloyAmount },
			{ "name": "kubejs:number_2", "amount": alloyAmount },
			{ "name": "kubejs:number_3", "amount": alloyAmount },
			{ "name": "kubejs:number_4", "amount": alloyAmount },
			{ "name": "kubejs:number_5", "amount": alloyAmount },
			{ "name": "kubejs:number_6", "amount": alloyAmount },
			{ "name": "kubejs:number_7", "amount": alloyAmount },
			{ "name": "kubejs:number_8", "amount": alloyAmount },
			{ "name": "kubejs:number_9", "amount": alloyAmount }
		],
		"result": {
			"fluid": "kubejs:matrix",
			"amount": outAmount
		},
		"temperature": 200
	})

	meltOrCrucible(KJ("calculation_mechanism"), KJ("raw_logic"), 30)
	meltOrCrucible(KJ("zero"), KJ("number_0"), 1)
	meltOrCrucible(KJ("one"), KJ("number_1"), 1)
	meltOrCrucible(KJ("two"), KJ("number_2"), 1)
	meltOrCrucible(KJ("three"), KJ("number_3"), 1)
	meltOrCrucible(KJ("four"), KJ("number_4"), 1)
	meltOrCrucible(KJ("five"), KJ("number_5"), 1)
	meltOrCrucible(KJ("six"), KJ("number_6"), 1)
	meltOrCrucible(KJ("seven"), KJ("number_7"), 1)
	meltOrCrucible(KJ("eight"), KJ("number_8"), 1)
	meltOrCrucible(KJ("nine"), KJ("number_9"), 1)

	event.custom({
		"type": "tconstruct:casting_basin",
		"fluid": {
			"name": "kubejs:matrix",
			"amount": 1000
		},
		"result": Item.of(KJ("computation_matrix")).toResultJson(),
		"cooling_time": 20
	})

	let nums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
	let ops = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b, (a, b) => b == 0 ? 'error' : a / b]
	let opNames = ['plus', 'minus', 'multiply', 'divide']

	for (var a = 0; a < 10; a++) {
		for (var b = 0; b < 10; b++) {
			for (var op = 0; op < ops.length; op++) {

				let result = ops[op](a, b)
				var output;

				if (result == 'error')
					output = KJ('missingno')
				else if (result < 0)
					continue
				else if (result > 9)
					continue
				else if (result % 1 != 0)
					continue
				else
					output = KJ(nums[result])

				event.custom({
					"type": "create:mechanical_crafting",
					"pattern": [
						"AOB"
					],
					"key": {
						"A": {
							"item": KJ(nums[a])
						},
						"O": {
							"item": KJ(opNames[op])
						},
						"B": {
							"item": KJ(nums[b])
						}
					},
					"result": {
						"item": output
					},
					"acceptMirrored": false
				})

				event.custom({
					"type": "create:mechanical_crafting",
					"pattern": [
						"A",
						"O",
						"B"
					],
					"key": {
						"A": {
							"item": KJ(nums[a])
						},
						"O": {
							"item": KJ(opNames[op])
						},
						"B": {
							"item": KJ(nums[b])
						}
					},
					"result": {
						"item": output
					},
					"acceptMirrored": false
				})

			}
		}
	}

}

function glitch(event) {


}

function alchemy(event) {

	event.recipes.thermal.pyrolyzer([MC("charcoal", 2), Fluid.of(TE('creosote'), 50)], MC("#logs")).energy(1000)
	event.recipes.thermal.pyrolyzer([TE("coal_coke"), Fluid.of(TE('creosote'), 50)], MC("charcoal")).energy(2000)
	let t = KJ('incomplete_coke_chunk')
	event.recipes.createSequencedAssembly([
		KJ('coke_chunk'),
	], TE('coal_coke'), [
		event.recipes.createFilling(t, [t, Fluid.of(MC("water"), 250)]),
		event.recipes.createCutting(t, t).processingTime(100)
	]).transitionalItem(t)
		.loops(2)
		.id('kubejs:coke_cutting')

	event.recipes.createSplashing([
		Item.of(KJ("sand_ball")).withChance(0.125)
	], 'minecraft:sandstone')
	event.recipes.thermal.bottler(KJ("sand_ball"), [Fluid.of(MC("water"), 50), F("#sand/colorless")]).energy(1000)
	// event.recipes.thermal.chiller(KJ("creosote_pellet"), [Fluid.of(TE("creosote"), 50)]).energy(1000)
	// event.recipes.thermal.crucible(Fluid.of(KJ("liquid_smoke"), 250), KJ("creosote_pellet")).energy(3000)
	// event.remove({ id: TE("blitz_powder") })
	// event.recipes.createPressing(TE("lightning_charge"), TE("blitz_powder"))
	event.remove({ output: TE("basalz_powder") })
	event.remove({ output: TE("blizz_powder") })

	event.custom({
		"type": "thermal:pulverizer",
		"ingredient": { "item": "thermal:basalz_rod" },
		"energy": 800,
		"result": [
			{ "item": "thermal:basalz_powder", "chance": 2.5 },
			{ "item": "thermal:slag", "chance": 0.125 }
		]
	})

	event.custom({
		"type": "thermal:pulverizer",
		"ingredient": { "item": "thermal:blizz_rod" },
		"energy": 800,
		"result": [
			{ "item": "thermal:blizz_powder", "chance": 2.5 },
			{ "item": "thermal:niter", "chance": 0.125 }
		]
	})

	event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), F("#sand")).energy(6000)
	event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), F("#glass/colorless")).energy(3000)
	event.recipes.thermal.pulverizer([CR("powdered_obsidian")], F("#obsidian")).energy(7000)

	let blizz = TE("blizz_powder")
	let basalz = TE("basalz_powder")
	event.recipes.createEmptying([KJ("rough_sand"), Fluid.of(KJ("fine_sand"), 500)], KJ("sand_ball"))
	event.recipes.createCrushing([Item.of(blizz, 1), Item.of(blizz, 1).withChance(.5)], TE("blizz_rod"))
	event.recipes.createCrushing([Item.of(basalz, 1), Item.of(basalz, 1).withChance(.5)], TE("basalz_rod"))
	event.recipes.createCompacting(TE("ice_charge"), [blizz, blizz, blizz, blizz, blizz, blizz, blizz, blizz])
	event.recipes.createCompacting(TE("earth_charge"), [basalz, basalz, basalz, basalz, basalz, basalz, basalz, basalz])

	event.recipes.createCompacting(KJ("silicon_compound"), [Fluid.of(KJ("fine_sand"), 500), KJ("purified_sand"), KJ("coke_chunk")])
	// event.recipes.createCompacting(KJ("smoke_mote"), [Fluid.of(KJ("liquid_smoke"), 500)])

	// event.remove({ output: "desolation:activatedcharcoal" })
	// event.recipes.thermal.smelter(
	// 	["desolation:activatedcharcoal"],
	// 	[KJ("coke_chunk"), TE("lightning_charge")])
	// 	.energy(10000)

	event.recipes.thermal.smelter(
		[KJ("purified_sand")],
		[KJ("rough_sand"), TE("earth_charge")])
		.energy(5000)

	event.recipes.thermal.smelter(
		[AE2("silicon")],
		[KJ("silicon_compound"), TE("ice_charge")])
		.energy(5000)

	event.recipes.thermal.numismatic_fuel(TE('silver_coin')).energy(100000)
	event.recipes.thermal.numismatic_fuel(TE('gold_coin')).energy(6400000)

	event.remove({ id: TE("machine/pyrolyzer/pyrolyzer_logs") })
	event.remove({ id: CR("crushing/obsidian") })
	event.remove({ type: TE("sawmill") })
	event.remove({ type: TE("centrifuge") })
	event.remove({ output: AE2("silicon") })

	let alchemy_mix = (output, catalyst, r1, r2, amount) => {
		event.recipes.createMixing([Item.of(KJ("substrate_" + output, amount ? amount : 1)), KJ("substrate_" + catalyst)], [KJ("substrate_" + catalyst), KJ("substrate_" + r1, 2), KJ("substrate_" + r2)]).heated()
	}

	let alchemy_smelt = (output, catalyst, r1, r2, amount) => {
		event.recipes.thermal.smelter([Item.of(KJ("substrate_" + output, amount ? amount : 1)), KJ("substrate_" + catalyst)], [KJ("substrate_" + r1, 2), KJ("substrate_" + catalyst), KJ("substrate_" + r2)]).energy(4000)
	}

	alchemy_mix("red", "herbal", "diorite", "andesite")
	alchemy_mix("orange", "herbal", "granite", "diorite")
	alchemy_mix("yellow", "herbal", "cobblestone", "granite")
	alchemy_mix("green", "herbal", "basalt", "cobblestone")
	alchemy_mix("blue", "herbal", "scoria", "basalt")
	alchemy_mix("magenta", "herbal", "andesite", "scoria")

	alchemy_smelt("nether", "volatile", "red", "scoria")
	alchemy_smelt("blaze", "volatile", "orange", "andesite")
	alchemy_smelt("gunpowder", "volatile", "yellow", "diorite")
	alchemy_smelt("slime", "volatile", "green", "granite")
	alchemy_smelt("prismarine", "volatile", "blue", "cobblestone")
	alchemy_smelt("obsidian", "volatile", "magenta", "basalt")

	alchemy_mix("arcane", "crystal", "nether", "magenta")
	alchemy_mix("niter", "crystal", "blaze", "red")
	alchemy_mix("quartz", "crystal", "gunpowder", "orange")
	alchemy_mix("sulfur", "crystal", "slime", "yellow")
	alchemy_mix("apatite", "crystal", "prismarine", "green")
	alchemy_mix("certus", "crystal", "obsidian", "blue")

	alchemy_smelt("lead", "metal", "arcane", "obsidian")
	alchemy_smelt("copper", "metal", "niter", "nether")
	alchemy_smelt("gold", "metal", "quartz", "blaze")
	alchemy_smelt("nickel", "metal", "sulfur", "gunpowder")
	alchemy_smelt("zinc", "metal", "apatite", "slime")
	alchemy_smelt("iron", "metal", "certus", "prismarine")



	alchemy_smelt("andesite", "igneous", "emerald", "iron", 20)
	alchemy_smelt("diorite", "igneous", "sapphire", "lead", 20)
	alchemy_smelt("granite", "igneous", "diamond", "copper", 20)
	alchemy_smelt("cobblestone", "igneous", "lapis", "gold", 20)
	alchemy_smelt("basalt", "igneous", "ruby", "nickel", 20)
	alchemy_smelt("scoria", "igneous", "cinnabar", "zinc", 20)

	let mundane = (id, outputs) => {
		let jsonOut = []
		if (outputs[0] > 0)
			jsonOut.push({
				"item": "supplementaries:ash",
				"count": outputs[0]
			})
		if (outputs[1] > 0)
			jsonOut.push({
				"item": MC("redstone"),
				"count": outputs[1]
			})
		if (outputs[2] > 0)
			jsonOut.push({
				"item": MC("glowstone_dust"),
				"count": outputs[2]
			})
		event.custom({
			"type": "thermal:centrifuge",
			"ingredient": {
				"item": KJ(`failed_alchemy_${id}`)
			},
			"result": jsonOut
		})
	}

	let i = 0;

	mundane(i++, [4, 0, 0])
	mundane(i++, [3, 1, 0])
	mundane(i++, [3, 0, 1])
	mundane(i++, [2, 2, 0])
	mundane(i++, [2, 0, 2])

	mundane(i++, [2, 1, 1])
	mundane(i++, [1, 3, 0])
	mundane(i++, [1, 0, 3])
	mundane(i++, [1, 2, 1])
	mundane(i++, [1, 1, 2])

	mundane(i++, [0, 4, 0])
	mundane(i++, [0, 0, 4])
	mundane(i++, [0, 3, 1])
	mundane(i++, [0, 1, 3])
	mundane(i++, [0, 2, 2])

	let recompact = (id, id2) => {
		event.recipes.createCompacting(id2, [id])
	}

	event.recipes.createCrushing(CR("powdered_obsidian"), MC("obsidian"))

	recompact(F("#dusts/obsidian"), MC("obsidian"))
	recompact(F("#dusts/diamond"), MC("diamond"))
	recompact(F("#dusts/emerald"), MC("emerald"))
	recompact(F("#dusts/lapis"), MC("lapis_lazuli"))
	recompact(F("#dusts/sulfur"), TE("sulfur"))
	recompact(F("#dusts/apatite"), TE("apatite"))
	recompact(F("#dusts/niter"), TE("niter"))
	recompact(F("#dusts/sapphire"), TE("sapphire"))
	recompact(F("#dusts/ruby"), TE("ruby"))
	recompact(F("#dusts/arcane_crystal"), "forbidden_arcanus:arcane_crystal")
	recompact(F("#dusts/quartz"), MC("quartz"))

	global.substrates.forEach(a => {
		a.forEach(e => {
			if (!e.ingredient)
				return
			event.custom({
				"type": "thermal:bottler",
				"ingredients": [Ingredient.of(e.ingredient).toJson(), { "fluid": "tconstruct:molten_glass", "amount": 100 }],
				"result": [{ "item": e.id }]
			})
			event.custom({
				"type": "thermal:sawmill",
				"ingredient": { "item": e.id },
				"result": [{ "item": e.outputItem ? e.outputItem : typeof e.ingredient == "string" ? e.ingredient : e.ingredient[0], "chance": 0.75 }],
				"energy": 2000
			})
		})
	})

	event.custom({
		"type": "thermal:sawmill",
		"ingredient": { "item": "kubejs:substrate_silicon" },
		"result": [{ "item": AE2("silicon"), "count": 1 }],
		"energy": 2000
	})

	event.custom({
		"type": "thermal:sawmill",
		"ingredient": { "item": "kubejs:substrate_silver" },
		"result": [{ "item": TE("silver_dust"), "count": 1 }],
		"energy": 2000
	})

	event.custom({
		"type": "thermal:bottler",
		"ingredients": [
			{ "item": TE("signalum_nugget") },
			{ "fluid": "tconstruct:molten_glass", "amount": 100 }
		],
		"result": [{ "item": "kubejs:accellerator_redstone" }]
	})

	event.custom({
		"type": "thermal:bottler",
		"ingredients": [
			{ "item": TE("silver_dust") },
			{ "fluid": "tconstruct:molten_glass", "amount": 100 }
		],
		"result": [{ "item": "kubejs:substrate_silver" }]
	})

	event.custom({
		"type": "thermal:bottler",
		"ingredients": [
			{ "item": TE("lumium_nugget") },
			{ "fluid": "tconstruct:molten_glass", "amount": 100 }
		],
		"result": [{ "item": "kubejs:accellerator_glowstone" }]
	})

}

function trading(event) {
	let trade = (card_id, ingredient, output) => {
		event.custom({
			type: 'thermal:press',
			ingredients: [
				Ingredient.of(ingredient).toJson(),
				Ingredient.of(card_id).toJson(),
			],
			result: [
				Item.of(output).toResultJson()
			],
			energy: 1000
		})
	}

	global.trades.forEach(element => {
		if (global.transactions[element])
			global.transactions[element].forEach(transaction => {
				trade(KJ('trade_card_' + element), transaction.in, transaction.out)
			})
	});

	global.professions.forEach(element => {
		if (global.transactions[element])
			global.transactions[element].forEach(transaction => {
				trade(KJ('profession_card_' + element), transaction.in, transaction.out)
			})
	});
}

function stripping(event) {
	event.remove({ input: '#minecraft:logs', type: 'farmersdelight:cutting' })

	let normal_wood_types = [
		MC('oak'), 
		MC('spruce'), 
		MC('birch'), 
		MC('jungle'), 
		MC('acacia'), 
		MC('dark_oak'), 
		BOP('fir'), 
		BOP('redwood'), 
		BOP('cherry'), 
		BOP('mahogany'), 
		BOP('jacaranda'), 
		BOP('palm'), 
		BOP('willow'), 
		BOP('dead'), 
		BOP('magic'), 
		BOP('umbran'), 
		BOP('hellbark'), 
		AP('twisted'),
		TC('greenheart'),
		TC('skyroot'),
		TC('bloodshroom')
	]
	//laziness and its consequences have been a distaster for the human race
	normal_wood_types.forEach(wood => {
		event.custom({
			"type": "farmersdelight:cutting",
			"ingredients": [{ "item": wood + "_log" }],
			"tool": { "tag": "forge:tools/axes" },
			"result": [{ "item": wood.replace(':',':stripped_') + "_log" }, { "item": "farmersdelight:tree_bark" }]
		})
		event.custom({
			"type": "farmersdelight:cutting",
			"ingredients": [{ "item": wood + "_wood" }],
			"tool": { "tag": "forge:tools/axes" },
			"result": [{ "item": wood.replace(':',':stripped_') + "_wood" }, { "item": "farmersdelight:tree_bark" }]
		})
	})
	
	let special_wood_types = [MC('crimson'), MC('warped')] //"special"
	special_wood_types.forEach(wood => {
		event.custom({
			"type": "farmersdelight:cutting",
			"ingredients": [{ "item": wood + "_stem" }],
			"tool": { "tag": "forge:tools/axes" },
			"result": [{ "item": wood.replace(':',':stripped_') + "_stem" }, { "item": "farmersdelight:tree_bark" }]
		})
		event.custom({
			"type": "farmersdelight:cutting",
			"ingredients": [{ "item": wood + "_hyphae" }],
			"tool": { "tag": "forge:tools/axes" },
			"result": [{ "item": wood.replace(':',':stripped_') + "_hyphae" }, { "item": "farmersdelight:tree_bark" }]
		})
	})
}

// Program 

//event.listen('player.chat', function (event) {
	// Check if message equals creeper, ignoring case

//	if (event.message.startsWith('!clear')) {
//		event.player.tell('Log cleared')
//		log = []
//		event.cancel()
//	}

//	if (event.message.startsWith('!status')) {
//		if (log.length == 0) {
//			event.player.tell('Log empty')
//			event.cancel()
//			return
//		}

//		event.player.tell('Log Start >')
//		log.forEach(s => event.player.tell(s))
//		event.player.tell('<')
//		event.cancel()
//	}
//})




