ServerEvents.recipes(event => {
    // phantom membrane alternatives
    event.replaceInput({ id: "forbidden_arcanus:mundabitur_dust" }, MC("phantom_membrane"), TE("apatite_dust"))

    if(Platform.isLoaded("railways")) {
        event.recipes.createFilling("railways:track_phantom", [CR("track"), Fluid.of(CR("potion"), 50, '{Potion:"minecraft:invisibility"}')])
        event.recipes.createFilling("railways:track_phantom", [CR("track"), Fluid.of(CR("potion"), 50, '{Potion:"minecraft:long_invisibility"}')])
        event.recipes.createFilling("railways:track_phantom", [CR("track"), Fluid.of("cofh_core:potion", 50, '{Potion:"minecraft:invisibility"}')])
        event.recipes.createFilling("railways:track_phantom", [CR("track"), Fluid.of("cofh_core:potion", 50, '{Potion:"minecraft:long_invisibility"}')])
    }

    if(Platform.isLoaded("moreminecarts")) {
        event.shapeless("moreminecarts:levitation_powder", TE("blitz_powder"))
        event.recipes.createCrushing([Item.of("moreminecarts:levitation_powder"), Item.of("moreminecarts:levitation_powder", 1).withChance(.5)], TE("blitz_powder"))
    }
})

// alternate double jump recipe
ServerEvents.highPriorityData( event => {
    event.addJson("kubejs:recipes/tools/modifiers/ability/double_jump", {
        "type": "tconstruct:modifier",
        "inputs": [
            { "item": "minecraft:piston" },
            { "item": "tconstruct:sky_slime" },
            { "item": "minecraft:piston" },
            { "item": "tconstruct:sky_slime_bottle" },
            { "item": "tconstruct:sky_slime_bottle" }
        ],
        "tools": { "tag": "tconstruct:modifiable/armor/boots" },
        "slots": { "abilities": 1 },
        "allow_crystal": true,
        "result": { "name": "tconstruct:double_jump", "level": 1 }
    })
})
// slow fall potion is in startup script potions.js

ServerEvents.loaded(event=>{
    if (!event.server.persistentData.insomniaDisabled) {
        event.server.runCommandSilent("/gamerule doInsomnia false")
        event.server.persistentData.insomniaDisabled = true;
    }
})
