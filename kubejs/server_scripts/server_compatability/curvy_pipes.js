if (Platform.isLoaded("curvy_pipes")) {
    // Downcrafting/conversion recipes are done in curvy pipes config
    ServerEvents.recipes(event => {
        // copied machine function but it doesn't remove existing recipes to keep conversions
        const safeMachine = (machineItem, event, outputIngredient, inputIngredient) => {
            machineItem = Ingredient.of(machineItem)
            outputIngredient = Item.of(outputIngredient)
            inputIngredient = Ingredient.of(inputIngredient)
            event.custom({
                "type": "create:item_application",
                "ingredients": [
                    machineItem.toJson(),
                    inputIngredient.toJson()
                ],
                "results": (outputIngredient.isBlock() && outputIngredient.getCount() > 1) ?
                    [
                        outputIngredient.withCount(1).toJson(),
                        outputIngredient.withCount(outputIngredient.getCount() - 1).toJson()
                    ] : [
                        outputIngredient.toJson()
                    ]
            })
        }

        safeMachine("kubejs:brass_machine", event, Item.of("curvy_pipes:small_item_pipe", 8), "create:package_frogport")
        safeMachine("kubejs:copper_machine", event, Item.of("curvy_pipes:small_fluid_pipe", 4), "minecraft:lapis_block")

        event.shaped("8x curvy_pipes:small_energy_pipe", ["P", "M", "P"], {
            P: "thermal:invar_ingot",
            M: "minecraft:redstone"
        })
    })
}