if (Platform.isLoaded("cgm")) {
	global.itemBlacklist.push("cgm:workbench")
	global.randomiumBlacklist.push("cgm:workbench")

	//Attachment Stonecutting Item
	onEvent('item.registry', event => {
		event.create('blank_gun_attachment').modelJson({parent: 'cgm:block/workbench'}).displayName('Blank Gun Attachment')
	})
}