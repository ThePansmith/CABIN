const PR_T = (id, x) => MOD("projectred_transmission", id, x)
//not sure why you would remove this mod from the pack. Projectred core still remains as a required mod.
//This mod can be removed from the pack with no issues
if (Platform.isLoaded('projectred_transmission')) {
	onEvent('recipes', event => {
		event.remove({ id: 'projectred_transmission:wired_plate' })
		event.remove({ id: 'projectred_transmission:bundled_plate' })
		event.replaceInput({ id:'kubejs:platformed_plate' }, PR_C('red_ingot'), PR_T('red_alloy_wire'))
	})
}