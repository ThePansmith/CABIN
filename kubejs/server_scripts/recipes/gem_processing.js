ServerEvents.recipes(event => {
    let stone = Item.of(MC("cobblestone"), 1).withChance(.5)
    let experience = Item.of(CR("experience_nugget"), 1).withChance(0.75)

    event.recipes.createCrushing([Item.of("forbidden_arcanus:stellarite_piece", 1), Item.of("forbidden_arcanus:stellarite_piece", 1).withChance(.25), experience, stone], "forbidden_arcanus:stella_arcanum")
    event.recipes.createCrushing([Item.of("forbidden_arcanus:xpetrified_orb", 2), Item.of("forbidden_arcanus:xpetrified_orb", 1).withChance(.25), experience,stone], "forbidden_arcanus:xpetrified_ore")
    event.recipes.createCrushing([Item.of("forbidden_arcanus:arcane_crystal", 2), Item.of("forbidden_arcanus:arcane_crystal_dust", 1).withChance(.25), experience,stone], "forbidden_arcanus:arcane_crystal_ore")
    event.recipes.createCrushing([Item.of(TE("sapphire"), 2), Item.of(TE("sapphire"), 1).withChance(.25), experience,stone], TE("sapphire_ore"))
    event.recipes.createCrushing([Item.of(TE("ruby"), 2), Item.of(TE("ruby"), 1).withChance(.25), experience,stone], TE("ruby_ore"))

    event.recipes.createMilling(["4x " + MC("redstone")], TE("cinnabar")).processingTime(700)
    event.recipes.createCrushing(["6x " + MC("redstone")], TE("cinnabar")).processingTime(500)
    event.remove({ id: TE("machines/pulverizer/pulverizer_cinnabar") })
    thermalPulverizer(event, ["8x " + MC("redstone")], TE("cinnabar"), 10000)

    event.recipes.createMilling([TE("sulfur_dust")], F("#gems/sulfur")).processingTime(500)
    event.recipes.createMilling([TE("niter_dust")], F("#gems/niter")).processingTime(500)
    event.recipes.createMilling([TE("apatite_dust")], F("#gems/apatite")).processingTime(500)

    // recompacting gem dusts into their gem form
    let recompact = (id, id2) => {
        event.recipes.createCompacting(id2, [id])
    }
    recompact(F("#dusts/obsidian"), MC("obsidian"))
    recompact(F("#dusts/diamond"), MC("diamond"))
    recompact(F("#dusts/emerald"), MC("emerald"))
    recompact(F("#dusts/lapis"), MC("lapis_lazuli"))
    recompact(F("#dusts/sulfur"), TE("sulfur"))
    recompact(F("#dusts/apatite"), TE("apatite"))
    recompact(F("#dusts/niter"), TE("niter"))
    recompact(F("#dusts/sapphire"), TE("sapphire"))
    recompact(F("#dusts/ruby"), TE("ruby"))
    recompact(F("#dusts/arcane_crystal"), "forbidden_arcanus:arcane_crystal")
    recompact(F("#dusts/quartz"), MC("quartz"))
})
