const AC = (id, x) => MOD("aquaculture", id, x)
if(Platform.isLoaded("aquaculture")) {
    unregistered_axes.push("aquaculture:neptunium_axe")

    ServerEvents.recipes(event => {
        event.recipes.createCrushing([Item.of(AC("neptunium_ingot", 2)), Item.of(AC("neptunium_nugget", 5)).withChance(.5)], AC("neptunes_bounty")).processingTime(500)
    })
}
