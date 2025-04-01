GTCEuServerEvents.oreVeins(event => {
    // End Dimension veins -> Glacio
    [
        "bauxite_vein_end",
        "magnetite_vein_end",
        "naquadah_vein",
        "pitchblende_vein_end",
        "scheelite_vein",
        "sheldonite_vein"
    ].forEach(veinName => {
        event.modify(`gtceu:${veinName}`, vein => {
            vein.dimensions("ad_astra:glacio")
            vein.biomes("ad_astra:glacio_snowy_barrens")
            vein.layer("glacio")
        });
    });

    // Nether Dimension veins -> Mars
    [
        "banded_iron_vein",
        "beryllium_vein",
        "certus_quartz",
        "manganese_vein",
        "molybdenum_vein",
        "monazite_vein",
        "nether_quartz_vein",
        "redstone_vein",
        "saltpeter_vein",
        "sulfur_vein",
        "tetrahedrite_vein",
        "topaz_vein"
    ].forEach(veinName => {
        event.modify(`gtceu:${veinName}`, vein => {
            vein.dimensions("ad_astra:mars")
            vein.biomes("#ad_astra:has_structure/mars_temple")
            vein.layer("mars")
        });
    });

    // Overworld Dimension (Stone Layer) veins -> Moon
    [
        "apatite_vein",
        "cassiterite_vein",
        "coal_vein",
        "copper_tin_vein",
        "galena_vein",
        "garnet_tin_vein",
        "garnet_vein",
        "iron_vein",
        "lubricant_vein",
        "magnetite_vein_ow",
        "mineral_sand_vein",
        "nickel_vein",
        "salts_vein",
        "oilsands_vein"
    ].forEach(veinName => {
        event.modify(`gtceu:${veinName}`, vein => {
            vein.dimensions("ad_astra:moon")
            vein.biomes("ad_astra:lunar_wastelands")
            vein.layer("moon")
        });
    });

    // Overworld Dimension (Deepslate Layer) veins -> Moon
    [
        "copper_vein",
        "diamond_vein",
        "lapis_vein",
        "manganese_vein_ow",
        "mica_vein",
        "olivine_vein",
        "redstone_vein_ow",
        "sapphire_vein"
    ].forEach(veinName => {
        event.modify(`gtceu:${veinName}`, vein => {
            vein.dimensions("ad_astra:moon")
            vein.biomes("ad_astra:lunar_wastelands")
            vein.layer("moon")
        });
    });
});