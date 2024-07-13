//Someone might remove this if they want to use slice and dice instead. This mod is better though
//This mod can be removed from the pack with no issues
if(Platform.isLoaded("create_central_kitchen")) {
	onEvent('recipes', event => {
		//fix cooking guide recipe since sturdy sheets are unobtainable in CABIN
		event.remove({ id: 'create_central_kitchen:crafting/cooking_guide' })
		event.shapeless('create_central_kitchen:cooking_guide', [CR("schedule"), FD("canvas")])
	})
}