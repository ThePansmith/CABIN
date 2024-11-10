if(Platform.isLoaded("create_connected")) {
	onEvent('recipes', event => {
    event.remove({ output: 'create_connected:control_chip' })
    event.remove({ output: 'create_connected:sequenced_pulse_generator' })

    event.smithing('create_connected:sequenced_pulse_generator', 'projectred_core:platformed_plate', 'create:electron_tube')
	})
}