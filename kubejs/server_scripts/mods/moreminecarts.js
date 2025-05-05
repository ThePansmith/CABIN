if(Platform.isLoaded("moreminecarts")) {
    ServerEvents.tags("block", event => {
        // None of the blocks from this mod have tags for some reason
        event.get("minecraft:mineable/pickaxe")
            .add("moreminecarts:silica_steel_block")
            .add("moreminecarts:chunkrodite_block")
            .add("moreminecarts:corrugated_silica_steel")
            .add("moreminecarts:silica_steel_pillar")
            .add("moreminecarts:organic_glass")
            .add("moreminecarts:organic_glass_pane")
            .add("moreminecarts:chiseled_organic_glass")
            .add("moreminecarts:chiseled_organic_glass_pane")
            .add("moreminecarts:holo_scaffold_generator")
            .add("moreminecarts:chunk_loader")
            .add("moreminecarts:minecart_loader")
            .add("moreminecarts:minecart_unloader")
            .add("moreminecarts:filter_unloader")
            .add("moreminecarts:pearl_stasis_chamber")
    })
    LootJS.modifiers((event) => {
        event.addBlockLootModifier("moreminecarts:filter_unloader")
            .addLoot("moreminecarts:filter_unloader")
    })
}
