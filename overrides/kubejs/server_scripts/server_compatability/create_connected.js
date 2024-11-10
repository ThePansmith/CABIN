if(Platform.isLoaded("create_connected")) {
	onEvent('recipes', event => {
        event.remove({ id: 'create_connected:sequenced_assembly/control_chip' })

        createMachine('projectred_core:platformed_plate', event, 'create_connected:sequenced_pulse_generator', 'create:electron_tube')
	})
}