if(Platform.isLoaded("grapplemod")) {
	ServerEvents.recipes(event => {
		//This mod has loads of overpowered stuff in it
		//I don't fully understand how applying upgrades works with this mod, it would be nice to simplify recipes

		//Crazy gravity item
		event.remove({ id: "grapplemod:repeller" })
		//Rocket hook can boost around 60 blocks every 10 seconds. Pretty overpowered
		event.remove({ id: "grapplemod:rocketupgradeitem" })
		event.remove({ id: "grapplemod:rockethook" })
		//Double hooks suck, not sure why this one
		event.remove({ id: "grapplemod:rocketdoublemotorhook" })
		//The magnet hook isn't that crazy considering how it's crafted from the repeller.
		//Would be nice to give it a recipe that doesn't involve the repeller
		event.remove({ id: "grapplemod:forcefieldupgradeitem" })
		event.remove({ id: "grapplemod:magnethook" })
	})
}