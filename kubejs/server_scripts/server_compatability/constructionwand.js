if(Platform.isLoaded("constructionwand")) {
    ServerEvents.recipes(event => {

        event.remove({ mod: "constructionwand" })

        // Construction Wands
        event.shaped("constructionwand:stone_wand", [
            " S ",
            "CCC",
            " H "
        ], {
            S: "create:empty_schematic",
            C: "minecraft:stick",
            H: "minecraft:cobblestone",
        })
        let wand = (id, mechanismTier, gearMaterial, chasisMaterial) => {
            event.recipes.create.mechanical_crafting("constructionwand:" + id + "_wand", [
                " S ",
                "CCC",
                " M ",
                " G ",
                " C "
            ], {
                S: "create:empty_schematic",
                C: chasisMaterial,
                M: mechanismTier,
                G: gearMaterial,
            })
        }
        wand("iron", "create:precision_mechanism", "thermal:iron_gear", "minecraft:stick")
        wand("diamond", "kubejs:inductive_mechanism", "thermal:diamond_gear", "minecraft:stick")
        wand("infinity", "kubejs:calculation_mechanism", "thermal:invar_gear", "architects_palette:unobtanium")

        // Wand Cores
        let core = (id, coreType, otherIngredient) => { 
            event.shaped("constructionwand:core_" + id, [
                " GD",
                "GCG",
                "DG "
            ], {
                C: coreType,
                D: otherIngredient,
                G: "minecraft:glass_pane"
            })
        }
        core("angel", "minecraft:golden_apple", "minecraft:feather")
        core("destruction", "ae2:annihilation_core", "minecraft:redstone")
    })
}
