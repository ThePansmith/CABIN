// Create: New Age
if (Platform.isLoaded("create_new_age")) {
    ServerEvents.recipes(event => {
	// Heat Stuff
        enderiumMachine(event, Item.of("create_new_age:heater", 1), "create_new_age:heat_pump")
        zincMachine(event, Item.of("create_new_age:heat_pipe", 4))
        zincMachine(event, Item.of("create_new_age:heat_pump", 1))
	zincMachine(event, Item.of("create_new_age:electrical_connector", 4))
        zincMachine(event, Item.of("create_new_age:stirling_engine", 1), "create_new_age:heat_pipe")
	zincMachine(event, Item.of("create_new_age:basic_solar_heating_plate", 1), "create_new_age:overcharged_iron")
	invarMachine(event, Item.of("create_new_age:advanced_solar_heating_plate", 1), "create_new_age:basic_solar_heating_plate")
	createMachine('create_new_age:reactor_casing', event, 'create_new_age:reactor_glass', 'minecraft:glass')
	createMachine('create_new_age:reactor_casing', event, 'create_new_age:reactor_fuel_acceptor', 'create:brass_funnel')
	createMachine('create_new_age:reactor_casing', event, 'create_new_age:reactor_heat_vent', 'create_new_age:heat_pipe')
	
	event.remove({ output: "create_new_age:reactor_rod" })
		 event.recipes.createSequencedAssembly([
	Item.of('create_new_age:reactor_rod', 1)],
            'create_new_age:overcharged_diamond', [
	event.recipes.createDeploying('kubejs:incomplete_reactor_rod', ['kubejs:incomplete_reactor_rod', 'create_new_age:reactor_casing']),
	event.recipes.createDeploying('kubejs:incomplete_reactor_rod', ['kubejs:incomplete_reactor_rod', 'create_new_age:nuclear_fuel']),
	event.recipes.createDeploying('kubejs:incomplete_reactor_rod', ['kubejs:incomplete_reactor_rod', 'create_new_age:reactor_glass']),
	event.recipes.createDeploying('kubejs:incomplete_reactor_rod', ['kubejs:incomplete_reactor_rod', 'create_new_age:nuclear_fuel']),
	event.recipes.createDeploying('kubejs:incomplete_reactor_rod', ['kubejs:incomplete_reactor_rod', 'create_new_age:reactor_casing']),
	event.recipes.createPressing('kubejs:incomplete_reactor_rod', 'kubejs:incomplete_reactor_rod')
	]).transitionalItem('kubejs:incomplete_redstone_magnet').loops(1)
	
	

	// Energizers
	andesiteMachine(event, Item.of("create_new_age:energiser_t1", 1), "create_new_age:electrical_connector")
	brassMachine(event, Item.of("create_new_age:energiser_t2", 1), "create_new_age:energiser_t1")
	invarMachine(event, Item.of("create_new_age:energiser_t3", 1), "create_new_age:energiser_t2")

        // Motors & Extensions
	andesiteMachine(event, Item.of("create_new_age:basic_motor", 1), "create_new_age:overcharged_gold")
	brassMachine(event, Item.of("create_new_age:advanced_motor", 1), "create_new_age:basic_motor")
        invarMachine(event, Item.of("create_new_age:reinforced_motor", 1), "create_new_age:advanced_motor")
	zincMachine(event, Item.of("create_new_age:basic_motor_extension", 1), "create_new_age:copper_circuit")
        enderiumMachine(event, Item.of("create_new_age:advanced_motor_extension", 1), "create_new_age:basic_motor_extension")

        // Magnets & Generator
	zincMachine(event, Item.of("create_new_age:carbon_brushes", 1), "ad_astra:steel_block")
	zincMachine(event, Item.of("create_new_age:generator_coil", 1), "create_new_age:overcharged_golden_wire")
	
        event.remove({ output: "create_new_age:redstone_magnet" })
        event.remove({ output: "create_new_age:layered_magnet" })
        event.remove({ output: "create_new_age:fluxuated_magnetite" })
        event.remove({ output: "create_new_age:netherite_magnet" })
	
	 event.recipes.createSequencedAssembly([
	Item.of('create_new_age:redstone_magnet', 1)],
            'create_new_age:magnetite_block', [
	event.recipes.createDeploying('kubejs:incomplete_redstone_magnet', ['kubejs:incomplete_redstone_magnet', 'minecraft:redstone']),
	event.recipes.createDeploying('kubejs:incomplete_redstone_magnet', ['kubejs:incomplete_redstone_magnet', 'minecraft:redstone']),
	event.recipes.createPressing('kubejs:incomplete_redstone_magnet', 'kubejs:incomplete_redstone_magnet')
	]).transitionalItem('kubejs:incomplete_redstone_magnet').loops(2)

	event.recipes.create.sequenced_assembly([
        'create_new_age:layered_magnet'
    ],  'create_new_age:redstone_magnet', [
		event.recipes.createDeploying('kubejs:incomplete_layered_magnet', ['kubejs:incomplete_layered_magnet', 'create_new_age:overcharged_iron']),
		event.recipes.createDeploying('kubejs:incomplete_layered_magnet', ['kubejs:incomplete_layered_magnet', 'create_new_age:overcharged_gold']),
		event.recipes.createPressing('kubejs:incomplete_layered_magnet', 'kubejs:incomplete_layered_magnet')
    ]).transitionalItem('kubejs:incomplete_layered_magnet',).loops(2)

	event.recipes.create.sequenced_assembly([
        'create_new_age:fluxuated_magnetite'
    ],  'create_new_age:layered_magnet', [
		event.recipes.createDeploying('kubejs:incomplete_fluxuated_magnetite', ['kubejs:incomplete_fluxuated_magnetite', 'create_new_age:overcharged_diamond']),
		event.recipes.createPressing('kubejs:incomplete_fluxuated_magnetite', 'kubejs:incomplete_fluxuated_magnetite'),
		event.recipes.createPressing('kubejs:incomplete_fluxuated_magnetite', 'kubejs:incomplete_fluxuated_magnetite')
    ]).transitionalItem('kubejs:incomplete_fluxuated_magnetite',).loops(2)

	event.recipes.create.sequenced_assembly([
        'create_new_age:netherite_magnet'
    ],  'create_new_age:fluxuated_magnetite', [
		event.recipes.createDeploying('kubejs:incomplete_netherite_magnet', ['kubejs:incomplete_netherite_magnet', 'minecraft:netherite_scrap']),
		event.recipes.createPressing('kubejs:incomplete_netherite_magnet', 'kubejs:incomplete_netherite_magnet'),
		event.recipes.createPressing('kubejs:incomplete_netherite_magnet', 'kubejs:incomplete_netherite_magnet'),
		event.recipes.createPressing('kubejs:incomplete_netherite_magnet', 'kubejs:incomplete_netherite_magnet'),
		event.recipes.createPressing('kubejs:incomplete_netherite_magnet', 'kubejs:incomplete_netherite_magnet')
    ]).transitionalItem('kubejs:incomplete_netherite_magnet',).loops(2)
    })
}
