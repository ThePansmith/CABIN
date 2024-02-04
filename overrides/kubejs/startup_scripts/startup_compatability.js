onEvent('item.registry', event => {
	if (Platform.isLoaded('createaddition')) {
		event.create('incomplete_connector','create:sequenced_assembly').texture("createaddition:item/connector").displayName('Incomplete Small Connector')
		event.create('incomplete_large_connector','create:sequenced_assembly').texture("createaddition:item/large_connector").displayName('Incomplete Large Connector')
	}
})