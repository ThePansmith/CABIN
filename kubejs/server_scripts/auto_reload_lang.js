global._langReloaded = global._langReloaded || false;

ServerEvents.loaded(event => {
    if (!global._langReloaded) {
        event.server.runCommand("/kubejs reload lang")
        global._langReloaded = true
    }
});
