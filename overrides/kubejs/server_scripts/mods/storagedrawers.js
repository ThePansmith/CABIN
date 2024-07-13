const SD = (id, x) => MOD("storagedrawers", id, x)
//Some people may want to switch out Storage Drawers for Sophisticated Storage
//This mod can be removed from the pack with no issues
if(Platform.isLoaded("storagedrawers")) {
	onEvent('recipes', event => {
		let drawer_types = ['oak', 'spruce', 'birch', 'jungle', 'acacia', 'dark_oak', 'warped', 'crimson']
		let drawer_sizes = ['1', '2', '4']
		event.replaceInput({ id: SD('compacting_drawers_3') }, MC('iron_ingot'), F('#ingots/zinc'))
		event.remove({ output: SD("upgrade_template") })

		drawer_types.forEach(e => {

			let trim = SD(`${e}_trim`)
			let plank = MC(`${e}_planks`)
			event.remove({ id: trim })
			event.shaped(Item.of(trim, 4), [
				'SSS',
				'PMP',
				'SSS'
			], {
				P: CR('zinc_ingot'),
				M: '#forge:chests/wooden',
				S: plank
			})

			event.stonecutting(SD("upgrade_template"), trim)

			drawer_sizes.forEach(size => {
				let full = SD(`${e}_full_drawers_${size}`)
				let half = SD(`${e}_half_drawers_${size}`)
				event.remove({ id: full })
				event.remove({ id: half })
				event.stonecutting(full, trim)
				event.stonecutting(Item.of(half, 2), trim)
			})
		})
	})

	onEvent('block.tags', event => {
		event.add("create:wrench_pickup", '#storagedrawers:drawers')
		event.add("create:wrench_pickup", 'storagedrawers:compacting_drawers_3')
		event.add("create:wrench_pickup", 'storagedrawers:controller')
		event.add("create:wrench_pickup", 'storagedrawers:controller_slave')
	})
}