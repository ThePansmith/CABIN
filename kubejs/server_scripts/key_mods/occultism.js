// priority: 1
ServerEvents.recipes(event => {
    // unify the output
    event.replaceOutput({ id: OC("crushing/obsidian_dust") }, OC("obsidian_dust"), CR("powdered_obsidian"))

    // Remove unwanted ore miner ores
    event.remove({ id: OC("miner/ores/redstone_ore") })
    event.remove({ id: OC("miner/ores/aluminum_ore") })
    event.remove({ id: OC("miner/ores/tin_ore") })
    event.remove({ id: OC("miner/ores/silver_ore") })
    event.remove({ id: OC("miner/deeps/deepslate_redstone_ore") })
    event.remove({ id: OC("miner/deeps/deepslate_aluminum_ore") })
    event.remove({ id: OC("miner/deeps/deepslate_tin_ore") })
    event.remove({ id: OC("miner/deeps/deepslate_silver_ore") })

    // Silver replacements
    event.replaceInput({ id: OC("ritual/summon_foliot_crusher") }, F("#ores/silver"), F("#ores/zinc"))
    event.replaceInput({ id: OC("ritual/craft_infused_lenses") }, F("#ingots/silver"), F("#ingots/nickel"))
    event.replaceInput({ id: OC("crafting/magic_lamp_empty") }, F("#ingots/silver"), F("#ingots/iron"))
    event.replaceInput({ id: OC("crafting/lens_frame") }, F("#ingots/silver"), F("#ingots/nickel"))
})
