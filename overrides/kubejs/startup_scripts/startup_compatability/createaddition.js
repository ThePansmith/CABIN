//Crafts and Additions
if (Platform.isLoaded("createaddition")) {
	global.itemBlacklist.push("thermal:electrum_ingot")
	global.itemBlacklist.push("thermal:electrum_nugget")
	global.itemBlacklist.push("thermal:electrum_plate")
	global.itemBlacklist.push("beyond_earth:iron_stick")
	global.itemBlacklist.push("createaddition:zinc_sheet")
	//Unfortunately we have stick to thermal diamond dust due to the strainer recipe
	global.itemBlacklist.push("createaddition:diamond_grit")
	global.itemBlacklist.push("createaddition:accumulator")
}

//Sequence assembly items
onEvent('item.registry', event => {
	if (Platform.isLoaded('createaddition')) {
		event.create('incomplete_connector','create:sequenced_assembly').texture("createaddition:item/connector").displayName('Incomplete Small Connector')
		event.create('incomplete_large_connector','create:sequenced_assembly').texture("createaddition:item/large_connector").displayName('Incomplete Large Connector')
	}
})