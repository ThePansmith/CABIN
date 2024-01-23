onEvent('item.tags', event => {
    event.add('forge:computation_matrix', 'kubejs:computation_matrix')
    event.add('forge:enderium_machine', 'kubejs:enderium_machine')
    event.add('forge:controller', 'ae2:controller')
    event.add('forge:iron_block', 'minecraft:iron_block')
})

onEvent('block.tags', event => {
	event.add('minecraft:beacon_base_blocks', 'alloyed:steel_block')

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
})
