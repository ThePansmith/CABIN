const AC = (id, x) => MOD("aquaculture", id, x)
//This mod can be removed from the pack with no issues
if(Platform.isLoaded("aquaculture")) {
	onEvent('recipes', event => {
		//Is this really the only aquaculture kubejs change?
		event.recipes.createCrushing([Item.of(AC('neptunium_ingot', 2)), Item.of(AC('neptunium_nugget', 5)).withChance(.5)], AC('neptunes_bounty')).processingTime(500)
	})
}
