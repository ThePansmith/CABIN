// Thermal Doesn't generate various ores for some reason so we gotta do it ourselves.

onEvent('worldgen.add', event => {
    const { anchors } = event
  
    event.addOre(ore => {
      ore.id = 'kubejs:apatite_ore_gen'

      // examples on how to use targets
      ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:apatite_ore')
      ore.addTarget('minecraft:deepslate', 'thermal:deepslate_apatite_ore')

      ore.count([0, 5])             // generate between 15 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
        .squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
        .triangleHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
          anchors.aboveBottom(32),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
          anchors.absolute(96)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
        )								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32
  
      // more, optional parameters (default values are shown here)
      ore.size = 9                            // max. vein size
      ore.noSurface = 0.5                     // chance to discard if the ore would be exposed to air
      ore.worldgenLayer = 'underground_ores'  // what generation step the ores should be generated in (see below)
      ore.chance = 0							// if != 0 and count is unset, the ore has a 1/n chance to generate per chunk
    })
    event.addOre(ore => {
      ore.id = 'kubejs:ruby_ore_gen'

      // examples on how to use targets
      ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:ruby_ore')
      ore.addTarget('minecraft:deepslate', 'thermal:deepslate_ruby_ore')

      ore.count([0, 10])             
        .squared()                    
        .triangleHeight(				      
          anchors.aboveBottom(3),    
          anchors.absolute(32)	      
        )								              
  
      // more, optional parameters (default values are shown here)
      ore.size = 5                            
      ore.noSurface = 0.5                     
      ore.worldgenLayer = 'underground_ores'  
      ore.chance = 0							
    })
    event.addOre(ore => {
      ore.id = 'kubejs:sapphire_ore_gen'

      // examples on how to use targets
      ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:sapphire_ore')
      ore.addTarget('minecraft:deepslate', 'thermal:deepslate_sapphire_ore')

      ore.count([0, 10])             
        .squared()                    
        .triangleHeight(				      
          anchors.aboveBottom(3),    
          anchors.absolute(32)	      
        )								              
  
      // more, optional parameters (default values are shown here)
      ore.size = 7                          
      ore.noSurface = 0.5                     
      ore.worldgenLayer = 'underground_ores'  
      ore.chance = 0							
    })
    event.addOre(ore => {
      ore.id = 'kubejs:extra_cinnabar_ore_gen'

      // examples on how to use targets
      ore.addTarget('#minecraft:stone_ore_replaceables', 'thermal:cinnabar_ore')
      ore.addTarget('minecraft:deepslate', 'thermal:deepslate_cinnabar_ore')

      ore.count([0, 1])                        
        .triangleHeight(				      
          anchors.aboveBottom(3),    
          anchors.absolute(64)	      
        )								              
      // more, optional parameters (default values are shown here)
      ore.size = 25                         
      ore.noSurface = 0.5                     
      ore.worldgenLayer = 'underground_ores'  
      ore.chance = 0							
        }
	)})


