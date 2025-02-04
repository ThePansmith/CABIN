if(Platform.isLoaded("sophisticatedbackpacks")) {
	ServerEvents.recipes(event => {
		//This code does not work for some reason
		event.replaceInput({ mod: 'sophisticatedbackpacks' }, MC('redstone'), MC('copper_ingot'))
	})
}