ServerEvents.recipes(event => {
    let stone = Item.of("minecraft:cobblestone", 1).withChance(.5)
    let experience = Item.of("create:experience_nugget", 1).withChance(0.75)

    event.recipes.create.crushing([Item.of("thermal:sapphire", 2), Item.of("thermal:sapphire", 1).withChance(.25), experience,stone], "thermal:sapphire_ore")
    event.recipes.create.crushing([Item.of("thermal:ruby", 2), Item.of("thermal:ruby", 1).withChance(.25), experience,stone], "thermal:ruby_ore")

    // cinnabar things :
    // from gem to dust
    event.recipes.create.milling(Item.of("minecraft:redstone", 4), "thermal:cinnabar").processingTime(700)
    event.recipes.create.crushing(Item.of("minecraft:redstone", 6), "thermal:cinnabar").processingTime(500)
    event.remove({ id: "thermal:machines/pulverizer/pulverizer_cinnabar" })
    event.recipes.thermal.pulverizer(Item.of("minecraft:redstone", 8), "thermal:cinnabar", 0, 10000)
    
    // from gem block to dust
    event.recipes.create.milling(Item.of("minecraft:redstone", 36), "thermal:cinnabar_block").processingTime(700)
    event.recipes.create.crushing(Item.of("minecraft:redstone", 63), "thermal:cinnabar_block").processingTime(500)
    event.recipes.thermal.pulverizer(Item.of("minecraft:redstone", 72), "thermal:cinnabar_block", 0, 10000)
    // end

    event.recipes.create.milling("thermal:sulfur_dust", "#forge:gems/sulfur").processingTime(500)
    event.recipes.create.milling("thermal:niter_dust", "#forge:gems/niter").processingTime(500)
    event.recipes.create.milling("thermal:apatite_dust", "#forge:gems/apatite").processingTime(500)

    // recompacting gem dusts into their gem form
    let recompact = (id, id2) => {
        event.recipes.create.compacting(id2, [id])
    }
    recompact("#forge:dusts/obsidian", "minecraft:obsidian")
    recompact("#forge:dusts/diamond", "minecraft:diamond")
    recompact("#forge:dusts/emerald", "minecraft:emerald")
    recompact("#forge:dusts/lapis", "minecraft:lapis_lazuli")
    recompact("#forge:dusts/sulfur", "thermal:sulfur")
    recompact("#forge:dusts/apatite", "thermal:apatite")
    recompact("#forge:dusts/niter", "thermal:niter")
    recompact("#forge:dusts/sapphire", "thermal:sapphire")
    recompact("#forge:dusts/ruby", "thermal:ruby")
    recompact("#forge:dusts/quartz", "minecraft:quartz")
})
