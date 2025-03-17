// priority: 1
ServerEvents.recipes(event => {
    // Fix farmer's delight recipe conflict with rechiseled
    event.remove({ id: FD("flint_knife") })
    event.remove({ id: FD("iron_knife") })
    event.remove({ id: FD("golden_knife") })
    event.remove({ id: FD("diamond_knife") })
    event.shaped(FD("flint_knife"), ["S ", " M"], { M: MC("flint"), S: F("#rods/wooden") })
    event.shaped(FD("iron_knife"), ["S ", " M"], { M: MC("iron_ingot"), S: F("#rods/wooden") })
    event.shaped(FD("golden_knife"), ["S ", " M"], { M: MC("gold_ingot"), S: F("#rods/wooden") })
    event.shaped(FD("diamond_knife"), ["S ", " M"], { M: MC("diamond"), S: F("#rods/wooden") })

    // Modify farmer's delight log stripping
    event.remove({ input: "#minecraft:logs", type: "farmersdelight:cutting" })
    // laziness and its consequences have been a distaster for the human race
    wood_types.forEach(wood => {
        let log = wood + "_log"
        if (!Item.exists(log)) {
            log = wood + "_stem"
        }
        let woodLog = wood + "_wood"
        if (!Item.exists(woodLog)) {
            woodLog = wood + "_hyphae"
        }
        let strippedLog = log.replace(":",":stripped_")
        let strippedWood = woodLog.replace(":",":stripped_")
        if (Item.exists(log) && Item.exists(strippedLog)) {
            event.custom({
                "type": "farmersdelight:cutting",
                "ingredients": [{ "item": log }],
                "tool": { "tag": "forge:tools/axes" },
                "result": [{ "item": strippedLog }, { "item": "farmersdelight:tree_bark" }]
            })
        }
        if (Item.exists(woodLog) && Item.exists(strippedWood)) {
            event.custom({
                "type": "farmersdelight:cutting",
                "ingredients": [{ "item": woodLog }],
                "tool": { "tag": "forge:tools/axes" },
                "result": [{ "item": strippedWood }, { "item": "farmersdelight:tree_bark" }]
            })
        }
    })
})
