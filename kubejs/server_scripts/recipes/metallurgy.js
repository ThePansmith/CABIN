// priority: 10
// This script is important and needs to run early on.

// Redstone, silver and tin do not exist in A&B and we need a bit of scripting to remove them
ServerEvents.recipes(event => {
    event.remove({ output: "#forge:nuggets/tin" })
    event.remove({ output: "#forge:ingots/tin" })
    event.remove({ output: "#forge:storage_blocks/tin" })
    event.remove({ output: "#forge:plates/tin" })
    event.remove({ output: "#forge:gears/tin" })

    // metal replacements
    event.replaceInput({ type: "minecraft:crafting_shaped" }, "#forge:ingots/tin", F("#ingots/zinc"))
    event.replaceInput({}, "#forge:gears/tin", F("#gears/lead"))

    event.replaceInput({}, "#forge:plates/bronze", F("#plates/nickel"))
    event.replaceInput({}, "#forge:gears/bronze", F("#gears/nickel"))

    event.replaceInput({}, "#forge:plates/silver", F("#ingots/invar"))
    event.replaceInput({}, "#forge:gears/silver", F("#gears/invar"))

    event.replaceInput({}, "#forge:plates/constantan", F("#plates/signalum"))
    event.replaceInput({}, "#forge:gears/constantan", F("#gears/signalum"))

    event.replaceInput({}, "#forge:ingots/electrum", F("#ingots/constantan"))
    event.replaceInput({}, "#forge:plates/electrum", F("#plates/constantan"))
    event.replaceInput({}, "#forge:gears/electrum", F("#gears/constantan"))

    event.replaceInput({}, "#forge:plates/invar", F("#ingots/invar"))

    // fix recipes broken by replacement
    event.remove( {id: TE("machines/pulverizer/pulverizer_invar_plate_to_dust") })
    event.replaceInput({ id: TE("machines/pulverizer/pulverizer_silver_plate_to_dust") }, TE("invar_ingot"), "#forge:plates/silver")
    event.replaceInput({ id: TE("machines/pulverizer/pulverizer_bronze_plate_to_dust") }, TE("nickel_plate"), "#forge:plates/bronze")
    event.replaceInput({ id: TE("machines/pulverizer/pulverizer_constantan_plate_to_dust") }, TE("signalum_plate"), "#forge:plates/constantan")
    event.replaceInput({ id: TE("machines/pulverizer/pulverizer_electrum_plate_to_dust") }, TE("constantan_plate"), "#forge:plates/electrum")

    event.remove( {id: TE("machines/smelter/smelter_invar_plate_to_ingot") })
    event.replaceInput({ id: TE("machines/smelter/smelter_silver_plate_to_ingot") }, TE("invar_ingot"), "#forge:plates/silver")
    event.replaceInput({ id: TE("machines/smelter/smelter_bronze_plate_to_ingot") }, TE("nickel_plate"), "#forge:plates/bronze")
    event.replaceInput({ id: TE("machines/smelter/smelter_constantan_plate_to_ingot") }, TE("signalum_plate"), "#forge:plates/constantan")
    event.replaceInput({ id: TE("machines/smelter/smelter_electrum_plate_to_ingot") }, TE("constantan_plate"), "#forge:plates/electrum")

    event.replaceInput({ id: TE("storage/electrum_nugget_from_ingot") }, TE("constantan_ingot"), "#forge:ingots/electrum")
    event.replaceInput({ id: TE("storage/electrum_block") }, TE("constantan_ingot"), "#forge:ingots/electrum")
    event.replaceInput({ id: TE("parts/electrum_gear") }, TE("constantan_ingot"), "#forge:ingots/electrum")
    event.replaceInput({ id: OC("crushing/electrum_dust_from_ingot") }, TE("constantan_ingot"), "#forge:ingots/electrum")
    event.replaceInput({ id: TE("machines/pulverizer/pulverizer_electrum_ingot_to_dust") }, TE("constantan_ingot"), "#forge:ingots/electrum")

    // Redstone exists in jei to provide a tooltip, we want to remove all of its recipes
    event.remove({ input: "#forge:ores/redstone" })
})

