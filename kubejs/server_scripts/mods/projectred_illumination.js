if (Platform.isLoaded("projectred_illumination")) {
    ServerEvents.recipes(event => {
        event.remove({ mod: "projectred_illumination" })
        let convert = (c, id) => {
            let lamp = `projectred_illumination:${c}${id}`
            let inverted = `projectred_illumination:${c}_inverted${id}`
            event.shapeless(inverted, [lamp])
            event.shapeless(lamp, [inverted])
        }

        event.shaped(Item.of("projectred_illumination:illumar_smart_lamp", 1), [
            " C ",
            "RGB",
            " S "
        ], {
            C: "#forge:glass/colorless",
            R: "projectred_core:red_illumar",
            G: "projectred_core:green_illumar",
            B: "projectred_core:blue_illumar",
            S: "minecraft:redstone"
        })

        colours.forEach(c => {
            event.shaped(Item.of(`projectred_illumination:${c}_illumar_lamp`, 1), [
                "G",
                "C",
                "S"
            ], {
                G: "#forge:glass/colorless",
                C: `projectred_core:${c}_illumar`,
                S: "minecraft:redstone"
            })

            event.stonecutting(Item.of(`projectred_illumination:${c}_fixture_light`, 4), `projectred_illumination:${c}_illumar_lamp`)
            event.stonecutting(Item.of(`projectred_illumination:${c}_fallout_light`, 4), `projectred_illumination:${c}_illumar_lamp`)
            event.stonecutting(Item.of(`projectred_illumination:${c}_lantern`, 4), `projectred_illumination:${c}_illumar_lamp`)
            event.stonecutting(Item.of(`projectred_illumination:${c}_cage_light`, 4), `projectred_illumination:${c}_illumar_lamp`)
            convert(c, "_illumar_lamp")
            convert(c, "_fallout_light")
            convert(c, "_lantern")
            convert(c, "_cage_light")
            convert(c, "_fixture_light")
        })
    })
}
