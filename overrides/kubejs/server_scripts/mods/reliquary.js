if(Platform.isLoaded("reliquary")) {
	onEvent('recipes', event => {
		event.forEachRecipe({id: /alkahestry/}, recipe => {
			recipe.id(recipe.getId() + '_manual_only')
		})
	})
}