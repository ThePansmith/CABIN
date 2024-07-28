if(Platform.isLoaded("create_edible_belts")) {
	onEvent('recipes', event => {
		event.remove({ id: 'create_edible_belts:embrecipe' })
	})
}