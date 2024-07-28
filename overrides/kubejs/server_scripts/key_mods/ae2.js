// priority: 1
onEvent('recipes', event => {
	event.remove({ output: AE2('vibration_chamber') })
})