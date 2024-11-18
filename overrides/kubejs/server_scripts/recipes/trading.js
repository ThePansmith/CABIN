
onEvent('recipes', event => {
	event.remove({ input: '#forge:coins' })

	event.recipes.thermal.numismatic_fuel(TE('silver_coin')).energy(100000)
	event.recipes.thermal.numismatic_fuel(TE('gold_coin')).energy(6400000)
	//remove all press recipes
	event.remove({ type: TE('press') })

	let trade = (card_id, ingredient, output) => {
		event.custom({
			type: 'thermal:press',
			ingredients: [
				Ingredient.of(ingredient).toJson(),
				Ingredient.of(card_id).toJson(),
			],
			result: [
				Item.of(output).toResultJson()
			],
			energy: 1000
		})
	}

	global.trades.forEach(element => {
		if (global.transactions[element])
			global.transactions[element].forEach(transaction => {
				if (Item.of(transaction.in).id!='minecraft:air' && Item.of(transaction.out)!='minecraft:air') {
					trade(KJ('trade_card_' + element), transaction.in, transaction.out)
				}
			})
	});

	global.professions.forEach(element => {
		if (global.transactions[element])
			global.transactions[element].forEach(transaction => {
				if (Item.of(transaction.in).id!='minecraft:air' && Item.of(transaction.out).id!='minecraft:air') {
					trade(KJ('profession_card_' + element), transaction.in, transaction.out)
				}
			})
	});
	trade(KJ('missingno'), Item.of(TE('gold_coin'), 1), Item.of('supplementaries:candy', 128))
})