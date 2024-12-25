// Create Diesel Generators
if (Platform.isLoaded("createdieselgenerators")) {
	global.itemBlacklist.push("createdieselgenerators:crude_oil_bucket")
	global.itemBlacklist.push("createdieselgenerators:gasoline_bucket")
	global.itemBlacklist.push("createdieselgenerators:diesel_bucket")
	global.itemBlacklist.push("createdieselgenerators:biodiesel_bucket")
	global.itemBlacklist.push("createdieselgenerators:plant_oil_bucket")
    global.itemBlacklist.push("beyond_earth:oil_bucket")

	global.jeiFluidBlacklist.push('createdieselgenerators:crude_oil')
    global.jeiFluidBlacklist.push('createdieselgenerators:flowing_crude_oil')
    global.jeiFluidBlacklist.push('createdieselgenerators:gasoline')
    global.jeiFluidBlacklist.push('createdieselgenerators:flowing_gasoline')
    global.jeiFluidBlacklist.push('createdieselgenerators:diesel')
    global.jeiFluidBlacklist.push('createdieselgenerators:flowing_diesel')
    global.jeiFluidBlacklist.push('createdieselgenerators:biodiesel')
    global.jeiFluidBlacklist.push('createdieselgenerators:flowing_biodiesel')
    global.jeiFluidBlacklist.push('createdieselgenerators:plant_oil')
    global.jeiFluidBlacklist.push('createdieselgenerators:flowing_plant_oil')
    global.jeiFluidBlacklist.push('beyond_earth:oil')

	global.randomiumBlacklist.push("createdieselgenerators:pumpjack_crank")
    global.randomiumBlacklist.push("createdieselgenerators:pumpjack_head")
    global.randomiumBlacklist.push("createdieselgenerators:pumpjack_bearing")
	global.randomiumBlacklist.push("createdieselgenerators:huge_diesel_engine")
	global.randomiumBlacklist.push("createdieselgenerators:oil_scanner")
}