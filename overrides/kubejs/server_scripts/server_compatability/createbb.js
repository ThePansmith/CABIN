if (Platform.isLoaded('createbb')) { 
	onEvent('recipes', event => {

		// Copper & Zinc Dust
		event.replaceInput({}, 'createbb:crushed_copper', '#forge:dusts/copper')
		event.replaceInput({}, 'createbb:crushed_zinc', '#forge:dusts/zinc')
		event.remove({id: 'createbb:phase2/copper_crushing'})
		event.remove({id: 'createbb:phase2/zinc_crushing'})

		//Funny Stuff Trading
		let stuff = (type, payment) => {
			event.custom({
				"type": "thermal:press",
				"ingredients": [{
					"item": type, "count": 8},{
					"item": "kubejs:profession_card_cooking"}],
				"result": [{
					"item": "thermal:silver_coin", "count": payment}],
				"energy": 1000})
		}
		stuff('createbb:white_meth', 12)
		stuff('createbb:blue_meth', 20)
	})
}