onEvent('player.inventory.closed', event => {
	if (event.inventoryContainer.getClass().getSimpleName() != "SmithingMenu") {
		return
	}
	event.player.inventory.minecraftInventory.forEach(item => {
		if (Item.of(item).getNbtString().includes("Modifier:\"forbidden_arcanus:eternal\"") && !Item.of(item).getNbtString().includes("Unbreakable:1b")) {
			let data = Item.of(item).nbt
			data.Unbreakable = true
			Item.of(item).setNbt(data)
		}
	})
})