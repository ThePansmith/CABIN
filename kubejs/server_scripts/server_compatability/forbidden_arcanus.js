// Not loaded by default anymore.
if(Platform.isLoaded("forbidden_arcanus")) {
    unregistered_axes.push("forbidden_arcanus:draco_arcanus_axe")
    unregistered_axes.push("forbidden_arcanus:arcane_golden_axe")
    unregistered_axes.push("forbidden_arcanus:reinforced_arcane_golden_axe")

    wood_types.push("forbidden_arcanus:fungyss")
    wood_types.push("forbidden_arcanus:aurum")
    wood_types.push("forbidden_arcanus:edelwood")
    ServerEvents.recipes(event => {
        event.remove({ id: "forbidden_arcanus:edelwood_bucket" })

        event.remove({ id: "forbidden_arcanus:edelwood_stick" })
        event.shaped("3x forbidden_arcanus:edelwood_stick", [
            "S",
            "A",
            "S"
        ], {
            S: "forbidden_arcanus:edelwood_planks",
            A: MC("stick")
        })
        // Eternal stella
        event.remove({ id: "forbidden_arcanus:eternal_stella" })
        event.shaped("forbidden_arcanus:eternal_stella", [
            "PEP",
            "SDS",
            "PEP"
        ], {
            P: "forbidden_arcanus:xpetrified_orb",
            E: "minecraft:emerald",
            S: "forbidden_arcanus:stellarite_piece",
            D: "rubber_duck:rubber_duck_item"
        })
    })
    // Hephaestus forge recipes can only be modified using datapacks

    // ServerEvents.highPriorityData(event => {
    //     event.addJson("forbidden_arcanus:hephaestus_forge/rituals/eternal_stella", {})
    //     event.addJson("kubejs:hephaestus_forge/rituals/eternal_stella", {
    //         "inputs": [
    //             { "item": "forbidden_arcanus:xpetrified_orb", "slot": 0 },
    //             { "item": "forbidden_arcanus:xpetrified_orb", "slot": 1 },
    //             {	"item": "minecraft:emerald", "slot": 2 },
    //             { "item": "forbidden_arcanus:xpetrified_orb", "slot": 4 },
    //             { "item": "forbidden_arcanus:stellarite_piece", "slot": 5 }
    //         ],
    //         "hephaestus_forge_item": "rubber_duck:rubber_duck_item",
    //         "essences": { "aureal": 82, "blood": 1000, "souls": 1},
    //         "result": {	"item": "forbidden_arcanus:eternal_stella", "count": 1 }
    //     })
    // })
}
