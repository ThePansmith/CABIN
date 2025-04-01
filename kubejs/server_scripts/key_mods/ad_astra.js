ServerEvents.recipes(event => {
    // Most Ad Astra Recipes are added in chapters.js
    // event.recipes.create.mixing(("3x ad_astra:steel_ingot"),["3x minecraft:iron_ingot", "minecraft:coal"]).heated()

    event.remove({type: "ad_astra:alloying"})
    event.remove({type: "ad_astra:compressing"})
    event.remove({type: "ad_astra:cryo_freezing"})
    event.remove({type: "ad_astra:nasa_workbench"})
    event.remove({type: "ad_astra:refining"})

    //	Remove all the recipes we don't want from Ad Astra
    //	We're in an awkward situation where we want half of the recipes and don't want the other half
    let begoneEarth = [
        "tier_1_rover", "launch_pad",
        "steel_cable", "desh_cable", "desh_fluid_pipe", "ostrum_fluid_pipe", "cable_duct", "fluid_pipe_duct",
        "coal_generator", "compressor", "etrionic_blast_furnace", "nasa_workbench", "fuel_refinery", "oxygen_loader",
        "solar_panel", "water_pump", "oxygen_distributor", "gravity_normalizer", "energizer", "cryo_freezer", "oxygen_sensor",
        /* "ti_69", "wrench",*/ "zip_gun",
        "etrionic_capacitor", "gas_tank", "large_gas_tank", // "photovoltaic_etrium_cell",
        "oxygen_gear", "wheel", "engine_frame", "fan", "rocket_nose_cone",
        "rocket_fin"
    ]
    let begoneRegex = [
        /^ad_astra:(space|netherite_space|jet_suit)_(helmet|suit|pants|boots)$/,
        "ad_astra:jet_suit",
        /^ad_astra:(steel|desh|ostrum|calorite)_(tank|engine)$/,
    ]
    begoneEarth.forEach(begone => { event.remove({ id: `ad_astra:${begone}` }) })
    begoneRegex.forEach(begone => { event.remove({ id: begone }) })

    event.replaceInput({ id: "ad_astra:ti_69" }, "#forge:plates/steel", "kubejs:matter_plastics")
})

ServerEvents.highPriorityData(event=>{
    let spaceStationRecipe = {
        type: "ad_astra:space_station_recipe",
        dimension: "ad_astra:earth_orbit",
        ingredients: [
            {
                ingredient: {
                    item: "kubejs:computation_matrix"
                },
                count: 64
            },
            {
                ingredient: {
                    item: "kubejs:enderium_machine"
                },
                count: 64
            },
            {
                ingredient: {
                    item: "ae2:controller"
                },
                count: 64
            },
            {
                ingredient: {
                    tag: "forge:storage_blocks/iron"
                },
                count: 64
            }
        ],
        structure: "ad_astra:space_station"
    }

    event.addJson("ad_astra:recipes/space_station/earth_orbit_space_station", spaceStationRecipe)
    spaceStationRecipe.dimension = "ad_astra:moon_orbit"
    event.addJson("ad_astra:recipes/space_station/moon_orbit_space_station", spaceStationRecipe)
})
