if(Platform.isLoaded("steampowered")) {
	onEvent('recipes', event => {

    event.remove({ mod: 'steampowered' }) // The recipes are mostly outdated, reminiscent of Create 0.3

    // Metallic Cogwheels
    let cog = (output, base, metalIngot) => { 
      event.shapeless(output, [
        base,
        metalIngot
      ])
    }
    cog('steampowered:bronze_cogwheel', 'create:shaft', '#forge:ingots/bronze')
    cog('steampowered:cast_iron_cogwheel', 'create:shaft', '#forge:ingots/cast_iron')
    cog('steampowered:steel_cogwheel', 'create:shaft', '#forge:ingots/steel')
    cog('steampowered:bronze_large_cogwheel', 'steampowered:bronze_cogwheel', '#forge:ingots/bronze')
    cog('steampowered:cast_iron_large_cogwheel', 'steampowered:cast_iron_cogwheel', '#forge:ingots/cast_iron')
    cog('steampowered:steel_large_cogwheel', 'steampowered:steel_cogwheel', '#forge:ingots/steel')
    
    let largeCog = (output, metalIngot) => { 
      event.shapeless(output, [
        'create:shaft',
        metalIngot,
        metalIngot
      ])
    }
    largeCog('steampowered:bronze_large_cogwheel', '#forge:ingots/bronze')
    largeCog('steampowered:cast_iron_large_cogwheel', '#forge:ingots/cast_iron')
    largeCog('steampowered:steel_large_cogwheel', '#forge:ingots/steel')

    // Burners & Boilers
    let burner = (output, metalSheet) => { 
      event.shaped(output, [
        'III',
        'I I',
        'BBB'
      ], {
        B: 'minecraft:bricks',
        I: metalSheet
      })
    }
    burner('steampowered:bronze_burner', 'alloyed:bronze_sheet')
    burner('steampowered:cast_iron_burner', 'createdeco:cast_iron_sheet')
    burner('steampowered:steel_burner', 'alloyed:steel_sheet')

    let boiler = (output, metalSheet) => {
      event.shaped(output, [
        'MM ',
        'MTM',
        ' MM'
      ], {
        T: 'create:fluid_tank', M: metalSheet
      })
    }
    boiler('steampowered:bronze_boiler', 'alloyed:bronze_sheet')
    boiler('steampowered:cast_iron_boiler', 'createdeco:cast_iron_sheet')
    boiler('steampowered:steel_boiler', 'alloyed:steel_sheet')

    // Engines & Flywheels
    zincMachine(event,Item.of('steampowered:bronze_steam_engine'), '#forge:storage_blocks/bronze')
		zincMachine(event,Item.of('steampowered:cast_iron_steam_engine'), '#forge:storage_blocks/cast_iron')
    zincMachine(event,Item.of('steampowered:steel_steam_engine'), '#forge:storage_blocks/steel')

    createMachine('create:flywheel', event, 'steampowered:bronze_flywheel', '#forge:storage_blocks/bronze')
    createMachine('create:flywheel', event, 'steampowered:cast_iron_flywheel', '#forge:storage_blocks/cast_iron')
    createMachine('create:flywheel', event, 'steampowered:steel_flywheel', '#forge:storage_blocks/steel')
  })
}
