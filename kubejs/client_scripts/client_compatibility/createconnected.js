if (Platform.isLoaded("createdieselgenerators")) {
    JEIEvents.hideItems(event => {
        event.hide("create_connected:control_chip")
        event.hide("create_connected:incomplete_control_chip")
    })
}
