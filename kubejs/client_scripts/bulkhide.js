JEIEvents.hideItems(event => {
	global.itemBlacklist.forEach(item=>{
		event.hide(item);
	})
	global.jeiItemBlacklist.forEach(item=>{
		event.hide(item);
	})
})

JEIEvents.hideFluids(event => {
	global.jeiFluidBlacklist.forEach(fluid=>{
		event.hide(fluid);
	})
})