if(Platform.isLoaded("create_hypertube")) {
    ServerEvents.recipes(event => {
        brassMachine(event, Item.of("create_hypertube:hypertube_entrance", 1), "thermal:cured_rubber")

        event.replaceInput( {id: "create_hypertube:crafting/hypertube"}, "create:brass_sheet", "#forge:plates/brass" )
    })
}
