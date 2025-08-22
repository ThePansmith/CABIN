if (Platform.isLoaded("createaddition")) {
    JEIEvents.hideItems(event => {
        event.hide("createaddition:capacitor")

        event.hide("kubejs:incomplete_large_connector")
        event.hide("kubejs:incomplete_connector")

        event.hide("thermal:diamond_dust")
        event.hide("thermal:electrum_ingot")
        event.hide("thermal:electrum_nugget")
        event.hide("thermal:electrum_plate")
    })

    ClientEvents.highPriorityAssets(event => {
        event.add("forge:models/tag/item/dusts/diamond",
            {
                "parent": "minecraft:item/generated",
                "textures": {
                    "layer0": "createaddition:item/diamond_grit"
                }
            }
        )
        event.add("forge:models/tag/item/nuggets/electrum",
            {
                "parent": "minecraft:item/generated",
                "textures": {
                    "layer0": "createaddition:item/electrum_nugget"
                }
            }
        )
        event.add("forge:models/tag/item/ingots/electrum",
            {
                "parent": "minecraft:item/generated",
                "textures": {
                    "layer0": "createaddition:item/electrum_ingot"
                }
            }
        )
        event.add("forge:models/tag/item/plates/electrum",
            {
                "parent": "minecraft:item/generated",
                "textures": {
                    "layer0": "createaddition:item/electrum_sheet"
                }
            }
        )
        event.add("forge:models/tag/item/storage_blocks/electrum",
            {
                "parent": "createaddition:block/electrum_block/block"
            }
        )
    })
}
