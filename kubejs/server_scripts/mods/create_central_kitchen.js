if(Platform.isLoaded("create_central_kitchen")) {
    ServerEvents.recipes(event => {
        // fix cooking guide recipe since sturdy sheets are removed in CABIN
        event.remove({ id: "create_central_kitchen:crafting/cooking_guide" })
        event.shapeless("create_central_kitchen:cooking_guide", [CR("schedule"), FD("canvas")])
    })
}
