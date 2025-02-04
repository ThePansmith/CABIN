if(Platform.isLoaded("createbigcannons")) {
	ServerEvents.tags('item', event => {

		// Missing Tags, for some reason
		event.add('forge:storage_blocks/cast_iron', 'createbigcannons:cast_iron_block')
		event.add('forge:storage_blocks/nethersteel', 'createbigcannons:nethersteel_block')
	})

	ServerEvents.tags('fluid', event => {
		//Fluid tag to measure by ingots instead of buckets in the smeltery
		event.add('tconstruct:tooltips/metal', 'createbigcannons:molten_bronze')
		event.add('tconstruct:tooltips/metal', 'createbigcannons:molten_cast_iron')
		event.add('tconstruct:tooltips/metal', 'createbigcannons:molten_steel')
		event.add('tconstruct:tooltips/metal', 'createbigcannons:molten_nethersteel')
	})
	
	ServerEvents.recipes(event => {

		//Basin Foundry could be nice to have but we already have 2 ways of melting ingots into fluids
		event.remove({id: 'createbigcannons:basin_foundry_lid'})
		event.remove({mod: 'createbigcannons', type: 'createbigcannons:melting'})

		// Alloying
		event.remove([
			{id: 'createbigcannons:mixing/alloy_nethersteel_cast_iron'},
			{id: 'createbigcannons:mixing/alloy_nethersteel_steel'}
		])

		let debrisAlloy = (moltenMetal, amount) => {
			event.custom({
				"type": "tconstruct:alloy",
				"inputs": [{
					"tag": "tconstruct:molten_debris",
					"amount": 90
				},{
					"tag": moltenMetal,
					"amount": amount
				}],
				"result": {
					"fluid": "createbigcannons:molten_nethersteel",
					"amount": 720
				},
				"temperature": 1375
		})}
		debrisAlloy("forge:molten_cast_iron", 720)
		debrisAlloy("tconstruct:molten_steel", 360)
		
		// Casting & Melting
		metalCasting(event, 'cast_iron', 144)
		metalCasting(event, 'nethersteel', 240)

		metalMelting(event, 'cast_iron', 'createbigcannons:molten_cast_iron', 144, 650)
		metalMelting(event, 'nethersteel', 'createbigcannons:molten_nethersteel', 240, 1375)

		event.remove({mod: 'createbigcannons', type: 'create:compacting'})
		
		// Gunpowder Packing
		// These two recipes were deleted by a previous event, so we have to recreate them
		event.recipes.create.compacting('createbigcannons:packed_gunpowder',
			['#createbigcannons:gunpowder', '#createbigcannons:gunpowder', '#createbigcannons:gunpowder'])
		event.recipes.create.compacting('createbigcannons:guncotton',
			['#createbigcannons:guncotton', '#createbigcannons:guncotton', '#createbigcannons:guncotton'])

		// Duplicate Cast Iron recipes
		event.remove([
			{id: 'minecraft:cast_iron_nugget'},
			{id: 'minecraft:cast_iron_ingot_from_nuggets'},
			{id: 'minecraft:cast_iron_ingot_from_block'},
			{id: 'minecraft:cast_iron_block'}
		])

		// Cannon Machines
		andesiteMachine(event, Item.of('createbigcannons:yaw_controller', 1))
		andesiteMachine(event, Item.of('createbigcannons:cannon_builder', 1), 'create:mechanical_bearing')
		andesiteMachine(event, Item.of('createbigcannons:cannon_loader', 1), 'create:mechanical_piston')
		andesiteMachine(event, Item.of('createbigcannons:cannon_drill', 1), 'create:fluid_tank')
	})

	// //CreateDeco Cast Iron Block as a variant
	// onEvent('server.datapack.first', event => {
	// 	addChiselingRecipe(event, 'kubejs:chiseling_recipes/compat/createbigcannons/cast_iron', ["createdeco:cast_iron_block", "createbigcannons:cast_iron_block"])
	// })
} 