// By the way, this mod also lets you decorate you cogwheels with wood variants and metals.
// Shaftless cogwheels isn't the only thing this mod adds.
if (Platform.isLoaded("extendedgears")) {
    ServerEvents.recipes(event => {
        event.remove({ mod: "extendedgears" }) // The default recipes from this mod are pretty disgusting
        let pattern = ["S","G"];
        let cogCutting = [
            ["create:cogwheel", "extendedgears:half_shaft_cogwheel", "extendedgears:shaftless_cogwheel"],
            ["create:large_cogwheel", "extendedgears:large_half_shaft_cogwheel", "extendedgears:large_shaftless_cogwheel"]
        ]
        cogCutting.forEach(cogs=>{
            for (let i = 1;i < cogs.length;++i) {
                event.shaped(cogs[i], pattern, {
                    S: "#kubejs:saws",
                    G: cogs[i - 1]
                })
                event.recipes.createCutting(cogs[i], cogs[i - 1]).processingTime(150)
            }
        })

        // There already are exploits to restore half cogs back to full.
        // Here's a qol recipe to craft them back to full cogwheels.
        event.shapeless("create:cogwheel", "#c:cogwheel/small")
        event.shapeless("create:large_cogwheel", "#c:cogwheel/large")
    })
}
