if (Platform.isLoaded("curios")) {
    ServerEvents.lowPriorityData(event=>{
        event.addJson("kubejs:curios/slots/goggles", {
            "order": 20,
            "size": 1,
            "icon": "cabin:slot/empty_goggles_slot",
            "dropRule": "ALWAYS_KEEP"
        })
        event.addJson("kubejs:curios/entities/player", {
            "entities": ["player"],
            "slots": ["goggles"]
        })

        event.addJson("kubejs:curios/slots/head", {
            "size": 0
        })
    })

    ServerEvents.tags("item", event=>{
        event.add("curios:goggles", "create:goggles")
        event.remove("curios:head", "create:goggles")
    })
}
