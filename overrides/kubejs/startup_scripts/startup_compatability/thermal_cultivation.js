// Incomplete compatability script for thermal cultivation


//Remove duplicate apatite veins
onEvent('worldgen.remove', event => {
	//We can't disable apatite in the thermal config since it'll get deleted when cultivation isn't installed
	//We don't want to tell people they need to reinstall the pack to add cultivation
	if (Platform.isLoaded("thermal_cultivation")) {
		event.removeFeatureById('underground_ores', 'thermal:apatite_ore')
	}
})