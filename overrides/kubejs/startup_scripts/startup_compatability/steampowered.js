// Steam Powered
if (Platform.isLoaded("steampowered")) {
	global.itemBlacklist.push("steampowered:pressurized_gas_container")
	global.itemBlacklist.push("steampowered:pressurized_steam_container")
	global.itemBlacklist.push("steampowered:bronze_sheet")
	global.itemBlacklist.push("steampowered:alternator") // C:C&A Already has a better alternator, use that one instead

    global.jeiFluidBlacklist.push('steampowered:steam_flowing')
}