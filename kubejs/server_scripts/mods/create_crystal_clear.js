const CCR = (id, x) => MOD("create_crystal_clear", id, x)
if (Platform.isLoaded("create_crystal_clear")) {
    ServerEvents.recipes(event => {
        let tweak_glass_casing = (name) => {
            // event.remove({ output: ("create_crystal_clear:" + name + "_glass_casing") })
            event.remove({ id: (CCR(name + "_clear_glass_casing")) })
            event.custom({
                type: "create:item_application",
                ingredients: [
                    { item: CR(name + "_casing") },
                    { item: TC("clear_glass") }
                ],
                results: [
                    {	item: CCR(name + "_clear_glass_casing") }
                ]
            }).id(KJ("mods/create_crystal_clear/item_application/" + name + "_clear_glass_casing"))
            event.shapeless(CCR(name + "_glass_casing"), [CR(name + "_casing"), MC("glass")]).id(KJ("mods/create_crystal_clear/" + name + "_glass_casing"))
            event.shapeless(CCR(name + "_clear_glass_casing"), [CR(name + "_casing"), TC("clear_glass")]).id(KJ("mods/create_crystal_clear/" + name + "_clear_glass_casing"))
        }

        tweak_glass_casing("andesite")
        tweak_glass_casing("copper")
        tweak_glass_casing("brass")

        event.remove({ id: (CCR("train_clear_glass_casing")) })
        event.custom({
            type: "create:item_application",
            ingredients: [
                { item: CR("railway_casing") },
                { item: TC("clear_glass") }
            ],
            results: [
                {	item: CCR("train_clear_glass_casing") }
            ]
        }).id(KJ("mods/create_crystal_clear/item_application/train_clear_glass_casing"))
        event.shapeless(CCR("train_glass_casing"), [CR("railway_casing"), MC("glass")]).id(KJ("mods/create_crystal_clear/train_glass_casing"))
        event.shapeless(CCR("train_clear_glass_casing"), [CR("railway_casing"), TC("clear_glass")]).id(KJ("mods/create_crystal_clear/train_clear_glass_casing"))
    })
}

ServerEvents.blockLootTables(event => {
    // Fix broken loot tables
    let cogwheelDrop = {
        type: "minecraft:block",
        pools: [
            {
                rolls: 1,
                entries: [
                    {
                        type: "minecraft:item",
                        conditions: [{ condition: "minecraft:survives_explosion" }],
                        name: "create:large_cogwheel"
                    }
                ]
            }
        ]
    }
    let cogwheelCasings = ["andesite", "brass", "train"]
    cogwheelCasings.forEach(casing=>{
        event.addJson(CCR(casing + "_glass_encased_large_cogwheel"), cogwheelDrop)
        event.addJson(CCR(casing + "_clear_glass_encased_large_cogwheel"), cogwheelDrop)
    })
})
