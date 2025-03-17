// priority: 1
ServerEvents.recipes(event => {
    // filter augment recipe change
    event.remove({ id: TE("augments/item_filter_augment") })
    event.shapeless(TE("item_filter_augment"), [CR("filter"), TE("lapis_gear")])
    // Augments that do nothing in 1.18.2
    event.remove({ id: TE("augments/rs_control_augment") })
    event.remove({ id: TE("augments/side_config_augment") })
    // Silver replacements
    event.replaceInput({ id: TE("augments/rf_coil_storage_augment") }, F("#ingots/silver"), F("#ingots/iron"))
    event.replaceInput({ id: TE("augments/rf_coil_xfer_augment") }, F("#ingots/silver"), F("#ingots/iron"))
    event.replaceInput({ id: TE("augments/rf_coil_augment") }, F("#ingots/silver"), F("#ingots/iron"))
    event.replaceInput({ id: TE("tools/detonator") }, F("#ingots/silver"), F("#ingots/lead"))
    // why are these even recipes?
    event.remove({ id: TE("lightning_charge/zombified_piglin_from_pig")})
    event.remove({ id: TE("lightning_charge/witch_from_villager")})
    // duplicate storage block recipes
    event.remove({ id: TE("storage/carrot_block") })
    event.remove({ id: TE("storage/potato_block") })
    event.remove({ id: TE("storage/beetroot_block") })
    // Obsidian pulverizing
    thermalPulverizer(event, [CR("powdered_obsidian")], F("#obsidian"), 7000)
    // Ender pearl pulverizing
    event.replaceOutput({ id: TE("machines/pulverizer/pulverizer_ender_pearl") }, TE("ender_pearl_dust"), AE2("ender_dust"))
    event.replaceOutput({ id: TE("earth_charge/ender_pearl_dust_from_ender_pearl") }, TE("ender_pearl_dust"), AE2("ender_dust"))
    // Bitumen crushing recipes
    event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("sand")).withChance(0.25)], TE("oil_sand"))
    event.recipes.createCrushing([Item.of(TE("bitumen")), Item.of(TE("bitumen"), 2).withChance(0.75), Item.of(TE("tar"), 1).withChance(0.75), Item.of(MC("red_sand")).withChance(0.25)], TE("oil_red_sand"))
    // ruby and sapphire block recipes
    let blockTemplate = [ "III", "III",	"III"	]
    event.shaped(TE("ruby_block", 1), blockTemplate, { I: F("#gems/ruby")	})
    event.shapeless(TE("ruby", 9), [F("#storage_blocks/ruby")])
    event.shaped(TE("sapphire_block", 1), blockTemplate, { I: F("#gems/sapphire")	})
    event.shapeless(TE("sapphire", 9), [F("#storage_blocks/sapphire")])
    // Make molten glass with the cruicible
    thermalCrucible(event, Fluid.of("tconstruct:molten_glass", 1000), F("#sand"), 6000)
    thermalCrucible(event, Fluid.of("tconstruct:molten_glass", 1000), F("#glass/colorless"), 3000)
    // Gourmand fuel recipes for farmer's delight crates
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": FD("carrot_crate")}, "energy": 48000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": FD("potato_crate")}, "energy": 16000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": FD("beetroot_crate")}, "energy": 16000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": FD("cabbage_crate")}, "energy": 32000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": FD("onion_crate")}, "energy": 32000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": FD("tomato_crate")}, "energy": 16000})
    // Igneous Extruder recipes
    let bedrock_cobblegen = (adjacent, output) => {
        event.custom({
            "type": "thermal:rock_gen",
            "adjacent": adjacent,
            "below": "minecraft:bedrock",
            "result": { "item": output }
        })
    }
    bedrock_cobblegen(MC("packed_ice"), MC("andesite"))
    bedrock_cobblegen(AP("polished_packed_ice"), MC("granite"))
    bedrock_cobblegen(AP("chiseled_packed_ice"), MC("diorite"))
    // Also add igneous extruder recipes for the 2 create stone gen recipes
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": "create:chocolate",
        "result": { "item": "create:scoria"}
    })
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": "create:honey",
        "result": { "item": "create:limestone"}
    })

    // thermal dynamics stuff
    // thermal dynamics might be split into a compatability mod eventually

    // Energy duct recipe change
    event.remove({ output: TE("energy_duct") })
    event.shaped("8x thermal:energy_duct", [ "PMP" ], {
        P: TE("invar_ingot"),
        M: MC("redstone")
    })

    // Thermal doesn't do compatibility anymore, so we have to port over recipes outselves.
    // Fortunately for us, we can make a script to automatically port casting recipes into chiller recipes.
    event.forEachRecipe([{ type: "tconstruct:casting_table" }], recipe => {
        // recipe.json gives us some info that the recipe object cannot give us
        let recipeJSON = JSON.parse(recipe.json)

        let inputCast;
        let inputFluid;
        let resultItem;

        // If the recipe is not a casting recipe then we don't want to port it
        if (!recipeJSON.cast) { return; }
        // We also don't want to port any recipes where the cast is consumed (sand casting recipes)
        if (recipeJSON.cast_consumed) { return }

        // Figure out what Thermal cast we should use based on the original tconstruct cast
        switch (recipeJSON.cast.tag) {
        case "tconstruct:casts/multi_use/ingot":
            inputCast = "thermal:chiller_ingot_cast";
            break;
        case "tconstruct:casts/multi_use/rod":
            inputCast = "thermal:chiller_rod_cast";
            break;
        default: return;
        }

        // Port the fluid ingredient
        if (recipeJSON.fluid.name) {
            inputFluid = {fluid:recipeJSON.fluid.name, amount:recipeJSON.fluid.amount};
        } else if (recipeJSON.fluid.tag) {
            inputFluid = {fluid_tag:recipeJSON.fluid.tag, amount:recipeJSON.fluid.amount};
        }

        // Unlike other recipes types, tconstruct recipes accept item tags as outputs.
        // Output items can be prioritised by mod in the Mantle server config.
        if (typeof recipeJSON.result === "string") {
            resultItem = {item:recipeJSON.result, count:1};
        } else {
            resultItem = {item:getPreferredItemFromTag(recipeJSON.result.tag), count:1};
        }

        // We don't want this recipe
        if (resultItem.item == "tconstruct:cheese_ingot") {return;}

        // Creating the ported recipe
        event.custom({
            type:"thermal:chiller",
            ingredients:[inputFluid, inputCast],
            result:[resultItem],
            energy:5000
        }).id(`kubejs:chiller/${recipe.getId().replace(":", "/")}`)
    })
    // Ball recipes aren't so easy to port so we'll just make them manually
    thermalChiller(event, MC("slime_ball"), [Fluid.of("tconstruct:earth_slime", 250), TE("chiller_ball_cast")], 5000).id("kubejs:chiller/slime_ball");
    thermalChiller(event, TC("sky_slime_ball"), [Fluid.of("tconstruct:sky_slime", 250), TE("chiller_ball_cast")], 5000).id("kubejs:chiller/sky_slime_ball");
    thermalChiller(event, TC("ender_slime_ball"), [Fluid.of("tconstruct:ender_slime", 250), TE("chiller_ball_cast")], 5000).id("kubejs:chiller/ender_slime_ball");
    thermalChiller(event, TC("blood_slime_ball"), [Fluid.of("tconstruct:blood", 250), TE("chiller_ball_cast")], 5000).id("kubejs:chiller/blood_slime_ball");

    // port melting recipes for dusts, ingots and gems
    const TICMETALS = [
        "aluminum",
        "amethyst_bronze",
        "brass",
        "bronze",
        "cobalt",
        "constantan",
        // "copper",
        "electrum",
        "enderium",
        // "gold",
        "hepatizon",
        "invar",
        // "iron",
        "knightslime",
        // "lead",
        "lumium",
        "manyullyn",
        "netherite",
        // "nickel",
        "osmium",
        "pewter",
        "pig_iron",
        "platinum",
        "queens_slime",
        "refined_glowstone",
        "refined_obsidian",
        "rose_gold",
        "signalum",
        "silver",
        "slimesteel",
        "soulsteel",
        "steel",
        "tin",
        "tungsten",
        "uranium"// ,
        // "zinc"
    ];
    const TICGEMS = [
        "diamond",
        "emerald",
        "quartz",
        "amethyst",
    ]

    TICMETALS.forEach(metal=>{
        if (Ingredient.of(`#forge:dusts/${metal}`).first != Item.empty) {
            event.custom({
                type:"thermal:crucible",
                ingredients:{tag: `forge:dusts/${metal}`},
                result:{fluid: `tconstruct:molten_${metal}`, amount: 90},
                energy:5000
            }).id(`kubejs:crucible/tconstruct/smeltery/melting/metal/${metal}/dust`)
        }
    })
    TICMETALS.concat(["copper", "gold", "iron", "lead", "nickel", "zinc"])
    TICMETALS.forEach(metal=>{
        if (Ingredient.of(`#forge:ingots/${metal}`).first != Item.empty) {
            event.custom({
                type:"thermal:crucible",
                ingredients:{tag: `forge:ingots/${metal}`},
                result:{fluid: `tconstruct:molten_${metal}`, amount: 90},
                energy:5000
            }).id(`kubejs:crucible/tconstruct/smeltery/melting/metal/${metal}/ingot`)
        }
    })
    TICGEMS.forEach(gem=>{
        if (Ingredient.of(`#forge:gems/${gem}`).first != Item.empty) {
            event.custom({
                type:"thermal:crucible",
                ingredients:{tag: `forge:gems/${gem}`},
                result:{fluid: `tconstruct:molten_${gem}`, amount: 100},
                energy:5000
            }).id(`kubejs:crucible/tconstruct/smeltery/melting/${gem}/gem`)
        }
    })
})

ServerEvents.lowPriorityData(event => {
    addChiselingRecipe(event, "kubejs:chiseling_recipes/thermal/beetroot_block", ["farmersdelight:beetroot_crate", "thermal:beetroot_block"])
    addChiselingRecipe(event, "kubejs:chiseling_recipes/thermal/carrot_block", ["farmersdelight:carrot_crate", "thermal:carrot_block"])
    addChiselingRecipe(event, "kubejs:chiseling_recipes/thermal/potato_block", ["farmersdelight:potato_crate", "thermal:potato_block"])
})
