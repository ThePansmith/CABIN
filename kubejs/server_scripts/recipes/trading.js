
ServerEvents.recipes(event => {
    event.remove({ input: "#forge:coins" })

    thermalNumismaticFuel(event, TE("silver_coin"), 100000)
    thermalNumismaticFuel(event, TE("gold_coin"), 6400000)
    // remove all press recipes
    event.remove({ type: TE("press") })
    event.remove({ type: TE("numismatic_fuel") })

    let trade = (card_id, ingredient, output) => {
        event.custom({
            type: "thermal:press",
            ingredients: [
                toThermalInputJson(ingredient),
                toThermalInputJson(card_id),
            ],
            result: [
                toThermalOutputJson(output)
            ],
            energy: 1000
        })
    }

    global.trades.forEach(element => {
        if (global.transactions[element])
            global.transactions[element].forEach(transaction => {
                if (!Item.of(transaction.in).isEmpty() && !Item.of(transaction.out).isEmpty()) {
                    trade(KJ("trade_card_" + element), transaction.in, transaction.out)
                } else console.warn(`tried to create trade, ${transaction.in} -> ${transaction.out}, but one of the items does not exist`)
            })
    });

    global.professions.forEach(element => {
        if (global.transactions[element])
            global.transactions[element].forEach(transaction => {
                if (!Item.of(transaction.in).isEmpty() && !Item.of(transaction.out).isEmpty()) {
                    trade(KJ("profession_card_" + element), transaction.in, transaction.out)
                } else console.warn(`tried to create trade, ${transaction.in} -> ${transaction.out}, but one of the items does not exist`)
            })
    });

    trade("kubejs:missingno", "thermal:gold_coin", "128x supplementaries:candy")
})
