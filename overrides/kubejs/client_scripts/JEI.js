onEvent('rei.group', event => {

	event.groupItemsByTag('supplementaries:rei_groups/hanging_signs', 'Sign Posts', 'supplementaries:hanging_signs')
	event.groupItemsByTag('supplementaries:rei_groups/sign_posts', 'Sign Posts', 'supplementaries:sign_posts')
	event.groupItemsByTag('tconstruct:rei_groups/modifiable', 'Tinkers Tools', 'tconstruct:modifiable')
	event.groupItemsByTag('tconstruct:rei_groups/parts', 'Tinkers Parts', 'tconstruct:parts')

	const useNbt = ['potion', 'enchanted_book', 'splash_potion', 'tipped_arrow', 'lingering_potion', 'reliquary:potion', 'reliquary:potion_essence', 'reliquary:splash_potion', 'reliquary:lingering_potion', 'reliquary:tipped_arrow', 'tconstruct:potion_bucket', 'tconstruct:crafting_station', 'tconstruct:tinker_station', 'tconstruct:part_builder', 'tconstruct:modifier_worktable', 'tconstruct:tinkers_anvil', 'tconstruct:scorched_anvil', 'tconstruct:repair_kit', 'chiselandbits:block_bit']

	useNbt.forEach(id => {
		const item = Item.of(id)
		const { namespace, path } = Utils.id(item.id)
		event.groupSameItem(`kubejs:rei_groups/${namespace}/${path}`, item.name, item)
	})



	event.groupItems('kubejs:rei_groups/microblocks', 'Microblocks', [
		/cb_microblock:microblock/
	])

	event.groupItems('kubejs:rei_groups/fluidbuckets', 'Buckets of Fluids', [
		/bucket/
	])

	event.groupItems('kubejs:rei_groups/spawneggs', 'Spawn Eggs', [
		/spawn_egg/,
		"supplementaries:red_merchant_spawn_egg"
	])

	event.groupItems('kubejs:rei_groups/dyed_smart_cables', 'Dyed Smart Cables', [
		'ae2:white_smart_cable',
		'ae2:orange_smart_cable',
		'ae2:magenta_smart_cable',
		'ae2:light_blue_smart_cable',
		'ae2:yellow_smart_cable',
		'ae2:lime_smart_cable',
		'ae2:pink_smart_cable',
		'ae2:green_smart_cable',
		'ae2:brown_smart_cable',
		'ae2:blue_smart_cable',
		'ae2:purple_smart_cable',
		'ae2:cyan_smart_cable',
		'ae2:light_gray_smart_cable',
		'ae2:gray_smart_cable',
		'ae2:red_smart_cable',
		'ae2:black_smart_cable'
	])
	
	event.groupItems('kubejs:rei_groups/dyed_covered_cables', 'Dyed Covered Cables', [
		'ae2:white_covered_cable',
		'ae2:orange_covered_cable',
		'ae2:magenta_covered_cable',
		'ae2:light_blue_covered_cable',
		'ae2:purple_covered_cable',
		'ae2:light_gray_covered_cable',
		'ae2:gray_covered_cable',
		'ae2:cyan_covered_cable',
		'ae2:pink_covered_cable',
		'ae2:lime_covered_cable',
		'ae2:yellow_covered_cable',
		'ae2:blue_covered_cable',
		'ae2:brown_covered_cable',
		'ae2:green_covered_cable',
		'ae2:red_covered_cable',
		'ae2:black_covered_cable'
	])

	event.groupItems('kubejs:rei_groups/dyed_glass_cables', 'Dyed Smart Cables', [
		'ae2:white_glass_cable',
		'ae2:gray_glass_cable',
		'ae2:pink_glass_cable',
		'ae2:lime_glass_cable',
		'ae2:yellow_glass_cable',
		'ae2:light_blue_glass_cable',
		'ae2:magenta_glass_cable',
		'ae2:orange_glass_cable',
		'ae2:cyan_glass_cable',
		'ae2:light_gray_glass_cable',
		'ae2:black_glass_cable',
		'ae2:purple_glass_cable',
		'ae2:blue_glass_cable',
		'ae2:brown_glass_cable',
		'ae2:green_glass_cable',
		'ae2:red_glass_cable'
	])

	event.groupItems('kubejs:rei_groups/dyed_glass_cables', 'Dyed Dense Cables', [
		'ae2:white_covered_dense_cable',
		'ae2:gray_covered_dense_cable',
		'ae2:pink_covered_dense_cable',
		'ae2:lime_covered_dense_cable',
		'ae2:brown_covered_dense_cable',
		'ae2:green_covered_dense_cable',
		'ae2:red_covered_dense_cable',
		'ae2:black_covered_dense_cable',
		'ae2:light_gray_covered_dense_cable',
		'ae2:orange_covered_dense_cable',
		'ae2:magenta_covered_dense_cable',
		'ae2:cyan_covered_dense_cable',
		'ae2:purple_covered_dense_cable',
		'ae2:light_blue_covered_dense_cable',
		'ae2:yellow_covered_dense_cable',
		'ae2:blue_covered_dense_cable'
	])

	event.groupItems('kubejs:rei_groups/dyed_glass_cables', 'Dyed Dense Smart Cables', [
		'ae2:orange_smart_dense_cable',
		'ae2:white_smart_dense_cable',
		'ae2:gray_smart_dense_cable',
		'ae2:light_gray_smart_dense_cable',
		'ae2:pink_smart_dense_cable',
		'ae2:lime_smart_dense_cable',
		'ae2:yellow_smart_dense_cable',
		'ae2:light_blue_smart_dense_cable',
		'ae2:cyan_smart_dense_cable',
		'ae2:magenta_smart_dense_cable',
		'ae2:purple_smart_dense_cable',
		'ae2:brown_smart_dense_cable',
		'ae2:blue_smart_dense_cable',
		'ae2:green_smart_dense_cable',
		'ae2:red_smart_dense_cable',
		'ae2:black_smart_dense_cable'
	])

	event.groupItems('kubejs:rei_groups/buddycards_base_set', 'Buddy Cards Base Set', [
		/buddycards:buddycard_base/
	])

	event.groupItems('kubejs:rei_groups/buddycards_nether_set', 'Buddy Cards Nether Set', [
		/buddycards:buddycard_nether/
	])

	event.groupItems('kubejs:rei_groups/buddycards_end_set', 'Buddy Cards End Set', [
		/buddycards:buddycard_end/
	])

	event.groupItems('kubejs:rei_groups/buddycards_create_set', 'Buddy Cards Create Set', [
		/buddycardsexp:buddycard_create/
	])

	event.groupItems('kubejs:rei_groups/buddycards_aquaculture_set', 'Buddy Cards Aquaculture Set', [
		/buddycardsexp:buddycard_aquaculture/
	])

	event.groupItems("kubejs:rei_groups/buddycards_farmers_set", "Buddy Cards Farmer's Set", [
		/buddycardsexp:buddycard_farmers/
	])

	event.groupItems('kubejs:rei_groups/buddycards_malum_set', 'Buddy Cards Malum Set', [
		/buddycardsexp:buddycard_malum/
	])

	event.groupItems('kubejs:rei_groups/buddycards_holiday', 'Buddy Cards Holiday', [
		"buddycards:buddycard_holiday1",
		"buddycards:buddycard_holiday2",
		"buddycards:buddycard_holiday3",
		"buddycards:buddycard_holiday4",
		"buddycards:buddycard_holiday5",
		"buddycards:buddycard_holiday6",
		/buddycards:buddycard_holiday/
	])

})

  onEvent('item.tooltip', tooltip => {
    let holds = (id, slots) => tooltip.add("metalbarrels:" + id + "_barrel", [`§7${slots} Slots`])
    let main_assembly = (id, stage) => tooltip.add(id, [`§7Main Assembly: ${stage == "4" ? "§6Finale" : "§6Chapter " + stage}`, '§8Consider automating this item'])
    let bonus_assembly = (id, stage) => tooltip.add(id, [`§7Bonus Assembly: §6Chapter ${stage}`])
    let not_consumed = (id, stage) => tooltip.add(id, [`§7Not consumed in the`, `§7Assembly Process`])

    tooltip.add("minecraft:redstone_ore", [`§7Does not generate, crush Cinnabar to obtain Redstone.`]);
    tooltip.add("minecraft:deepslate_redstone_ore", [`§7Does not generate, crush Cinnabar to obtain Redstone.`]);
    tooltip.add('supplementaries:ash', ['Created by burning wooden materals in-world'])
	  tooltip.add('storagedrawers:controller', ['Allows automation to insert and extract from connected drawers'])
	  tooltip.add('storagedrawers:controller_slave', ['Serves as a extra point for automation to insert and extract items from if a drawer controller is present.'])

    holds('copper', 5 * 9)
    holds('iron', 6 * 9)
    holds('silver', 8 * 9)
    holds('gold', 9 * 9)
  
    main_assembly('kubejs:kinetic_mechanism', "1")
    bonus_assembly('kubejs:sealed_mechanism', "1A")
    bonus_assembly('kubejs:reinforced_mechanism', "1B")
    main_assembly('create:precision_mechanism', "2")
    bonus_assembly('kubejs:infernal_mechanism', "2A")
    main_assembly('kubejs:inductive_mechanism', "3")
    bonus_assembly('kubejs:abstruse_mechanism', "3A")
    main_assembly('kubejs:calculation_mechanism', "4")
  
    not_consumed('cb_microblock:stone_saw')
    not_consumed('cb_microblock:iron_saw')
    not_consumed('cb_microblock:diamond_saw')
    not_consumed('projectred-core:screwdriver')
    // not_consumed('create:super_glue')
    not_consumed('kubejs:chromatic_resonator')
    not_consumed('kubejs:flash_drive')
    // not_consumed('xreliquary:mercy_cross')
    // not_consumed('xreliquary:ender_staff')
  
    global.substrates[0].forEach(e => tooltip.add(e.id, [`§8Category: §7Igneous`]));
    global.substrates[1].forEach(e => tooltip.add(e.id, [`§8Category: §7Herbal`]));
    global.substrates[2].forEach(e => tooltip.add(e.id, [`§8Category: §7Volatile`]));
    global.substrates[3].forEach(e => tooltip.add(e.id, [`§8Category: §7Crystalline`]));
    global.substrates[4].forEach(e => tooltip.add(e.id, [`§8Category: §7Metallurgic`]));
    global.substrates[5].forEach(e => tooltip.add(e.id, [`§8Category: §7Gemstone`]));
    global.substrates[6].forEach(e => tooltip.add(e.id, [`§8Category: §7Catalyst`]));
  
    tooltip.add("structurescompass:structures_compass", [`§7Right-Click to Activate`]);
    tooltip.add("reliquary:alkahestry_tome", [`§6Cannot be used in Mechanical Crafting or Mixing`]);
  
    tooltip.add("kubejs:accellerator_redstone", ["§7When used in Alchemy Research:", "  §6One of the §ecorrect §6Reagents",
      "  §6in §eincorrect §6slots will not be consumed"]);
    tooltip.add("kubejs:accellerator_glowstone", ["§7When used in Alchemy Research:", "  §6One of the §ecorrect §6Reagents",
      "  §6in §ecorrect §6slots will not be consumed"]);
  
    for (let i = 0; i < 15; i++) {
      tooltip.add(`kubejs:failed_alchemy_${i}`, [
        "§7Place in Centrifugal Separator to analyse.",
        "",
        "§6Yields",
        "- Ash §7for each incorrect ingredient",
        "- Redstone §7for each correct ingredient",
        "   §7in an incorrect slot",
        "- Glowstone §7for each correct ingredient",
        "   §7in the correct slot"
      ])
    }
    const pureore = ['minecraft:raw_iron', 'minecraft:raw_copper', 'minecraft:raw_gold', 'thermal:raw_lead', 'thermal:raw_nickel', 'create:raw_zinc']
    pureore.forEach(pureore => {
    tooltip.add(pureore, [`§7A purer grade of ore`,`§7Can only be found by exploring`])
    })
  })

  onEvent('rei.remove.categories', event => {
  const category = ['beyond_earth:rocket_t2', 'beyond_earth:rocket_t3', 'beyond_earth:rocket_t4', 'beyond_earth:rover', 'beyond_earth:space_station']
  category.forEach(id => {
    event.yeet(id)
  })
  })

  