if (Platform.isLoaded("createaddition")) {
    JEIEvents.hideItems(event => {

        event.hide("kubejs:incomplete_electrical_connector")
        event.hide("kubejs:incomplete_redstone_magnet")
        event.hide("kubejs:incomplete_layered_magnet")
        event.hide("kubejs:incomplete_fluxuated_magnetite")
        event.hide("kubejs:incomplete_netherite_magnet")
    })