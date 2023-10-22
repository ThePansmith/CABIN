onEvent('rei.hide.items', event => {
  let coinhide = (name) => {
    event.hide('thermal:' + name + '_coin')  
    event.hide('createdeco:' + name + '_coin')  
    event.hide('createdeco:' + name + '_coinstack')  
    }
    coinhide('iron')
    coinhide('copper')
    coinhide('netherite')
    coinhide('tin')
    coinhide('lead')
    coinhide('nickel')
    coinhide('electrum')
    coinhide('invar')
    coinhide('constantan')
    coinhide('signalum')
    coinhide('lumium')
    coinhide('enderium')
    coinhide('brass')
    coinhide('bronze')
    coinhide('cast_iron')
    coinhide('zinc')
})

  onEvent('rei.group', event => {

    event.groupItemsByTag('supplementaries:rei_groups/hanging_signs', 'Sign Posts', 'supplementaries:hanging_signs')
    event.groupItemsByTag('supplementaries:rei_groups/sign_posts', 'Sign Posts', 'supplementaries:sign_posts')
    event.groupItemsByTag('tconstruct:rei_groups/modifiable', 'Tinkers Tools', 'tconstruct:modifiable')
    event.groupItemsByTag('tconstruct:rei_groups/parts', 'Tinkers Parts', 'tconstruct:parts')

    const useNbt = ['potion', 'enchanted_book', 'splash_potion', 'tipped_arrow', 'lingering_potion', 'reliquary:potion', 'reliquary:potion_essence', 'reliquary:splash_potion', 'reliquary:lingering_potion', 'reliquary:tipped_arrow', 'tconstruct:potion_bucket', 'tconstruct:crafting_station','tconstruct:tinker_station','tconstruct:part_builder', 'tconstruct:modifier_worktable', 'tconstruct:tinkers_anvil', 'tconstruct:scorched_anvil', 'tconstruct:repair_kit', 'chiselandbits:block_bit']
  
    useNbt.forEach(id => {
      const item = Item.of(id)
      const { namespace, path } = Utils.id(item.id)
      event.groupSameItem(`kubejs:rei_groups/${namespace}/${path}`, item.name, item)
    })
  


    event.groupItems('kubejs:rei_groups/microblocks', 'Microblocks', [
        /microblock/,
    ])

    event.groupItems('kubejs:rei_groups/buddycards', 'Buddy Cards', [
      /buddycard/
  ])

  event.groupItems('kubejs:rei_groups/fluidbuckets', 'Buckets of Fluids', [
    /bucket/
])

event.groupItems('kubejs:rei_groups/spawneggs', 'Spawn Eggs', [
  /spawn_egg/
])

event.groupItems('kubejs:rei_groups/tinkerstools', 'Spawn Eggs', [
  /spawn_egg/
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
    tooltip.add('createdeco:cast_iron_ingot', ['A building material that resembles Netherite.'])

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
  
    tooltip.add("magicfeather:magicfeather", [`§6Grants Creative Flight when in range of a beacon`]);
  
    tooltip.add("xreliquary:alkahestry_tome", [`§6Cannot be used in Mechanical Crafting`]);
  
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
  })

  onEvent('rei.remove.categories', event => {
  event.yeet('create:compacting')
  const category = ['beyond_earth:rocket_t2', 'beyond_earth:rocket_t3', 'beyond_earth:rocket_t4', 'beyond_earth:rover']
  category.forEach(id => {
    event.yeet(id)
  })
  })

  