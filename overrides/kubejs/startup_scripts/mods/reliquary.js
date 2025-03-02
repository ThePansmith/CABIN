if(Platform.isLoaded("reliquary")){
    onEvent('fluid.registry', event => {
        event.create('glowing_water').thinTexture(0x436ee6).rarity("common").displayName("Glowing Water")
        event.create('angelheart_vial').thinTexture(0xcc6d3d).rarity("common").displayName("Angelheart Potion")
        event.create('aphrodite_potion').thinTexture(0xb5b138).rarity("common").displayName("Aphrodite's Serum")
        event.create('fertile_potion').thinTexture(0x85d842).rarity("common").displayName("Fertile Potion")
    })
}
