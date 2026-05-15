// priority: 800
global.unificationPattern = new RegExp(
    "^(" +
        "occultism:(silver_(ingot|nugget|dust|ore|block)|raw_silver|silver_ore_deepslate|raw_silver_block|(iron|gold|copper|obsidian)_dust)" +
        "|tconstruct:(steel_(ingot|nugget|block)|copper_nugget)" +
        "|thermal:(tin_(ore|nugget|ingot|block|dust|plate|gear)|deepslate_tin_ore|raw_tin(_block)?|silver_ore|deepslate_silver_ore|raw_silver|raw_silver_block|copper_nugget|netherite_nugget|ender_pearl_dust)" +
        "|tcintegrations:(bronze_(nugget|ingot|block))" +
    ")$"
);