onEvent('item.registry', event => {
	if (Platform.isLoaded('createaddition')) {
		event.create('incomplete_connector','create:sequenced_assembly').texture("createaddition:item/connector").displayName('Incomplete Small Connector')
		event.create('incomplete_large_connector','create:sequenced_assembly').texture("createaddition:item/large_connector").displayName('Incomplete Large Connector')
	}
})

onEvent('worldgen.remove', event => {
	//We can't disable this in the thermal config since it'll get deleted when cultivation isn't installed
	//We don't want to tell people they need to reinstall the pack to add cultivation
	if (Platform.isLoaded("thermal_cultivation")) {
		event.removeFeatureById('underground_ores', 'thermal:apatite_ore')
	}
})