const PR_T = (id, x) => MOD("projectred_transmission", id, x)
if (Platform.isLoaded('projectred_transmission')) {
	onEvent('recipes', event => {
		event.remove({ id: 'projectred_transmission:wired_plate' })
		event.remove({ id: 'projectred_transmission:bundled_plate' })
		event.replaceInput({ id:'kubejs:platformed_plate' }, PR_C('red_ingot'), PR_T('red_alloy_wire'))
	})
}