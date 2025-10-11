if (Platform.isLoaded("trials")) {
    MoreJSEvents.registerPotionBrewing((event) => {
        // Potion recipes are not shown in jei by default for some reason
        event.addPotionBrewing("trials:breeze_rod", "minecraft:awkward", "trials:winded");
        event.addPotionBrewing("minecraft:stone", "minecraft:awkward", "trials:infested");
        event.addPotionBrewing("minecraft:cobweb", "minecraft:awkward", "trials:weave");
        event.addPotionBrewing("minecraft:slime_block", "minecraft:awkward", "trials:ooze");
    })
}
