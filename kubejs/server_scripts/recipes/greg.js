ServerEvents.recipes(event => {
    // 3am code that would make yandev proud
    const tiers = ['lv', 'mv', 'hv', 'ev', 'iv', 'luv', 'zpm', 'uv'];
    const machines = [
        'electric_furnace', 'alloy_smelter', 'arc_furnace', 'assembler', 'autoclave', 'bender', 'brewery', 'canner',
        'centrifuge', 'chemical_bath', 'chemical_reactor', 'compressor', 'cutter', 'distillery', 'electrolyzer',
        'electromagnetic_separator', 'extractor', 'extruder', 'fermenter', 'fluid_heater', 'fluid_solidifier',
        'forge_hammer', 'forming_press', 'lathe', 'scanner', 'mixer', 'ore_washer', 'packer', 'polarizer',
        'laser_engraver', 'sifter', 'thermal_centrifuge', 'wiremill', 'circuit_assembler', 'macerator',
        'gas_collector'
    ];

    const specialMachines = [
        ['extruder', 'electric_piston'],
        ['assembler', 'robot_arm'],
        ['chemical_reactor', 'electric_pump'],
        ['laser_engraver', 'emitter'],
        ['scanner', 'sensor'],
        ['mixer', 'electric_motor'],
    ];

    function createMachinesForTiers(event, tiers, machines) {
        tiers.forEach((tier, index) => {
            machines.forEach(machine => {
                if (machine === 'circuit_assembler' && index < tiers.length - 1) {
                    let nextTier = tiers[index + 1];
                    createMachine(`gtceu:${tier}_machine_hull`, event, `gtceu:${tier}_${machine}`, `#gtceu:circuits/${nextTier}`);
                } else {
                    let specialMachine = specialMachines.find(([specialMachine]) => specialMachine === machine);
                    if (specialMachine) {
                        let [outputMachine, secondaryItem] = specialMachine;
                        createMachine(`gtceu:${tier}_machine_hull`, event, `gtceu:${tier}_${outputMachine}`, `gtceu:${tier}_${secondaryItem}`);
                    } else {
                        let machineId = `gtceu:${tier}_${machine}`;
                        createMachine(`gtceu:${tier}_machine_hull`, event, machineId);
                    }
                }
            });
        });
    }

    function createSpecialMachines(event) {
        const specialTiers = ['lv', 'mv', 'hv'];
        const shortmachines = ['rock_crusher', 'air_scrubber', 'combustion', 'steam_turbine', 'gas_turbine', 'item_collector', 'pump'];

        specialTiers.forEach(tier => {
            shortmachines.forEach(machine => {
                let specmachineId = `gtceu:${tier}_${machine}`;
                createMachine(`gtceu:${tier}_machine_hull`, event, specmachineId);
            });
        });
    }

    createMachine(`gtceu:ev_machine_hull`, event, 'gtceu:ev_item_collector');
    createMachine(`gtceu:ev_machine_hull`, event, 'gtceu:ev_pump');
    createMachinesForTiers(event, tiers, machines);
    createSpecialMachines(event);

    const steamtiers = ['lp', 'hp'];
    let steammachines = [
        'steam_solid_boiler', 'steam_liquid_boiler', 'steam_solar_boiler',
        'steam_extractor', 'steam_macerator', 'steam_compressor',
        'steam_forge_hammer', 'steam_furnace', 'steam_alloy_smelter',
        'steam_rock_crusher', 'steam_miner'
    ];

    steamtiers.forEach(steamtier => {
        steammachines.forEach(steammachine => {
            createMachine('gtceu:bronze_brick_casing', event, `gtceu:${steamtier}_${steammachine}`);
        });
    });

    event.replaceInput({id: "gtceu:shaped/bronze_bricks_hull"}, 'minecraft:bricks', 'ad_astra:moon_stone_bricks')
    event.replaceInput({id: "gtceu:shaped/steel_bricks_hull"}, 'minecraft:bricks', 'ad_astra:moon_stone_bricks')


    tiers.forEach(tier => {
        event.remove({ output: `gtceu:${tier}_machine_hull` })
        event.shapeless(`gtceu:${tier}_machine_hull`, [`#gtceu:circuits/${tier}`, `gtceu:${tier}_machine_casing`, `#gtceu:circuits/${tier}`])
    });

    event.remove({ type: "gtceu:primitive_blast_furnace", output: "gtceu:steel_ingot" })
    event.remove({ type: "gtceu:primitive_blast_furnace", output: "gtceu:steel_ingot" })
    event.remove({ type: "gtceu:electric_blast_furnace", output: "gtceu:steel_ingot" })
    event.remove({ id: /fireclay/ })
    event.remove({ output: ["gtceu:firebrick", "gtceu:firebricks", "gtceu:primitive_blast_furnace"] })

    event.recipes.create.mixing(("3x gtceu:steel_ingot"), ["#forge:ingots/iron", "2x ad_astra:moon_sand"]).superheated()
    event.recipes.create.mixing(("3x gtceu:steel_ingot"), ["#forge:ingots/wrought_iron", "2x ad_astra:moon_sand"]).superheated()

    // Handmade rubber - no match for the power of the factory
    event.shaped("gtceu:rubber_plate", [
        " H ",
        " R ",
        " R "
    ], {
        H: "#forge:tools/hammers",
        R: "gtceu:sticky_resin"
    })

    // Compressor rubber - better, but not perfect - that's chemical reactor rubber
    event.recipes.gtceu.compressor("compressor_rubber_sheet")
        .itemInputs("gtceu:sticky_resin")
        .itemOutputs("gtceu:rubber_plate")
        .duration(20)
        .EUt(8)

    // Monify LV motors
    event.remove({ id: "gtceu:shaped/electric_motor_lv_steel" })
    event.remove({ id: "gtceu:shaped/electric_motor_lv_iron" })
    event.remove({ id: "gtceu:assembler/electric_motor_lv_steel" })
    event.remove({ id: "gtceu:assembler/electric_motor_lv_iron" })

    event.shaped("gtceu:lv_electric_motor", [
        "CWR",
        "WMW",
        "RWC"
    ], {
        C: "gtceu:tin_single_cable",
        W: "gtceu:fine_copper_wire",
        R: "gtceu:iron_rod",
        M: "gtceu:magnetic_iron_rod"
    })

    event.recipes.gtceu.assembler("lv_motor")
        .itemInputs("2x gtceu:tin_single_cable", "2x gtceu:iron_rod", "gtceu:magnetic_iron_rod", "4x gtceu:fine_copper_wire")
        .itemOutputs("gtceu:lv_electric_motor")
        .duration(100)
        .EUt(30)

    // Glass tube
    event.shaped("gtceu:glass_tube", [
        "   ",
        "PPP",
        "PPP"
    ], {
        P: "#forge:glass_panes"
    }).id("kubejs:glass_tube")

    // Monified distill tower
    event.shaped("gtceu:distillation_tower", [
        "LPL",
        "CHC",
        "LPL"
    ], {
        L: "gtceu:stainless_steel_large_fluid_pipe",
        P: "gtceu:hv_electric_pump",
        C: "#gtceu:circuits/hv",
        H: "gtceu:hv_machine_hull"
    }).id("gtceu:shaped/distillation_tower")

    // GT Steam Age
    const gtMachines = ["extractor", "macerator", "compressor", "forge_hammer", "furnace", "alloy_smelter"]
    gtMachines.forEach(machine => {
        event.remove({ output: [`gtceu:lp_steam_${machine}`, `gtceu:hp_steam_${machine}`] })
    })

    event.replaceInput({ input: "gtceu:wood_plate" }, "gtceu:wood_plate", "#minecraft:planks")
});
