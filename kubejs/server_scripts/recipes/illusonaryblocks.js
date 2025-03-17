ServerEvents.recipes(event => {

    event.custom({
        "type": "tconstruct:melting",
        "ingredient": {"item": "minecraft:glow_berries"},
        "result": {
            "fluid": "supplementaries:lumisene",
            "amount": 100
        },
        "temperature": 200,
        "time": 6
    }).id("kubejs:smeltery/melting/lumisene")


    let illusion = (input) => {
        const output = `kubejs:trial_${input.replace(/^minecraft:|^trials:/, "")}`;
        event.custom({
            "type": "create:filling",
            "ingredients": [
                { "item": input },
                { "fluid": "supplementaries:lumisene", "amount": 90 }
            ],
            "results": [
                { "item": `9x ${output}` }
            ]
        })
    }

    illusion("minecraft:copper_block");
    illusion("minecraft:cut_copper");
    illusion("minecraft:cut_copper_stairs");
    illusion("minecraft:cut_copper_slab");
    illusion("minecraft:oxidized_copper");
    illusion("minecraft:oxidized_cut_copper_stairs");
    illusion("minecraft:oxidized_cut_copper_slab");
    illusion("minecraft:oxidized_cut_copper");
    if (Platform.isLoaded("trials")) {
        illusion("trials:chiseled_copper");
        illusion("trials:copper_grate");
        illusion("trials:chiseled_copper_oxidized");
        illusion("trials:copper_grate_oxidized");
    }
})
