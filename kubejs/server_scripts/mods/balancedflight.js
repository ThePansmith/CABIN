if(Platform.isLoaded("balancedflight")) {
    ServerEvents.recipes(event => {
        event.remove({ mod: "balancedflight" })
        event.recipes.createSequencedAssembly([
            "balancedflight:flight_anchor",
        ], "minecraft:beacon", [
            event.recipes.createDeploying(KJ("incomplete_flight_anchor"), [KJ("incomplete_flight_anchor"), KJ("gold_machine")]),
            event.recipes.createDeploying(KJ("incomplete_flight_anchor"), [KJ("incomplete_flight_anchor"), KJ("inductive_mechanism")]),
            event.recipes.createDeploying(KJ("incomplete_flight_anchor"), [KJ("incomplete_flight_anchor"), KJ("inductive_mechanism")]),
            event.recipes.createDeploying(KJ("incomplete_flight_anchor"), [KJ("incomplete_flight_anchor"), CR("shaft")]),
            event.recipes.createDeploying(KJ("incomplete_flight_anchor"), [KJ("incomplete_flight_anchor"), Platform.isLoaded("magicfeather") ? "magicfeather:magicfeather" : MC("elytra")]),
        ]).loops(1)
            .transitionalItem("kubejs:incomplete_flight_anchor")
            .id("kubejs:compat/balancedflight/flight_anchor")

        event.remove({output: "balancedflight:ascended_flight_ring"})
    })
}
