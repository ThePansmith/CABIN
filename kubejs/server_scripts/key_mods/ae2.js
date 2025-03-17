// priority: 1
ServerEvents.recipes(event => {
    event.remove({ output: AE2("vibration_chamber") })
})
