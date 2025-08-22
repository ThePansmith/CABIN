ServerEvents.recipes(event => {

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

    illusion("minecraft:exposed_copper");
    illusion("minecraft:exposed_cut_copper");
    illusion("minecraft:exposed_cut_copper_stairs");
    illusion("minecraft:exposed_cut_copper_slab");

    illusion("minecraft:weathered_copper");
    illusion("minecraft:weathered_cut_copper");
    illusion("minecraft:weathered_cut_copper_stairs");
    illusion("minecraft:weathered_cut_copper_slab");

    illusion("minecraft:oxidized_copper");
    illusion("minecraft:oxidized_cut_copper");
    illusion("minecraft:oxidized_cut_copper_stairs");
    illusion("minecraft:oxidized_cut_copper_slab");
    if (Platform.isLoaded("trials")) {
        illusion("trials:chiseled_copper");
        illusion("trials:copper_grate");

        illusion("trials:chiseled_copper_exposed");
        illusion("trials:copper_grate_exposed");

        illusion("trials:chiseled_copper_weathered");
        illusion("trials:copper_grate_weathered");

        illusion("trials:chiseled_copper_oxidized");
        illusion("trials:copper_grate_oxidized");
    }
})
