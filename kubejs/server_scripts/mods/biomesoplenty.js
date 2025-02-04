const BOP = (id, x) => MOD("biomesoplenty", id, x)
if(Platform.isLoaded("biomesoplenty")) {
	wood_types.push(BOP('fir'))
	wood_types.push(BOP('redwood'))
	wood_types.push(BOP('cherry'))
	wood_types.push(BOP('mahogany'))
	wood_types.push(BOP('jacaranda'))
	wood_types.push(BOP('palm'))
	wood_types.push(BOP('willow'))
	wood_types.push(BOP('dead'))
	wood_types.push(BOP('magic'))
	wood_types.push(BOP('umbran'))
	wood_types.push(BOP('hellbark'))

	ServerEvents.tags('item', event => {
		event.get("forge:vines").add(BOP("willow_vine")).add(BOP("spanish_moss"))
	})
	ServerEvents.recipes(event => {
		//Tree resin
		addTreeOutput(event, MC('oak_log'), BOP('origin_leaves'))
		addTreeOutput(event, MC('oak_log'), BOP('flowering_oak_leaves'))
		addTreeOutput(event, MC('birch_log'), BOP('rainbow_birch_leaves'))
		addTreeOutput(event, MC('birch_log'), BOP('yellow_autumn_leaves'))
		addTreeOutput(event, MC('dark_oak_log'), BOP('orange_autumn_leaves'))
		addTreeOutput(event, MC('oak_log'), BOP('maple_leaves'))
		addTreeOutput(event, BOP('fir_log'), BOP('fir_leaves'))
		addTreeOutput(event, BOP('redwood_log'), BOP('redwood_leaves'))
		addTreeOutput(event, BOP('cherry_log'), BOP('white_cherry_leaves'))
		addTreeOutput(event, BOP('cherry_log'), BOP('pink_cherry_leaves'))
		addTreeOutput(event, BOP('mahogany_log'), BOP('mahogany_leaves'))
		addTreeOutput(event, BOP('jacaranda_log'), BOP('jacaranda_leaves'))
		addTreeOutput(event, BOP('palm_log'), BOP('palm_leaves'))
		addTreeOutput(event, BOP('willow_log'), BOP('willow_leaves'))
		addTreeOutput(event, BOP('dead_log'), BOP('dead_leaves'))
		addTreeOutput(event, BOP('magic_log'), BOP('magic_leaves'))
		addTreeOutput(event, BOP('umbran_log'), BOP('umbran_leaves'))
		addTreeOutput(event, BOP('hellbark_log'), BOP('hellbark_leaves'))
		//Wash sand into clay
		//This code doesn't even work properly
		event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25)], 'biomesoplenty:black_sand')
		event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25)], 'biomesoplenty:white_sand')
		event.recipes.createSplashing([Item.of(MC('clay_ball'), 1).withChance(0.25)], 'biomesoplenty:orange_sand')
		//Flesh igeneous extruder recipe.
		event.custom({
			"type": "thermal:rock_gen",
			"adjacent": "biomesoplenty:blood",
			"result": { "item": "biomesoplenty:flesh"}
		})
	})

	//Fix biome tags
	// onEvent("tags.worldgen.biome", event=>{
	// 	const BOP_OVERWORLD = [
	// 		BOP("bamboo_grove"),
	// 		BOP("bayou"),
	// 		BOP("bog"),
	// 		BOP("boreal_forest"),
	// 		BOP("cherry_blossom_grove"),
	// 		BOP("clover_patch"),
	// 		BOP("cold_desert"),
	// 		BOP("coniferous_forest"),
	// 		BOP("crag"),
	// 		BOP("dead_forest"),
	// 		BOP("dryland"),
	// 		BOP("dune_beach"),
	// 		BOP("field"),
	// 		BOP("fir_clearing"),
	// 		BOP("floodplain"),
	// 		BOP("forested_field"),
	// 		BOP("fungal_jungle"),
	// 		BOP("glowing_grotto"),
	// 		BOP("grassland"),
	// 		BOP("highland"),
	// 		BOP("highland_moor"),
	// 		BOP("jade_cliffs"),
	// 		BOP("lavender_field"),
	// 		BOP("lavender_forest"),
	// 		BOP("lush_desert"),
	// 		BOP("lush_savanna"),
	// 		BOP("maple_woods"),
	// 		BOP("marsh"),
	// 		BOP("mediterranean_forest"),
	// 		BOP("muskeg"),
	// 		BOP("mystic_grove"),
	// 		BOP("old_growth_dead_forest"),
	// 		BOP("old_growth_woodland"),
	// 		BOP("ominous_woods"),
	// 		BOP("orchard"),
	// 		BOP("origin_valley"),
	// 		BOP("pasture"),
	// 		BOP("prairie"),
	// 		BOP("pumpkin_patch"),
	// 		BOP("rainbow_hills"),
	// 		BOP("rainforest"),
	// 		BOP("redwood_forest"),
	// 		BOP("rocky_rainforest"),
	// 		BOP("rocky_shrubland"),
	// 		BOP("scrubland"),
	// 		BOP("seasonal_forest"),
	// 		BOP("shrubland"),
	// 		BOP("snowy_coniferous_forest"),
	// 		BOP("snowy_fir_clearing"),
	// 		BOP("snowy_maple_woods"),
	// 		BOP("spider_nest"),
	// 		BOP("tropics"),
	// 		BOP("tundra"),
	// 		BOP("volcanic_plains"),
	// 		BOP("volcano"),
	// 		BOP("wasteland"),
	// 		BOP("wetland"),
	// 		BOP("wooded_scrubland"),
	// 		BOP("wooded_wasteland"),
	// 		BOP("woodland")
	// 	]
	// 	event.get("forge:is_overworld").add(BOP_OVERWORLD)
	// 	event.get("ae2:has_meteorites").add(BOP_OVERWORLD)
	// })
}