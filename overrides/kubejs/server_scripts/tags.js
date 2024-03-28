onEvent('item.tags', event => {
	event.add('forge:computation_matrix', 'kubejs:computation_matrix')
	event.add('forge:enderium_machine', 'kubejs:enderium_machine')
	event.add('forge:controller', 'ae2:controller')
	event.add('forge:iron_block', 'minecraft:iron_block')

	event.add('forge:dusts/obsidian', 'create:powdered_obsidian')
	event.add('forge:dusts', 'create:powdered_obsidian')
})

onEvent('block.tags', event => {
	event.add('minecraft:beacon_base_blocks', 'alloyed:steel_block')
	event.remove('minecraft:beacon_base_blocks', 'thermal:bronze_block')

	//I don't know why this isn't wrenchable by default
	event.add("create:wrench_pickup", "minecraft:note_block")

	event.add("create:wrench_pickup", "waterstrainer:strainer_base")

	event.add("create:wrench_pickup", /thermal:machine/)
	event.add("create:wrench_pickup", /thermal:device/)
	event.add("create:wrench_pickup", /thermal:dynamo/)
	event.add("create:wrench_pickup", "thermal:tinker_bench")
	event.add("create:wrench_pickup", "thermal:charge_bench")
	event.add("create:wrench_pickup", "thermal:energy_cell_frame")
	event.add("create:wrench_pickup", "thermal:energy_cell")
	event.add("create:wrench_pickup", "thermal:fluid_cell_frame")
	event.add("create:wrench_pickup", "thermal:fluid_cell")
	event.add("create:wrench_pickup", "thermal:energy_duct")
	event.add("create:wrench_pickup", "thermal:fluid_duct")
	event.add("create:wrench_pickup", "thermal:fluid_duct_windowed")

	event.add("create:wrench_pickup", /storagedrawers:/)

	event.add("create:wrench_pickup", 'quark:ender_watcher')

	event.add("create:wrench_pickup", 'supplementaries:cog_block')
	event.add("create:wrench_pickup", 'supplementaries:relayer')
	event.add("create:wrench_pickup", 'supplementaries:spring_launcher')
	event.add("create:wrench_pickup", 'supplementaries:speaker_block')
	event.add("create:wrench_pickup", 'supplementaries:turn_table')
	//event.add("create:wrench_pickup", 'supplementaries:pulley_block')
	//event.add("create:wrench_pickup", 'supplementaries:hourglass')
	event.add("create:wrench_pickup", 'supplementaries:bellows')
	event.add("create:wrench_pickup", 'supplementaries:clock_block')
	event.add("create:wrench_pickup", 'supplementaries:crystal_display')
	event.add("create:wrench_pickup", 'supplementaries:sconce_lever')
	event.add("create:wrench_pickup", 'supplementaries:crank')
	event.add("create:wrench_pickup", 'supplementaries:wind_vane')
	event.add("create:wrench_pickup", 'supplementaries:faucet')

	event.add("create:wrench_pickup", 'cb_multipart:multipart')

	//I really don't know why these blocks are missing the pressure plate tag
	//All the other pressure plates from quark and forbidden have the tag.
	event.add("minecraft:pressure_plates", 'quark:obsidian_pressure_plate')
	event.add("minecraft:pressure_plates", 'forbidden_arcanus:polished_darkstone_pressure_plate')
})
