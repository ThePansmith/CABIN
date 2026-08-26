// priority: 1
ServerEvents.recipes(event => {
    event.recipes.create.mixing(("3x ad_astra:steel_ingot"),["3x minecraft:iron_ingot", "minecraft:coal"]).heated()

    event.remove({type: "ad_astra:alloying"})
    event.remove({type: "ad_astra:compressing"})
    event.remove({type: "ad_astra:cryo_freezing"})
    event.remove({type: "ad_astra:nasa_workbench"})
    event.remove({type: "ad_astra:refining"})


    event.remove({type: "minecraft:crafting_shaped", output: "ad_astra:space_helmet"})
    event.remove({type: "minecraft:crafting_shaped", output: "ad_astra:space_suit"})
    event.remove({type: "minecraft:crafting_shaped", output: "ad_astra:space_pants"})
    event.remove({type: "minecraft:crafting_shaped", output: "ad_astra:space_boots"})

    event.replaceInput({ id: "ad_astra:ti_69" }, "#forge:plates/steel", "kubejs:matter_plastics")
})

ServerEvents.highPriorityData(event=>{
    let spaceStationRecipe = {
        type: "ad_astra:space_station_recipe",
        dimension: "ad_astra:earth_orbit",
        ingredients: [
            {
                ingredient: { item: "kubejs:computation_matrix" },
                count: 64
            },
            {
                ingredient: { item: "kubejs:enderium_machine" },
                count: 64
            },
            {
                ingredient: { item: "ae2:controller" },
                count: 64
            },
            {
                ingredient: { tag: "forge:storage_blocks/iron" },
                count: 64
            }
        ],
        structure: "ad_astra:space_station"
    }

    event.addJson("ad_astra:recipes/space_station/earth_orbit_space_station", spaceStationRecipe)
    spaceStationRecipe.dimension = "ad_astra:moon_orbit"
    event.addJson("ad_astra:recipes/space_station/moon_orbit_space_station", spaceStationRecipe)
})
