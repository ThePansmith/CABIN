ServerEvents.recipes(event => {
    event.recipes.create.mixing(("3x ad_astra:steel_ingot"),["3x minecraft:iron_ingot", "minecraft:coal"]).heated()
    event.remove({id: /rocket/})
    event.remove({id: /ad_astra.*compressing/})
    event.remove({id: /ad_astra.*alloying/})
})
