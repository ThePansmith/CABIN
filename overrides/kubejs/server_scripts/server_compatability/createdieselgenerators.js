// Create Diesel Generators
if(Platform.isLoaded("createdieselgenerators")) {
  onEvent('fluid.tags', event => {

    // Pumpjack Output
    event.remove('createdieselgenerators:pumpjack_output', 'createdieselgenerators:crude_oil')
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
    event.replaceInput({
      id: 'createdieselgenerators:crafting/pumpjack_bearing'},
      'create:andesite_alloy',
      'thermal:invar_ingot')
    event.replaceInput({
      id: 'createdieselgenerators:crafting/pumpjack_head'},
      'create:zinc_ingot',
      'thermal:invar_ingot')

    // Oil Engines
    event.remove({id: 'createdieselgenerators:crafting/engine_piston'}) // This one uses a Shaft instead of an Iron Rod
    event.remove({id: 'createdieselgenerators:crafting/diesel_engine'})
    event.recipes.create.mechanical_crafting('createdieselgenerators:diesel_engine', [
      ' BLB ',
      'PPSPP',
      ' BTB '],{
        L: 'createdieselgenerators:lighter',
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
      'CCC'],{
      C: 'createdieselgenerators:wood_chip' // Now uses 9 instead of 4 in order to prevent duping exploits
    })

    // Asphalt from Bucket
    event.replaceInput({
      id: 'createdieselgenerators:crafting/asphalt_block'},
        'createdieselgenerators:crude_oil_bucket',
        'thermal:crude_oil_bucket')
  })

  onEvent('server.datapack.first', event => {

    // Thermal's Fuels
    // There's gotta be a way to compact all these in a single function, but I couldn't figure it out
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/creosote`, {
      "fluid": "thermal:creosote",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 2048.0, "burn_rate": 2},
      "modular": { "speed": 32.0, "strength": 3072.0, "burn_rate": 6},
      "huge": {"speed": 32.0, "strength": 4096.0, "burn_rate": 8}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/heavy_oil`, {
      "fluid": "thermal:heavy_oil",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 2048.0, "burn_rate": 2},
      "modular": { "speed": 96.0, "strength": 6144.0, "burn_rate": 3},
      "huge": {"speed": 128.0, "strength": 12288.0, "burn_rate": 4}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/light_oil`, {
      "fluid": "thermal:light_oil",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 3072.0, "burn_rate": 2},
      "modular": { "speed": 128.0, "strength": 6144.0, "burn_rate": 3},
      "huge": {"speed": 96.0, "strength": 6144.0, "burn_rate": 6}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/refined_fuel`, {
      "fluid": "#thermal:refined_fuel",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 4096.0, "burn_rate": 1},
      "modular": { "speed": 128.0, "strength": 8192.0, "burn_rate": 2},
      "huge": {"speed": 128.0, "strength": 16384.0, "burn_rate": 4}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/tree_oil`, {
      "fluid": "thermal:tree_oil",
      "sound_speed": 1,
      "normal": {"speed": 32.0, "strength": 1024.0, "burn_rate": 1},
      "modular": { "speed": 64.0, "strength": 2048.0, "burn_rate": 2},
      "huge": {"speed": 64.0, "strength": 3072.0, "burn_rate": 6}
    })

    // Forge's Fuel Tags
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/biodiesel`, {
      "fluid": "#forge:biofuel",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 4096.0, "burn_rate": 3},
      "modular": { "speed": 128.0, "strength": 8192.0, "burn_rate": 6},
      "huge": {"speed": 128.0, "strength": 12288.0, "burn_rate": 12}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/diesel`, {
      "fluid": "#forge:diesel",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 2048.0, "burn_rate": 2},
      "modular": { "speed": 96.0, "strength": 6144.0, "burn_rate": 3},
      "huge": {"speed": 128.0, "strength": 12288.0, "burn_rate": 4}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/ethanol`, {
      "fluid": "#forge:ethanol",
      "sound_speed": 2,
      "normal": {"speed": 64.0, "strength": 3072.0, "burn_rate": 3},
      "modular": { "speed": 96.0, "strength": 6144.0, "burn_rate": 6},
      "huge": {"speed": 96.0, "strength": 6144.0, "burn_rate": 12}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/gasoline`, {
      "fluid": "#forge:gasoline",
      "sound_speed": 3,
      "normal": {"speed": 64.0, "strength": 3072.0, "burn_rate": 2},
      "modular": { "speed": 128.0, "strength": 6144.0, "burn_rate": 3},
      "huge": {"speed": 96.0, "strength": 6144.0, "burn_rate": 6}
    })
    event.addJson(`createdieselgenerators:diesel_engine_fuel_types/plantoil`, {
      "fluid": "#forge:plantoil",
      "sound_speed": 1,
      "normal": {"speed": 32.0, "strength": 1024.0, "burn_rate": 1},
      "modular": { "speed": 64.0, "strength": 2048.0, "burn_rate": 2},
      "huge": {"speed": 64.0, "strength": 3072.0, "burn_rate": 6}
    })

    // Disable Beyond Earth's oil wells 
    event.addJson(`beyond_earth:tags/worldgen/biome/has_structure/oil_well_biomes`, {
      "replace": true, "values": []
    })
  })
}