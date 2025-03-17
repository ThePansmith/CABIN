// priority: 1
ServerEvents.recipes(event => {
    // Obsidian pane crafting
    // Not sure where the original recipe went
    event.shaped(TC("obsidian_pane", 8), [
        "SSS",
        "SSS"
    ], {
        S: MC("obsidian")
    })
    // melt blaze rods into blazing blood
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "tag": "forge:rods/blaze"	},
        "result": { "fluid": "tconstruct:blazing_blood", "amount": 100 },
        "temperature": 790,
        "time": 40
    })
    // Melt redstone into destabilized redstone
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "item": MC("redstone") },
        "result": { "fluid": TE("redstone"), "amount": 100 },
        "temperature": 300,
        "time": 10
    });
    event.custom({
        "type": "tconstruct:melting",
        "ingredient": { "item": MC("redstone_block") },
        "result": { "fluid": TE("redstone"), "amount": 900 },
        "temperature": 500,
        "time": 90
    });
    // Remove coin cast
    event.remove({ id: TC("smeltery/casts/sand_casts/coins") })
    event.remove({ id: TC("smeltery/casts/red_sand_casts/coins") })
    event.remove({ id: TC("smeltery/casts/gold_casts/coins") })

    let coinMaterials = [
        "iron",
        "gold",
        "copper",
        "netherite",
        "tin",
        "lead",
        "silver",
        "nickel",
        "bronze",
        "electrum",
        "invar",
        "constantan",
        "signalum",
        "lumium",
        "enderium"
    ];
    coinMaterials.forEach(material=>{
        event.remove({ id:TC(`smeltery/casting/metal/${material}/coin_gold_cast`) })
        event.remove({ id:TC(`smeltery/casting/metal/${material}/coin_sand_cast`) })
    })
    // Remove enchanted apple melting recipe
    event.remove({ id: TC("smeltery/melting/metal/gold/enchanted_apple") })
    // Remove Tconstruct cheese since it only costs milk to craft and cheese already exists on the moon.
    event.remove({ id: TC("smeltery/casting/cheese_block")})
    event.remove({ id: TC("smeltery/casting/cheese_ingot_gold_cast")})
    event.remove({ id: TC("smeltery/casting/cheese_ingot_sand_cast")})
})

ServerEvents.tags("item", event => {
    // zinc anvils
    event.get("tconstruct:anvil_metal").add(CR("zinc_block"))
})

ServerEvents.tags("block", event => {
    event.add("minecraft:mineable/shovel","tconstruct:mud_bricks_slab")
    event.add("minecraft:mineable/shovel","tconstruct:mud_bricks_stairs")
})
