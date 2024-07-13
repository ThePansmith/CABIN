//This is probably the most overpowered backpack mod

//This mod can be removed from the pack with no issues
if(Platform.isLoaded("sophisticatedbackpacks")) {
	onEvent('recipes', event => {
		//This code does not work for some reason
		event.replaceInput({ mod: 'sophisticatedbackpacks' }, MC('redstone'), MC('copper_ingot'))
	})
}