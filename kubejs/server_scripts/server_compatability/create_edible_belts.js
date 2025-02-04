if(Platform.isLoaded("create_edible_belts")) {
	ServerEvents.recipes(event => {
		event.remove({ id: 'create_edible_belts:embrecipe' })
	})
}