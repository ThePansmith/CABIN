// Balanced Flight
if (Platform.isLoaded("balancedflight")) {
    // Sequence assembly items
    StartupEvents.registry("item", event => {
        event.create("incomplete_flight_anchor","create:sequenced_assembly").modelJson({parent: "minecraft:block/beacon"}).displayName("Incomplete Flight Anchor")
    })
}
