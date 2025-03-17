// priority: 1
ServerEvents.recipes(event => {
    // casing recipe changes
    let tweak_casing = (name, mats, mod) => {
        event.remove({ output: mod(name + "_casing") })
        event.shapeless(Item.of(mod(name + "_casing"), 2), mats)
    }
    tweak_casing("andesite", [CR("andesite_alloy"), "#minecraft:logs"], CR)
    tweak_casing("copper", [CR("copper_sheet"), "#minecraft:logs"], CR)
    tweak_casing("railway", [CR("golden_sheet"), "minecraft:deepslate"], CR)
    tweak_casing("brass", [CR("brass_sheet"), "#minecraft:logs"], CR)
    tweak_casing("zinc", [CR("zinc_ingot"), "minecraft:stone"], KJ)
    tweak_casing("lead", [TE("lead_plate"), "minecraft:deepslate"], KJ)
    tweak_casing("invar", [TE("invar_plate"), "minecraft:stone"], KJ)
    tweak_casing("enderium", [MC("ender_pearl"), "minecraft:obsidian"], KJ)
    tweak_casing("fluix", [TE("lead_plate"), "minecraft:blackstone"], KJ)
    // tweak_casing('steel', [AL('steel_sheet'), '#minecraft:logs'], AL)
    tweak_casing("refined_radiance", [CR("refined_radiance"), "#minecraft:logs"], CR)
    tweak_casing("shadow_steel", [CR("shadow_steel"), "#minecraft:logs"], CR)
    // recipe changes
    event.replaceInput({ id: CR("crafting/kinetics/adjustable_chain_gearshift") }, CR("electron_tube"), MC("redstone"))
    event.replaceInput({ id: CR("crafting/kinetics/rope_pulley") }, "#forge:wool", "#supplementaries:ropes")
    // windmill recipe tweaks
    event.remove({ id: CR("crafting/kinetics/white_sail") })
    event.shaped("2x create:white_sail", [
        "SSS",
        "NAN",
        "SSS"
    ], {
        A: "#forge:wool",
        N: "minecraft:iron_nugget",
        S: "minecraft:stick"
    })
    // tweak obsidian crushing recipe
    event.remove({ id: CR("crushing/obsidian") })
    event.recipes.createCrushing(CR("powdered_obsidian"), MC("obsidian"))
    // recompacting obsidian dust into its resource
    event.recipes.createCompacting(F("#dusts/obsidian"), MC("obsidian"))

    // Gravel and red sand washing buffs
    event.remove({ id: CR("splashing/gravel") })
    event.recipes.createSplashing([
        Item.of(MC("iron_nugget", 2)).withChance(0.125),
        Item.of(MC("flint")).withChance(0.25)
    ], "minecraft:gravel")

    event.remove({ id: CR("splashing/red_sand") })
    event.recipes.createSplashing([
        Item.of(MC("gold_nugget", 2)).withChance(0.125),
        Item.of(MC("dead_bush")).withChance(0.05)
    ], "minecraft:red_sand")
})
