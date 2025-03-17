const MMC = (id, x) => MOD("moreminecarts", id, x)
if(Platform.isLoaded("moreminecarts")) {
    ServerEvents.tags("block", event => {
        // None of the blocks from this mod have tags for some reason
        event.get("minecraft:mineable/pickaxe")
            .add(MMC("silica_steel_block"))
            .add(MMC("chunkrodite_block"))
            .add(MMC("corrugated_silica_steel"))
            .add(MMC("silica_steel_pillar"))
            .add(MMC("organic_glass"))
            .add(MMC("organic_glass_pane"))
            .add(MMC("chiseled_organic_glass"))
            .add(MMC("chiseled_organic_glass_pane"))
            .add(MMC("holo_scaffold_generator"))
            .add(MMC("chunk_loader"))
            .add(MMC("minecart_loader"))
            .add(MMC("minecart_unloader"))
            .add(MMC("pearl_stasis_chamber"))
    })
}
