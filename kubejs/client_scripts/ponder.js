
// Ponder.registry((event) => {
//     event.create("kubejs:alchemical_laser")
//         .scene("alchemy_setup", "The Thermal Alchemy Setup", "laser_alchemy", (scene, util) => {
//             scene.configureBasePlate(0, 0, 5);
//             scene.showBasePlate();
//             scene.idle(10)

//             let largeCog = util.select.position(5, 0, 2)
//             let deployerSingle = util.select.position(4, 1, 3)
//             let smallCog = util.select.position(4, 1, 2)
//             let lamp = util.select.fromTo(4, 1, 4, 4, 2, 4)
//             let deployer = util.select.fromTo(4, 1, 2, 4, 2, 4)
//             let machine = util.select.position(2, 1, 3)
//             let light = util.select.position(2, 1, 2)

//             scene.world.showSection(machine, Facing.down)
//             scene.idle(15)

//             scene.overlay.showText(50)
//                 .text("Start with an Invar Machine")
//                 .pointAt(util.vector.topOf(2, 1, 3))
//                 .colored(PonderPalette.WHITE)
//                 .placeNearTarget()
//             scene.idle(60)

//             scene.world.showSection(light, Facing.east)
//             scene.overlay.showText(40)
//                 .text("Attach a Cage Lamp of any colour")
//                 .pointAt(util.vector.centerOf(2, 1, 2))
//                 .colored(PonderPalette.WHITE)
//                 .placeNearTarget()
//             scene.idle(60)


//             scene.overlay.showText(40)
//                 .text("Toggle it on with a wrench")
//                 .colored(PonderPalette.GREEN)
//                 .pointAt(util.vector.centerOf(2, 1, 2))
//                 .placeNearTarget()
//                 scene.idle(20)

//                 scene.overlay.showControls(new PonderInput(util.vector.blockSurface(util.vector.centerOf(2.5, 1, 2), Facing.west), PonderPointing.RIGHT)
//                 .rightClick().withWrench(),
//                 50)
//             scene.idle(10)

//             scene.world.setBlock(util.grid.at(2, 1, 2), util.getDefaultState("kubejs:ponder_laser_lamp_on"), false)
//             scene.idle(15)

//         scene.idle(50)

//             scene.world.setKineticSpeed(deployer, 0)
//             scene.world.showSection(deployerSingle, Facing.down)
//             scene.idle(15)

//             scene.overlay.showText(60)
//                 .text("Place a Deployer targeting the Invar Machine")
//                 .pointAt(util.vector.topOf(4, 1, 3))
//                 .colored(PonderPalette.WHITE)
//                 .placeNearTarget()
//             scene.idle(70)
//             scene.overlay.showControls(new PonderInput(util.vector.blockSurface(util.grid.at(4, 1, 3), Facing.west), PonderPointing.RIGHT)
//                 .rightClick().withWrench(),
//                 50)
//             scene.idle(8)
//             scene.world.modifyTileNBT(deployerSingle, (nbt) => {nbt.Mode = { Mode: "PUNCH"}});

//             scene.overlay.showText(50)
//                 .text("Set it to Punch mode using a Wrench")
//                 .colored(PonderPalette.GREEN)
//                 .pointAt(util.vector.topOf(4, 1, 3))
//                 .placeNearTarget()
//             scene.idle(20)
//             scene.world.showSection(largeCog, Facing.up)
//             scene.world.showSection(smallCog, Facing.down)
//             scene.idle(5)
//             scene.world.showSection(lamp, Facing.down)
//             scene.idle(5)
//             scene.world.setKineticSpeed(deployer, 64)
//             scene.idle(60)
//             scene.overlay.showText(50)
//                 .attachKeyFrame()
//                 .text("Whenever the Deployer activates...")
//                 .pointAt(util.vector.topOf(4, 1, 3))
//                 .colored(PonderPalette.WHITE)
//                 .placeNearTarget()

//             scene.idle(30)
//             scene.world.toggleRedstonePower(lamp)
//             scene.idle(3)
//             scene.world.moveDeployer(util.grid.at(4, 1, 3), 1, 25);
//             scene.idle(15)
//             scene.idle(10)

//             scene.effects.indicateSuccess(util.grid.at(2, 1, 2))
//             scene.effects.indicateSuccess(util.grid.at(2, 1, 1))
//             scene.effects.indicateSuccess(util.grid.at(2, 1, 0))
//             scene.effects.indicateSuccess(util.grid.at(2, 1, -1))

//             scene.idle(3)
//             scene.world.moveDeployer(util.grid.at(4, 1, 3), -1, 25);
//             scene.idle(10)
//             scene.world.toggleRedstonePower(lamp)
//             // scene.effects.indicateRedstone(util.grid.at(4, 2, 4))

//             scene.overlay.showText(50)
//                 .text("...the Laser Lamp will emit a High-Energy Beam")
//                 .colored(PonderPalette.GREEN)
//                 .pointAt(util.vector.centerOf(2, 1, 2))
//                 .placeNearTarget()
//             scene.idle(60)

//             scene.world.showSection(util.select.fromTo(1, 1, 0, 3, 1, 0), Facing.west)
//             scene.idle(5)
//             //let HopperMinecart = Java.loadClass("net.minecraft.entity.item.minecart.HopperMinecartEntity")
//             //let cartHandle =
//             //scene.special.createCart(util.vector.topOf(2, 0, 0), 0, (w, x, y, z) => new HopperMinecart(w, x, y, z))
//             scene.world.createEntity("minecraft:hopper_minecart", [2,1,0]);
//             scene.idle(20)
//             scene.overlay.showText(80)
//                 .attachKeyFrame()
//                 .text("Hopper Minecarts caught in the Beam will process their contained Items")
//                 .pointAt(util.vector.centerOf(2, 1, 0))
//                 .colored(PonderPalette.WHITE)
//                 .placeNearTarget()
//             scene.idle(70)

//             scene.overlay.showControls(new PonderInput(util.vector.centerOf(2, 1, 0), PonderPointing.DOWN)
//                 .withItem("thermal:flux_magnet"),
//                 40)
//             scene.idle(5)
//             scene.overlay.showControls(new PonderInput(util.vector.centerOf(2, 1, 0), PonderPointing.UP)
//                 .withItem("minecraft:basalt"),
//                 35)
//             scene.idle(30)

//             scene.world.toggleRedstonePower(lamp)
//             scene.idle(3)
//             scene.world.moveDeployer(util.grid.at(4, 1, 3), 1, 25);
//             scene.idle(15)
//             scene.idle(10)

//             scene.effects.indicateSuccess(util.grid.at(2, 1, 2))
//             scene.effects.indicateSuccess(util.grid.at(2, 1, 1))
//             scene.effects.indicateSuccess(util.grid.at(2, 1, 0))
//             scene.effects.indicateSuccess(util.grid.at(2, 1, -1))

//             scene.idle(3)
//             scene.world.moveDeployer(util.grid.at(4, 1, 3), -1, 25);
//             scene.idle(10)

//             scene.overlay.showControls(new PonderInput(util.vector.centerOf(2, 1, 0), PonderPointing.DOWN)
//                 .withItem("thermal:flux_magnet"),
//                 40)
//             scene.idle(5)
//             scene.overlay.showControls(new PonderInput(util.vector.centerOf(2, 1, 0), PonderPointing.UP)
//                 .withItem("thermal:basalz_rod"),
//                 35)

//             // scene.effects.indicateRedstone(util.grid.at(4, 2, 4))
//             scene.world.toggleRedstonePower(lamp)
//         })
// })
