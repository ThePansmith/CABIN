onEvent('item.tags', event => {
    event.add('forge:computation_matrix', 'kubejs:computation_matrix')
    event.add('forge:enderium_machine', 'kubejs:enderium_machine')
    event.add('forge:controller', 'ae2:controller')
    event.add('forge:iron_block', 'minecraft:iron_block')
})

onEvent('block.tags', event => {
	event.add('minecraft:beacon_base_blocks', 'alloyed:steel_block')
})
