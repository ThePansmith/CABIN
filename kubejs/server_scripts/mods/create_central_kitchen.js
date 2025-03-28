if(Platform.isLoaded("create_central_kitchen")) {
    ServerEvents.recipes(event => {
        // fix cooking guide recipe since sturdy sheets are removed in CABIN
        event.remove({ id: "create_central_kitchen:crafting/cooking_guide" })
        event.shapeless("create_central_kitchen:cooking_guide", ["create:schedule", "farmersdelight:canvas"])

        //Some sequenced assembly recipes don't exist for some reason
        let transitional = "create_central_kitchen:incomplete_mutton_wrap"
        event.recipes.create.sequenced_assembly([
            "farmersdelight:mutton_wrap",
        ], "#forge:bread", [
            event.recipes.create.deploying(transitional, [transitional, "#forge:cooked_mutton"]),
            event.recipes.create.deploying(transitional, [transitional, "#forge:crops/cabbage"]),
            event.recipes.create.deploying(transitional, [transitional, "#forge:crops/onion"])
        ]).transitionalItem(transitional)
            .loops(1)
            .id("kubejs:mutton_wrap")

        transitional = "create_central_kitchen:incomplete_hamburger"
        event.recipes.create.sequenced_assembly([
            "farmersdelight:hamburger",
        ], "#forge:bread", [
            event.recipes.create.deploying(transitional, [transitional, "farmersdelight:beef_patty"]),
            event.recipes.create.deploying(transitional, [transitional, "#forge:crops/cabbage"]),
            event.recipes.create.deploying(transitional, [transitional, "#forge:crops/tomato"]),
            event.recipes.create.deploying(transitional, [transitional, "#forge:crops/onion"])
        ]).transitionalItem(transitional)
            .loops(1)
            .id("kubejs:hamburger")
    })

    ServerEvents.tags("item", event => {
        //Create central kitchen somes ends up removing automatic shapeless recipes while providing no alternatives.
        //This is mainly an issue with bowl recipes
        event.get("create:ignored_in_automatic_shapeless")
            .remove("minecraft:bowl")
    })
}
