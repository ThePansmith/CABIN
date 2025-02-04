ServerEvents.recipes(event => {
    //duplicate steel recipes
    event.remove({id:'ad_astra:steel_nugget_from_ingot'})
    event.remove({id:'ad_astra:steel_ingot_from_nugget'})
    event.remove({id:'ad_astra:steel_ingot'})
    event.remove({id:'ad_astra:steel_block'})

    event.remove({id:'ad_astra:steel_ingot_blasting'})
})