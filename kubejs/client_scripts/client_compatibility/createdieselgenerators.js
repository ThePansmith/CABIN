if (Platform.isLoaded("createdieselgenerators")) {
    JEIEvents.hideItems(event => {
        event.hide("createdieselgenerators:crude_oil_bucket")
        event.hide("createdieselgenerators:gasoline_bucket")
        event.hide("createdieselgenerators:diesel_bucket")
        event.hide("createdieselgenerators:biodiesel_bucket")
        event.hide("createdieselgenerators:plant_oil_bucket")
    })
    JEIEvents.hideFluids(event => {
        event.hide("createdieselgenerators:crude_oil")
        event.hide("createdieselgenerators:flowing_crude_oil")
        event.hide("createdieselgenerators:gasoline")
        event.hide("createdieselgenerators:flowing_gasoline")
        event.hide("createdieselgenerators:diesel")
        event.hide("createdieselgenerators:flowing_diesel")
        event.hide("createdieselgenerators:biodiesel")
        event.hide("createdieselgenerators:flowing_biodiesel")
        event.hide("createdieselgenerators:plant_oil")
        event.hide("createdieselgenerators:flowing_plant_oil")
    })
}
