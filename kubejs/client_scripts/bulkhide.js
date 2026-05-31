JEIEvents.hideItems(event => {
    event.hide(/incomplete/)
    event.hide(/kubejs:growing/)
    event.hide(/kubejs:failed/)
    event.hide("kubejs:silver_coin")
    event.hide("kubejs:gold_coin")

    event.hide("cb_microblock:microblock")
    event.hide("ae2:facade")
    event.hide("chiselsandbits:block_bit")
    event.hide("create:sturdy_sheet")
    event.hide("create:unprocessed_obsidian_sheet")

    // Bad lazy fix. 
    event.hide("thermal:tin_gear")
    event.hide("thermal:tin_ingot")
})

JEIEvents.hideFluids(event => {
    event.hide("tconstruct:molten_tin")
})
