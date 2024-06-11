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
//The buddycard malum cards are a strange case where we only want to hide items when a mod is not present
if (!Platform.isLoaded("malum")) {
	global.itemBlacklist.push("buddycardsexp:buddycard_malum1")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum2")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum3")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum4")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum5")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum6")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum7")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum8")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum9")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum10")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum11")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum12")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum13")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum14")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum15")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum16")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum17")
	global.itemBlacklist.push("buddycardsexp:buddycard_malum18")
}

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