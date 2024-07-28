if(Platform.isLoaded("createbigcannons")) {
	onEvent('recipes', event => {
		andesiteMachine(event, Item.of('createbigcannons:yaw_controller', 1))
		andesiteMachine(event, Item.of('createbigcannons:cannon_builder', 1), 'create:mechanical_bearing')
		andesiteMachine(event, Item.of('createbigcannons:cannon_loader', 1), 'create:mechanical_piston')
		andesiteMachine(event, Item.of('createbigcannons:cannon_drill', 1), 'create:fluid_tank')
	})
}