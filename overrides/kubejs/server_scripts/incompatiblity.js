// Optifine is notorious for being extremely broken with mods as a result of it both being extremely invasive of the game's code, as well as being closed source, preventing mod developers from even being able to attempt to create compatablity
// If you want shaders, use Oculus, all optifine shaderpacks work perfectly fine on it.
// https://www.curseforge.com/minecraft/mc-mods/oculus  
// If for some reason you still want to use optifine, delete the following code, but know that no support will be offered.

onEvent('player.logged_in', event => {
if (Platform.isLoaded('optifine')) {    
	event.player.paint({
		example: { type: 'rectangle', x: 0, y: 0, w: '$screenW', h: '$screenH', texture: 'kubejs:textures/item/optifine.png', draw: 'always'}
	})
}})

