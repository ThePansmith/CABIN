// Thermal Doesn't generate various ores for some reason so we gotta do it ourselves.

onEvent('worldgen.add', event => {
	const { anchors } = event

	//Apatite does not generate without thermal cultivation installed. So we add our own apatite generation
	event.addOre(ore => {
		ore.id = 'kubejs:apatite_ore_gen'

		// examples on how to use targets
		ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:apatite_ore')
		ore.addTarget('minecraft:deepslate', 'thermal:deepslate_apatite_ore')

		ore.count(4)             // generate 4 veins (chosen at random)
			.squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
			.triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
				anchors.absolute(-16),    // the lower bound should be 48 blocks above the bottom of the world, so in this case, Y = -16 since minY = -64
				anchors.absolute(96)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
			)								              // in total, the ore can be found between Y levels -16 and 96, and will be most likely at Y = (96 + -16) / 2 = 40

		// more, optional parameters (default values are shown here)
		ore.size = 9                            // max. vein size
		ore.noSurface = 0                   // chance to discard if the ore would be exposed to air
		ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
		ore.chance = 0							// if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
	})
	//Ruby and Sapphire do not generate at all. We have to add our own generation. 
	event.addOre(ore => {
		ore.id = 'kubejs:ruby_ore_gen'
		ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:ruby_ore')
		ore.addTarget('minecraft:deepslate', 'thermal:deepslate_ruby_ore')

		ore.count(4)
			.squared()
			.triangleHeight(
				anchors.absolute(-144),
				anchors.absolute(16)
			)
		ore.size = 6
		ore.noSurface = 0.5
		ore.worldgenLayer = 'underground_ores'
		ore.chance = 0
	})
	event.addOre(ore => {
		ore.id = 'kubejs:sapphire_ore_gen'
		ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:sapphire_ore')
		ore.addTarget('minecraft:deepslate', 'thermal:deepslate_sapphire_ore')

		ore.count(4)
			.squared()
			.triangleHeight(
				anchors.absolute(-144),
				anchors.absolute(16)
			)
		ore.size = 6
		ore.noSurface = 0.5
		ore.worldgenLayer = 'underground_ores'
		ore.chance = 0
	})
})

onEvent('worldgen.remove', event => {
	//Remove redstone ore generation
	event.removeFeatureById('underground_ores', ['minecraft:ore_redstone', 'minecraft:ore_redstone_lower'])
	//Thermal Expansion ores like tin and silver are disabled in the thermal-common config
})