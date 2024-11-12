if(Platform.isLoaded("createcasing")) {
  onEvent('item.tags', event => {

    // Custom Tags
    event.add('cabin:encased_mixers',
      'createcasing:brass_mixer',
      'createcasing:copper_mixer',
      'createcasing:industrial_iron_mixer',
      'createcasing:railway_mixer',
      'createcasing:creative_mixer')

    event.add('cabin:encased_presses',
      'createcasing:brass_press',
      'createcasing:copper_press',
      'createcasing:industrial_iron_press',
      'createcasing:railway_press',
      'createcasing:creative_press')

    event.add('cabin:encased_shafts',
      'createcasing:oak_shaft',
      'createcasing:spruce_shaft',
      'createcasing:birch_shaft',
      'createcasing:jungle_shaft',
      'createcasing:acacia_shaft',
      'createcasing:dark_oak_shaft',
      'createcasing:crimson_shaft',
      'createcasing:warped_shaft',
      'createcasing:brass_shaft',
      'createcasing:glass_shaft',
      'createcasing:mldeg_shaft')
  })

	onEvent('recipes', event => {

    // Cleanup
    event.remove({ output: '#cabin:encased_mixers'})
    event.remove({ output: '#cabin:encased_presses'})
    event.remove({ output: '#cabin:encased_shafts'}) // Most of them are useless, and somewhat buggy

    // Mixers
    let mixer = (output, sheet) => { 
      event.shapeless(output, [
        'create:mechanical_mixer',
        sheet
      ])
    }
    mixer('createcasing:brass_mixer', 'create:brass_sheet')
    mixer('createcasing:copper_mixer', 'create:copper_sheet')
    mixer('createcasing:industrial_iron_mixer', 'create:iron_sheet')
    mixer('createcasing:railway_mixer', 'create:golden_sheet')
    mixer('createcasing:creative_mixer', 'createcasing:chorium_ingot')

    // Presses
    let press = (output, sheet) => { 
      event.shapeless(output, [
        'create:mechanical_press',
        sheet
      ])
    }
    press('createcasing:brass_press', 'create:brass_sheet')
    press('createcasing:copper_press', 'create:copper_sheet')
    press('createcasing:industrial_iron_press', 'create:iron_sheet')
    press('createcasing:railway_press', 'create:golden_sheet')
    press('createcasing:creative_press', 'createcasing:chorium_ingot')

    // Depots
    let depot = (recipeID, ingot) => {
    event.replaceInput(
      {id: recipeID},
      'create:andesite_alloy',
      ingot
    )}
    depot('createcasing:crafting/depot/brass', 'create:brass_sheet')
    depot('createcasing:crafting/depot/copper', 'create:copper_sheet')
    depot('createcasing:crafting/depot/industrial_iron', 'create:iron_sheet')
    depot('createcasing:crafting/depot/railway', 'create:golden_sheet')
    depot('createcasing:crafting/depot/creative', 'createcasing:chorium_ingot')
    
    // Adjustable Chain Gearshifts
    event.replaceInput(
      { input: 'create:electron_tube', mod: 'createcasing' },
      'create:electron_tube',
      'minecraft:redstone'
    )
  })
}