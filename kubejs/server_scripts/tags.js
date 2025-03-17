
ServerEvents.tags("item", event => {

    event.add("forge:dusts/obsidian", "create:powdered_obsidian")
    event.add("forge:dusts", "create:powdered_obsidian")

    // Fixes copper dupe.
    event.remove("forge:storage_blocks/copper", "minecraft:cut_copper");

    colours.forEach(element => {
        event.get(F("glazed_terracotta")).add(MC(`${element}_glazed_terracotta`))
    });

    global.trades.forEach(element => {
        event.get("kubejs:transaction_cards/import").add(`kubejs:trade_card_${element}`)
    });

    global.professions.forEach(element => {
        event.get("kubejs:transaction_cards/profession").add(`kubejs:profession_card_${element}`)
    });

    event.get("farmersdelight:offhand_equipment").add("forbidden_arcanus:obsidian_skull_shield")

    unregistered_axes.forEach(axe => {
        event.get("forge:tools/axes").add(axe)
    });

    event.get("forge:vines").add(MC("vine"))

    // These items aren't obtainable at the moment.
    // This tag lets these items be melted into iron using the smeltery

    // This tag lets these items be turned into circuit scraps and be melted into invar
    event.get("kubejs:circuit_press")
        .add(AE2("name_press"))
        .add(AE2("silicon_press"))
        .add(AE2("logic_processor_press"))
        .add(AE2("engineering_processor_press"))
        .add(AE2("calculation_processor_press"))

    event.get("forbidden_arcanus:modifier/eternal_incompatible")
        .add(/exchangers:.*/)
        .add(/reliquary:.*/)
        .add(/waterstrainer:.*/)
        .add(OC("#miners/ores"))
        .add(PR_C("draw_plate"))
        .add(PR_C("multimeter"))

    // crafting tools for the chapters
    event.get("kubejs:saws").add("cb_microblock:stone_saw").add("cb_microblock:iron_saw").add("cb_microblock:diamond_saw")
    event.get("kubejs:screwdrivers").add(PR_C("screwdriver"))
    event.get("kubejs:chromatic_resonators").add(KJ("chromatic_resonator"))
    event.get("kubejs:flash_drives").add(KJ("flash_drive"))

    event.get("kubejs:machines").add("kubejs:andesite_machine").add("kubejs:copper_machine").add("kubejs:gold_machine").add("kubejs:brass_machine").add("kubejs:zinc_machine").add("kubejs:lead_machine").add("thermal:machine_frame").add("kubejs:enderium_machine").add("ae2:controller")

    event.get("kubejs:sellable_discs").add("minecraft:music_disc_13", "minecraft:music_disc_cat", "minecraft:music_disc_blocks", "minecraft:music_disc_chirp", "minecraft:music_disc_far", "minecraft:music_disc_mall", "minecraft:music_disc_mellohi", "minecraft:music_disc_stal", "minecraft:music_disc_strad", "minecraft:music_disc_ward", "minecraft:music_disc_11", "minecraft:music_disc_wait", "minecraft:music_disc_otherside", "minecraft:music_disc_5", "minecraft:music_disc_pigstep", "minecraft:music_disc_relic", "supplementaries:music_disc_heave_ho", "quark:music_disc_endermosh", "trials:music_disc_creator_box", "trials:music_disc_precipice", "trials:music_disc_creator", "biomesoplenty:music_disc_wanderer", "integrated_stronghold:music_disc_sight", "integrated_stronghold:music_disc_forlorn");
    event.get("kubejs:transaction_cards").add("#kubejs:transaction_cards/import")
    event.get("kubejs:transaction_cards").add("#kubejs:transaction_cards/profession")

    event.add("kubejs:strainer/sands", "minecraft:sand")

    // Create Deco laser lamps
    let decoLampColours = ["yellow", "red", "green", "blue"]
    let decoLampMaterials = ["andesite", "brass", "iron", "copper", "industrial_iron", "zinc"]
    for (let i = 0;i < decoLampColours.length;++i) {
        for (let j = 0;j < decoLampMaterials.length;++j) {
            let lamp = `createdeco:${decoLampColours[i]}_${decoLampMaterials[j]}_lamp`
            event.add("kubejs:alchemical_laser_lamp", lamp)
            event.add(`kubejs:alchemical_laser_lamp/${decoLampColours[i]}`, lamp)
        }
    }

    // Ad Astra laser lamps
    for (let i = 0;i < colours.length;++i) {
        let lamp = `ad_astra:${colours[i]}_industrial_lamp`;
        event.add("kubejs:alchemical_laser_lamp", lamp)
        event.add(`kubejs:alchemical_laser_lamp/${colours[i]}`, lamp)
        lamp = `ad_astra:small_${colours[i]}_industrial_lamp`;
        event.add("kubejs:alchemical_laser_lamp", lamp)
        event.add(`kubejs:alchemical_laser_lamp/${colours[i]}`, lamp)
    }

    // This tag prevents items from being consumed in press (market) recipes
    event.get("thermal:crafting/dies").add("#kubejs:transaction_cards")
    event.get("thermal:crafting/dies").add("kubejs:missingno")

    event.get("thermal:crafting/casts").add(KJ("three_cast")).add(KJ("eight_cast")).add(KJ("plus_cast")).add(KJ("minus_cast")).add(KJ("multiply_cast")).add(KJ("divide_cast")).add(KJ("#circuit_press"))

    event.get("create:upright_on_belt")
        .add(AE2("red_paint_ball"))
        .add(AE2("yellow_paint_ball"))
        .add(AE2("green_paint_ball"))
        .add(AE2("blue_paint_ball"))
        .add(AE2("magenta_paint_ball"))
        .add(AE2("black_paint_ball"))

    // Items in the treasure tags are given as loot from treasure pots
    event.get("kubejs:treasure1")
        .add(MC("cobweb"))
        .add(MC("dandelion"))
        .add(MC("poppy"))
        .add(MC("jungle_sapling"))
        .add(MC("brown_mushroom"))
        .add(MC("red_mushroom"))
        .add(MC("bamboo"))
        .add(MC("ladder"))
        .add(MC("chain"))
        .add(MC("flower_pot"))
        .add(MC("painting"))
        .add(MC("iron_nugget"))
        .add(MC("gold_nugget"))
        .add(CR("copper_nugget"))
        .add(CR("zinc_nugget"))
        .add(MC("charcoal"))
        .add(MC("rotten_flesh"))
        .add(MC("pumpkin_seeds"))
        .add(MC("melon_seeds"))
        .add(MC("bone_meal"))
        .add(MC("paper"))
        .add(FD("raw_pasta"))
        .add(AP("algal_blend"))
        .add(FD("tree_bark"))
        .add(CR("cogwheel"))
        .add(KJ("sky_slimy_fern_leaf"))
        .add(KJ("earth_slimy_fern_leaf"))
        .add(KJ("ender_slimy_fern_leaf"))
        .add(TE("rubber"))
        .add(TE("phytogro"))
        .add(CR("andesite_alloy"))
        .add(MC("poisonous_potato"))

    event.get("kubejs:treasure2")
        .add(MC("lantern"))
        .add(MC("redstone"))
        .add(MC("bow"))
        .add(FD("rice"))
        .add(SP("copper_lantern"))
        .add(SP("brass_lantern"))
        .add(SP("sconce"))
        .add(SP("rope_arrow"))
        .add(SP("slingshot"))
        .add(SP("flax_seeds"))
        .add(SP("bomb"))
        .add(FD("sweet_berry_cookie"))
        .add(FD("cabbage_seeds"))
        .add(FD("tomato_seeds"))
        .add(MC("scute"))
        .add(MC("iron_ingot"))
        .add(MC("copper_ingot"))
        .add(CR("zinc_ingot"))
        .add(TE("rosin"))
        .add(MC("spider_eye"))
        .add(MC("nether_brick"))
        .add(MC("beetroot_seeds"))
        .add(MC("book"))
        .add(MC("name_tag"))
        .add(FD("rope"))
        .add(CR("cinder_flour"))
        .add(TC("seared_brick"))
        .add(FD("canvas"))
        .add(TE("cinnabar"))
        .add(TE("sulfur"))
        .add(TE("niter"))
        .add(TE("apatite"))
        .add(MC("compass"))
        .add(MC("experience_bottle"))
        .add(MC("golden_carrot"))
    // .add('antiqueatlas:empty_antique_atlas')

    // Treasure3 is only given from quartz pots
    event.get("kubejs:treasure3")
        .add(MC("skeleton_skull"))
        .add(MC("clock"))
        .add(MC("diamond"))
        .add(MC("lapis_lazuli"))
        .add(MC("zombie_head"))
        .add(CR("rose_quartz"))
        .add(CR("brass_hand"))
        .add(MC("saddle"))
        .add(AE2("certus_quartz_crystal"))
        .add(AE2("fluix_crystal"))
        .add(TE("ice_charge"))
        .add(TE("lightning_charge"))
        .add(TE("earth_charge"))
        .add(PR_C("red_ingot"))
        .add(TE("ruby"))
        .add(TE("sapphire"))
        .add(CR("peculiar_bell"))
        .add(MC("spectral_arrow"))
        .add(MC("gold_ingot"))
        .add(MC("magma_cream"))
        .add(MC("ghast_tear"))
        .add(MC("quartz"))
        .add(MC("prismarine_shard"))
        .add(MC("prismarine_crystals"))
        .add(MC("chorus_fruit"))
        .add(MC("blaze_powder"))

    event.get("kubejs:ore_processing/metal/dusts")
        .add("#forge:dusts/copper")
        .add("#forge:dusts/iron")
        .add("#forge:dusts/gold")
        .add("#forge:dusts/zinc")
        .add("#forge:dusts/lead")
        .add("#forge:dusts/nickel")

    // This tag auto adds the beacon_payment_items tag which we don't want
    event.remove(CR("create_ingots"), CR("andesite_alloy"))
})

