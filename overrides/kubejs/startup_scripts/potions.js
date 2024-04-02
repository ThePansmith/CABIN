//Morejs is installed to add this recipe
onEvent("morejs.potion_brewing.register", (event) => {
	event.addPotionBrewing("thermal:blitz_powder", "minecraft:awkward", "minecraft:slow_falling");
})