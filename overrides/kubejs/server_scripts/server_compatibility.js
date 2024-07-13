// Addon Compatibility Script for CABIN
// These are for mods that are not installed by default, sections of this script will enable if the applicable mod is installed.
// With how many create addons there are, it would not be feasible for me to add compat for them all.
// If you have a create addon that you think could fit in the general theme/tone/whathaveyou of CABIN, make a PR with it.
onEvent('recipes', event => {
	//	if (Platform.isLoaded('YourModID')) {                                           // Mod ID goes here
	//		(material)Machine(event,Item.of('minecraft:dirt', 1))                        // Recipes without an additional item will be stonecutting (saw) recipes
	//		(material)Machine(event,Item.of('minecraft:dispenser', 2), 'minecraft:bow')  // Recipes with one are smithing table recipes
	//
	//     event.shapeless("create:creative_crate", "minecraft:redstone_ore")]) // If you have any other recipes, put them following the machine recipes
	//}                                     

	if (Platform.isLoaded('createbigcannons')) {
		andesiteMachine(event, Item.of('createbigcannons:yaw_controller', 1))
		andesiteMachine(event, Item.of('createbigcannons:cannon_builder', 1), 'create:mechanical_bearing')
		andesiteMachine(event, Item.of('createbigcannons:cannon_loader', 1), 'create:mechanical_piston')
		andesiteMachine(event, Item.of('createbigcannons:cannon_drill', 1), 'create:fluid_tank')
	}                      

	if (Platform.isLoaded('createaddition')) {
		andesiteMachine(event, Item.of('createaddition:rolling_mill', 1), 'create:shaft')
		brassMachine(event, Item.of('createaddition:portable_energy_interface', 2))
		brassMachine(event, Item.of('createaddition:tesla_coil', 1), 'createaddition:copper_spool')
		brassMachine(event, Item.of('createaddition:modular_accumulator', 1), 'thermal:energy_cell_frame')

		event.replaceOutput({}, '#forge:nuggets/electrum','createaddition:electrum_nugget')
		event.replaceOutput({}, '#forge:ingots/electrum','createaddition:electrum_ingot')
		event.replaceOutput({}, '#forge:plates/electrum','createaddition:electrum_sheet')
		event.replaceOutput({}, '#forge:dusts/diamond','thermal:diamond_dust')

		event.replaceOutput({id: 'kubejs:machines/smelter/electrum_ingot'}, 'thermal:electrum_ingot','createaddition:electrum_ingot')

		// Duplicate Items
		//event.remove({ id: 'createaddition:electrum_ingot'})
		event.remove({ id: 'createaddition:crafting/electrum_nugget'})
		event.remove({ output: 'createaddition:zinc_sheet'})

		// Bugged Recipe
		event.replaceInput( { id:'createaddition:pressing/electrum_ingot'}, 'thermal:constantan_ingot', '#forge:ingots/electrum')

		// Motor & Alternator
		// event.remove({ output: 'createaddition:electric_motor'})
		// event.remove({ output: 'createaddition:alternator'})
		invarMachine(event, Item.of('createaddition:electric_motor', 1), 'createaddition:tesla_coil')
		enderiumMachine(event, Item.of('createaddition:alternator', 1), 'createaddition:electric_motor')

		// Remove 
		event.remove({ output: 'createaddition:capacitor'})

		// Relay
		event.remove({output: 'createaddition:redstone_relay'})
		event.smithing('createaddition:redstone_relay', 'projectred_core:platformed_plate', 'createaddition:connector')
		event.recipes.createMechanicalCrafting('createaddition:redstone_relay', 'AB', { A: 'projectred_core:platformed_plate', B: 'createaddition:connector' })

		// Remove heated basin ingot recipes
		event.remove({ id: "createaddition:mixing/electrum"} )
		event.remove({ id: /createaddition:compat\/tconstruct/} )

		// Connectors
		event.remove( {id:"createaddition:crafting/small_connector_copper"})
		event.remove( {id:"createaddition:crafting/large_connector_gold"})
		event.remove( {id:"createaddition:crafting/large_connector_electrum"})
		event.recipes.createSequencedAssembly(
			[Item.of('createaddition:connector', 4)], 
			'create:andesite_alloy', 
			[
				event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:rods/copper']),
				event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:plates/iron']),
				event.recipes.createPressing('kubejs:incomplete_connector', 'kubejs:incomplete_connector')
			]
		).transitionalItem('kubejs:incomplete_connector').loops(1)
		
		event.recipes.createSequencedAssembly(
			[Item.of('createaddition:large_connector', 1)], 
			'create:andesite_alloy', 
			[
				event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:rods/electrum']),
				event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:plates/iron']),
				event.recipes.createPressing('kubejs:incomplete_connector', 'kubejs:incomplete_connector'),
				event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:plates/iron']),
				event.recipes.createPressing('kubejs:incomplete_connector', 'kubejs:incomplete_connector')
			]
		).transitionalItem('kubejs:incomplete_large_connector').loops(1)
	}

	if (Platform.isLoaded('create_enchantment_industry')) {
		copperMachine(event, Item.of('create_enchantment_industry:disenchanter', 1), '#create:sandpaper')
		copperMachine(event, Item.of('create_enchantment_industry:printer', 1), '#forge:storage_blocks/lapis')
		
		event.replaceInput( {id: 'create_enchantment_industry:crafting/enchanting_guide'}, 'create:sturdy_sheet', 'create:schedule' )
	}
	
	if (Platform.isLoaded('miners_delight')) {
		event.remove({ id: 'miners_delight:cutting/bat_wing' })
	}

	if(Platform.isLoaded('create_edible_belts')) {
		event.remove({ id: 'create_edible_belts:embrecipe' })
	}
})