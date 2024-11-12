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
    cog('steampowered:bronze_cogwheel', 'create:shaft', 'alloyed:bronze_ingot')
    cog('steampowered:cast_iron_cogwheel', 'create:shaft', 'createdeco:cast_iron_ingot')
    cog('steampowered:steel_cogwheel', 'create:shaft', 'alloyed:steel_ingot')
    cog('steampowered:bronze_large_cogwheel', 'steampowered:bronze_cogwheel', 'alloyed:bronze_ingot')
    cog('steampowered:cast_iron_large_cogwheel', 'steampowered:cast_iron_cogwheel', 'createdeco:cast_iron_ingot')
    cog('steampowered:steel_large_cogwheel', 'steampowered:steel_cogwheel', 'alloyed:steel_ingot')
    
    let largeCog = (output, metalIngot) => { 
      event.shapeless(output, [
        'create:shaft',
        metalIngot,
        metalIngot
      ])
    }
    largeCog('steampowered:bronze_large_cogwheel', 'alloyed:bronze_ingot')
    largeCog('steampowered:cast_iron_large_cogwheel', 'createdeco:cast_iron_ingot')
    largeCog('steampowered:steel_large_cogwheel', 'alloyed:steel_ingot')

    // Burners & Boilers
    let burner = (output, metalSheet) => { 
      event.recipes.create.mechanical_crafting(output, [
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
      event.recipes.create.mechanical_crafting(output, [
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
    zincMachine(event,Item.of('steampowered:bronze_steam_engine'), 'alloyed:bronze_block')
    zincMachine(event,Item.of('steampowered:cast_iron_steam_engine'), 'createdeco:cast_iron_block')
    zincMachine(event,Item.of('steampowered:steel_steam_engine'), 'alloyed:steel_block')

    createMachine('create:flywheel', event, 'steampowered:bronze_flywheel', 'alloyed:bronze_block')
    createMachine('create:flywheel', event, 'steampowered:cast_iron_flywheel', 'createdeco:cast_iron_block')
    createMachine('create:flywheel', event, 'steampowered:steel_flywheel', 'alloyed:steel_block')
  })
}


