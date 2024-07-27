if(Platform.isLoaded("portality")) {
	onEvent('recipes', event => {
		event.remove({ id: 'portality:generator' })
		enderiumMachine(event, Item.of("portality:controller", 1), MC('diamond'))
	})
}