ServerEvents.tags("block", event => {

    // Create Deco laser lamps
    let decoLampColours = ["yellow", "red", "green", "blue"]
    let decoLampMaterials = ["andesite", "brass", "iron", "copper", "industrial_iron", "zinc"]
    for (let i = 0;i < decoLampColours.length;++i) {
        for (let j = 0;j < decoLampMaterials.length;++j) {
            let lamp = `createdeco:${decoLampColours[i]}_${decoLampMaterials[j]}_lamp`
            event.add("kubejs:alchemical_laser_lamp", lamp)
            event.add(`kubejs:alchemical_laser_lamp/${decoLampColours[i]}`, lamp)
        }
    }

    // Ad Astra laser lamps
    for (let i = 0;i < colours.length;++i) {
        let lamp = `ad_astra:${colours[i]}_industrial_lamp`;
        event.add("kubejs:alchemical_laser_lamp", lamp)
        event.add(`kubejs:alchemical_laser_lamp/${colours[i]}`, lamp)
        lamp = `ad_astra:small_${colours[i]}_industrial_lamp`;
        event.add("kubejs:alchemical_laser_lamp", lamp)
        event.add(`kubejs:alchemical_laser_lamp/${colours[i]}`, lamp)
    }

    event.remove("minecraft:beacon_base_blocks", "thermal:bronze_block")

    // Not sure if anything checks for this block tag but don't want to risk it.
    event.remove("forge:storage_blocks/copper", "minecraft:cut_copper");

    // I don't know why this isn't wrenchable by default
    event.add("create:wrench_pickup", "minecraft:note_block")

    event.add("create:wrench_pickup", "mbd2:strainer")

    event.add("create:wrench_pickup", /thermal:machine/)
    event.add("create:wrench_pickup", /thermal:device/)
    event.add("create:wrench_pickup", /thermal:dynamo/)
    event.add("create:wrench_pickup", "thermal:tinker_bench")
    event.add("create:wrench_pickup", "thermal:charge_bench")
    event.add("create:wrench_pickup", "thermal:energy_cell_frame")
    event.add("create:wrench_pickup", "thermal:energy_cell")
    event.add("create:wrench_pickup", "thermal:fluid_cell_frame")
    event.add("create:wrench_pickup", "thermal:fluid_cell")
    event.add("create:wrench_pickup", "thermal:energy_duct")
    event.add("create:wrench_pickup", "thermal:fluid_duct")
    event.add("create:wrench_pickup", "thermal:fluid_duct_windowed")

    event.add("create:wrench_pickup", "supplementaries:cog_block")
    event.add("create:wrench_pickup", "supplementaries:relayer")
    event.add("create:wrench_pickup", "supplementaries:spring_launcher")
    event.add("create:wrench_pickup", "supplementaries:speaker_block")
    event.add("create:wrench_pickup", "supplementaries:turn_table")
    // event.add("create:wrench_pickup", 'supplementaries:pulley_block')
    // event.add("create:wrench_pickup", 'supplementaries:hourglass')
    event.add("create:wrench_pickup", "supplementaries:bellows")
    event.add("create:wrench_pickup", "supplementaries:clock_block")
    event.add("create:wrench_pickup", "supplementaries:crystal_display")
    event.add("create:wrench_pickup", "supplementaries:sconce_lever")
    event.add("create:wrench_pickup", "supplementaries:crank")
    event.add("create:wrench_pickup", "supplementaries:wind_vane")
    event.add("create:wrench_pickup", "supplementaries:faucet")

    event.add("create:wrench_pickup", "cb_multipart:multipart")

    // I really don't know why these blocks are missing the pressure plate tag
    // All the other pressure plates from quark and forbidden have the tag.
    event.add("minecraft:pressure_plates", "forbidden_arcanus:polished_darkstone_pressure_plate")
})
