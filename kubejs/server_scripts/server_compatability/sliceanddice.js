if(Platform.isLoaded("sliceanddice")) {
	ServerEvents.recipes(event => {
		andesiteMachine(event, Item.of('sliceanddice:slicer', 1), '#farmersdelight:tools/knives')
		copperMachine(event,Item.of( 'sliceanddice:sprinkler', 1), 'createdeco:copper_trapdoor')
	})
}