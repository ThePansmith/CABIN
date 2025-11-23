## Addon Compatibility Scripts for CABIN

These are for mods that are not installed by default, the script found in this folder scripts will enable if the applicable mod is installed.
With how many create addons there are, it would not be feasible for me to add compat for them all by myself.

If you have a create addon that you think could fit in the general theme/tone/whathaveyou of CABIN, make a PR with it. Custom textures can also be submitted, if you wish.

```js
if (Platform.isLoaded('YourModID')) { // Mod ID goes here
	ServerEvents.recipes(event => {
		// Here's a machine recipe example. The code for these functions are defined in _helper.js
		// Note that machine recipes will remove all default recipes for the output item
		// Valid machine materials are andesite, copper, gold, brass, zinc, lead, invar, enderium, and fluix
		andesiteMachine(event,Item.of('minecraft:dirt', 1)) // Recipes without an additional item will be stonecutting (saw) recipes
		goldMachine(event,Item.of('minecraft:dispenser', 2), 'minecraft:bow')  // Recipes with one are deployer recipes

		//You can also use createMachine() to create a machine recipe using an item other then the normal machine items
		//This code will create a machine crafting recipe for an enchanting table using a "diamond block" machine with a book as the second material
		createMachine('minecraft:diamond_block', event, 'minecraft:enchanting_table', 'minecraft:book')

		// Shapeless recipe example
		event.shapeless("create:creative_crate", ["minecraft:redstone_ore", "minecraft:lapis_ore"])
		// Please refer to the kubejs wiki for other recipe types
		// Also note that you can easily get an item's ID with /kjs hand
		// https://wiki.latvian.dev/books/kubejs/page/recipes
		// Alteratively, if you are completely new to KubeJS:
		// https://thepansmith.github.io/docs/introduction/

		// If you need to hide blocks or items (unused, duplicate, etc) from JEI, look at the client_compatability folder for references.
	})
}
