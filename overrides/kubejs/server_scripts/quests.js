

onEvent('ftbquests.custom_reward', function (event) {
    let reward = event.getReward()
    let id = reward.quest.getCodeString()

    let runCommand = (cmd) => {
        event.server.scheduleInTicks(10, event.server, function (callback) {
            callback.data.runCommandSilent(cmd)
        })
    }

    if (reward.hasTag('reset'))
        runCommand('/ftbquests change_progress ' + '@p' + ' reset ' + id)

    if (reward.hasTag('bad_omen'))
        runCommand('/effect clear ' + '@p' + ' minecraft:bad_omen')

    if (reward.hasTag('fortress'))
        event.server.scheduleInTicks(10, event.server, function (callback) {
            callback.data.runCommand('/execute as ' + '@p' + ' in minecraft:the_nether run locate fortress')
        })

})