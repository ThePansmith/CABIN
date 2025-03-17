// Block Placement

function opposite(face) {
    if (face.equals("down"))
        return "up"
    if (face.equals("east"))
        return "west"
    if (face.equals("west"))
        return "east"
    if (face.equals("north"))
        return "south"
    if (face.equals("south"))
        return "north"
    return "down"
}

EntityEvents.spawned(event => {
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

BlockEvents.placed(event => {
    // Reverse placed Dynamos on Sneak
    if (event.getEntity() == null)
        return
    let block = event.getBlock();
    if (block.getId().startsWith("thermal:dynamo")) {
        let properties = block.getProperties()
        if (event.getEntity().isCrouching()) {
            properties["facing"] = opposite(properties["facing"].toString())
            block.set(block.getId(), properties)
        }
    }
})
