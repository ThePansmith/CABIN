const LANGS = ['es_es','fr_fr','pt_br','ru_ru', 'zh_cn'] 
LANGS.forEach(lang => {
    ClientEvents.lang(lang, event => {
        global.trades.forEach(id => {
            // raw may be "16x mod:custom_item" or "minecraft:dirt"
            let raw    = global.transactions[id][0].out
            let displayName = Item.of(raw).getDisplayName().getString().replace("[","").replace("]","")

            let cardKey = `item.kubejs.trade_card_${id}`

            event.add(cardKey, Text.translatable("text.cabin.import", displayName).getString())
        })

        global.professions.forEach(id => {
            let profKey   = `text.cabin.${id}`;
            let profName  = Text.translatable(profKey).getString();
            let display   = Text.translatable("text.cabin.profession", Text.translatable(profKey)).getString();
            
            let cardKey   = `item.kubejs.profession_card_${id}`;

            event.add(cardKey, display);
        });
    })
})