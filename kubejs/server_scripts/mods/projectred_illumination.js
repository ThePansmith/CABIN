const PR_I = (id, x) => MOD("projectred_illumination", id, x)
if (Platform.isLoaded("projectred_illumination")) {
    ServerEvents.recipes(event => {
        event.remove({ mod: "projectred_illumination" })
        let convert = (c, id) => {
            event.shapeless(PR_I(c + "_inverted" + id), [PR_I(c + id)])
            event.shapeless(PR_I(c + id), [PR_I(c + "_inverted" + id)])
        }

        colours.forEach(c => {
            event.shaped(PR_I(c + "_illumar_lamp", 1), [
                "G",
                "C",
                "S"
            ], {
                G: F("#glass/colorless"),
                C: PR_C(c + "_illumar"),
                S: MC("redstone")
            })

            event.stonecutting(PR_I(c + "_fixture_light", 4), PR_I(c + "_illumar_lamp"))
            event.stonecutting(PR_I(c + "_fallout_light", 4), PR_I(c + "_illumar_lamp"))
            event.stonecutting(PR_I(c + "_lantern", 4), PR_I(c + "_illumar_lamp"))
            event.stonecutting(PR_I(c + "_cage_light", 4), PR_I(c + "_illumar_lamp"))
            convert(c, "_illumar_lamp")
            convert(c, "_fallout_light")
            convert(c, "_lantern")
            convert(c, "_cage_light")
            convert(c, "_fixture_light")
        })
    })
}
