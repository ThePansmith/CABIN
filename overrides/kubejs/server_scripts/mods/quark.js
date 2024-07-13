const QU = (id, x) => MOD("quark", id, x)
//Quark was added as Qol and is also really easy to configure. You can still remove it if you hate quality.
//This mod can be removed from the pack with no issues
if(Platform.isLoaded("quark")) {

	//Add quark wood types to the arrays of wood types
	wood_types.push(QU("azalea"))
	wood_types.push(QU("blossom"))

	onEvent('recipes', event => {
		//Unwanted duplicate compressed block recipes
		event.remove({ id: QU('building/crafting/compressed/charcoal_block')})
		event.remove({ id: QU('building/crafting/compressed/sugar_cane_block')})
		event.remove({ id: QU('building/crafting/compressed/gunpowder_sack')})
		event.remove({ id: QU('building/crafting/compressed/apple_crate')})
		event.remove({ id: QU('building/crafting/compressed/potato_crate')})
		event.remove({ id: QU('building/crafting/compressed/carrot_crate')})
		event.remove({ id: QU('building/crafting/compressed/beetroot_crate')})


		//Tree resin
		addTreeOutput(event, QU('blossom_log'), QU('blue_blossom_leaves'))
		addTreeOutput(event, QU('blossom_log'), QU('lavender_blossom_leaves'))
		addTreeOutput(event, QU('blossom_log'), QU('orange_blossom_leaves'))
		addTreeOutput(event, QU('blossom_log'), QU('pink_blossom_leaves'))
		addTreeOutput(event, QU('blossom_log'), QU('yellow_blossom_leaves'))
		addTreeOutput(event, QU('blossom_log'), QU('red_blossom_leaves'))

		//Stone generation
		event.custom({
			"type": "thermal:rock_gen",
			"adjacent": "kubejs:chromatic_waste",
			"below": "minecraft:end_stone",
			"result": { "item": "quark:myalite"}
		})
		event.custom({
			"type": "thermal:rock_gen",
			"adjacent": "kubejs:chromatic_waste",
			"below": "minecraft:clay",
			"result": { "item": "quark:shale"}
		})
		event.custom({
			"type": "thermal:rock_gen",
			"adjacent": "kubejs:chromatic_waste",
			"below": "minecraft:quartz_block",
			"result": { "item": "quark:jasper"}
		})
	})

	onEvent('block.tags', event => {

	event.add("create:wrench_pickup", 'quark:ender_watcher')
		//I really don't know why these blocks are missing the pressure plate tag
		//All the other pressure plates from quark and forbidden have the tag.
		event.add("minecraft:pressure_plates", 'quark:obsidian_pressure_plate')
	})
}