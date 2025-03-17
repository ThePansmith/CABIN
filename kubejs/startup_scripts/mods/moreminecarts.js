const MMC = (id, x) => MOD("moreminecarts", id, x)
if(Platform.isLoaded("moreminecarts")) {
    BlockEvents.modification(event => {
        // vitric cactus takes a long time to break. So we shorten its breaking time
        event.modify("moreminecarts:glass_cactus", block => {
            block.destroySpeed = 0.4
        })
    })
}
