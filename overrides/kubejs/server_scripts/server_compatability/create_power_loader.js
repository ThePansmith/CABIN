if (Platform.isLoaded('create_power_loader')) { 
	onEvent('recipes', event => {
		brassMachine(event,Item.of('create_power_loader:empty_brass_chunk_loader', 1), 'minecraft:nether_star')
		andesiteMachine(event,Item.of('create_power_loader:empty_andesite_chunk_loader', 1), 'minecraft:wither_skeleton_skull')
	})
}