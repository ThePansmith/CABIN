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
    const replacementFilter = [{ mod:"thermal", type:"minecraft:crafting_shaped"}, { mod:"thermal", type:"minecraft:crafting_shapeless"}, { mod:"exchangers", type:"minecraft:crafting_shaped"}]
    event.replaceInput(replacementFilter, "#forge:ingots/tin", "#forge:ingots/zinc")
    event.replaceInput(replacementFilter, "#forge:gears/tin", "#forge:gears/lead")

    event.replaceInput(replacementFilter, "#forge:plates/bronze", "#forge:plates/nickel")
    event.replaceInput(replacementFilter, "#forge:gears/bronze", "#forge:gears/nickel")

    event.replaceInput(replacementFilter, "#forge:plates/silver", "#forge:ingots/invar")
    event.replaceInput(replacementFilter, "#forge:gears/silver", "#forge:gears/invar")

    event.replaceInput(replacementFilter, "#forge:plates/constantan", "#forge:plates/signalum")
    event.replaceInput(replacementFilter, "#forge:gears/constantan", "#forge:gears/signalum")

    event.replaceInput(replacementFilter, "#forge:ingots/electrum", "#forge:ingots/constantan")
    event.replaceInput(replacementFilter, "#forge:plates/electrum", "#forge:plates/constantan")
    event.replaceInput(replacementFilter, "#forge:gears/electrum", "#forge:gears/constantan")

    event.replaceInput(replacementFilter, "#forge:plates/invar", "#forge:ingots/invar")

    // // fix recipes broken by replacement
    event.replaceInput({ id: "thermal:storage/electrum_nugget_from_ingot" }, "thermal:constantan_ingot", "#forge:ingots/electrum")
    event.replaceInput({ id: "thermal:storage/electrum_block" }, "thermal:constantan_ingot", "#forge:ingots/electrum")
    event.replaceInput({ id: "thermal:parts/electrum_gear" }, "thermal:constantan_ingot", "#forge:ingots/electrum")

    event.replaceInput({ id: "thermal:storage/electrum_ingot_from_block"}, "thermal:electrum_block", "#forge:storage_blocks/electrum")

    // Redstone exists in jei to provide a tooltip, we want to remove all of its recipes
    event.remove({ input: "#forge:ores/redstone" })
})

