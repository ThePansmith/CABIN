// priority: 800
global.unificationPattern = new RegExp(
    "^(" +
        "occultism:(silver_(ingot|nugget|block|dust|ore)|raw_silver(_block)?|silver_ore_deepslate|(iron|gold|copper|obsidian)_dust)" +
        "|tconstruct:(steel_(ingot|nugget|block)|copper_nugget)" +
        "|thermal:(tin_(nugget|block|dust|ore|plate)|deepslate_tin_ore|raw_tin(_block)?|silver_ore|deepslate_silver_ore|raw_silver(_block)?|copper_nugget|netherite_nugget|ender_pearl_dust)" +
    ")$"
);
