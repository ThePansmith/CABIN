// priority: 1

wood_types.push("thermal:rubberwood")
ServerEvents.recipes(event => {
    // filter augment recipe change
    event.remove({ id: "thermal:augments/item_filter_augment" })
    event.shapeless("thermal:item_filter_augment", ["create:filter", "thermal:lapis_gear"])
    // Augments that do nothing in 1.18.2
    event.remove({ id: "thermal:augments/rs_control_augment" })
    event.remove({ id: "thermal:augments/side_config_augment" })
    // Silver replacements
    event.replaceInput({ id: "thermal:augments/rf_coil_storage_augment" }, "#forge:ingots/silver", "#forge:ingots/iron")
    event.replaceInput({ id: "thermal:augments/rf_coil_xfer_augment" }, "#forge:ingots/silver", "#forge:ingots/iron")
    event.replaceInput({ id: "thermal:augments/rf_coil_augment" }, "#forge:ingots/silver", "#forge:ingots/iron")
    event.replaceInput({ id: "thermal:tools/detonator" }, "#forge:ingots/silver", "#forge:ingots/lead")
    // why are these even recipes?
    event.remove({ id: "thermal:lightning_charge/zombified_piglin_from_pig"})
    event.remove({ id: "thermal:lightning_charge/witch_from_villager"})
    // duplicate storage block recipes
    event.remove({ id: "thermal:storage/carrot_block" })
    event.remove({ id: "thermal:storage/potato_block" })
    event.remove({ id: "thermal:storage/beetroot_block" })
    // Obsidian pulverizing
    event.recipes.thermal.pulverizer(["create:powdered_obsidian"], "#forge:obsidian", 0, 8000)
    // Ender pearl pulverizing
    event.replaceOutput({ id: "thermal:machines/pulverizer/pulverizer_ender_pearl" }, "thermal:ender_pearl_dust", "ae2:ender_dust")
    event.replaceOutput({ id: "thermal:earth_charge/ender_pearl_dust_from_ender_pearl" }, "thermal:ender_pearl_dust", "ae2:ender_dust")
    // Bitumen crushing recipes
    event.recipes.create.crushing([Item.of("thermal:bitumen"), Item.of("thermal:bitumen", 2).withChance(0.75), Item.of("thermal:tar", 1).withChance(0.75), Item.of("minecraft:sand").withChance(0.25)], "thermal:oil_sand")
    event.recipes.create.crushing([Item.of("thermal:bitumen"), Item.of("thermal:bitumen", 2).withChance(0.75), Item.of("thermal:tar", 1).withChance(0.75), Item.of("minecraft:red_sand").withChance(0.25)], "thermal:oil_red_sand")
    // ruby and sapphire block recipes
    let blockTemplate = [ "III", "III",	"III"	]
    event.shaped(Item.of("thermal:ruby_block", 1), blockTemplate, { I: "#forge:gems/ruby"})
    event.shapeless(Item.of("thermal:ruby", 9), ["#forge:storage_blocks/ruby"])
    event.shaped(Item.of("thermal:sapphire_block", 1), blockTemplate, { I: "#forge:gems/sapphire"})
    event.shapeless(Item.of("thermal:sapphire", 9), ["#forge:storage_blocks/sapphire"])
    // Ruby and sapphire dusts from pulverizing
    event.recipes.thermal.pulverizer("thermal:sapphire_dust", "thermal:sapphire", 0, 4000)
    event.recipes.thermal.pulverizer("thermal:ruby_dust", "thermal:ruby", 0, 4000)
    // Ruby and sapphire dusts from earth charges
    event.shapeless(Item.of("thermal:ruby_dust"), ["#forge:gems/ruby", "thermal:earth_charge"])
    event.shapeless(Item.of("thermal:sapphire_dust"), ["#forge:gems/sapphire", "thermal:earth_charge"])
    // Make molten glass with the cruicible
    event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), "#forge:sand", 0, 6000)
    event.recipes.thermal.crucible(Fluid.of("tconstruct:molten_glass", 1000), "#forge:glass/colorless", 0, 3000)
    // Gourmand fuel recipes for farmer's delight crates
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": "farmersdelight:carrot_crate"}, "energy": 48000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": "farmersdelight:potato_crate"}, "energy": 16000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": "farmersdelight:beetroot_crate"}, "energy": 16000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": "farmersdelight:cabbage_crate"}, "energy": 32000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": "farmersdelight:onion_crate"}, "energy": 32000})
    event.custom({"type": "thermal:gourmand_fuel", "ingredient": {"item": "farmersdelight:tomato_crate"}, "energy": 16000})
    // Fix broken cinnabar recipes
    event.replaceInput(
    { input: "thermal:cinnabar_ore" },
    'thermal:cinnabar_ore',
    "#forge:ores/cinnabar"
    )

    // Igneous Extruder recipes
    let bedrock_cobblegen = (adjacent, output) => {
        event.custom({
            "type": "thermal:rock_gen",
            "adjacent": adjacent,
            "below": "minecraft:bedrock",
            "result": { "item": output }
        })
    }
    bedrock_cobblegen("minecraft:packed_ice", "minecraft:andesite")
    bedrock_cobblegen("architects_palette:polished_packed_ice", "minecraft:granite")
    bedrock_cobblegen("architects_palette:chiseled_packed_ice", "minecraft:diorite")
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
    event.remove({ output: "thermal:energy_duct" })
    event.shaped("8x thermal:energy_duct", [ "PMP" ], {
        P: "thermal:invar_ingot",
        M: "minecraft:redstone"
    })

    // Remove existing insolator flower recipes since we're adding them back anyways
    event.remove({ type: "thermal:insolator", input: "#minecraft:flowers", not:{ input:"#minecraft:saplings" } })

    Ingredient.of("#minecraft:flowers").itemIds.forEach(flower => {
        // Automatically adds all flowers as thermal insolator recipes. We're blacklisting special cases like leaves and saplings which are occasionally tagged as flowers for some reason
        if( !( Ingredient.of("#minecraft:saplings").test(flower) || Ingredient.of("#minecraft:leaves").test(flower) ) ) {
            event.custom({
                "type": "thermal:insolator",
                "ingredient": {
                    "item": flower
                },
                "result": [
                    {
                        "item": flower,
                        "chance": 2
                    }
                ],
                "experience": 0
            })
        }
    })

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
        // "tin",
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
            }).id(`kubejs:crucible/${metal}/dust`)
        }
    })
    TICMETALS.concat(["copper", "gold", "iron", "lead", "nickel", "zinc"]).forEach(metal=>{
        let ingotTag = `forge:ingots/${metal}`
        let rodTag = `forge:rods/${metal}`

        let fluid = `tconstruct:molten_${metal}`

        if (Ingredient.of("#" + ingotTag).first != Item.empty) {
            event.recipes.thermal.crucible(Fluid.of(fluid, 90), "#" + ingotTag, 0, 5000).id(`kubejs:crucible/${metal}/ingot`)

            event.recipes.thermal.chiller(getPreferredItemFromTag(ingotTag), [Fluid.of(fluid, 90), "thermal:chiller_ingot_cast"]).id(`kubejs:chiller/${metal}/ingot`)
        }
        if (Ingredient.of("#" + rodTag).first != Item.empty) {
            event.recipes.thermal.chiller(getPreferredItemFromTag(rodTag), [Fluid.of(fluid, 45), "thermal:chiller_rod_cast"]).id(`kubejs:chiller/${metal}/rod`)
        }
    })
    TICGEMS.forEach(gem=>{
        let gemTag = `forge:gems/${gem}`

        let fluid = `tconstruct:molten_${gem}`

        if (Ingredient.of(`#forge:gems/${gem}`).first != Item.empty) {
            event.recipes.thermal.crucible(Fluid.of(fluid, 100), "#" + gemTag, 0, 5000).id(`kubejs:crucible/${gem}/gem`)
        }
    })

    const OTHER_INGOTS = [
        {name: "brick", fluid: "tconstruct:molten_clay"},
        {name: "seared_brick", fluid: "tconstruct:seared_stone"},
        {name: "scorched_brick", fluid: "tconstruct:scorched_stone"},
        {name: "netherite_scrap", fluid: "tconstruct:molten_debris"}
    ]
    OTHER_INGOTS.forEach(material=>{
        let name = material.name
        let ingotTag = "forge:ingots/" + material.name
        let fluid = material.fluid

        if (Ingredient.of("#" + ingotTag).first != Item.empty) {
            event.recipes.thermal.crucible(Fluid.of(fluid, 90), "#" + ingotTag, 0, 5000).id(`kubejs:crucible/${name}`)

            event.recipes.thermal.chiller(getPreferredItemFromTag(ingotTag), [Fluid.of(fluid, 90), "thermal:chiller_ingot_cast"]).id(`kubejs:chiller/${name}`)
        }
    })

    // Ball recipes
    event.recipes.thermal.chiller("minecraft:slime_ball", [Fluid.of("tconstruct:earth_slime", 250), "thermal:chiller_ball_cast"]).id("kubejs:chiller/slime_ball");
    event.recipes.thermal.chiller("tconstruct:sky_slime_ball", [Fluid.of("tconstruct:sky_slime", 250), "thermal:chiller_ball_cast"]).id("kubejs:chiller/sky_slime_ball");
    event.recipes.thermal.chiller("tconstruct:ender_slime_ball", [Fluid.of("tconstruct:ender_slime", 250), "thermal:chiller_ball_cast"]).id("kubejs:chiller/ender_slime_ball");
    event.recipes.thermal.chiller("tconstruct:blood_slime_ball", [Fluid.of("tconstruct:blood", 250), "thermal:chiller_ball_cast"]).id("kubejs:chiller/blood_slime_ball");
})


ServerEvents.lowPriorityData(event => {
    addChiselingRecipe(event, "kubejs:chiseling_recipes/thermal/beetroot_block", ["farmersdelight:beetroot_crate", "thermal:beetroot_block"])
    addChiselingRecipe(event, "kubejs:chiseling_recipes/thermal/carrot_block", ["farmersdelight:carrot_crate", "thermal:carrot_block"])
    addChiselingRecipe(event, "kubejs:chiseling_recipes/thermal/potato_block", ["farmersdelight:potato_crate", "thermal:potato_block"])
})
