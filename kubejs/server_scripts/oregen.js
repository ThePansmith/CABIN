ServerEvents.lowPriorityData(event => {
    removeFeature(event, "minecraft:ore_redstone")
    removeFeature(event, "minecraft:ore_redstone_lower")

    removeFeature(event, "occultism:ore_silver")
    removeFeature(event, "occultism:ore_silver_deepslate")
    removeFeature(event, "occultism:ore_silver_deepslate")
    // It's possible to disable these in the config, but using configs for oregen is outdated and the way Thermal addons' oregens work are very strange
    removeFeature(event, "thermal:tin_ore")
    removeFeature(event, "thermal:silver_ore")

    addOregenOverworld(event, "kubejs:ore_ruby", "thermal:ruby_ore", "minecraft:trapezoid", -144, 16, 4, 6, 0.5)
    addOregenOverworld(event, "kubejs:ore_sapphire", "thermal:sapphire_ore", "minecraft:trapezoid", -144, 16, 4, 6, 0.5)

    // The defaults for these 2 aren't what we want.
    // We need Extra Cinnabar to turn into Redstone and Apatite doesn't even generate without Thermal Cultivation.
    removeFeature(event, "thermal:apatite_ore")
    removeFeature(event, "thermal:cinnabar_ore")

    addOregenOverworld(event, "kubejs:ore_apatite", "thermal:apatite_ore", "minecraft:trapezoid", -16, 96, 3, 9, 0)
    addOregenOverworld(event, "kubejs:ore_cinnabar", "thermal:cinnabar_ore", "minecraft:trapezoid", -16, 48, 3, 6, 0)
})
