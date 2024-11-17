// Create Diesel Generators
if(Platform.isLoaded("createdieselgenerators")) {
  onEvent('fluid.tags', event => {

    // Oil Tag Cleanup
    event.removeAllTagsFrom('createdieselgenerators:crude_oil')
    event.removeAllTagsFrom('createdieselgenerators:flowing_crude_oil')
    event.removeAllTagsFrom('createdieselgenerators:gasoline')
    event.removeAllTagsFrom('createdieselgenerators:flowing_gasoline')
    event.removeAllTagsFrom('createdieselgenerators:diesel')
    event.removeAllTagsFrom('createdieselgenerators:flowing_diesel')
    event.removeAllTagsFrom('createdieselgenerators:biodiesel')
    event.removeAllTagsFrom('createdieselgenerators:flowing_biodiesel')
    event.removeAllTagsFrom('createdieselgenerators:plant_oil')
    event.removeAllTagsFrom('createdieselgenerators:flowing_plant_oil')

    // Pumpjack Output
    event.add('createdieselgenerators:pumpjack_output', 'thermal:crude_oil')
  })

	onEvent('recipes', event => {

    // Duplicated Oils
    event.remove({id: 'createdieselgenerators:mixing/biodiesel'})
    event.remove({id: 'createdieselgenerators:compacting/plant_oil'})
    event.remove({id: 'createdieselgenerators:distillation/crude_oil'}) // Distillation outputs can't be changed with scripts

    // Crude Distilation
    event.custom({
      "type": "createdieselgenerators:distillation",
      "ingredients": [
        {"fluid": "thermal:crude_oil", "amount": 200}
      ],
      "heatRequirement": "heated",
      "processingTime": 200,
      "results": [
        {"fluid": "thermal:heavy_oil", "amount": 80},
        {"fluid": "thermal:light_oil", "amount": 120},
      ]   
    })

    // Crude Extraction
    copperMachine(event, Item.of('createdieselgenerators:pumpjack_hole', 1))
    invarMachine(event, Item.of('createdieselgenerators:pumpjack_crank', 1), 'create:zinc_block')
    invarMachine(event, Item.of('createdieselgenerators:oil_scanner', 1), 'ae2:charged_certus_quartz_crystal')

    // Oil Engines
    event.remove({id: 'createdieselgenerators:crafting/engine_piston'}) // This one uses a Shaft instead of an Iron Rod
    event.remove({id: 'createdieselgenerators:crafting/diesel_engine'})
    event.recipes.create.mechanical_crafting('createdieselgenerators:diesel_engine', [
      ' BLB ',
      'PPSPP',
      ' BTB '],
      { L: 'createdieselgenerators:lighter',
        P: 'createdieselgenerators:engine_piston',
        B: 'create:brass_ingot',
        S: 'create:shaft',
        T: 'create:fluid_tank',
    })
    zincMachine(event, Item.of('createdieselgenerators:large_diesel_engine', 1), 'createdieselgenerators:diesel_engine')
    invarMachine(event, Item.of('createdieselgenerators:huge_diesel_engine', 1), 'create:brass_block')

    // Wooden Chips Patch
    event.remove({id: 'createdieselgenerators:crafting/chip_wood_block'}),
    event.shaped('createdieselgenerators:chip_wood_block', [
      'CCC',
      'CCC',
      'CCC'],
      {C: 'createdieselgenerators:wood_chip'} // Now uses 9 instead of 4 in order to prevent duping exploits
    )

    // Miscelaneus Tweaks
    event.replaceInput({
      id: 'createdieselgenerators:crafting/pumpjack_bearing'},
      'create:andesite_alloy',
      'thermal:invar_ingot')
    event.replaceInput({
      id: 'createdieselgenerators:crafting/pumpjack_head'},
      'create:zinc_ingot',
      'thermal:invar_ingot')
    event.replaceInput({
        id: 'createdieselgenerators:crafting/asphalt_block'},
        'createdieselgenerators:crude_oil_bucket',
        'thermal:crude_oil_bucket')

    // Frog Leg Fermentation (Because why not?)
    event.custom({
      "type": "createdieselgenerators:basin_fermenting",
      "ingredients": [
        {"item": "quark:frog_leg"},
        {"tag": "forge:nuggets/gold"},
        {"tag": "forge:nuggets/gold"},
        {"tag": "forge:nuggets/gold"},
        {"tag": "forge:nuggets/gold"},
        {"tag": "forge:nuggets/gold"},
        {"fluid": "create:potion",
          "nbt": {"Potion": "minecraft:mundane"},
          "amount": 100}
      ],
      "processingTime": 400,
      "results": [
        {"item": "quark:golden_frog_leg"},
        {"fluid": "create:potion",
          "nbt": {"Potion": "minecraft:thick"},
          "amount": 100}
      ]
    })
  })
}