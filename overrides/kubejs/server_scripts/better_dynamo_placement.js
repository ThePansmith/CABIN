// Block Placement

function opposite(face) {
	if (face.equals('down'))
		return 'up'
	if (face.equals('east'))
		return 'west'
	if (face.equals('west'))
		return 'east'
	if (face.equals('north'))
		return 'south'
	if (face.equals('south'))
		return 'north'
	return 'down'
}

onEvent('entity.spawned', event => {
	let entity = event.getEntity()
	if (entity.getType() == "appliedenergistics2:singularity") {
		let item = entity.getItem()
		if (item == null)
			return
		if (!item.getId().contains("quantum"))
			return
		entity.setMotionX(0)
		entity.setMotionY(0)
		entity.setMotionZ(0)
		return
	}
	if (entity.getType() != "minecraft:item")
		return
	let item = entity.getItem()
	if (item == null)
		return
	if (!item.getId().startsWith("tconstruct:"))
		return
	if (!item.getId().endsWith("slime_fern"))
		return
	let block = entity.getBlock()
	if (block.getId() != "occultism:spirit_fire" && block.getDown().getId() != "occultism:spirit_fire")
		return
	entity.setMotionX(entity.getMotionX() / 16)
	entity.setMotionY(0.35)
	entity.setMotionZ(entity.getMotionZ() / 16)
	entity.setX(Math.floor(entity.getX()) + .5)
	entity.setY(Math.floor(entity.getY()) - .5)
	entity.setZ(Math.floor(entity.getZ()) + .5)
})


onEvent('player.tick', event => {

	// Fixes advanced rocketry not applying low gravity on the moon
	let player = event.getPlayer()

	if (player.minecraftPlayer.field_70173_aa % 10 != 0)
		return
	if (event.world.getDimension() != "custommoon:moon")
		return

	let effects = java("net.minecraft.potion.Effects")
	player.getPotionEffects().add(effects.field_204839_B, 20, 0, false, false) // slow fall
	player.getPotionEffects().add(effects.field_76430_j, 20, 4, false, false) // jump boost

})

onEvent('player.tick', event => {

	// Fixes advanced rocketry not descending their rocket
	let player = event.getPlayer()
	if (player.getY() < 700)
		return

	let riding = player.getRidingEntity()
	if (!riding)
		return
	if (riding.getType() != "advancedrocketry:rocket")
		return

	let nbt = riding.getFullNBT()
	if (nbt["flight"] == 0) {
		nbt["flight"] = 1
		riding.setFullNBT(nbt)
	}

})

onEvent('block.place', event => {
	// Reverse placed Dynamos on Sneak 
	if (event.getEntity() == null)
		return
	if (block.getId().startsWith('thermal:dynamo')) {
		let properties = block.getProperties()
		if (event.getEntity().isCrouching()) {
			properties['facing'] = opposite(properties['facing'].toString())
			block.set(block.getId(), properties)
		}
	}
})