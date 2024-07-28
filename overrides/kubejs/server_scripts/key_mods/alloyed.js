// priority: 1
onEvent('recipes', event => {
	event.remove({ id: AL("mechanical_crafting/steel_knife") }) //mechanical crafting exclusive for some reason
	event.shaped(AL('steel_knife'), ['S ', ' M'], { M: F("#ingots/steel"), S: F('#rods/wooden') })
})