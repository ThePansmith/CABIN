if(Platform.isLoaded("create_enchantment_industry")) {
	ServerEvents.recipes(event => {
		copperMachine(event, Item.of('create_enchantment_industry:disenchanter', 1), '#create:sandpaper')
		copperMachine(event, Item.of('create_enchantment_industry:printer', 1), '#forge:storage_blocks/lapis')
		
		event.replaceInput( {id: 'create_enchantment_industry:crafting/enchanting_guide'}, 'create:sturdy_sheet', 'create:schedule' )
	})
}