// Tweaks for the metals that we actually want
ServerEvents.recipes(event => {

    // Thermal recipes for zinc
    thermalPulverizer(event, [KJ("zinc_dust")], F("#ingots/zinc"), 2000)
    thermalPulverizer(event, [KJ("zinc_dust")], F("#plates/zinc"), 2000)
    thermalSmelter(event, [CR("zinc_ingot")], F("#plates/zinc"), 1600)

    // use dust instead of raw ore for occultism recipes
    event.replaceInput({ id: OC("ritual/summon_djinni_crusher") }, "#forge:dusts/silver", KJ("zinc_dust"))
    event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, "#forge:raw_materials/silver", KJ("zinc_dust"))
    event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, "#forge:raw_materials/iron", TE("iron_dust"))
    event.replaceInput({ id: OC("ritual/craft_miner_foliot_unspecialized") }, "#forge:raw_materials/iron", TE("iron_dust"))
    event.replaceInput({ id: OC("ritual/craft_miner_djinni_ores") }, "#forge:raw_materials/gold", TE("gold_dust"))

    event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, "#forge:raw_materials/copper", TE("copper_dust"))
    event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, "#forge:raw_materials/gold", TE("gold_dust"))

    // Thermal's fire charge ingot crafting recipes. We don't want them
    event.remove({ id: TE("fire_charge/invar_ingot_3") })
    event.remove({ id: TE("fire_charge/enderium_ingot_2") })
    event.remove({ id: TE("fire_charge/constantan_ingot_2") })
    event.remove({ id: TE("fire_charge/bronze_ingot_4") })
    event.remove({ id: TE("fire_charge/electrum_ingot_2") })
    event.remove({ id: TE("fire_charge/lumium_ingot_4") })
    event.remove({ id: TE("fire_charge/signalum_ingot_4") })

    // Duplicate Recipes
    event.remove({ id: TE("storage/silver_block")})
    event.remove({ id: TE("storage/silver_ingot_from_block")})
    event.remove({ id: TE("storage/silver_ingot_from_nuggets")})
    event.remove({ id: TE("storage/silver_nugget_from_ingot")})
    event.remove({ id: TE("smelting/silver_ingot_from_dust_smelting")})
    event.remove({ id: TE("smelting/silver_ingot_from_dust_blasting")})

    event.remove({ id: TE("storage/copper_nugget_from_ingot")})
    event.remove({ id: TC("common/materials/copper_nugget_from_ingot")})
    event.remove({ id: TE("storage/copper_ingot_from_nuggets")})
    event.remove({ id: TC("common/materials/copper_ingot_from_nuggets")})

    event.remove({ id: TE("storage/netherite_nugget_from_ingot")})
    event.remove({ id: TC("common/materials/netherite_nugget_from_ingot")})
    event.remove({ id: TE("storage/netherite_ingot_from_nuggets")})
    event.remove({ id: TC("common/materials/netherite_ingot_from_nuggets")})

    // Remove unwanted Alloying recipes
    event.remove({ id: CR("mixing/brass_ingot") })
    event.remove({id: /centrifuge_bronze_dust/})
    // smeltery
    event.remove({ id: TC("smeltery/alloys/molten_bronze") })
    event.remove({ id: TC("smeltery/alloys/molten_brass") })
    event.remove({ id: TC("smeltery/alloys/molten_invar") })
    event.remove({ id: TC("smeltery/alloys/molten_electrum") })
    event.remove({ id: TC("smeltery/alloys/molten_constantan") })
    event.remove({ id: TC("smeltery/alloys/molten_rose_gold") })
    event.remove({ id: TC("smeltery/alloys/molten_enderium") })
    event.remove({ id: TC("smeltery/alloys/molten_lumium") })
    event.remove({ id: TC("smeltery/alloys/molten_signalum") })
    // alloy smelter
    event.remove({ id: TE("machines/smelter/smelter_alloy_signalum") })
    event.remove({ id: TE("machines/smelter/smelter_alloy_lumium") })
    event.remove({ id: TE("machines/smelter/smelter_alloy_enderium") })
    event.remove({ id: TE("machines/smelter/smelter_alloy_invar") })
    event.remove({ id: TE("machines/smelter/smelter_alloy_bronze") })
    event.remove({ id: TE("compat/create/smelter_create_alloy_brass") })
    event.remove({ id: TE("compat/tconstruct/smelter_alloy_tconstruct_rose_gold_ingot") })
    // thermal handcrafting
    event.remove({ type: MC("crafting_shapeless"), output: TE("constantan_dust") })
    event.remove({ type: MC("crafting_shapeless"), output: TE("electrum_dust") })
    event.remove({ type: MC("crafting_shapeless"), output: TE("lumium_dust") })
    event.remove({ type: MC("crafting_shapeless"), output: TE("signalum_dust") })
    event.remove({ type: MC("crafting_shapeless"), output: TE("enderium_dust") })
    event.remove({ type: MC("crafting_shapeless"), output: TE("bronze_dust") })
    event.remove({ type: MC("crafting_shapeless"), output: TE("invar_dust") })

    // Create new alloying recipes
    // mixing alloys
    let moltenAlloy = function (fluidAlloy, fluid1, fluid2) {
        // Recipe ids are actually important here since the id that comes later in alphabetical order is the one that is prioritized
        event.custom({
            "type": "create:mixing",
            "ingredients": [
                { "amount": 2, "fluid": fluid1 },
                { "amount": 2, "fluid": fluid2 }
            ],
            "results": [
                { "amount": 2, "fluid": TC(fluidAlloy) }
            ],
            processingTime: 1
        }).id(`kubejs:mixing/${fluidAlloy}_2`)
    }
    moltenAlloy("molten_brass", TC("molten_copper"), TC("molten_zinc"))
    moltenAlloy("molten_constantan", TC("molten_copper"), TC("molten_nickel"))
    moltenAlloy("molten_rose_gold", TC("molten_copper"), TC("molten_gold"))
    moltenAlloy("molten_electrum", TC("molten_silver"), TC("molten_gold"))
    // alloy smelter recipes
    thermalSmelter(event, CR("brass_ingot", 2), [MC("copper_ingot"), CR("zinc_ingot")])
    thermalSmelter(event, TC("rose_gold_ingot", 2), [MC("copper_ingot"), MC("gold_ingot")])
    // fix existing alloy smelter recipes to not accept dust
    event.replaceInput({ id: TE("machines/smelter/smelter_alloy_constantan")}, F("#dusts/copper"), MC("copper_ingot"))
    event.replaceInput({ id: TE("machines/smelter/smelter_alloy_constantan")}, F("#dusts/nickel"), TE("nickel_ingot"))
    event.replaceInput({ id: TE("machines/smelter/smelter_alloy_electrum")}, F("#dusts/gold"), MC("gold_ingot"))
    event.replaceInput({ id: TE("machines/smelter/smelter_alloy_electrum")}, F("#dusts/silver"), TE("silver_ingot"))
    event.replaceInput({ id: TE("machines/smelter/smelter_alloy_netherite")}, F("#dusts/gold"), MC("gold_ingot"))
    // bronze
    thermalSmelter(event, "3x thermal:bronze_ingot", [MC("copper_ingot", 3), "#forge:sand"])

    // Nickel Compound
    event.shapeless(KJ("nickel_compound"), [TE("nickel_ingot"), TE("iron_dust"), TE("iron_dust"), TE("iron_dust"), TE("iron_dust")])
    thermalSmelter(event, [KJ("invar_compound"), KJ("invar_compound")], [TE("nickel_ingot"), MC("iron_ingot")])
    // Invar Compound
    event.blasting(KJ("invar_compound"), KJ("nickel_compound"))
    { // Invar ingots
        let s = KJ("invar_compound")
        event.recipes.createSequencedAssembly([
            TE("invar_ingot"),
        ], KJ("invar_compound"), [
            event.recipes.createPressing(s, s)
        ]).transitionalItem(s)
            .loops(16)
            .id("kubejs:invar")
    }

    // smeltery alloys
    event.custom({
        "type": "tconstruct:alloy",
        "inputs": [
            { "name": "tconstruct:molten_silver", "amount": 90 },
            { "name": "tconstruct:molten_copper", "amount": 90 },
            { "name": "thermal:redstone", "amount": 1000 }
        ],
        "result": {
            "fluid": "tconstruct:molten_signalum",
            "amount": 90
        },
        "temperature": 1000
    })
    event.custom({
        "type": "tconstruct:alloy",
        "inputs": [
            { "name": "tconstruct:molten_silver", "amount": 90 },
            { "name": "tconstruct:molten_copper", "amount": 90 },
            { "name": "thermal:glowstone", "amount": 1000 }
        ],
        "result": {
            "fluid": "tconstruct:molten_lumium",
            "amount": 90
        },
        "temperature": 1000
    })
    event.custom({
        "type": "tconstruct:alloy",
        "inputs": [
            { "name": "tconstruct:molten_copper", "amount": 270 },
            { "name": "tconstruct:molten_glass", "amount": 1000 }
        ],
        "result": {
            "fluid": "tconstruct:molten_bronze",
            "amount": 270
        },
        "temperature": 1000
    })

    // Thermal alloys
    event.custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid": "thermal:glowstone",
            "amount": 1000
        },
        "result": [
            {
                "item": "thermal:lumium_ingot"
            }
        ],
        "energy": 2000
    })

    event.custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid": "thermal:redstone",
            "amount": 1000
        },
        "result": [
            {
                "item": "thermal:signalum_ingot"
            }
        ],
        "energy": 2000
    })

    // Plates
    event.recipes.createPressing([TE("lead_plate")], TE("lead_ingot"))
    event.recipes.createPressing([TE("constantan_plate")], TE("constantan_ingot"))
    event.recipes.createPressing([TE("nickel_plate")], TE("nickel_ingot"))
    event.recipes.createPressing([TE("signalum_plate")], TE("signalum_ingot"))
    event.recipes.createPressing([TE("lumium_plate")], TE("lumium_ingot"))
    event.recipes.createPressing([TE("enderium_plate")], TE("enderium_ingot"))

    // dusts
    event.recipes.createMilling(TE("iron_dust"), F("#ingots/iron"))
    event.recipes.createMilling(TE("gold_dust"), F("#ingots/gold"))
    event.recipes.createMilling(TE("nickel_dust"), F("#ingots/nickel"))
    event.recipes.createMilling(TE("lead_dust"), F("#ingots/lead"))
    event.recipes.createMilling(TE("copper_dust"), F("#ingots/copper"))
    event.recipes.createMilling(KJ("zinc_dust"), F("#ingots/zinc"))
    // occultism crushing unification
    event.replaceOutput({ id: OC("crushing/iron_dust_from_ingot") }, OC("iron_dust"), TE("iron_dust"))
    event.replaceOutput({ id: OC("crushing/gold_dust_from_ingot") }, OC("gold_dust"), TE("gold_dust"))
    event.replaceOutput({ type: OC("crushing") }, OC("copper_dust"), TE("copper_dust"))
    event.replaceOutput({ type: OC("crushing") }, OC("iron_dust"), TE("iron_dust"))
    event.replaceOutput({ type: OC("crushing") }, OC("gold_dust"), TE("gold_dust"))
    event.replaceOutput({ type: OC("crushing") }, OC("silver_dust"), TE("silver_dust"))

    // other metal unification
    event.replaceOutput({}, "#forge:ingots/silver", TE("silver_ingot"))
    event.replaceOutput({}, "#forge:ingots/bronze", "thermal:bronze_ingot")
    event.replaceOutput({ id:OC("crafting/silver_block")}, "#forge:storage_blocks/silver", TE("silver_block"))

    // Ore processing
    event.remove({ id: /thermal:machines\/smelter\/.*dust/ })
    event.remove({ id: /tconstruct:smeltery\/.*\/ore/ })
    event.remove({ input: "#create:crushed_raw_materials" })

    native_metals.forEach(e => {
        event.remove({ type: MC("smelting"), input: F("#dusts/" + e) })
        event.remove({ type: MC("blasting"), input: F("#dusts/" + e) })
        event.remove({ type: TC("melting"), input: F("#dusts/" + e) })
    })
    event.remove({ id: TE("smelting/silver_ingot_from_dust_smelting")})
    event.remove({ id: TE("smelting/silver_ingot_from_dust_blasting")})

    const stone = Item.of(MC("cobblestone"), 1).withChance(.5)
    let experience = Item.of(CR("experience_nugget"), 1).withChance(0.75)

    let dust_process = (materialName, byproduct, ByproductName) => {
        let crushedOre = CR("crushed_" + "raw_" + materialName)
        let oreTag = ("#forge:ores/" + materialName)
        let dustTag = ("#forge:dusts/" + materialName)
        let fluid = TC("molten_" + materialName)
        let fluidByproduct = TC("molten_" + ByproductName)
        let rawOreTag = ("#forge:raw_materials/" + materialName)

        // slightly slower than passing the name directly but it reduces how many parameters this function needs.
        let ingot = getPreferredItemFromTag("forge:ingots/" + materialName);
        let nugget = getPreferredItemFromTag("forge:nuggets/" + materialName);
        let nuggetByproduct = getPreferredItemFromTag("forge:nuggets/" + ByproductName);
        let dust = getPreferredItemFromTag("forge:dusts/" + materialName);

        // raw ore block compression and decompression
        event.replaceInput({type: "minecraft:crafting_shaped"}, rawOreTag, crushedOre)
        event.replaceOutput({type: "minecraft:crafting_shapeless"}, rawOreTag, crushedOre)

        event.remove({ input: rawOreTag })
        event.remove({ input: oreTag, type: TE("smelter") })
        event.remove({ input: oreTag, type: TE("pulverizer") })
        event.remove({ input: oreTag, type: MC("blasting") })
        event.remove({ input: oreTag, type: MC("smelting") })
        event.remove({ input: oreTag, type: CR("crushing") })
        event.remove({ input: oreTag, type: CR("milling") })
        event.remove({ id: TC("smeltery/melting/metal/" + materialName + "/raw_block") })
        event.remove({ id: TC("smeltery/melting/metal/" + materialName + "/dust") })
        event.remove({ id: CR("crushing/raw_" + materialName + "_block") })

        event.remove({ id: `thermal:machines/pulverizer/pulverizer_${materialName}_ore` })


        // 'concentrated ore' to crushed ore
        event.recipes.createMilling([Item.of(crushedOre, 5)], rawOreTag).id("kubejs:ore_processing/milling/raw_ore/" + materialName)
        event.recipes.createCrushing([Item.of(crushedOre, 5), Item.of(crushedOre, 2).withChance(0.5)], rawOreTag).id("kubejs:ore_processing/crushing/raw_ore/" + materialName)

        // ore to crushed ore
        event.recipes.createCrushing([Item.of(crushedOre, 3), Item.of(crushedOre, 1).withChance(0.5), experience, stone], oreTag).id("kubejs:ore_processing/crushing/ore/" + materialName)
        thermalPulverizer(event, [Item.of(crushedOre).withChance(4.5), Item.of("minecraft:gravel").withChance(0.2)], oreTag, 3000).id("kubejs:ore_processing/pulverizing/ore/" + materialName)

        // crushed ore to nuggets
        event.smelting(Item.of(nugget, 3), crushedOre).id("kubejs:ore_processing/smelting/crushed/" + materialName)
        event.recipes.createSplashing([Item.of(nugget, 2), Item.of(nuggetByproduct, 1).withChance(0.85)], dustTag).id("kubejs:ore_processing/splashing/dust/" + materialName)

        // crushed ore to ore dust
        event.recipes.createMilling([Item.of(dust, 3)], crushedOre).id("kubejs:ore_processing/milling/crushed/" + materialName)
        event.recipes.createCrushing([Item.of(dust, 3), Item.of(dust, 3).withChance(0.5)], crushedOre).id("kubejs:ore_processing/crushing/crushed/" + materialName)
        thermalPulverizer(event, [Item.of(dust, 6)], crushedOre, 15000).id("kubejs:ore_processing/pulverizing/crushed/" + materialName)

        // ore dust to nuggets
        event.smelting(Item.of(nugget, 1), dustTag).cookingTime(40).id("kubejs:ore_processing/smelting/dust/" + materialName)

        // ore dust to fluid
        thermalCrucible(event, Fluid.of(fluid, 30), dustTag, 3000).id("kubejs:ore_processing/crucible/dust/" + materialName)
        event.recipes.createMixing([Fluid.of(fluid, 180)], [Item.of(dustTag, 3), AE2("matter_ball")]).superheated().id("kubejs:ore_processing/mixing/dust/" + materialName)

        // ingots to fluid
        // thermalCrucible(event, Fluid.of(fluid, 90), ingot, 2000).id('kubejs:ore_processing/crucible/ingot/'+materialName) //now automatically ported

        // melting crushed ores to fluid
        event.custom({
            "type": "thermal:smelter",
            "ingredient": { "item": crushedOre },
            "result": [
                { "item": nugget, "chance": 9.0 },
                { "item": byproduct, "chance": (byproduct.endsWith("nugget") ? 1.8 : 0.2) },
                { "item": "thermal:rich_slag", "chance": 0.2 }
            ],
            "experience": 0.2,
            "energy": 20000
        }).id("kubejs:ore_processing/induction_smelting/crushed/" + materialName)

        // melting ore dusts to fluid
        event.custom({
            "type": "tconstruct:melting",
            "ingredient": { "tag": dustTag.slice(1) },
            "result": { "fluid": fluid, "amount": 30 },
            "temperature": 500,
            "time": 30,
            "byproducts": [{ "fluid": fluidByproduct, "amount": 10 }]
        }).id("kubejs:ore_processing/melting/dust/" + materialName);
    }

    dust_process("nickel", CR("copper_nugget"), "copper")
    dust_process("lead", MC("iron_nugget"), "iron")
    dust_process("iron", TE("nickel_nugget"), "nickel")
    dust_process("gold", TE("cinnabar"), "zinc")
    dust_process("copper", MC("gold_nugget"), "gold")
    dust_process("zinc", TE("sulfur"), "lead")

    event.remove({ input: TE("raw_silver") })
    // event.remove({ output: TE("raw_silver") })

    event.replaceInput({ id: TE("machine/smelter/smelter_iron_ore") }, MC("iron_ore"), CR("crushed_raw_iron"))
    event.replaceInput({ id: TE("machine/smelter/smelter_gold_ore") }, MC("gold_ore"), CR("crushed_raw_gold"))

    // Other Tweaks
    event.custom({
        "type": "tconstruct:ore_melting",
        "ingredient": {
            "tag": "forge:ores/cobalt"
        },
        "result": {
            "fluid": "tconstruct:molten_cobalt",
            "amount": 90
        },
        "temperature": 950,
        "time": 97,
        "rate": "metal",
        "byproducts": [
            {
                "fluid": "tconstruct:molten_iron",
                "amount": 30
            }
        ]
    })

    event.custom({
        "type": "tconstruct:ore_melting",
        "ingredient": {
            "tag": "forge:ores/netherite_scrap"
        },
        "result": {
            "fluid": "tconstruct:molten_debris",
            "amount": 90
        },
        "temperature": 1175,
        "time": 143,
        "rate": "metal",
        "byproducts": [
            {
                "fluid": "tconstruct:molten_diamond",
                "amount": 25
            },
            {
                "fluid": "tconstruct:molten_gold",
                "amount": 90
            }
        ]
    })

    // metal recycling
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "tag": "kubejs:recycling/iron" },
        "result": {
            "fluid": "tconstruct:molten_iron",
            "amount": 30
        },
        "temperature": 500,
        "time": 40
    })

    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "tag": "kubejs:circuit_press" },
        "result": {
            "fluid": "tconstruct:molten_invar",
            "amount": 180
        },
        "temperature": 500,
        "time": 90
    })
})
