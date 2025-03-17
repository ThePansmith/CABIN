

ServerEvents.tags("block", event => {
    event.add("minecraft:mineable/pickaxe", ["#forge:glass", "#forge:glass_panes"]);
    event.add("minecraft:mineable/pickaxe", /xtonesreworked:glaxx_block_/);
    event.add("minecraft:mineable/pickaxe", /enderio:clear_glass/);
    event.add("minecraft:mineable/pickaxe", /enderio:fused_quartz/);
    event.add("minecraft:mineable/pickaxe", "mbd2:strainer");
    event.add("minecraft:mineable/axe", "mbd2:strainer");
})
