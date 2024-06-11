onEvent('rei.hide.items', event => {
	global.itemBlacklist.forEach(item=>{
		event.hide(item);
	})
	global.jeiItemBlacklist.forEach(item=>{
		event.hide(item);
	})
})

onEvent('rei.hide.fluids', event => {
	global.fluidBlacklist.forEach(fluid=>{
		event.hide(fluid);
	})
	global.jeiFluidBlacklist.forEach(fluid=>{
		event.hide(fluid);
	})
})