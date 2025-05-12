// Crafts and Additions
if (Platform.isLoaded("createaddition")) {
    // Sequence assembly items
    StartupEvents.registry("item", e => {
        e.create("incomplete_connector", "create:sequenced_assembly").texture("createaddition:item/connector").displayName("Incomplete Small Connector")
        e.create("incomplete_large_connector", "create:sequenced_assembly").texture("createaddition:item/large_connector").displayName("Incomplete Large Connector")
    })
}
