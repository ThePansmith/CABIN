// Addon Compatibility Script for CABIN
// These are for mods that are not installed by default, sections of this script will enable if the applicable mod is installed.
// With how many create addons there are, it would not be feasible for me to add compat for them all.
// If you have a create addon that you think could fit in the general theme/tone/whathaveyou of CABIN, make a PR with it.

onEvent('recipes', event => {

	let machine = (machinename, id, amount, other_ingredient) => {
		event.remove({ output: id })
		if (other_ingredient) {
			event.smithing(Item.of(id, amount), 'kubejs:'+ machinename + '_machine', other_ingredient)
			event.recipes.createMechanicalCrafting(Item.of(id, amount), "AB", { A: 'kubejs:'+ machinename + '_machine', B: other_ingredient })
		}
		else
			event.stonecutting(Item.of(id, amount), 'kubejs:'+ machinename + '_machine')
	}
	
//	if (Platform.isLoaded('YourModID')) {                                    // Mod ID goes here
//		machine('andesite','minecraft:dirt', 1)                              // Recipes without an additional item will be stonecutting (saw) recipes
//		machine('copper','minecraft:dispenser', 2, 'minecraft:bow')          // Recipes with one are smithing table recipes
//
//      event.shapeless("create:creative_crate", "minecraft:redstone_ore")]) // If you have any other recipes, put them following the machine recipes
//}                                     

if (Platform.isLoaded('createbigcannons')) {
		machine('andesite','createbigcannons:yaw_controller', 1)
		machine('andesite','createbigcannons:cannon_builder', 1, 'create:mechanical_bearing')
		machine('andesite','createbigcannons:cannon_loader', 1, 'create:mechanical_piston')
		machine('andesite','createbigcannons:cannon_drill', 1, 'create:fluid_tank')
	}                         
	
})
