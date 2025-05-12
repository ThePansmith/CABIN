// priority: 0

StartupEvents.registry("item", event => {

    global.trades = []
    global.professions = []
    global.transactions = []

    let profession = (name, c1, c2, transactions) => {
        let id = name.toLowerCase().replace("'", "").split(" ").join("_")
        global.professions.push(id)
        global.transactions[id] = transactions
        event.create(`profession_card_${id}`)
            .color(1, c1)
            .color(2, c2)
            .parentModel("cabin:item/profession_card")
            .texture("cabin:item/profession_card_0")
            .displayName(`Profession: ${name}`)
            .unstackable()
    }

    let trade = (name, c1, c2, transactions, custom) => {
        let id = name.toLowerCase().replace("'", "").split(" ").join("_")
        global.trades.push(id)
        global.transactions[id] = transactions
        event.create(`trade_card_${id}`)
            .color(1, c1)
            .color(2, c2)
            .parentModel("cabin:item/trade_card")
            .texture("cabin:item/trade_card_0")
            .displayName((custom ? "" : "Import: ") + name)
            .unstackable()
    }

    let S = (x) => `${x || 1}x thermal:silver_coin`
    let G = (x) => `${x || 1}x thermal:gold_coin`

    profession("Farming", 0xFFCC29, 0x81B214, [
        { in: "farmersdelight:carrot_crate", out: S(1) },
        { in: "farmersdelight:potato_crate", out: S(1) },
        { in: "farmersdelight:beetroot_crate", out: S(1) },
        { in: "farmersdelight:cabbage_crate", out: S(1) },
        { in: "farmersdelight:tomato_crate", out: S(1) },
        { in: "farmersdelight:onion_crate", out: S(1) },
        { in: "farmersdelight:rice_bag", out: S(1) },
        { in: "32x farmersdelight:canvas", out: S(1) },
        { in: "thermal:apple_block", out: S(1) },
        { in: "8x minecraft:sweet_berries", out: S(1) },
        { in: "16x minecraft:cocoa_beans", out: S(1) },
        { in: "8x minecraft:honey_bottle", out: S(1) },
        { in: "4x minecraft:honeycomb", out: S(1) },
        { in: "16x minecraft:dandelion", out: S(1) },
        { in: "16x minecraft:poppy", out: S(1) },
        { in: "16x minecraft:oxeye_daisy", out: S(1) },
        { in: "8x minecraft:bread", out: S(1) },
        { in: "8x minecraft:brown_mushroom", out: S(1) },
        { in: "8x minecraft:red_mushroom", out: S(1) },
        { in: "8x biomesoplenty:toadstool", out: S(1) },
        { in: "64x minecraft:kelp", out: S(1) },
        { in: "9x minecraft:pumpkin", out: S(1) },
        { in: "16x #minecraft:wool", out: S(1) },
        { in: "3x minecraft:melon", out: S(1) }
    ])

    profession("Carpentry", 0xD0AF84, 0x966C3B, [
        { in: "64x minecraft:oak_log", out: S(1) },
        { in: "64x minecraft:spruce_log", out: S(1) },
        { in: "64x minecraft:birch_log", out: S(2) },
        { in: "64x minecraft:jungle_log", out: S(1) },
        { in: "64x minecraft:acacia_log", out: S(2) },
        { in: "64x minecraft:dark_oak_log", out: S(1) },
        { in: "64x minecraft:mangrove_log", out: S(2) },
        { in: "64x minecraft:cherry_log", out: S(2) },
        { in: "64x minecraft:crimson_stem", out: S(4) },
        { in: "64x minecraft:warped_stem", out: S(4) },
        { in: "64x biomesoplenty:fir_log", out: S(1) },
        { in: "64x biomesoplenty:pine_log", out: S(1) },
        { in: "64x biomesoplenty:maple_log", out: S(1) },
        { in: "64x biomesoplenty:redwood_log", out: S(1) },
        { in: "64x biomesoplenty:mahogany_log", out: S(3) },
        { in: "64x biomesoplenty:jacaranda_log", out: S(3) },
        { in: "64x biomesoplenty:palm_log", out: S(3) },
        { in: "64x biomesoplenty:willow_log", out: S(3) },
        { in: "64x biomesoplenty:dead_log", out: S(1) },
        { in: "64x biomesoplenty:magic_log", out: S(3) },
        { in: "64x biomesoplenty:umbran_log", out: S(1) },
        { in: "64x biomesoplenty:hellbark_log", out: S(5) },
        // { in: "64x biomesoplenty:empyreal_log", out: S(2) }, // From BoP's unused end biomes
        { in: "64x quark:azalea_log", out: S(2) },
        { in: "64x quark:blossom_log", out: S(2) },
        { in: "64x tconstruct:greenheart_log", out: S(2) },
        { in: "64x tconstruct:skyroot_log", out: S(2) },
        { in: "64x tconstruct:bloodshroom_log", out: S(2) },
        { in: "64x tconstruct:enderbark_log", out: S(2) }
    ])

    profession("Mining", 0x1C1124, 0x88FFF7, [
        { in: "16x create:crushed_raw_iron", out: S(8) },
        { in: "16x create:crushed_raw_copper", out: S(8) },
        { in: "16x create:crushed_raw_zinc", out: S(8) },
        { in: "16x create:crushed_raw_gold", out: S(10) },
        { in: "16x create:crushed_raw_nickel", out: S(12) },
        { in: "16x create:crushed_raw_lead", out: S(12) },
        { in: "64x minecraft:andesite", out: S(1) },
        { in: "64x minecraft:granite", out: S(1) },
        { in: "64x minecraft:diorite", out: S(1) },
        { in: "64x minecraft:sandstone", out: S(1) },
        { in: "64x create:limestone", out: S(1) },
        { in: "64x create:scoria", out: S(1) },
        { in: "8x thermal:cinnabar", out: S(6) },
        { in: "16x thermal:sulfur", out: S(6) },
        { in: "16x thermal:niter", out: S(6) },
        { in: "16x minecraft:lapis_lazuli", out: S(6) },
        { in: "16x thermal:apatite", out: S(4) },
        { in: "1x thermal:sapphire", out: S(10) },
        { in: "1x thermal:ruby", out: S(10) },
        { in: "1x minecraft:diamond", out: S(14) },
        { in: "16x minecraft:coal", out: S(2) },
    ])

    profession("Masonry", 0x5E6F64, 0xBA7967, [
        { in: "64x supplementaries:checker_block", out: S(4) },
        { in: "64x architects_palette:basalt_tiles", out: S(6) },
        { in: "64x tconstruct:seared_bricks", out: S(10) },
        { in: "64x architects_palette:sunmetal_block", out: S(8) },
        { in: "64x architects_palette:osseous_bricks", out: S(6) },
        { in: "64x architects_palette:packed_ice_pillar", out: S(8) },
        { in: "64x architects_palette:flint_tiles", out: S(4) },
        { in: "64x architects_palette:abyssaline", out: S(12) },
        { in: "64x architects_palette:gilded_sandstone", out: S(10) },
        { in: "64x minecraft:bricks", out: S(6) },
        { in: "64x minecraft:mud_bricks", out: S(12) },
        { in: "64x architects_palette:olivestone_bricks", out: S(4) },
        { in: "64x minecraft:quartz_bricks", out: S(18) },
        { in: "64x architects_palette:algal_bricks", out: S(6) },
        { in: "64x tconstruct:blazewood", out: S(10) },
        { in: "64x create:ornate_iron_window", out: S(10) },
        { in: "64x minecraft:mossy_cobblestone", out: S(6) },
        { in: "64x #forge:glazed_terracotta", out: S(6) },
        { in: "64x supplementaries:daub_brace", out: S(8) }
    ])

    profession("Hunting", 0x393E46, 0xCF0000, [
        { in: "reliquary:slime_pearl", out: S(6) },
        { in: "reliquary:catalyzing_gland", out: S(10) },
        { in: "reliquary:witch_hat", out: S(15) },
        { in: "reliquary:squid_beak", out: S(3) },
        { in: "reliquary:withered_rib", out: S(15) },
        { in: "reliquary:rib_bone", out: S(5) },
        { in: "reliquary:zombie_heart", out: S(5) },
        { in: "reliquary:chelicerae", out: S(5) },
        { in: "reliquary:bat_wing", out: S(10) },
        { in: "reliquary:frozen_core", out: S(4) },
        { in: "reliquary:nebulous_heart", out: S(5) },
        { in: "reliquary:molten_core", out: S(5) },
        { in: "reliquary:eye_of_the_storm", out: S(12) },
        { in: "minecraft:rabbit_foot", out: S(8) },
        { in: "minecraft:nether_star", out: G(1) },
        { in: "minecraft:dragon_breath", out: S(1) },
        { in: "minecraft:ghast_tear", out: S(10) },
        { in: "minecraft:dragon_egg", out: G(2) },
        { in: "reliquary:guardian_spike", out: S(6) }
    ])

    profession("Cooking", 0xD8B384, 0xF7DAD9, [
        { in: "16x create:bar_of_chocolate", out: S(4) },
        { in: "16x create:honeyed_apple", out: S(4) },
        { in: "16x create:builders_tea", out: S(4) },
        { in: "16x farmersdelight:hot_cocoa", out: S(5) },
        { in: "8x farmersdelight:tomato_sauce", out: S(3) },
        { in: "16x farmersdelight:apple_pie_slice", out: S(3) },
        { in: "16x farmersdelight:chocolate_pie_slice", out: S(4) },
        { in: "17x farmersdelight:sweet_berry_cheesecake_slice", out: S(3) },
        { in: "14x #kubejs:cake_slices", out: S(3) },
        { in: "64x farmersdelight:sweet_berry_cookie", out: S(2) },
        { in: "64x farmersdelight:honey_cookie", out: S(2) },
        { in: "64x minecraft:cookie", out: S(2) },
        { in: "16x farmersdelight:melon_popsicle", out: S(7) },
        { in: "16x farmersdelight:fruit_salad", out: S(7) },
        { in: "16x farmersdelight:mixed_salad", out: S(9) },
        { in: "16x farmersdelight:nether_salad", out: S(5) },
        { in: "16x farmersdelight:barbecue_stick", out: S(6) },
        { in: "16x farmersdelight:egg_sandwich", out: S(5) },
        { in: "16x farmersdelight:chicken_sandwich", out: S(9) },
        { in: "16x farmersdelight:bacon_sandwich", out: S(9) },
        { in: "16x farmersdelight:hamburger", out: S(11) },
        { in: "16x farmersdelight:mutton_wrap", out: S(10) },
        { in: "16x farmersdelight:dumplings", out: S(7) },
        { in: "16x farmersdelight:stuffed_potato", out: S(6) },
        { in: "16x farmersdelight:cabbage_rolls", out: S(5) },
        { in: "16x farmersdelight:beef_stew", out: S(8) },
        { in: "16x farmersdelight:chicken_soup", out: S(9) },
        { in: "16x minecraft:rabbit_stew", out: S(10) },
        { in: "16x minecraft:beetroot_soup", out: S(7) },
        { in: "16x minecraft:pumpkin_pie", out: S(6) },
        { in: "16x farmersdelight:vegetable_soup", out: S(9) },
        { in: "32x supplementaries:pancake", out: S(4) },
        { in: "16x farmersdelight:fish_stew", out: S(9) },
        { in: "16x farmersdelight:fried_rice", out: S(8) },
        { in: "16x farmersdelight:pumpkin_soup", out: S(12) },
        { in: "16x farmersdelight:baked_cod_stew", out: S(9) },
        { in: "16x farmersdelight:noodle_soup", out: S(9) },
        { in: "16x farmersdelight:pasta_with_meatballs", out: S(10) },
        { in: "16x farmersdelight:pasta_with_mutton_chop", out: S(10) },
        { in: "16x farmersdelight:roasted_mutton_chops", out: S(9) },
        { in: "16x farmersdelight:vegetable_noodles", out: S(10) },
        { in: "16x farmersdelight:steak_and_potatoes", out: S(9) },
        { in: "16x farmersdelight:ratatouille", out: S(9) },
        { in: "16x farmersdelight:squid_ink_pasta", out: S(11) },
        { in: "16x farmersdelight:roast_chicken", out: S(7) },
        { in: "16x farmersdelight:stuffed_pumpkin", out: S(9) },
        { in: "16x farmersdelight:honey_glazed_ham", out: S(7) },
        { in: "16x farmersdelight:shepherds_pie", out: S(7) },
        { in: "16x aquaculture:sushi", out: S(3) },
        { in: "16x create:sweet_roll", out: S(4) }
    ])

    let quota = 8
    profession("Fishing", 0x9DDFD3, 0xDBF6E9, [
        { in: `${quota}x minecraft:cod`, out: S(1) },
        { in: `${quota}x minecraft:salmon`, out: S(1) },
        { in: `${quota}x minecraft:pufferfish`, out: S(1) },
        { in: `${quota}x minecraft:tropical_fish`, out: S(1) },
        { in: `${quota}x aquaculture:atlantic_herring`, out: S(3) },
        { in: `${quota}x aquaculture:synodontis`, out: S(3) },
        { in: `${quota}x aquaculture:bluegill`, out: S(3) },
        { in: `${quota}x aquaculture:perch`, out: S(3) },
        { in: `${quota}x aquaculture:tambaqui`, out: S(3) },
        { in: `${quota}x aquaculture:minnow`, out: S(4) },
        { in: `${quota}x aquaculture:blackfish`, out: S(4) },
        { in: `${quota}x aquaculture:pink_salmon`, out: S(5) },
        { in: `${quota}x aquaculture:brown_trout`, out: S(5) },
        { in: `${quota}x aquaculture:carp`, out: S(5) },
        { in: `${quota}x aquaculture:pollock`, out: S(5) },
        { in: `${quota}x aquaculture:smallmouth_bass`, out: S(5) },
        { in: `${quota}x aquaculture:boulti`, out: S(5) },
        { in: `${quota}x aquaculture:red_shrooma`, out: S(5) },
        { in: `${quota}x aquaculture:brown_shrooma`, out: S(5) },
        { in: `${quota}x aquaculture:gar`, out: S(7) },
        { in: `${quota}x aquaculture:rainbow_trout`, out: S(7) },
        { in: `${quota}x aquaculture:bayad`, out: S(7) },
        { in: `${quota}x aquaculture:piranha`, out: S(7) },
        { in: `${quota}x aquaculture:jellyfish`, out: S(7) },
        { in: `${quota}x aquaculture:red_grouper`, out: S(7) },
        { in: `${quota}x aquaculture:atlantic_cod`, out: S(7) },
        { in: `${quota}x aquaculture:muskellunge`, out: S(8) },
        { in: `${quota}x aquaculture:pacific_halibut`, out: S(8) },
        { in: `${quota}x aquaculture:atlantic_halibut`, out: S(8) },
        { in: `${quota}x aquaculture:catfish`, out: S(10) },
        { in: `${quota}x aquaculture:capitaine`, out: S(10) },
        { in: `${quota}x aquaculture:tuna`, out: S(10) },
        { in: `${quota}x aquaculture:arapaima`, out: S(10) },
        { in: `${quota}x aquaculture:arrau_turtle`, out: S(10) },
        { in: `${quota}x aquaculture:box_turtle`, out: S(10) },
        { in: `${quota}x aquaculture:starshell_turtle`, out: S(10) },
        { in: `${quota}x aquaculture:goldfish`, out: S(10) },
        { in: "5x aquaculture:neptunium_ingot", out: S(16) }
    ])

    profession("Smithing", 0xFFC93C, 0xFF7A00, [
        { in: "minecraft:iron_boots", out: S(2) },
        { in: "minecraft:iron_leggings", out: S(4) },
        { in: "minecraft:iron_chestplate", out: S(4) },
        { in: "tconstruct:ingot_cast", out: S(2) },
        { in: "tconstruct:pick_head_cast", out: S(3) },
        { in: "tconstruct:gem_cast", out: S(4) },
        { in: "minecraft:iron_helmet", out: S(3) },
        { in: "minecraft:golden_boots", out: S(4) },
        { in: "minecraft:golden_leggings", out: S(7) },
        { in: "minecraft:golden_chestplate", out: S(8) },
        { in: "minecraft:golden_helmet", out: S(5) },
        { in: "minecraft:golden_apple", out: S(10) },
        { in: "32x minecraft:arrow", out: S(3) },
        { in: "minecraft:iron_sword", out: S(1) },
        { in: "minecraft:golden_sword", out: S(2) }
    ])

    trade("Exchange Currencies", 0xEBA83A, 0xF4F4F4, [
        { in: G(1), out: S(64) },
        { in: S(64), out: G(1) }
    ], true)

    let DATAGEN_QUESTS = false

    let data = []
    let group_max_width = []
    let current_group_max_width = 0
    let simulate = DATAGEN_QUESTS
    let entry_cost = 10

    let row = 0
    let col = 0
    let group = 0

    let next_group = () => {
        group++
        if (simulate)
            group_max_width.push(current_group_max_width)
        current_group_max_width = 0
        col = 0
        row++
    }

    let simple = (name, item, coin, unit, c1, c2) => {
        if (!simulate)
            trade(name, c1, c2, [{ in: unit(coin), out: item }])
        if (!DATAGEN_QUESTS)
            return

        current_group_max_width = Math.min(8, current_group_max_width + 1)
        if (simulate)
            return

        let silver = unit == S
        let split = item.split("x")
        let amount = split[0]
        let id = split.splice(1).join("x").replace(" ", "")
        let card_id = "kubejs:trade_card_" + name.toLowerCase().replace("'", "").split(" ").join("_")

        if (col > 7) {
            col = 0
            row++
        }

        let x = col - (group_max_width[group] - 1) / 2
        let y = row + group / 2
        col++

        let template = `
		{
            can_repeat: true
			title: "${amount}x ${name}"
			icon: "${id}"
			disable_toast: true
			x: ${x}d
			y: ${y}d
			shape: "hexagon"
			subtitle: "${coin} ${silver ? "Silver" : "Gold"}"
			tasks: [{
				type: "item"
				item: "thermal:silver_coin"
				icon: { id: "thermal:silver_coin", Count: ${entry_cost}b }
				count: ${entry_cost}L
			}]
			rewards: [
				{
					type: "item"
					item: "${card_id}"
				}
			]
		}`
        data.push(template)
    }

    while (true) {
        group = 0
        row = 0

        entry_cost = 10
        simple("Dirt", "16x minecraft:dirt", 2, S, 0x513825, 0xA87954)
        simple("Sand", "16x minecraft:sand", 4, S, 0xC2B289, 0xD8D6B9)
        simple("Gravel", "16x minecraft:gravel", 2, S, 0x686160, 0xA19393)
        simple("Clay", "16x minecraft:clay", 6, S, 0x878B95, 0x8E939D)
        simple("Ice", "16x minecraft:ice", 16, S, 0x7E99CF, 0xABB8D0)
        simple("Blackstone", "16x minecraft:blackstone", 12, S, 0x140E0F, 0x2D2831)
        simple("Grout", "16x tconstruct:grout", 12, S, 0x70737F, 0xAEB0B5)
        simple("Cobblestone", "16x minecraft:cobblestone", 1, S, 0x585858, 0x646363)
        simple("Granite", "16x minecraft:granite", 3, S, 0x563A2F, 0x9A6C5B)
        simple("Diorite", "16x minecraft:diorite", 3, S, 0x7F7F7F, 0xD4D4D4)
        simple("Andesite", "16x minecraft:andesite", 3, S, 0x5F5F5F, 0x8E8E8E)
        simple("Deepslate", "16x minecraft:deepslate", 12, S, 0x140E0F, 0x2D2831)
        simple("Limestone", "16x create:limestone", 3, S, 0xA7A89E, 0xC0C2BA)
        simple("Scoria", "16x create:scoria", 3, S, 0x2A130C, 0x553427)
        simple("Obsidian", "1x minecraft:obsidian", 8, S, 0x05030A, 0x36234C)
        simple("Cobbled Deepslate", "8x minecraft:cobbled_deepslate", 1, S, 0x4A4A4F, 0x737373)
        simple("Honeycomb Block", "16x minecraft:honeycomb_block", 2, S, 0xFCE17D, 0xE58A08)

        next_group()
        entry_cost = 10
        simple("Dead Log", "16x biomesoplenty:dead_log", 2, S, 0x3D362D, 0x7A756D)
        simple("Oak Log", "16x minecraft:oak_log", 4, S, 0x735932, 0xA88756)
        simple("Birch Log", "16x minecraft:birch_log", 4, S, 0xD6D6D2, 0xC4B079)
        simple("Spruce Log", "16x minecraft:spruce_log", 4, S, 0x523E21, 0x6F522F)
        simple("Jungle Log", "16x minecraft:jungle_log", 4, S, 0x5A501D, 0x9B6E4C)
        simple("Acacia Log", "16x minecraft:acacia_log", 4, S, 0x4F4B42, 0x9E552E)
        simple("Dark Oak Log", "16x minecraft:dark_oak_log", 4, S, 0x2C1B0D, 0x422B15)
        simple("Crimson Stem", "16x minecraft:crimson_stem", 8, S, 0x442332, 0x7A3852)
        simple("Warped Stem", "16x minecraft:warped_stem", 8, S, 0x3E1E2D, 0x347776)
        simple("Cherry Log", "16x minecraft:cherry_log", 8, S, 0xd6b8ad, 0x3a222c)

        next_group()
        entry_cost = 10
        simple("Iron Ingot", "8x minecraft:iron_ingot", 16, S, 0xA6A6A6, 0xD5D5D5)
        simple("Zinc Ingot", "8x create:zinc_ingot", 16, S, 0x616A60, 0xD0D2C5)
        simple("Copper Ingot", "8x minecraft:copper_ingot", 16, S, 0xDD7E5D, 0xFCEFBA)
        simple("Nickel Ingot", "8x thermal:nickel_ingot", 32, S, 0x977756, 0xE4D196)
        simple("Lead Ingot", "8x thermal:lead_ingot", 32, S, 0x232456, 0x7C95A4)
        simple("Gold Ingot", "8x minecraft:gold_ingot", 48, S, 0xD99413, 0xFAF25E)
        simple("Andesite Alloy", "16x create:andesite_alloy", 8, S, 0x505050, 0x878787)
        simple("Brass Ingot", "8x create:brass_ingot", 48, S, 0x6F3C2D, 0xFCF085)
        simple("Invar Ingot", "4x thermal:invar_ingot", 64, S, 0x406D6C, 0xC3CAC1)

        entry_cost = 10
        simple("Coal", "16x minecraft:coal", 4, S, 0x1C1C1E, 0x383D45)
        simple("Flint", "16x minecraft:flint", 4, S, 0x3C3B3B, 0xA6A6A6)
        simple("Cinnabar", "4x thermal:cinnabar", 16, S, 0xFC7781, 0xFCCED0)
        simple("Redstone Dust", "16x minecraft:redstone", 8, S, 0xA80F01, 0xFC7781)
        simple("Diamond", "1x minecraft:diamond", 1, G, 0x20C3B3, 0xD2FCF3)
        simple("Lapis Lazuli", "8x minecraft:lapis_lazuli", 32, S, 0x335DC1, 0x7395E7)
        simple("Emerald", "1x minecraft:emerald", 1, G, 0x00A82B, 0xADFACB)
        simple("Amethyst", "8x minecraft:amethyst_shard", 32, S, 0xBC96AA, 0x523A7E)
        simple("Sulfur", "4x thermal:sulfur", 8, S, 0xC7A94A, 0xEEF071)
        simple("Apatite", "4x thermal:apatite", 8, S, 0x27A9BB, 0x2CC7C9)
        simple("Niter", "4x thermal:niter", 8, S, 0x735A65, 0xB8AFAF)
        simple("Nether Quartz", "8x minecraft:quartz", 24, S, 0xB19E8F, 0xE7E2DB)
        simple("Certus Quartz", "8x ae2:certus_quartz_crystal", 24, S, 0x91C5FC, 0xA7CBCF)
        simple("Fluix Quartz", "8x ae2:fluix_crystal", 32, S, 0x8F5CCB, 0xFC7ED4)
        simple("Cured Rubber", "6x thermal:cured_rubber", 16, S, 0x3D363C, 0x594F55)
        simple("Bitumen", "1x thermal:bitumen", 8, S, 0x0B0909, 0x0B0909)


        next_group()
        entry_cost = 10
        simple("Scaffolding", "16x minecraft:scaffolding", 2, S, 0x7F5F41, 0xDDC683)
        simple("Wool", "1x minecraft:white_wool", 8, S, 0xBEC4C5, 0xE4E4E4)
        simple("Sponge", "1x minecraft:sponge", 16, S, 0x8F8234, 0xCDCF4A)
        simple("Cobweb", "1x minecraft:cobweb", 16, S, 0xC2CCCF, 0xFCFCFC)

        row += 4

        next_group()
        entry_cost = 10
        simple("Rice", "1x farmersdelight:rice_bag", 4, S, 0x9F7653, 0xCEC6BC)
        simple("Straw", "32x farmersdelight:straw", 8, S, 0x623A17, 0x966537)
        simple("Glowshroom", "4x biomesoplenty:glowshroom", 9, S, 0x2C65C9, 0x83A7B7)
        simple("Bramble", "4x biomesoplenty:bramble", 9, S, 0x8C3122, 0xECCDBC)
        simple("Barley", "4x biomesoplenty:barley", 4, S, 0xB78B44, 0xD8BC64)
        simple("Watergrass", "4x biomesoplenty:watergrass", 4, S, 0x43763D, 0x538B51)
        simple("Reed", "4x biomesoplenty:reed", 5, S, 0x7B4E35, 0xB2855C)
        simple("Clover Petal", "4x biomesoplenty:huge_clover_petal", 10, S, 0x5B8A4F, 0x6FA960)
        simple("Spanish Moss", "4x biomesoplenty:spanish_moss", 7, S, 0x395B2A, 0xA2C790)
        simple("Willow Vine", "4x biomesoplenty:willow_vine", 7, S, 0x265F0D, 0x317B10)
        simple("Cattail", "4x biomesoplenty:cattail", 4, S, 0x186B2B, 0x845738)
        simple("Sugar Cane", "4x minecraft:sugar_cane", 3, S, 0x688546, 0xC5FC85)
        simple("Kelp", "8x minecraft:kelp", 3, S, 0x5B8131, 0x58A92F)
        simple("Bamboo", "8x minecraft:bamboo", 5, S, 0x4F7416, 0x88AC5F)
        simple("Sweet Berries", "8x minecraft:sweet_berries", 11, S, 0x27613F, 0xA30700)
        simple("Glow Berries", "8x minecraft:glow_berries", 11, S, 0xB7A74F, 0x909223)
        simple("Vines", "4x minecraft:vine", 7, S, 0x183D08, 0x317B10)
        simple("Glow Lichen", "4x minecraft:glow_lichen", 4, S, 0x515D58, 0x729083)
        simple("Moss Block", "1x minecraft:moss_block", 8, S, 0x4D5B23, 0x6F902C)
        simple("Glowing Moss Block", "1x biomesoplenty:glowing_moss_block", 12, S, 0x144B6A, 0x153044)
        simple("Tree Fertilizer", "1x create:tree_fertilizer", 6, S, 0xCF8469, 0x71933A)
        simple("Sculk", "1x minecraft:sculk", 6, S, 0x073b60, 0xb2d39)
        simple("Pink Petals", "8x minecraft:pink_petals", 3, S, 0xFF69B4, 0xFFC0CB)
        simple("Big Dripleaf", "4x minecraft:big_dripleaf", 3, S, 0x228B22, 0x32CD32)

        next_group()
        entry_cost = 10
        simple("Daub", "16x supplementaries:daub", 5, S, 0xBFBAAA, 0xCBC8B6)
        simple("Clear Glass", "16x tconstruct:clear_glass", 4, S, 0xA9C3CF, 0xE8E8E8)
        simple("Copper Shingles", "16x create:copper_shingles", 3, S, 0xB5654B, 0xE4BB79)
        simple("Shale", "16x quark:shale", 3, S, 0x4b6468, 0x263234)
        simple("Myalite", "16x quark:myalite", 3, S, 0x3a1b5c, 0x622e9a)
        simple("Jasper", "16x quark:jasper", 3, S, 0x65382f, 0x482821)
        simple("Algal Bricks", "32x architects_palette:algal_bricks", 6, S, 0x292926, 0x3D4D48)
        simple("Olivestone Bricks", "32x architects_palette:olivestone_bricks", 8, S, 0x3A3C2E, 0x57553E)
        simple("Sunmetal", "32x architects_palette:sunmetal_block", 8, S, 0x603E38, 0xB48764)
        simple("Plating Block", "32x architects_palette:plating_block", 8, S, 0x222225, 0x39383C)
        simple("Twisted Planks", "32x architects_palette:twisted_planks", 8, S, 0x5E5259, 0x72616B)
        simple("Osseous Bricks", "32x architects_palette:osseous_bricks", 8, S, 0x9D976F, 0xD3D0BF)
        simple("Seared Stone", "16x tconstruct:seared_stone", 32, S, 0x393734, 0x59534F)
        simple("Scorched Stone", "16x tconstruct:scorched_stone", 32, S, 0x382C25, 0x4C3F37)

        simple("Lantern", "1x minecraft:lantern", 1, S, 0x484F64, 0xF6C765)
        simple("Soul Lantern", "1x minecraft:soul_lantern", 1, S, 0x1c8c94, 0x333343)

        next_group()
        entry_cost = 10
        simple("Slime Ball", "4x minecraft:slime_ball", 24, S, 0x4F7E48, 0x8AD480)
        simple("String", "4x minecraft:string", 5, S, 0x2E4446, 0xD8D8D8)
        simple("Feather", "4x minecraft:feather", 6, S, 0xD0D0D0, 0xFCFCFC)
        simple("Gunpowder", "4x minecraft:gunpowder", 7, S, 0x535353, 0x717171)
        simple("Leather", "4x minecraft:leather", 8, S, 0x873A25, 0xC45B34)
        simple("Ink Sac", "4x minecraft:ink_sac", 8, S, 0x493F49, 0x786470)
        simple("Glow Ink Sac", "2x minecraft:glow_ink_sac", 8, S, 0x29807E, 0x5AB488)
        simple("Experience", "1x minecraft:experience_bottle", 8, S, 0x689AC7, 0xFFF2FF)
        simple("Shulker Shell", "1x minecraft:shulker_shell", 2, G, 0x6B476A, 0x956895)
        simple("Spider Eye", "4x minecraft:spider_eye", 10, S, 0x64062A, 0xC25E6A)
        simple("Ender Pearl", "1x minecraft:ender_pearl", 48, S, 0x0B4C41, 0x2BCBAF)
        simple("Rotten Flesh", "4x minecraft:rotten_flesh", 3, S, 0xB24320, 0x695C18)
        simple("Blaze Rod", "1x minecraft:blaze_rod", 20, S, 0xAC3B00, 0xD5AC26)
        simple("Bone", "4x minecraft:bone", 8, S, 0xC9C4A3, 0xC9C4A3)
        simple("Prismarine Shard", "4x minecraft:prismarine_shard", 16, S, 0x2F6355, 0x8FC0AA)
        simple("Prismarine Crystals", "4x minecraft:prismarine_crystals", 24, S, 0x71A296, 0xDCE6D9)

        entry_cost = 10
        simple("Witch Hat", "1x reliquary:witch_hat", 1, G, 0x424242, 0x568125)
        simple("Zombie heart", "1x reliquary:zombie_heart", 32, S, 0x532B38, 0x8D584A)
        simple("Squid Beak", "1x reliquary:squid_beak", 32, S, 0x00613B, 0x5BCDA1)
        simple("Rib Bone", "1x reliquary:rib_bone", 32, S, 0xDFDDCE, 0xFAF9E9)
        simple("Catalyzing Gland", "1x reliquary:catalyzing_gland", 48, S, 0x268E23, 0x63CA52)
        simple("Chelicerae", "1x reliquary:chelicerae", 32, S, 0x251721, 0x4D0C3B)
        simple("Slime Pearl", "1x reliquary:slime_pearl", 48, S, 0x1B9D33, 0x84F58E)
        simple("Bat Wing", "1x reliquary:bat_wing", 2, G, 0x464646, 0x6D6D6D)
        simple("Withered Rib", "1x reliquary:withered_rib", 2, G, 0x2A2E2E, 0x434949)
        simple("Molten Core", "1x reliquary:molten_core", 48, S, 0xED7102, 0xFAFC58)
        simple("Eye of the Storm", "1x reliquary:eye_of_the_storm", 2, G, 0xFCD607, 0x96FC52)
        simple("Frozen Core", "1x reliquary:frozen_core", 48, S, 0x008DC2, 0x7571FB)
        simple("Nebulous Heart", "1x reliquary:nebulous_heart", 1, G, 0x6200A0, 0xE500C3)
        simple("Guardian Spike", "1x reliquary:guardian_spike", 1, G, 0x7F4215, 0xE29964)
        simple("Breeze Rod", "1x trials:breeze_rod", 24, S, 0x44557B, 0x96899E)
        simple("Blaze Cake", "1x create:blaze_cake", 16, S, 0x834141, 0xFCE083)
        next_group()

        if (!DATAGEN_QUESTS)
            break
        if (!simulate)
            break
        simulate = false
    }


    if (DATAGEN_QUESTS) {
        console.log("QUEST PASTER:")
        console.log(data.join(""))
        console.log(":QUEST PASTER END")
    }

})