// Tweaks for the metals that we actually want
ServerEvents.recipes(event => {

    // Thermal recipes for zinc
    event.recipes.thermal.pulverizer(["kubejs:zinc_dust"], "#forge:ingots/zinc", 0, 2000)
    event.recipes.thermal.pulverizer(["kubejs:zinc_dust"], "#forge:plates/zinc", 0, 2000)
    event.recipes.thermal.smelter(["create:zinc_ingot"], "#forge:plates/zinc", 0, 1600)

    // Thermal's fire charge ingot crafting recipes. We don't want them
    event.remove({ id: "thermal:fire_charge/invar_ingot_3" })
    event.remove({ id: "thermal:fire_charge/enderium_ingot_2" })
    event.remove({ id: "thermal:fire_charge/constantan_ingot_2" })
    event.remove({ id: "thermal:fire_charge/bronze_ingot_4" })
    event.remove({ id: "thermal:fire_charge/electrum_ingot_2" })
    event.remove({ id: "thermal:fire_charge/lumium_ingot_4" })
    event.remove({ id: "thermal:fire_charge/signalum_ingot_4" })

    // Duplicate Recipes
    event.remove({ id: "thermal:storage/silver_block"})
    event.remove({ id: "thermal:storage/silver_ingot_from_block"})
    event.remove({ id: "thermal:storage/silver_ingot_from_nuggets"})
    event.remove({ id: "thermal:storage/silver_nugget_from_ingot"})
    event.remove({ id: "thermal:smelting/silver_ingot_from_dust_smelting"})
    event.remove({ id: "thermal:smelting/silver_ingot_from_dust_blasting"})

    event.remove({ id: "thermal:storage/copper_nugget_from_ingot"})
    event.remove({ id: "tconstruct:common/materials/copper_nugget_from_ingot"})
    event.remove({ id: "thermal:storage/copper_ingot_from_nuggets"})
    event.remove({ id: "tconstruct:common/materials/copper_ingot_from_nuggets"})

    event.remove({ id: "thermal:storage/netherite_nugget_from_ingot"})
    event.remove({ id: "tconstruct:common/materials/netherite_nugget_from_ingot"})
    event.remove({ id: "thermal:storage/netherite_ingot_from_nuggets"})
    event.remove({ id: "tconstruct:common/materials/netherite_ingot_from_nuggets"})

    // Remove unwanted Alloying recipes
    event.remove({ id: "create:mixing/brass_ingot" })
    event.remove({id: /centrifuge_bronze_dust/})
    // smeltery
    event.remove({ id: "tconstruct:smeltery/alloys/molten_bronze" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_brass" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_invar" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_electrum" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_constantan" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_rose_gold" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_enderium" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_lumium" })
    event.remove({ id: "tconstruct:smeltery/alloys/molten_signalum" })
    // alloy smelter
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_signalum" })
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_lumium" })
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_enderium" })
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_invar" })
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_bronze" })
    event.remove({ id: "thermal:compat/create/smelter_create_alloy_brass" })
    event.remove({ id: "thermal:compat/tconstruct/smelter_alloy_tconstruct_rose_gold_ingot" })
    // thermal handcrafting
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:constantan_dust" })
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:electrum_dust" })
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:lumium_dust" })
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:signalum_dust" })
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:enderium_dust" })
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:bronze_dust" })
    event.remove({ type: "minecraft:crafting_shapeless", output: "thermal:invar_dust" })

    // Create new alloying recipes
    // Mixing Alloys
    let moltenAlloy = function (fluidAlloy, fluid1, fluid2) {
        // Recipe ids are actually important here since the id that comes later in alphabetical order is the one that is prioritized
        event.custom({
            "type": "create:mixing",
            "ingredients": [
                { "amount": 2, "fluid": fluid1 },
                { "amount": 2, "fluid": fluid2 }
            ],
            "results": [
                { "amount": 2, "fluid": "tconstruct:" + fluidAlloy }
            ],
            processingTime: 1
        }).id(`kubejs:mixing/${fluidAlloy}_2`)
    }
    moltenAlloy("molten_brass", "tconstruct:molten_copper", "tconstruct:molten_zinc")
    moltenAlloy("molten_constantan", "tconstruct:molten_copper", "tconstruct:molten_nickel")
    moltenAlloy("molten_rose_gold", "tconstruct:molten_copper", "tconstruct:molten_gold")
    moltenAlloy("molten_electrum", "tconstruct:molten_silver", "tconstruct:molten_gold")
    // remove existing smelter recipes because they accept dusts
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_constantan"})
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_electrum"})
    event.remove({ id: "thermal:machines/smelter/smelter_alloy_netherite"})
    // alloy smelter recipes
    event.recipes.thermal.smelter(Item.of("create:brass_ingot", 2), ["#forge:ingots/copper", "#forge:ingots/zinc"])
    event.recipes.thermal.smelter(Item.of("tconstruct:rose_gold_ingot", 2), ["#forge:ingots/copper", "#forge:ingots/gold"])
    event.recipes.thermal.smelter(Item.of("thermal:constantan_ingot", 2), ["#forge:ingots/copper", "#forge:ingots/nickel"])
    event.recipes.thermal.smelter(Item.of(getPreferredItemFromTag("forge:ingots/electrum"), 2), ["#forge:ingots/silver", "#forge:ingots/gold"])
    event.recipes.thermal.smelter(Item.of("minecraft:netherite_ingot", 1), [Item.of("#forge:ingots/netherite_scrap", 4), Item.of("#forge:ingots/gold", 4)])
    // bronze
    event.recipes.thermal.smelter("3x thermal:bronze_ingot", [Item.of("minecraft:copper_ingot", 3), "#forge:sand"])

    // Nickel Compound
    event.shapeless("kubejs:nickel_compound", ["thermal:nickel_ingot", "thermal:iron_dust", "thermal:iron_dust", "thermal:iron_dust", "thermal:iron_dust"])
    event.recipes.thermal.smelter(["kubejs:invar_compound", "kubejs:invar_compound"], ["thermal:nickel_ingot", "minecraft:iron_ingot"])
    // Invar Compound
    event.blasting("kubejs:invar_compound", "kubejs:nickel_compound")
    { // Invar ingots
        let s = "kubejs:invar_compound"
        event.recipes.create.sequenced_assembly([
            "thermal:invar_ingot",
        ], "kubejs:invar_compound", [
            event.recipes.create.pressing(s, s)
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
    event.recipes.create.pressing(["thermal:lead_plate"], "thermal:lead_ingot")
    event.recipes.create.pressing(["thermal:constantan_plate"], "thermal:constantan_ingot")
    event.recipes.create.pressing(["thermal:nickel_plate"], "thermal:nickel_ingot")
    event.recipes.create.pressing(["thermal:signalum_plate"], "thermal:signalum_ingot")
    event.recipes.create.pressing(["thermal:lumium_plate"], "thermal:lumium_ingot")
    event.recipes.create.pressing(["thermal:enderium_plate"], "thermal:enderium_ingot")

    // dusts
    event.recipes.create.milling("thermal:iron_dust", "#forge:ingots/iron")
    event.recipes.create.milling("thermal:gold_dust", "#forge:ingots/gold")
    event.recipes.create.milling("thermal:nickel_dust", "#forge:ingots/nickel")
    event.recipes.create.milling("thermal:lead_dust", "#forge:ingots/lead")
    event.recipes.create.milling("thermal:copper_dust", "#forge:ingots/copper")
    event.recipes.create.milling("kubejs:zinc_dust", "#forge:ingots/zinc")

    // other metal unification
    event.replaceOutput({}, "#forge:ingots/silver", "thermal:silver_ingot")
    event.replaceOutput({}, "#forge:ingots/bronze", "thermal:bronze_ingot")
    event.replaceOutput({ id:"occultism:crafting/silver_block"}, "#forge:storage_blocks/silver", "thermal:silver_block")

    // Ore processing
    event.remove({ id: /thermal:machines\/smelter\/.*dust/ })
    event.remove({ id: /tconstruct:smeltery\/.*\/ore/ })
    event.remove({ input: "#create:crushed_raw_materials" })

    native_metals.forEach(e => {
        event.remove({ type: "minecraft:smelting", input: "#forge:dusts/" + e })
        event.remove({ type: "minecraft:blasting", input: "#forge:dusts/" + e })
        event.remove({ type: "tconstruct:melting", input: "#forge:dusts/" + e })
    })
    event.remove({ id: "thermal:smelting/silver_ingot_from_dust_smelting"})
    event.remove({ id: "thermal:smelting/silver_ingot_from_dust_blasting"})

    const stone = Item.of("minecraft:cobblestone", 1).withChance(.5)
    let experience = Item.of("create:experience_nugget", 1).withChance(0.75)

    let dust_process = (materialName, byproduct, ByproductName) => {
        let crushedOre = "create:crushed_" + "raw_" + materialName
        let oreTag = ("#forge:ores/" + materialName)
        let crushedOreBlockTag = ("#forge:storage_blocks/raw_" + materialName)
        let dustTag = ("#forge:dusts/" + materialName)
        let fluid = "tconstruct:molten_" + materialName
        let fluidByproduct = "tconstruct:molten_" + ByproductName
        let rawOreTag = ("#forge:raw_materials/" + materialName)

        // slightly slower than passing the name directly but it reduces how many parameters this function needs.
        let ingot = getPreferredItemFromTag("forge:ingots/" + materialName);
        let nugget = getPreferredItemFromTag("forge:nuggets/" + materialName);
        let nuggetByproduct = getPreferredItemFromTag("forge:nuggets/" + ByproductName);
        let dust = getPreferredItemFromTag("forge:dusts/" + materialName);

        // raw ore block compression and decompression
        event.replaceInput({type: "minecraft:crafting_shaped"}, rawOreTag, crushedOre)
        event.replaceOutput({type: "minecraft:crafting_shapeless"}, rawOreTag, crushedOre)

        event.remove([
            { type: "minecraft:smelting", input: rawOreTag },
            { type: "minecraft:blasting", input: rawOreTag },
            { type: "create:crushing", input: rawOreTag },
            { type: "occultism:crushing", input: rawOreTag },
            { type: "tconstruct:ore_melting", input: rawOreTag }
        ])

        event.remove({ id: `thermal:machines/pulverizer/pulverizer_raw_${materialName}`})
        event.remove({ id: `thermal:machines/smelter/smelter_raw_${materialName}`})

        event.remove([
            { type: "thermal:smelter", input: oreTag },
            { type: "thermal:pulverizer", input: oreTag },
            { type: "minecraft:blasting", input: oreTag },
            { type: "minecraft:smelting", input: oreTag },
            { type: "create:crushing", input: oreTag },
            { type: "create:milling", input: oreTag },
            { type: "occultism:crushing", input: oreTag },

        ])

        event.remove({ id: `thermal:machines/pulverizer/pulverizer_${materialName}_ore` })
        event.remove({ id: `thermal:machines/smelter/smelter_${materialName}_ore` })

        event.remove([
            { type: "minecraft:smelting", input: crushedOreBlockTag },
            { type: "minecraft:blasting", input: crushedOreBlockTag },
            { type: "create:crushing", input: crushedOreBlockTag },
            { type: "occultism:crushing", input: crushedOreBlockTag },
            { type: "tconstruct:ore_melting", input: crushedOreBlockTag }
        ])

        // 'concentrated ore' to crushed ore
        event.recipes.create.milling([Item.of(crushedOre, 5)], rawOreTag).id("kubejs:ore_processing/milling/raw_ore/" + materialName)
        event.recipes.create.crushing([Item.of(crushedOre, 5), Item.of(crushedOre, 2).withChance(0.5)], rawOreTag).id("kubejs:ore_processing/crushing/raw_ore/" + materialName)

        // ore to crushed ore
        event.recipes.create.crushing([Item.of(crushedOre, 3), Item.of(crushedOre, 1).withChance(0.5), experience, stone], oreTag).id("kubejs:ore_processing/crushing/ore/" + materialName)
        event.recipes.thermal.pulverizer([Item.of(crushedOre).withChance(4.5), Item.of("minecraft:gravel").withChance(0.2)], oreTag, 0.2).id("kubejs:ore_processing/pulverizing/ore/" + materialName)
        event.recipes.occultism.crushing(Item.of(dust, 3), Item.of(crushedOre), 200, -1, false).id(`kubejs:occultism/crushing/${materialName}`)

        // crushed ore to nuggets
        event.smelting(Item.of(nugget, 3), crushedOre).id("kubejs:ore_processing/smelting/crushed/" + materialName)
        event.recipes.create.splashing([Item.of(nugget, 2), Item.of(nuggetByproduct, 1).withChance(0.85)], dustTag).id("kubejs:ore_processing/splashing/dust/" + materialName)

        // crushed ore to ore dust
        event.recipes.create.milling([Item.of(dust, 3)], crushedOre).id("kubejs:ore_processing/milling/crushed/" + materialName)
        event.recipes.create.crushing([Item.of(dust, 3), Item.of(dust, 3).withChance(0.5)], crushedOre).id("kubejs:ore_processing/crushing/crushed/" + materialName)
        event.recipes.thermal.pulverizer([Item.of(dust, 6)], crushedOre, 0.2, 6400).id("kubejs:ore_processing/pulverizing/crushed/" + materialName)

        // ore dust to nuggets
        event.smelting(Item.of(nugget, 1), dustTag).cookingTime(40).id("kubejs:ore_processing/smelting/dust/" + materialName)

        // ore dust to fluid
        event.recipes.thermal.crucible(Fluid.of(fluid, 30), dustTag, 0, 3000).id("kubejs:ore_processing/crucible/dust/" + materialName)
        event.recipes.create.mixing([Fluid.of(fluid, 180)], [Item.of(dustTag, 3), "ae2:matter_ball"]).superheated().id("kubejs:ore_processing/mixing/dust/" + materialName)

        // ingots to fluid
        // event.recipes.thermal.crucible(Fluid.of(fluid, 90), ingot, 2000).id('kubejs:ore_processing/crucible/ingot/'+materialName) //now automatically ported

        // melting crushed ores to nuggets
        event.custom({
            "type": "thermal:smelter",
            "ingredient": { "item": crushedOre },
            "result": [
                { "item": nugget, "chance": 9.0 },
                { "item": byproduct, "chance": (byproduct.endsWith("nugget") ? 1.8 : 0.2) },
                { "item": "thermal:rich_slag", "chance": 0.2 }
            ],
            "experience": 0.2,
            "energy": 3200
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

    dust_process("nickel", "create:copper_nugget", "copper")
    dust_process("lead", "minecraft:iron_nugget", "iron")
    dust_process("iron", "thermal:nickel_nugget", "nickel")
    dust_process("gold", "thermal:cinnabar", "zinc")
    dust_process("copper", "minecraft:gold_nugget", "gold")
    dust_process("zinc", "thermal:sulfur", "lead")


    event.remove([
        { type: "minecraft:crafting_shaped", input: "#forge:raw_materials/silver" },
        { type: "minecraft:crafting_shapeless", input: "#forge:raw_materials/silver" },
        { type: "minecraft:smelting", input: "#forge:raw_materials/silver" },
        { type: "minecraft:blasting", input: "#forge:raw_materials/silver" },
        { type: "create:crushing", input: "#forge:raw_materials/silver" },
        { type: "occultism:crushing", input: "#forge:raw_materials/silver" },
        { type: "tconstruct:ore_melting", input: "#forge:raw_materials/silver" }
    ])
    event.remove({ id: "thermal:machines/pulverizer/pulverizer_raw_silver"})
    event.remove({ id: "thermal:machines/smelter/smelter_raw_silver"})


    event.replaceInput({ id: "thermal:machine/smelter/smelter_iron_ore" }, "minecraft:iron_ore", "create:crushed_raw_iron")
    event.replaceInput({ id: "thermal:machine/smelter/smelter_gold_ore" }, "minecraft:gold_ore", "create:crushed_raw_gold")

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
