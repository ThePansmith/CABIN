if (Platform.isLoaded('tinygates')) {
	//ProjectRed Integration alternative
	onEvent('recipes', event => {	
		let tg_circuit = (id) => event.stonecutting(Item.of("tinygates:" + id + "_item", 1), PR_C('platformed_plate'))
		event.remove({ mod:'tinygates' })
		tg_circuit('and_gate')
		tg_circuit('clock')
		tg_circuit('counter')
		tg_circuit('edge_detector')
		tg_circuit('not_gate')
		tg_circuit('or_gate')
		tg_circuit('rs_latch')
		tg_circuit('t_flip_flop')
		tg_circuit('xor_gate')
	})
}