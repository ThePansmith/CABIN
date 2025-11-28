if(Platform.isLoaded("functionalstorage")) {
    ServerEvents.recipes(event => {
        enderiumMachine(event, Item.of("functionalstorage:storage_controller", 1), "minecraft:diamond")
        enderiumMachine(event, Item.of("functionalstorage:controller_extension", 1), "minecraft:gold_ingot")
        enderiumMachine(event, Item.of("functionalstorage:ender_drawer", 1))

        zincMachine(event, Item.of("functionalstorage:simple_compacting_drawer", 1), "create:mechanical_piston")
        zincMachine(event, Item.of("functionalstorage:compacting_drawer", 1), "create:sticky_mechanical_piston")

        enderiumMachine(event, Item.of("kubejs:fluid_drawer_casing", 1), 'thermal:fluid_cell')
        createMachine("kubejs:fluid_drawer_casing", event, "functionalstorage:fluid_1")
        createMachine("kubejs:fluid_drawer_casing", event, "functionalstorage:fluid_2")
        createMachine("kubejs:fluid_drawer_casing", event, "functionalstorage:fluid_4")

        event.remove({id:"functionalstorage:oak_drawer_alternate_x1"})
        event.remove({id:"functionalstorage:oak_drawer_alternate_x2"})
        event.remove({id:"functionalstorage:oak_drawer_alternate_x4"})
        // framed drawers
        event.remove({id:"functionalstorage:compacting_framed_drawer"})
        event.remove({id:"functionalstorage:framed_storage_controller"})
        event.remove({id:"functionalstorage:framed_controller_extension"})
        event.remove({id:"functionalstorage:framed_simple_compacting_drawer"})
        let pattern = ["III","IDI","III"]
        event.shaped(Item.of("functionalstorage:compacting_framed_drawer", 1), pattern,
            {I:"#forge:nuggets/iron", D:"functionalstorage:compacting_drawer"})
        event.shaped(Item.of("functionalstorage:framed_storage_controller", 1), pattern,
            {I:"#forge:nuggets/iron", D:"functionalstorage:storage_controller"})
        event.shaped(Item.of("functionalstorage:framed_controller_extension", 1), pattern,
            {I:"#forge:nuggets/iron", D:"functionalstorage:controller_extension"})
        event.shaped(Item.of("functionalstorage:framed_simple_compacting_drawer", 1), pattern,
            {I:"#forge:nuggets/iron", D:"functionalstorage:simple_compacting_drawer"})

        event.remove({ id: "functionalstorage:copper_upgrade" })
        event.remove({ id: "functionalstorage:gold_upgrade" })
        event.remove({ id: "functionalstorage:diamond_upgrade" })
        event.remove({ id: "functionalstorage:netherite_upgrade" })

        let upgradePattern = ["IBI", "CDC", "IBI"]

        event.shaped(Item.of("functionalstorage:copper_upgrade", 2), upgradePattern, {
            B: "#forge:storage_blocks/andesite_alloy",
            C: "#forge:chests/wooden",
            D: "#functionalstorage:drawer",
            I: "#forge:ingots/zinc"
        })

        event.shaped(Item.of("functionalstorage:gold_upgrade", 2), upgradePattern, {
            B: "functionalstorage:copper_upgrade",
            C: "#forge:chests/wooden",
            D: "#functionalstorage:drawer",
            I: "#forge:ingots/amethyst_bronze"
        })

        event.shaped(Item.of("functionalstorage:diamond_upgrade", 2), upgradePattern, {
            B: "functionalstorage:gold_upgrade",
            C: "#forge:chests/wooden",
            D: "#functionalstorage:drawer",
            I: "#forge:ingots/lumium"
        })

        event.shaped(Item.of("functionalstorage:netherite_upgrade", 2), upgradePattern, {
            B: "functionalstorage:diamond_upgrade",
            C: "#forge:chests/wooden",
            D: "#functionalstorage:drawer",
            I: "#forge:ingots/hepatizon"
        })

        event.remove({ id:"functionalstorage:iron_downgrade" })
        donutCraft(event, Item.of("functionalstorage:iron_downgrade", 4), "#functionalstorage:drawer", "#forge:ingots/iron")

        event.remove({ id:"functionalstorage:redstone_upgrade"})
        event.shaped(Item.of("functionalstorage:redstone_upgrade", 4), [
            "IBI",
            "CDC",
            "IBI"
        ], {
            B: "minecraft:redstone_block",
            C: "minecraft:comparator",
            D: "#functionalstorage:drawer",
            I: "minecraft:redstone"
        })
        event.remove({ id:"functionalstorage:void_upgrade"})
        donutCraft(event, Item.of("functionalstorage:void_upgrade", 4), "#functionalstorage:drawer", "minecraft:obsidian")

        event.remove({ id: "functionalstorage:puller_upgrade" })
        event.remove({ id: "functionalstorage:pusher_upgrade" })
        event.remove({ id: "functionalstorage:collector_upgrade" })

        event.replaceInput({ id: "functionalstorage:linking_tool" }, "minecraft:diamond", "thermal:enderium_ingot")
    })

    ServerEvents.tags("block", event => {
        event.add("create:wrench_pickup", /functionalstorage/)
        event.add("create:wrench_pickup", /everycomp:fs\//)
    })
}
