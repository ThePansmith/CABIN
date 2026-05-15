// priority: -10
ServerEvents.tags("item", event => {
    event.removeAllTagsFrom(global.itemNukeList)
    event.removeAllTagsFrom(global.unificationPattern)
})

ServerEvents.tags("fluid", event => {
    event.removeAllTagsFrom(global.fluidNukeList)
})

ServerEvents.recipes(event => {
    global.itemNukeList.forEach(item => {
        event.remove([{ output: item }, { input: item }])
    })
    global.fluidNukeList.forEach(fluid => {
        event.remove([{ output: fluid }, { input: fluid }])
        event.remove([{ output: fluid.concat("_bucket") }, { input: fluid.concat("_bucket") }])
    })
    event.remove([{ output: global.unificationPattern }, { input: global.unificationPattern }])
})
