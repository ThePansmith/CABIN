PlayerEvents.loggedIn(event => {
    event.player.tell(["Welcome to ", Text.gold("CABIN"), " on 1.20"]);
    event.player.tell(["This pack is currently in beta, assets may not be final."]);
    event.player.tell(["Report pack issues to ", Text.gold("the Github").underlined().clickOpenUrl("https://github.com/ThePansmith/CABIN").hover("Click to open"), "."]);
})
