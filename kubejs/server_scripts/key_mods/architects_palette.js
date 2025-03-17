// priority: 1
ServerEvents.recipes(event => {
    event.remove({ id: AP("smelting/charcoal_block_from_logs_that_burn_smoking") })
    event.remove({ id: AP("charcoal_block") })
    event.stonecutting(AP("charcoal_block"), MC("charcoal"))
    donutCraft(event, AP("plating_block", 8), CR("iron_sheet"), MC("stone"))
    event.replaceInput({ id: "architects_palette:wither_lamp" }, AP("withered_bone"), TC("necrotic_bone"))
    event.replaceInput({ id: "architects_palette:withered_bone_block" }, AP("withered_bone"), TC("necrotic_bone"))
    event.remove({ id: "architects_palette:withered_bone" })
})
