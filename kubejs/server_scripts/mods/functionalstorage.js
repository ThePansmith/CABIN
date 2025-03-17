if(Platform.isLoaded("functionalstorage")) {
    ServerEvents.recipes(event => {
        zincMachine(event, Item.of("functionalstorage:storage_controller", 1), MC("diamond"))
        zincMachine(event, Item.of("functionalstorage:controller_extension", 1), MC("gold_ingot"))
        zincMachine(event, Item.of("functionalstorage:simple_compacting_drawer", 1), CR("mechanical_piston"))
        zincMachine(event, Item.of("functionalstorage:compacting_drawer", 1), CR("sticky_mechanical_piston"))
        enderiumMachine(event, Item.of("functionalstorage:fluid_1", 4))
        enderiumMachine(event, Item.of("functionalstorage:fluid_2", 4))
        enderiumMachine(event, Item.of("functionalstorage:fluid_4", 4))
        enderiumMachine(event, Item.of("functionalstorage:ender_drawer", 1))

        event.remove({id:"functionalstorage:oak_drawer_alternate_x1"})
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
    })

    ServerEvents.tags("block", event => {
        event.add("create:wrench_pickup", /functionalstorage/)
        event.add("create:wrench_pickup", /everycomp:fs\//)
    })
}
