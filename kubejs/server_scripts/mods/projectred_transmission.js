const PR_T = (id, x) => MOD("projectred_transmission", id, x)
if (Platform.isLoaded("projectred_transmission")) {
    ServerEvents.recipes(event => {
        event.remove({ id: "projectred_transmission:wired_plate" })
        event.remove({ id: "projectred_transmission:bundled_plate" })
        event.shapeless(PR_C("platformed_plate"), [PR_C("plate"), PR_T("red_alloy_wire"), CR("andesite_alloy")]).id("kubejs:platformed_plate")
    })
}
