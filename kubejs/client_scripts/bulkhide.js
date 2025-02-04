REIEvents.hide(event => {
	global.itemBlacklist.forEach(item=>{
		event.hide(item);
	})
	global.jeiItemBlacklist.forEach(item=>{
		event.hide(item);
	})
})

REIEvents.hide(event => {
	global.jeiFluidBlacklist.forEach(fluid=>{
		event.hide(fluid);
	})
})