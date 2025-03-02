const SD = (id, x) => MOD("storagedrawers", id, x)
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
		//Other planks should yield oak drawer
		event.shaped(SD('oak_trim',4), [
			'SSS',
			'PMP',
			'SSS'
		], {
			P: CR('zinc_ingot'),
			M: '#forge:chests/wooden',
			S: Ingredient.custom('#minecraft:planks',item => {return item.getMod() != 'minecraft'})
		})

		//drawer controller and controller_slave
		zincMachine(event, Item.of('storagedrawers:controller', 1), MC('diamond'))
		zincMachine(event, Item.of('storagedrawers:controller_slave', 1), MC('gold_ingot'))

		//Upgrades
		let upgrades = ['iron_storage','gold_storage','diamond_storage','emerald_storage','one_stack','conversion','redstone','illumination','fill_level', 'void']
		let ingredients = [MC('iron_ingot'),MC('gold_ingot'),MC('diamond'),MC('emerald'),MC('flint'),MC('lapis_lazuli'),MC('redstone'),MC('glowstone_dust'),MC('repeater'),MC('obsidian')]
		for (let i = 0; i < upgrades.length; i++) {
			event.remove({ id: `storagedrawers:${upgrades[i]}_upgrade`})
			event.smithing(`storagedrawers:${upgrades[i]}_upgrade`, 'storagedrawers:upgrade_template', ingredients[i])
		}
		event.remove({ id:'storagedrawers:obsidian_storage_upgrade'})
		event.stonecutting('storagedrawers:obsidian_storage_upgrade', 'storagedrawers:upgrade_template')

		event.remove({ id:'storagedrawers:min_redstone_upgrade'})
		event.remove({ id:'storagedrawers:max_redstone_upgrade'})
		event.stonecutting('storagedrawers:redstone_upgrade','#kubejs:storagedrawers/redstone_upgrade')
		event.stonecutting('storagedrawers:min_redstone_upgrade','#kubejs:storagedrawers/redstone_upgrade')
		event.stonecutting('storagedrawers:max_redstone_upgrade','#kubejs:storagedrawers/redstone_upgrade')
		
		//Keys
		event.remove({ id: 'storagedrawers:drawer_key'})
		event.remove({ id: 'storagedrawers:quantify_key'})
		event.remove({ id: 'storagedrawers:concealment_key'})
		event.smithing('storagedrawers:drawer_key', 'storagedrawers:upgrade_template', '#forge:plates/gold')
		event.stonecutting('storagedrawers:drawer_key','#kubejs:storagedrawers/drawer_key')
		event.stonecutting('storagedrawers:quantify_key','#kubejs:storagedrawers/drawer_key')
		event.stonecutting('storagedrawers:shroud_key','#kubejs:storagedrawers/drawer_key')
	})

	onEvent('item.tags', event => {
		event.get('kubejs:storagedrawers/drawer_key')
			.add('storagedrawers:drawer_key')
			.add('storagedrawers:quantify_key')
			.add('storagedrawers:shroud_key')
			event.get('kubejs:storagedrawers/redstone_upgrade')
			.add('storagedrawers:redstone_upgrade')
			.add('storagedrawers:min_redstone_upgrade')
			.add('storagedrawers:max_redstone_upgrade')
	})
	onEvent('block.tags', event => {
		event.add('create:wrench_pickup', '@storagedrawers')
	})
}