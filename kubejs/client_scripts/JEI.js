ClientEvents.highPriorityAssets(event=>{
    let json = {
        added: [
            {
                "stack": "item:minecraft:bundle",
                "after": "item:minecraft:recovery_compass"
            },
            {
                "stack": "item:create:chromatic_compound",
                "after": "item:create:brass_ingot"
            },
            {
                "stack": "item:create:refined_radiance",
                "after": "item:create:chromatic_compound"
            },
            {
                "stack": "item:create:shadow_steel",
                "after": "item:create:refined_radiance"
            },
            {
                "stack": "item:tconstruct:tinkers_anvil{'texture':'create:zinc_block'}",
                "after": "item:tconstruct:modifier_worktable"
            },
            {
                "stack": "item:tconstruct:scorched_anvil{'texture':'create:zinc_block'}",
                "after": "item:tconstruct:tinkers_anvil"
            }
        ]
    }
    event.add("emi:index/stacks/kubejs_added_stacks", json)

    // Hide Multiblock'd strainer category since it doesn't play well with EMI
    json = {
        "filters": [
            {
                "category": "mbd2:strainer"
            }
        ]
    }
    event.add("emi:recipe/filters/strainer", json)
})

// JEIEvents.groupEntries( event => {

// event.groupItemsByTag('kubejs:rei_groups/supplementaries/hanging_signs', 'Sign Posts', 'supplementaries:hanging_signs')
// event.groupItemsByTag('kubejs:rei_groups/supplementaries/sign_posts', 'Sign Posts', 'supplementaries:sign_posts')

// trades cards need a rework first
// event.groupItemsByTag('kubejs:rei_groups/kubejs/transaction_cards/profession', 'Trade Card: Profession', "kubejs:transaction_cards/profession")
// event.groupItemsByTag('kubejs:rei_groups/kubejs/transaction_cards/import', 'Trade Card: Import', "kubejs:transaction_cards/import")


// 	const useNbt = [
//     'reliquary:potion',
//     'reliquary:potion_essence',
//     'reliquary:splash_potion',
//     'reliquary:lingering_potion',
//     'reliquary:tipped_arrow',
//     'tconstruct:crafting_station',
//     'tconstruct:tinker_station',
//     'tconstruct:part_builder',
//     'tconstruct:modifier_worktable',
//     'tconstruct:tinkers_anvil',
//     'tconstruct:scorched_anvil',
//     'tconstruct:seared_drain',
//     'tconstruct:seared_duct',
//     'tconstruct:seared_chute',
//     'tconstruct:scorched_drain',
//     'tconstruct:scorched_duct',
//     'tconstruct:scorched_chute',
//     'tconstruct:smeltery_controller',
//     'tconstruct:foundry_controller',
//     'tconstruct:repair_kit',
//     'tconstruct:slime_helmet'
//   ]

// 	useNbt.forEach(id => {
// 		const item = Item.of(id)
// 		const { namespace, path } = Utils.id(item.id)
// 		event.groupSameItem(`kubejs:rei_groups/${namespace}/${path}`, item.name, item)
// 	})

// 	event.groupSameItem('kubejs:rei_groups/microblocks', 'Microblocks', "cb_microblock:microblock")

// 	event.groupItems('kubejs:rei_groups/fluidbuckets', 'Buckets of Fluids', [
// 		/bucket/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_base_set', 'Buddy Cards Base Set', [
// 		/buddycards:buddycard_base/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_nether_set', 'Buddy Cards Nether Set', [
// 		/buddycards:buddycard_nether/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_end_set', 'Buddy Cards End Set', [
// 		/buddycards:buddycard_end/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_create_set', 'Buddy Cards Create Set', [
// 		/buddycardsexp:buddycard_create/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_aquaculture_set', 'Buddy Cards Aquaculture Set', [
// 		/buddycardsexp:buddycard_aquaculture/
// 	])

// 	event.groupItems("kubejs:rei_groups/buddycards_farmers_set", "Buddy Cards Farmer's Set", [
// 		/buddycardsexp:buddycard_farmers/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_malum_set', 'Buddy Cards Malum Set', [
// 		/buddycardsexp:buddycard_malum/
// 	])

// 	event.groupItems('kubejs:rei_groups/buddycards_holiday', 'Buddy Cards Holiday', [
// 		"buddycards:buddycard_holiday1",
// 		"buddycards:buddycard_holiday2",
// 		"buddycards:buddycard_holiday3",
// 		"buddycards:buddycard_holiday4",
// 		"buddycards:buddycard_holiday5",
// 		"buddycards:buddycard_holiday6",
// 		/buddycards:buddycard_holiday/
// 	])

// })
