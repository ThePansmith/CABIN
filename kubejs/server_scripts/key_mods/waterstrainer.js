// priority: 1
ServerEvents.recipes(event => {
    // Might be considered as part of chapter 1
    event.remove({ output: "strainers:iron_mesh" })

    let strainerPattern = ["SSS", "MAM", "SSS"]
    event.shaped("kubejs:strainer_filter", strainerPattern,
        { A: FD("canvas"), M: FD("canvas"), S: "minecraft:stick" }).id("kubejs:sediment_strainer")
})
