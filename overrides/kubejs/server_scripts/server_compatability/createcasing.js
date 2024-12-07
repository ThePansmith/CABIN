// Create Encased
if(Platform.isLoaded("createcasing")) {
	onEvent('recipes', event => {

    // Cleanup
    event.remove({ input: 'minecraft:iron_block', mod: 'createcasing'}) // Removes Presses
    event.remove({ input: 'create:whisk', mod: 'createcasing'}) // Removes Mixers
    event.remove({ input: '#forge:stripped_logs', mod: 'createcasing'}) // Removes Wooden Shafts
    event.remove({ input: 'create:brass_ingot', mod: 'createcasing'}) // Removes Brass Shaft
    event.remove({ input: 'minecraft:glass', mod: 'createcasing'}) // Removes Glass Shaft

    // Mixers
    let mixer = (output, casing) => { 
      createMachine('create:mechanical_mixer', event, output, casing)
    }
    mixer('createcasing:brass_mixer', 'create:brass_casing')
    mixer('createcasing:copper_mixer', 'create:copper_casing')
    mixer('createcasing:industrial_iron_mixer', 'create:industrial_iron_block')
    mixer('createcasing:railway_mixer', 'create:railway_casing')
    mixer('createcasing:creative_mixer', 'createcasing:creative_casing')

    // Presses
    let press = (output, casing) => { 
      createMachine('create:mechanical_press', event, output, casing)
    }
    press('createcasing:brass_press', 'create:brass_casing')
    press('createcasing:copper_press', 'create:copper_casing')
    press('createcasing:industrial_iron_press', 'create:industrial_iron_block')
    press('createcasing:railway_press', 'create:railway_casing')
    press('createcasing:creative_press', 'createcasing:creative_casing')
    
    // Adjustable Chain Gearshifts
    event.replaceInput(
      { input: 'create:electron_tube', mod: 'createcasing' },
      'create:electron_tube',
      'minecraft:redstone'
    )

    event.remove({ id: 'createcasing:sequenced_assembly/chorium_ingot'})
    event.recipes.createSequencedAssembly([
      'createcasing:chorium_ingot',
    ], 'create:polished_rose_quartz', [
      event.recipes.createFilling('createcasing:processing_chorium', ['createcasing:processing_chorium', Fluid.of('kubejs:matrix', 125)]),
      event.recipes.createDeploying('createcasing:processing_chorium', ['createcasing:processing_chorium', 'minecraft:popped_chorus_fruit']),
      event.recipes.createPressing('createcasing:processing_chorium', 'createcasing:processing_chorium')
    ]).loops(4)
  .transitionalItem('createcasing:processing_chorium')
  .id('kubejs:compat/createcasing/chorium_ingot')
  })

  onEvent('block.loot_tables', event => {
    event.addSimpleBlock('createcasing:oak_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:birch_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:jungle_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:acacia_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:dark_oak_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:crimson_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:warped_cogwheel', 'create:cogwheel')
    event.addSimpleBlock('createcasing:oak_large_cogwheel', 'create:large_cogwheel')
    event.addSimpleBlock('createcasing:birch_large_cogwheel', 'create:large_cogwheel')
    event.addSimpleBlock('createcasing:jungle_large_cogwheel', 'create:large_cogwheel')
    event.addSimpleBlock('createcasing:acacia_large_cogwheel', 'create:large_cogwheel')
    event.addSimpleBlock('createcasing:dark_oak_large_cogwheel', 'create:large_cogwheel')
    event.addSimpleBlock('createcasing:crimson_large_cogwheel', 'create:large_cogwheel')
    event.addSimpleBlock('createcasing:warped_large_cogwheel', 'create:large_cogwheel')
  })
}
