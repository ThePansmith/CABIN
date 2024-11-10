if(Platform.isLoaded("steampowered")) {
	onEvent('recipes', event => {

    // Extended Gears already has metalic cogwheels, so Steam Powered cogs are redundant
    // Craft & Additions already has two different alternators, so Steam Powered dynamo is redudant
    event.remove({ mod: 'steampowered' })

    // Burners
    let burner = (output, metalBurner) => { 
      event.shaped(output, [
        'III',
        'I I',
        'BBB'
      ], {
        B: 'minecraft:bricks',
        I: metalBurner
      })
    }
    burner('steampowered:bronze_burner', 'alloyed:bronze_sheet')
    burner('steampowered:cast_iron_burner', 'createdeco:cast_iron_sheet')
    burner('steampowered:steel_burner', 'alloyed:steel_sheet')

    // Boilers
    let boiler = (output, metalBoiler) => {
      event.shaped(output, [
        ' M ',
        'MTM',
        ' M '
      ], {
        T: 'create:fluid_tank',
        M: metalBoiler
      })
    }
    boiler('steampowered:bronze_boiler', 'alloyed:bronze_sheet')
    boiler('steampowered:cast_iron_boiler', 'createdeco:cast_iron_sheet')
    boiler('steampowered:steel_boiler', 'alloyed:steel_sheet')

    // Engines
    brassMachine(event,Item.of('steampowered:bronze_steam_engine'), 'alloyed:bronze_block')
		brassMachine(event,Item.of('steampowered:cast_iron_steam_engine'), 'createdeco:cast_iron_block')
    brassMachine(event,Item.of('steampowered:steel_steam_engine'), 'alloyed:steel_block')

    // Flywheels
    createMachine('create:flywheel', event, 'steampowered:bronze_flywheel', 'alloyed:bronze_block')
    createMachine('create:flywheel', event, 'steampowered:cast_iron_flywheel', 'createdeco:cast_iron_block')
    createMachine('create:flywheel', event, 'steampowered:steel_flywheel', 'alloyed:steel_block')
  })
}

