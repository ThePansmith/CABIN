onEvent('recipes', event => {
    //duplicate steel recipes
    event.remove({id:'beyond_earth:steel_nugget_from_ingot'})
    event.remove({id:'beyond_earth:steel_ingot_from_nugget'})
    event.remove({id:'beyond_earth:steel_ingot'})
    event.remove({id:'beyond_earth:steel_block'})

    event.remove({id:'beyond_earth:steel_ingot_blasting'})
})