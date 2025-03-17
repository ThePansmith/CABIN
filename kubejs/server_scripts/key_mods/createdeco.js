ServerEvents.recipes(event => {
    // Recipes that don't use item tags when they should be
    event.replaceInput({id: "createdeco:cast_iron_ingot"}, "createdeco:cast_iron_nugget","#forge:nuggets/cast_iron")
    event.replaceInput({id: "createdeco:cast_iron_ingot_from_cast_iron_block"}, "createdeco:cast_iron_block","#forge:storage_blocks/cast_iron")
    event.replaceInput([{id: "createdeco:cast_iron_block"}, {id: "createdeco:cast_iron_nugget_from_cast_iron_ingot"}], "createdeco:cast_iron_ingot","#forge:ingots/cast_iron")
    event.replaceInput({id: "minecraft:pressing/cast_iron_sheet"}, "createdeco:cast_iron_ingot","#forge:ingots/cast_iron")
})
