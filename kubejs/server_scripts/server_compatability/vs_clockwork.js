// Reccomended mods:
// Valkyrien Skies 2
// VLib
// Valkyrien Sails
// Clockwork
// Interactive
// Trackwork

// MUST ADD THIS LINE TO YOUR .MINECRAFT/CONFIG/LITHIUM.PROPERTIES:
// mixin.ai.poi=false
// IF YOU DO NOT, THE GAME WILL CRASH ON WORLD LOAD WITH InvalidInjectionException
if (Platform.isLoaded("vs_clockwork")) {
    ServerEvents.recipes(event => {
        event.replaceInput({ mod: "vs_clockwork" }, "vs_clockwork:nyx", "create:precision_mechanism")
        event.recipes.create.splashing(
            [Item.of("vs_clockwork:wanderlite_crystal").withChance(0.25)],
            "minecraft:clay"
        ).id("kubejs:splashing/wanderlite_crystal_from_clay")
    })

    ServerEvents.lowPriorityData(event => {
        removeFeature(event, "vs_clockwork:wanderlite_ore")
    })
}
