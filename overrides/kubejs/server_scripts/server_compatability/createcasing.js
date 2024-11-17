// Create Encased
if(Platform.isLoaded("createcasing")) {
	onEvent('recipes', event => {

    // Cleanup
    event.remove({ input: 'minecraft:iron_block', mod: 'createcasing'}) // Removes Presses
    event.remove({ input: 'create:whisk', mod: 'createcasing'}) // Removes Mixers
    event.remove({ input: '#forge:stripped_logs', mod: 'createcasing'}) // Removes Wooden Shaffs
    event.remove({ input: 'create:brass_ingot', mod: 'createcasing'}) // Removes Brass Shaft
    event.remove({ input: 'minecraft:glass', mod: 'createcasing'}) // Removes Glass Shaft

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
