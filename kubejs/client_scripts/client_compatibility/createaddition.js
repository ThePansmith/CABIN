if (Platform.isLoaded("createdieselgenerators")) {
    JEIEvents.hideItems(event => {
        // event.hide("thermal:electrum_ingot")
        // event.hide("thermal:electrum_nugget")
        // event.hide("thermal:electrum_plate")

        event.hide("kubejs:incomplete_connector")
        event.hide("kubejs:incomplete_large_connector")
    })
}
