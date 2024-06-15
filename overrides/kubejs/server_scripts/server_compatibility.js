// Addon Compatibility Script for CABIN
// These are for mods that are not installed by default, sections of this script will enable if the applicable mod is installed.
// With how many create addons there are, it would not be feasible for me to add compat for them all.
// If you have a create addon that you think could fit in the general theme/tone/whathaveyou of CABIN, make a PR with it.

onEvent('recipes', event => {
    let machine = (machinename, id, amount, other_ingredient) => {
        event.remove({ output: id })
        var machine_item = 'kubejs:' + machinename + '_machine';
        if (machinename === 'invar') {
            machine_item = 'thermal:machine_frame'
        }
        if (machinename === 'fluix') {
            machine_item = 'ae2:controller'
        }
        if (other_ingredient) {
            event.smithing(Item.of(id, amount), machine_item, other_ingredient)
            event.recipes.createMechanicalCrafting(Item.of(id, amount), 'AB', { A: machine_item, B: other_ingredient })
        }
        else
            event.stonecutting(Item.of(id, amount), machine_item)
    }

    //	if (Platform.isLoaded('YourModID')) {                                    // Mod ID goes here
    //		machine('andesite','minecraft:dirt', 1)                              // Recipes without an additional item will be stonecutting (saw) recipes
    //		machine('copper','minecraft:dispenser', 2, 'minecraft:bow')          // Recipes with one are smithing table recipes
    //
    //      event.shapeless("create:creative_crate", "minecraft:redstone_ore")]) // If you have any other recipes, put them following the machine recipes
    //}

    if (Platform.isLoaded('sliceanddice')) {
        machine('andesite', 'sliceanddice:slicer', 1, '#farmersdelight:tools/knives')
        machine('copper', 'sliceanddice:sprinkler', 1, 'createdeco:copper_trapdoor')
    }

    if (Platform.isLoaded('createbigcannons')) {
        machine('andesite', 'createbigcannons:yaw_controller', 1)
        machine('andesite', 'createbigcannons:cannon_builder', 1, 'create:mechanical_bearing')
        machine('andesite', 'createbigcannons:cannon_loader', 1, 'create:mechanical_piston')
        machine('andesite', 'createbigcannons:cannon_drill', 1, 'create:fluid_tank')
    }

    if (Platform.isLoaded('createaddition')) {
        machine('andesite', 'createaddition:rolling_mill', 1, 'create:shaft')
        machine('brass', 'createaddition:portable_energy_interface', 2)
        machine('brass', 'createaddition:tesla_coil', 1, 'createaddition:copper_spool')
        machine('brass', 'createaddition:modular_accumulator', 1, 'thermal:energy_cell_frame')

        event.replaceOutput({}, '#forge:nuggets/electrum', 'createaddition:electrum_nugget')
        event.replaceOutput({}, '#forge:ingots/electrum', 'createaddition:electrum_ingot')
        event.replaceOutput({}, '#forge:plates/electrum', 'createaddition:electrum_sheet')
        event.replaceOutput({}, '#forge:dusts/diamond', 'thermal:diamond_dust')

        event.replaceOutput({ id: 'kubejs:machines/smelter/electrum_ingot' }, 'thermal:electrum_ingot', 'createaddition:electrum_ingot')

        // Duplicate Items
        //event.remove({ id: 'createaddition:electrum_ingot'})
        event.remove({ id: 'createaddition:crafting/electrum_nugget' })
        event.remove({ output: 'createaddition:zinc_sheet' })

        // Bugged Recipe
        event.replaceInput({ id: 'createaddition:pressing/electrum_ingot' }, 'thermal:constantan_ingot', '#forge:ingots/electrum')

        // Motor & Alternator
        // event.remove({ output: 'createaddition:electric_motor'})
        // event.remove({ output: 'createaddition:alternator'})
        machine('invar', 'createaddition:electric_motor', 1, 'createaddition:tesla_coil')
        machine('enderium', 'createaddition:alternator', 1, 'createaddition:electric_motor')

        // Remove
        event.remove({ output: 'createaddition:capacitor' })

        // Relay
        event.remove({ output: 'createaddition:redstone_relay' })
        event.smithing('createaddition:redstone_relay', 'projectred_core:platformed_plate', 'createaddition:connector')
        event.recipes.createMechanicalCrafting('createaddition:redstone_relay', 'AB', { A: 'projectred_core:platformed_plate', B: 'createaddition:connector' })

        // Remove heated basin ingot recipes
        event.remove({ id: "createaddition:mixing/electrum" })
        event.remove({ id: /createaddition:compat\/tconstruct/ })

        // Connectors
        event.remove({ id: "createaddition:crafting/small_connector_copper" })
        event.remove({ id: "createaddition:crafting/large_connector_gold" })
        event.remove({ id: "createaddition:crafting/large_connector_electrum" })
        event.recipes.createSequencedAssembly(
            [Item.of('createaddition:connector', 4)],
            'create:andesite_alloy',
            [
                event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:rods/copper']),
                event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:plates/iron']),
                event.recipes.createPressing('kubejs:incomplete_connector', 'kubejs:incomplete_connector')
            ]
        ).transitionalItem('kubejs:incomplete_connector').loops(1)

        event.recipes.createSequencedAssembly(
            [Item.of('createaddition:large_connector', 1)],
            'create:andesite_alloy',
            [
                event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:rods/electrum']),
                event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:plates/iron']),
                event.recipes.createPressing('kubejs:incomplete_connector', 'kubejs:incomplete_connector'),
                event.recipes.createDeploying('kubejs:incomplete_connector', ['kubejs:incomplete_connector', '#forge:plates/iron']),
                event.recipes.createPressing('kubejs:incomplete_connector', 'kubejs:incomplete_connector')
            ]
        ).transitionalItem('kubejs:incomplete_large_connector').loops(1)
    }

    if (Platform.isLoaded('create_enchantment_industry')) {
        machine('copper', 'create_enchantment_industry:disenchanter', 1, '#create:sandpaper')
        machine('copper', 'create_enchantment_industry:printer', 1, '#forge:storage_blocks/lapis')

        event.replaceInput({ id: 'create_enchantment_industry:crafting/enchanting_guide' }, 'create:sturdy_sheet', 'create:schedule')
    }

    if (Platform.isLoaded('miners_delight')) {
        event.remove({ id: 'miners_delight:cutting/bat_wing' })
    }

    if (Platform.isLoaded('create_edible_belts')) {
        event.remove({ id: 'create_edible_belts:embrecipe' })
    }
})
