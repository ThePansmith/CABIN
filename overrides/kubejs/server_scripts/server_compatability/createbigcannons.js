if(Platform.isLoaded("createbigcannons")) {
	onEvent('item.tags', event => {

		// Missing Tags, for some reason
		event.add('forge:storage_blocks/cast_iron', 'createbigcannons:cast_iron_block')
		event.add('forge:storage_blocks/nethersteel', 'createbigcannons:nethersteel_block')
	})
	
	onEvent('recipes', event => {

		// Smeltery
		event.remove({id: 'createbigcannons:basin_foundry_lid'})
		event.remove({mod: 'createbigcannons', type: 'createbigcannons:melting'})

		let smeltery = (input, output, amount, time, temp) => {
			event.custom({
				"type": "tconstruct:melting",
				"ingredient": {"tag": input},
				"result": {
					"fluid": output,
					"amount": amount
				},
				"temperature": temp,
				"time": time
		})}
		smeltery("forge:nuggets/cast_iron", "createbigcannons:molten_cast_iron", 10, 16, 650)
		smeltery("forge:ingots/cast_iron", "createbigcannons:molten_cast_iron", 90, 48, 650)
		smeltery("forge:storage_blocks/cast_iron", "createbigcannons:molten_cast_iron", 810, 144, 650)
		smeltery("forge:plates/cast_iron", "createbigcannons:molten_cast_iron", 90, 48, 650)

		smeltery("forge:nuggets/nethersteel", "createbigcannons:molten_nethersteel", 10, 27, 1375)
		smeltery("forge:ingots/nethersteel", "createbigcannons:molten_nethersteel", 90, 80, 1375)
		smeltery("forge:storage_blocks/nethersteel", "createbigcannons:molten_nethersteel", 810, 240, 1375)

		// Alloying
		event.remove({mod: 'createbigcannons', type: 'create:mixing', output: 'createbigcannons:nethersteel_ingot'})

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
		
		// Casting & Cooling
		event.remove({mod: 'createbigcannons', type: 'create:compacting'})
		
		let blockCasting = (moltenMetal, block, time) => {
			event.custom({
				"type": "tconstruct:casting_basin",
				"fluid": {
					"tag": moltenMetal,
					"amount": 810
				},
				"result": block,
				"cooling_time": time
		})}
		blockCasting("forge:molten_cast_iron", "createdeco:cast_iron_block", 144)
		blockCasting("forge:molten_nethersteel", "createbigcannons:nethersteel_block", 240)

		let ingotCooling = (moltenMetal, ingot) => {
			event.custom({
				"type": "thermal:chiller",
				"ingredients": [{
					"fluid_tag": moltenMetal,
					"amount": 90
				},{
					"item": "thermal:chiller_ingot_cast"
				}],
				"result": [{
					"item": ingot,
					"count": 1
				}],
				"energy": 5000
		})}
		ingotCooling("forge:molten_cast_iron", "createdeco:cast_iron_ingot")
		ingotCooling("forge:molten_nethersteel", "createbigcannons:nethersteel_ingot")
		
		// Gunpowder Packing
		// These two recipes were deleted by a previous event, so we have to recreate them
		event.recipes.create.compacting('createbigcannons:packed_gunpowder',
			['#createbigcannons:gunpowder', '#createbigcannons:gunpowder', '#createbigcannons:gunpowder'])
		event.recipes.create.compacting('createbigcannons:guncotton',
			['#createbigcannons:guncotton', '#createbigcannons:guncotton', '#createbigcannons:guncotton'])

		// Cast Iron Metal
		event.replaceOutput({}, 'createbigcannons:cast_iron_ingot','createdeco:cast_iron_ingot')
		event.replaceOutput({}, 'createbigcannons:cast_iron_nugget','createdeco:cast_iron_nugget')
		event.replaceOutput({}, 'createbigcannons:cast_iron_block','createdeco:cast_iron_block')

		// Cannon Machines
		andesiteMachine(event, Item.of('createbigcannons:yaw_controller', 1))
		andesiteMachine(event, Item.of('createbigcannons:cannon_builder', 1), 'create:mechanical_bearing')
		andesiteMachine(event, Item.of('createbigcannons:cannon_loader', 1), 'create:mechanical_piston')
		andesiteMachine(event, Item.of('createbigcannons:cannon_drill', 1), 'create:fluid_tank')
	})
} 