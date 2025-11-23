if(Platform.isLoaded("balancedflight")) {
    ServerEvents.recipes(event => {
        event.remove({ mod: "balancedflight" })
        event.recipes.create.sequenced_assembly([
            "balancedflight:flight_anchor",
        ], "minecraft:beacon", [
            event.recipes.create.deploying("kubejs:incomplete_flight_anchor", ["kubejs:incomplete_flight_anchor", "kubejs:gold_machine"]),
            event.recipes.create.deploying("kubejs:incomplete_flight_anchor", ["kubejs:incomplete_flight_anchor", "kubejs:inductive_mechanism"]),
            event.recipes.create.deploying("kubejs:incomplete_flight_anchor", ["kubejs:incomplete_flight_anchor", "kubejs:inductive_mechanism"]),
            event.recipes.create.deploying("kubejs:incomplete_flight_anchor", ["kubejs:incomplete_flight_anchor", "create:shaft"]),
            event.recipes.create.deploying("kubejs:incomplete_flight_anchor", ["kubejs:incomplete_flight_anchor", Platform.isLoaded("create_jetpack") ? "create_jetpack:jetpack" : "minecraft:elytra"]),
        ]).loops(1)
            .transitionalItem("kubejs:incomplete_flight_anchor")
            .id("kubejs:compat/balancedflight/flight_anchor")

        event.remove({output: "balancedflight:ascended_flight_ring"})
    })
}
