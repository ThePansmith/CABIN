// priority: 0

//Textures must use the 'cabin' namespace to avoid a bug involving kubejs loading textures from resource packs.
//Textures must also be stored in a resource pack since the kubejs assets folder cannot be overridden using resource packs for whatever reason
StartupEvents.registry('item', event => {

	let types = ['Certus', 'Fluix']
	types.forEach(e => {
		let id = e.toLowerCase()
		event.create(id + '_crystal_seed').texture("ae2:item/crystal_seed_" + id).displayName(e + ' Quartz Seed')
		event.create('growing_' + id + '_seed','create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id).displayName(e + ' Quartz Seed')
		event.create('tiny_' + id + '_crystal').texture("ae2:item/crystal_seed_" + id + "2").displayName('Tiny ' + e + ' Quartz Crystal')
		event.create('growing_tiny_' + id + '_crystal','create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id + "2").displayName('Tiny ' + e + ' Quartz Crystal')
		event.create('small_' + id + '_crystal').texture("ae2:item/crystal_seed_" + id + "3").displayName('Small ' + e + ' Quartz Crystal')
		event.create('growing_small_' + id + '_crystal','create:sequenced_assembly').texture("ae2:item/crystal_seed_" + id + "3").displayName('Small ' + e + ' Quartz Crystal')
	});

	let processors = ["Calculation", "Logic", "Engineering"]
	processors.forEach(name => {
		let e = name.toLowerCase()
		event.create('incomplete_' + e + '_processor','create:sequenced_assembly').texture('cabin:item/incomplete_' + e + '_processor').displayName('Incomplete ' + name + ' Processor')
	})

	let number = (name) => {
		let id = name.toLowerCase()
		event.create(id).texture("cabin:item/" + id).glow(true).displayName(name)
	}

	number('Zero')
	number('One')
	number('Two')
	number('Three')
	number('Four')
	number('Five')
	number('Six')
	number('Seven')
	number('Eight')
	number('Nine')
	number('Plus')
	number('Minus')
	number('Multiply')
	number('Divide')

	let mechanism = (name, rarity) => {
		let id = name.toLowerCase()
		event.create(id + '_mechanism').texture("cabin:item/" + id + "_mechanism").displayName(name + ' Mechanism').rarity(rarity ? rarity : 'common')
		event.create('incomplete_' + id + '_mechanism','create:sequenced_assembly').texture("cabin:item/incomplete_" + id + "_mechanism").displayName('Incomplete ' + name + ' Mechanism')
	}

	event.create('radiant_coil').glow(true).texture("cabin:item/radiant_coil").displayName('Radiant Induction Coil')
	event.create('radiant_sheet').glow(true).texture("cabin:item/radiant_sheet").displayName('Radiant Sheet')

	mechanism('Kinetic')
	mechanism('Sealed')
	mechanism('Reinforced')
	mechanism('Infernal', 'uncommon')
	mechanism('Inductive', 'uncommon')
	mechanism('Abstruse', 'rare')
	mechanism('Calculation', 'rare')

	let slime_types = ["Earth", "Sky", "Ender"]
	let slime_colours = [0x8FDB84, 0x00F9DE, 0xAC2EFC]

	for (let i = 0; i < slime_types.length; i++) {
		let name = slime_types[i]
		let id = name.toLowerCase()
		event.create(`${id}_slimy_fern_leaf`)
			.color(0, slime_colours[i])
			.texture("cabin:item/slimy_fern_leaf")
			.displayName(`Slimy Fern Leaf`)
		event.create(`${id}_slime_fern_paste`)
			.color(0, slime_colours[i])
			.texture("cabin:item/ground_slimy_fern")
			.displayName(`Slimy Fern Blend`)
	}

	// Misc / Integration
	event.create('pipe_module_utility').texture("cabin:item/pipe_module_utility").displayName('Utility Pipe Module')
	event.create('pipe_module_tier_1').texture("cabin:item/pipe_module_tier_1").displayName('Brass Pipe Module')
	event.create('pipe_module_tier_2').texture("cabin:item/pipe_module_tier_2").displayName('Invar Pipe Module')
	event.create('pipe_module_tier_3').texture("cabin:item/pipe_module_tier_3").displayName('Enderium Pipe Module')
	
	event.create('circuit_scrap').texture("cabin:item/circuit_scrap").displayName('Circuit Scrap')
	//event.create('charged_calculator').texture("cabin:item/charged_calculator").displayName('Calculator').maxDamage(64)
	event.create('missingno').texture("cabin:item/missingno").displayName('∄')
	event.create('zinc_dust').texture("cabin:item/zinc_dust").displayName('Zinc Dust').tag("forge:dusts/zinc").tag("forge:dusts")
	//event.create('creosote_pellet').texture("cabin:item/creosote_pellet").displayName('Creosote Pellet')
	event.create('sand_ball').texture("cabin:item/sand_ball").displayName('Ball of Sand').unstackable()
	event.create('rough_sand').texture("cabin:item/rough_sand").displayName('Sand Chunks')
	event.create('purified_sand').texture("cabin:item/purified_sand").displayName('Purified Sand')
	event.create('silicon_compound').texture("cabin:item/silicon_compound").displayName('Silicon Compound')
	//event.create('smoke_mote').texture("cabin:item/smoke_mote").displayName('Tiny Smoke Cloud')
	event.create('incomplete_coke_chunk','create:sequenced_assembly').texture("cabin:item/incomplete_coke_chunk").displayName('Cut Coke')
	event.create('coke_chunk').texture("cabin:item/coke_chunk").displayName('Coke Chunks')

	event.create('matter_plastics').texture("cabin:item/matter_plastics").displayName('Matter Plastics')
	event.create('nickel_compound').texture("cabin:item/nickel_compound").displayName('Nickel Compound')
	event.create('invar_compound','create:sequenced_assembly').texture("cabin:item/invar_compound").displayName('Unprocessed Invar Ingot')
	event.create('dye_entangled_singularity').texture("cabin:item/dye_entangled_singularity").unstackable().displayName('Chromatic Singularity')
	event.create('chromatic_resonator').texture("cabin:item/chromatic_resonator").displayName('Chromatic Resonator').maxDamage(512)
	event.create('flash_drive').texture("cabin:item/boot_medium").displayName('Flash Drive').maxDamage(512)

	event.create('alchemical_laser').parentModel("cabin:block/ponder_laser_lamp_on").displayName('Alchemical Laser (Ponder Entry)').unstackable()
	event.create('thermal_cast').texture("cabin:item/thermal_cast").displayName('Thermal Cast').unstackable()
	event.create('three_cast').texture("cabin:item/three_cast").displayName('Integer Cast (3)').unstackable()
	event.create('eight_cast').texture("cabin:item/eight_cast").displayName('Integer Cast (8)').unstackable()
	event.create('plus_cast').texture("cabin:item/plus_cast").displayName('Operator Cast (+)').unstackable()
	event.create('minus_cast').texture("cabin:item/minus_cast").displayName('Operator Cast (-)').unstackable()
	event.create('multiply_cast').texture("cabin:item/multiply_cast").displayName('Operator Cast (x)').unstackable()
	event.create('divide_cast').texture("cabin:item/divide_cast").displayName('Operator Cast (/)').unstackable()
	event.create('attachment_base').texture("cabin:item/attachment_base").displayName('Attachment Base')
	event.create('silver_coin').texture("cabin:item/silver_coin").displayName('Silver Coin Stack Icon')
	event.create('gold_coin').texture("cabin:item/gold_coin").displayName('Gold Coin Stack Icon')
})

StartupEvents.registry("block", event => {

	event.create('enderium_casing').model('cabin:block/enderium_casing').material('metal').tagBlock("mineable/pickaxe").tagBlock("create:wrench_pickup").requiresTool(true).hardness(4.0).displayName('Ender Casing')
	event.create('zinc_casing').textureAll('cabin:block/zinc_casing').material('metal').tagBlock("mineable/pickaxe").tagBlock("create:wrench_pickup").requiresTool(true).hardness(3.0).displayName('Zinc Casing')
	event.create('invar_casing').textureAll('cabin:block/invar_casing').material('metal').tagBlock("mineable/pickaxe").tagBlock("create:wrench_pickup").requiresTool(true).hardness(3.0).displayName('Invar Casing')
	event.create('fluix_casing').textureAll('cabin:block/fluix_casing').material('metal').tagBlock("mineable/pickaxe").tagBlock("create:wrench_pickup").requiresTool(true).hardness(3.0).displayName('Fluix Casing')

	event.create('computation_matrix').model("cabin:block/computation_matrix").material("lantern").hardness(0.1).displayName('Computation Matrix').fullBlock(false).notSolid().box(1,1,1,15,15,15).waterlogged().opaque(false).lightLevel(7).renderType("translucent")

	event.create('ponder_laser_lamp').model('cabin:block/ponder_laser_lamp').notSolid().renderType("translucent").displayName('Laser Lamp (For Ponder)')
	event.create('ponder_laser_lamp_on').model('cabin:block/ponder_laser_lamp_on').notSolid().lightLevel(15).renderType("translucent").displayName('Laser Lamp (For Ponder)')
	event.create('navigation_computer').model('cabin:block/navigation_computer').material('metal').tagBlock("mineable/pickaxe").hardness(3.0).requiresTool(true).displayName('Navigation Computer')
	event.create('lander_deployer').model('cabin:block/lander_deployer').material('metal').tagBlock("mineable/pickaxe").hardness(3.0).requiresTool(true).displayName('Lander Deployer')

	


	let machine = (name, layer) => {
		let id = name.toLowerCase()
		return event.create(id + '_machine')
			.model('cabin:block/' + id + '_machine')
			.material('lantern')
			.hardness(3.0)
			.tagBlock("mineable/pickaxe")
			.requiresTool(true)
			.displayName(name + ' Machine')
			.notSolid()
			.renderType(layer)
			.tagBlock("create:wrench_pickup")
	}

	machine('Andesite', "solid").tagBlock("mineable/axe")
	machine('Brass', "translucent").tagBlock("mineable/axe")
	machine('Copper', "cutout").tagBlock("mineable/axe")
	machine('Gold', "solid").tagBlock("mineable/axe")
	machine('Zinc', "cutout")
	machine('Enderium', "cutout")

	for (let i = 0; i < 15; i++)
		event.create(`failed_alchemy_${i}`)
			.material('glass')
			.color(0, 0x394867)
			.color(1, 0x14274E)
			.hardness(0.1)
			.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
			.model("cabin:block/mundane_substrate")
			.displayName(`Mundane Alchemic Blend`)
			.renderType("cutout")
			.waterlogged()
			.item(e => e
				.color(0, 0x394867)
				.color(1, 0x14274E)
			)

	global.substrates = []
	global.substrate_mapping = {}
	var current_category = []
	var category_index = 0
	var substrate_index = 0

	let category = () => {
		global.substrates.push(current_category)
		current_category = []
		category_index++
		substrate_index = 0
	}

	let substrate_base = (c1, c2, id, name, model, ingredient, outputItem) => {
		global.substrate_mapping[id] = {
			category: category_index,
			index: substrate_index,
			name: name.replace(" Reagent", "").replace(" Catalyst", "")
		}
		current_category.push({
			id: `kubejs:substrate_${id}`,
			ingredient: ingredient,
			outputItem: outputItem
		})
		event.create(`substrate_${id}`)
			.material('glass')
			.color(0, c1)
			.color(1, c2)
			.hardness(0.1)
			.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
			.model("cabin:block/" + model)
			.displayName(name)
			.renderType("cutout")
			.waterlogged()
			// .item(rarity(model == "catalyst" ? 'uncommon' : 'common')
			// 	.color(0, c1)
			// 	.color(1, c2)
			// )
		substrate_index++
	}

	let reagent = (c1, c2, id, prefix, ingredient, outputItem) => substrate_base(c1, c2, id, `${prefix} Reagent`, "substrate", ingredient, outputItem)
	let catalyst = (c1, c2, id, prefix, ingredient) => substrate_base(c1, c2, id, `${prefix} Catalyst`, "catalyst", ingredient)

	reagent(0x5F5F5F, 0x8E8E8E, "andesite", "Andesite", "minecraft:andesite")
	reagent(0x7F7F7F, 0xD4D4D4, "diorite", "Diorite", "minecraft:diorite")
	reagent(0x563A2F, 0x9A6C5B, "granite", "Granite", "minecraft:granite")
	reagent(0x585858, 0x646363, "cobblestone", "Stone", "minecraft:cobblestone")
	reagent(0x32333D, 0x5C5C5C, "basalt", "Basalt", "minecraft:basalt")
	reagent(0x6B5D4F, 0x7D6B5A, "scoria", "Scoria", "create:scoria")
	category()
	reagent(0xD30000, 0xB80F0A, "red", "Crimson", ["minecraft:rose_bush", "minecraft:poppy", "minecraft:red_tulip"], "minecraft:red_dye")
	reagent(0xFC6600, 0xb1560f, "orange", "Orange", ["minecraft:orange_tulip", "biomesoplenty:burning_blossom", "minecraft:pumpkin"], "minecraft:orange_dye")
	reagent(0xFFF200, 0xdba520, "yellow", "Goldenrod", ["biomesoplenty:goldenrod", "minecraft:sunflower", "minecraft:dandelion"], "minecraft:yellow_dye")
	reagent(0x9dc183, 0x708238, "green", "Olive", ["minecraft:fern", "minecraft:cactus", "biomesoplenty:watergrass"], "minecraft:green_dye")
	reagent(0x57a0d2, 0x0080fe, "blue", "Azure", ["biomesoplenty:blue_hydrangea", "minecraft:cornflower", "minecraft:blue_orchid"], "minecraft:light_blue_dye")
	reagent(0xb200ed, 0xff66cc, "magenta", "Fuchsia", ["minecraft:lilac", "minecraft:allium", "minecraft:pink_tulip"], "minecraft:magenta_dye")
	category()
	reagent(0xAC3B00, 0xD5AC26, "blaze", "Blazing", "minecraft:blaze_powder")
	reagent(0x4F7E48, 0x8AD480, "slime", "Slime", "minecraft:slime_ball")
	reagent(0x5B151A, 0xBC3E49, "nether", "Nether", "minecraft:nether_wart")
	reagent(0x05030A, 0x36234C, "obsidian", "Obsidian", "#forge:dusts/obsidian", "create:powdered_obsidian")
	reagent(0x535353, 0x717171, "gunpowder", "Gunpowder", "minecraft:gunpowder")
	reagent(0x529680, 0xA2CFC0, "prismarine", "Aquatic", "minecraft:prismarine_shard")
	category()
	reagent(0x9E72BE, 0xB7C9D1, "arcane", "Arcane", "#forge:dusts/arcane_crystal", "forbidden_arcanus:arcane_crystal_dust")
	reagent(0x27A9BB, 0x2CC7C9, "apatite", "Apatite", "#forge:dusts/apatite", "thermal:apatite_dust")
	reagent(0xC7A94A, 0xEEF071, "sulfur", "Sulfuric", "#forge:dusts/sulfur", "thermal:sulfur_dust")
	reagent(0x735A65, 0xB8AFAF, "niter", "Nitric", "#forge:dusts/niter", "thermal:niter_dust")
	reagent(0x91C5FC, 0xA7CBCF, "certus", "Certus Quartz", "#forge:dusts/certus_quartz", "ae2:certus_quartz_dust")
	reagent(0xB19E8F, 0xE7E2DB, "quartz", "Nether Quartz", "#forge:dusts/quartz", "thermal:quartz_dust")
	category()
	reagent(0x616A60, 0xD0D2C5, "zinc", "Zinc", "#forge:dusts/zinc", "kubejs:zinc_dust")
	reagent(0xDD7E5D, 0xFCEFBA, "copper", "Copper", "#forge:dusts/copper", "thermal:copper_dust")
	reagent(0xA6A6A6, 0xD5D5D5, "iron", "Iron", "#forge:dusts/iron", "thermal:iron_dust")
	reagent(0x977756, 0xE4D196, "nickel", "Nickel", "#forge:dusts/nickel", "thermal:nickel_dust")
	reagent(0x232456, 0x7C95A4, "lead", "Lead", "#forge:dusts/lead", "thermal:lead_dust")
	reagent(0xD99413, 0xFAF25E, "gold", "Gold", "#forge:dusts/gold", "thermal:gold_dust")
	category()
	reagent(0xFC7781, 0xFCCED0, "cinnabar", "Cinnabar", "#forge:gems/cinnabar", "thermal:cinnabar")
	reagent(0x335DC1, 0x7395E7, "lapis", "Lapis Lazuli", "#forge:dusts/lapis", "thermal:lapis_dust")
	reagent(0x246BE9, 0x76C6FC, "sapphire", "Sapphire", "#forge:dusts/sapphire", "thermal:sapphire_dust")
	reagent(0x00A82B, 0xADFACB, "emerald", "Emerald", "#forge:dusts/emerald", "thermal:emerald_dust")
	reagent(0x9D0A33, 0xFB7B71, "ruby", "Ruby", "#forge:dusts/ruby", "thermal:ruby_dust")
	reagent(0x20C3B3, 0xD2FCF3, "diamond", "Diamond", "#forge:dusts/diamond", "thermal:diamond_dust")
	category()
	catalyst(0x506D84, 0x889EAF, "igneous", "Igneous")
	catalyst(0xB5CDA3, 0xC9E4C5, "herbal", "Herbal")
	catalyst(0x9F5F80, 0xFF8474, "volatile", "Volatile")
	catalyst(0xFFB037, 0xFFE268, "crystal", "Crystalline")
	catalyst(0x232457, 0x7D97A6, "metal", "Metallurgic")
	catalyst(0x3EDBF0, 0xC0FEFC, "gem", "Gemstone")
	category()

	event.create(`substrate_chaos`)
		.material('glass')
		.color(0, 0xb200ed)
		.color(1, 0xff66cc)
		.hardness(0.1)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("cabin:block/chaos_catalyst")
		.displayName("Chaos Catalyst")
		.renderType("cutout")
		.waterlogged()
		// .item(e => e.rarity('rare')
		// 	.color(0, 0xb200ed)
		// 	.color(1, 0xff66cc)
		// )

	event.create(`substrate_silicon`)
		.material('glass')
		.color(0, 0x474449)
		.color(1, 0x967DA0)
		.hardness(0.1)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("cabin:block/substrate")
		.displayName("Silicon Reagent")
		.renderType("cutout")
		.waterlogged()
		// .item(e => e.rarity('rare')
		// 	.color(0, 0x474449)
		// 	.color(1, 0x967DA0)
		// )

	event.create(`substrate_silver`)
		.material('glass')
		.color(0, 0x9FADB4)
		.color(1, 0xBECCD2)
		.hardness(0.1)
		.box(.25, 0, .25, .75, 14.0 / 16.0, .75, false)
		.model("cabin:block/substrate")
		.displayName("Silver Reagent")
		.renderType("cutout")
		.waterlogged()
		// .item(e =>  e.rarity('rare')
		// 	.color(0, 0x9FADB4)
		// 	.color(1, 0xBECCD2)
		// )

	event.create(`accellerator_glowstone`)
		.material('glass')
		.color(0, 0xFFBC5E)
		.hardness(0.1)
		.box(.125, 0, .125, .875, 10.0 / 16.0, .875, false)
		.model("cabin:block/accellerator")
		.displayName("Glowstone Accelerator")
		.renderType("cutout")
		.waterlogged()
		.item(e => e
			.color(0, 0xFFBC5E)
		)

	event.create(`accellerator_redstone`)
		.material('glass')
		.color(0, 0xAA0F01)
		.hardness(0.1)
		.box(.125, 0, .125, .875, 10.0 / 16.0, .875, false)
		.model("cabin:block/accellerator")
		.displayName("Redstone Accelerator")
		.renderType("cutout")
		.waterlogged()
		.item(e => e
			.color(0, 0xAA0F01)
		)
})

StartupEvents.registry("fluid", event => {
	let colors = [0xCBE827, 0xAEE827, 0x68E827, 0x27E86E, 0x27E8B1, 0x27DEE8, 0x27B5E8, 0x2798E8, 0x2778E8, 0x2748E8]
	event.create('raw_logic').displayName(`Liquified Logic (Unprocessed)`).stillTexture('cabin:fluid/number_still').flowingTexture('cabin:fluid/number_flow').color(0xE7FFCB)
	for (let i = 0; i < 10; i++)
		event.create('number_' + i).displayName(`Liquified Logic (${i})`).stillTexture('cabin:fluid/number_still').flowingTexture('cabin:fluid/number_flow').color(colors[i])
	event.create('matrix').displayName(`Liquified Computation Matrix`).stillTexture('cabin:fluid/matrix_still').flowingTexture('cabin:fluid/matrix_flow').bucketColor(colors[0])
	event.create('fine_sand').displayName(`Fine Sand`).stillTexture('cabin:fluid/fine_sand_still').flowingTexture('cabin:fluid/fine_sand_flow').bucketColor(0xE3DBB0)
	event.create('crude_oil').displayName(`Crude Oil`).stillTexture('thermal:block/fluids/crude_oil_still').flowingTexture('thermal:block/fluids/crude_oil_flow').bucketColor(0x222118)
	event.create('volatile_sky_solution').displayName(`Volatile Sky Solution`).stillTexture('tconstruct:block/fluid/obsidian/still').flowingTexture('tconstruct:block/fluid/obsidian/flowing').color(0x8feebf).bucketColor(0x1A1123)
	event.create('chromatic_waste').displayName(`Chromatic Waste`).stillTexture('tconstruct:block/fluid/enderium/still').flowingTexture('tconstruct:block/fluid/enderium/flowing').color(0x0B3E36)
//	event.create('liquid_smoke').displayName(`Liquid Smoke`).stillTexture('advancedrocketry:blocks/fluid/oxygen_still').flowingTexture('advancedrocketry:blocks/fluid/oxygen_flow').bucketColor(0xEBEBEB)
})

ItemEvents.modification(event => {
	let colors = ["red", "yellow", "green", "blue", "magenta", "black"]
	colors.forEach(element => {
		event.modify('ae2:' + element + '_paint_ball', item => {
			item.maxStackSize = 1
		})
	});

	event.modify('projectred_core:screwdriver', item => {
		item.maxDamage = 512
	})
})

