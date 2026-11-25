//create:trading floor


if (Platform.isLoaded('trading_floor')) { 
	ServerEvents.recipes(event => {
		
		brassMachine(event,Item.of('trading_floor:trading_depot', 2), 'create:depot')  

		
	})
}
