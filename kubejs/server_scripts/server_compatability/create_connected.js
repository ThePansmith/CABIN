if(Platform.isLoaded("create_connected")) {
    ServerEvents.recipes(event => {
        event.remove({ id: "create_connected:sequenced_assembly/control_chip" })
        event.remove({ id: "create_connected:crafting/kinetics/sequenced_pulse_generator" })
        event.shapeless("create_connected:sequenced_pulse_generator", ["projectred_core:platformed_plate", "create:electron_tube"])
            .id("kubejs:compat/create_connected/sequenced_pulse_generator_manual_only")
        event.recipes.create.deploying("create_connected:sequenced_pulse_generator", ["projectred_core:platformed_plate", "create:electron_tube"])
    })

    ServerEvents.tags("item", event => {
        event.get("kubejs:sellable_discs")
            .add("create_connected:music_disk_elevator")
            .add("create_connected:music_disk_interlude")
    })
}
