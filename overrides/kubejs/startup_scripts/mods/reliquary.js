if(Platform.isLoaded("reliquary")){
    onEvent('fluid.registry', event => {
        event.create('glowing_water').thinTexture(0x436ee6)//.bucketColor(0x00FFFF)
        event.create('angelheart_vial').thinTexture(0xcc6d3d)
        event.create('aphrodite_potion').thinTexture(0xb5b138)
        event.create('fertile_potion').thinTexture(0x85d842)
    })
}