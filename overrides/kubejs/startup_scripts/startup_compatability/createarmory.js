if (Platform.isLoaded("createarmory")) {
	global.itemBlacklist.push("createarmory:pipe_pistol")
	global.itemBlacklist.push("createarmory:barret")
	global.itemBlacklist.push("createarmory:m_four")
	global.itemBlacklist.push("createarmory:mac_ten")
	global.itemBlacklist.push("createarmory:four_sixteen")
	global.itemBlacklist.push("createarmory:m_sixteen")
	global.itemBlacklist.push("createarmory:double_barrel")
	global.itemBlacklist.push("createarmory:rpg")
	global.itemBlacklist.push("createarmory:junk_gun")
	
	global.itemBlacklist.push("createarmory:unfinished_nine_mm")
	global.itemBlacklist.push("createarmory:unfinished_fifty_cal_casing")
	global.itemBlacklist.push("createarmory:unfinished_five_five_six_casing")
	global.itemBlacklist.push("createarmory:unfinished_shotgun_shell")

	global.itemBlacklist.push("kubejs:unfinished_nine_mm_mold")
	global.itemBlacklist.push("kubejs:unfinished_fifty_cal_mold")
	global.itemBlacklist.push("kubejs:unfinished_five_five_six_mold")

	global.itemBlacklist.push("createarmory:impact_nade")
	global.itemBlacklist.push("createarmory:smoke_nade")
	global.itemBlacklist.push("createarmory:nine_debug")
	global.itemBlacklist.push("createarmory:fifty_debug")
	global.itemBlacklist.push("createarmory:five_five_six_debug")
	global.itemBlacklist.push("createarmory:rocket_debug")
	global.itemBlacklist.push("createarmory:shotgun_debug")
	global.itemBlacklist.push("createarmory:impact_nade_debug")
	global.itemBlacklist.push("createarmory:smoke_debug")
	global.itemBlacklist.push("createarmory:junk_debug")

	global.jeiFluidBlacklist.push("createarmory:flowing_molten_brass")

	onEvent('item.registry', event => {
		event.create("unfinished_nine_mm_mold")
			.texture("cabin:item/compat/createarmory/unfinished_nine_mm_mold")
			.displayName("Incomplete 9mm Casing"),
		event.create("unfinished_fifty_cal_mold")
			.texture("cabin:item/compat/createarmory/unfinished_fifty_cal_mold")
			.displayName("Incomplete 50 Caliber Casing")
		event.create("unfinished_five_five_six_mold")
			.texture("cabin:item/compat/createarmory/unfinished_five_five_six_mold")
			.displayName("Incomplete 556 Casing")
	})
}