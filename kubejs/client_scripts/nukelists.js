// priority: -10
JEIEvents.hideItems(event => {
    global.itemNukeList.forEach(item => { event.hide(item) })
    global.fluidNukeList.forEach(fluid => { event.hide(fluid.concat("_bucket")) })
    event.hide(global.unificationPattern)
})

JEIEvents.hideFluids(event => {
    global.fluidNukeList.forEach(fluid => { event.hide(fluid) })
})
