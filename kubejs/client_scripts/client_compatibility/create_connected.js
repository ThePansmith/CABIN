// We'd love to be able to hide the control chip item but for some reason nothing seems to work

// if (Platform.isLoaded("create_connected")) {
//     JEIEvents.hideItems(event => {
//         event.hide("create_connected:control_chip")
//         event.hide("create_connected:incomplete_control_chip")
//     })

//     ClientEvents.highPriorityAssets(event=>{
//         json = {
//             "removed": [
//                 "item:create_connected:control_chip",
//                 "item:create_connected:incomplete_contrl_chip"
//             ],
//         }
//         event.add("emi:index/stacks/create_connected", json)
//     })
// }
