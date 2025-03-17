// priority: 1
ServerEvents.recipes(event => {
    // So many recipes that we don't want
    event.remove({ mod: "projectred_core" })

    // red alloy ingot
    event.custom({
        type: "create:compacting",
        ingredients: [
            { "item": MC("copper_ingot") },
            { "amount": 250, "fluid": TE("redstone"), "nbt": {} }
        ],
        results: [
            { "item": PR_C("red_ingot") }
        ]
    })
    event.custom({
        type: "create:compacting",
        ingredients: [
            { "item": MC("copper_ingot") },
            { "amount": 250, "fluid": TE("redstone"), "nbt": {} }
        ],
        results: [
            { "item": PR_C("red_ingot") }
        ]
    })
    thermalSmelter(event, PR_C("red_ingot"), [MC("copper_ingot"), MC("redstone")])

    // recreate the circuit plate smelting recipes
    event.smelting(PR_C("plate", 2), "minecraft:smooth_stone")
    // recreate illumar recipes
    colours.forEach(c=>{
        event.shapeless(PR_C(c + "_illumar"), [MC("glowstone_dust"), MC("glowstone_dust"), F("#dyes/" + c), F("#dyes/" + c)])
    })
    // recreate screwdriver recipe
    event.shaped(PR_C("screwdriver"), [
        "I  ",
        " IB",
        " BI"
    ], {
        I: F("#ingots/iron"),
        B: F("#dyes/blue")
    })

    // Platformed plate
    // The projectred transmission script replaces red ingot with red alloy wire
    event.shapeless(PR_C("platformed_plate"), [PR_C("plate"), PR_C("red_ingot"), CR("andesite_alloy")]).id("kubejs:platformed_plate_shapeless")
    // Circuit cutting. Projectred Transmission circuit recipes are added in the circuit script in the mods folder
    let circuit = (id, override) => {
        if (override)
            event.remove({ output: id })
        event.stonecutting(Item.of(id, 1), PR_C("platformed_plate"))
    }
    circuit(MC("repeater"), false)
    circuit(MC("comparator"), false)
    circuit(CR("pulse_repeater"), true)
    circuit(CR("pulse_extender"), true)
    circuit(CR("pulse_timer"), true)
    circuit(CR("powered_latch"), true)
    circuit(CR("powered_toggle_latch"), true)
})
