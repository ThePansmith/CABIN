//Create: Crafts and Additions
if(Platform.isLoaded("createaddition")) {
	onEvent('recipes', event => {
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
	})
}