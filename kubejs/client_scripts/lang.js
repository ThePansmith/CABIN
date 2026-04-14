const LANGS = ["es_es", "fr_fr", "pt_br", "ru_ru", "zh_cn"]

let normalizeItemId = raw => {
    let id = `${raw}`.trim()
    let match = id.match(/^(\d+)x\s+(.+)$/i)
    if (match)
        return match[2]
    return id
}

let resolveLocalizedItemName = raw => {
    let id = normalizeItemId(raw)
    let descriptionId = Item.of(id).item.getDescriptionId()
    let text = Text.translatable(descriptionId).getString()
    return text
}

LANGS.forEach(lang => {
    ClientEvents.lang(lang, event => {
        if (!global.trades || !global.transactions || !global.professions)
            return

        global.trades.forEach(id => {
            let transactions = global.transactions[id]
            if (!transactions || !transactions.length)
                return

            let displayName = resolveLocalizedItemName(transactions[0].out)
            let cardKey = `item.kubejs.trade_card_${id}`
            event.add(cardKey, Text.translatable("cabin.import.prefix", displayName).getString())
        })

        global.professions.forEach(id => {
            let localizedProfession = Text.translatable(`cabin.profession.${id}`).getString()
            let cardKey = `item.kubejs.profession_card_${id}`
            event.add(cardKey, Text.translatable("cabin.profession.prefix", localizedProfession).getString())
        })
    })
})
