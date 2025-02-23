// MrCrayfish Gun Mod (CGM)
// This script is meant to be used with the create guns resource pack
// Link: https://www.curseforge.com/minecraft/texture-packs/create-guns/download/3739690
if(Platform.isLoaded("cgm")) {
  onEvent('recipes', event => {
  
    // Remove CGM recipes
    event.remove({ mod: 'cgm' })

    // Add CABIN recipes

    // Define the ingredients
    const Air = 'minecraft:air';
    const Barrel = 'minecraft:barrel';
    const ElectronTube = 'create:electron_tube';
    const KineticMechanism = 'kubejs:kinetic_mechanism';
    const PrecisionMechanism = 'create:precision_mechanism';
    const FluidPipe = 'create:fluid_pipe';
    const StoneRod = 'cb_microblock:stone_rod';
    const AndesiteAlloy = 'create:andesite_alloy';

    // Create the mechanical crafting recipe for pistol
    event.recipes.createMechanicalCrafting('cgm:pistol', [
        'ABB',
        'CZZ'
    ], {
        A: KineticMechanism,
        B: FluidPipe,
        C: StoneRod,
        Z: Air
    });

    // Create the mechanical crafting recipe for machine pistol
    event.recipes.createMechanicalCrafting('cgm:machine_pistol', [
        'ABB',
        'CZZ'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        Z: Air
    });

    // Create the mechanical crafting recipe for shotgun
    event.recipes.createMechanicalCrafting('cgm:shotgun', [
        'ADBBB',
        'CZZCZ'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        D: AndesiteAlloy,
        Z: Air
    });

    // Create the mechanical crafting recipe for the rifle
    event.recipes.createMechanicalCrafting('cgm:rifle', [
        'ADBRBBB',
        'CZZCZZZ'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        D: AndesiteAlloy,
        R: ElectronTube,
        Z: Air
    });

    // Create the mechanical crafting recipe for the assault rifle
    event.recipes.createMechanicalCrafting('cgm:assault_rifle', [
        'ADBRBB',
        'CZZCZZ'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        D: AndesiteAlloy,
        R: ElectronTube,
        Z: Air
    });

    // Create the mechanical crafting recipe for the heavy rifle
    event.recipes.createMechanicalCrafting('cgm:heavy_rifle', [
        'ADBBRBBB',
        'CZZZCZZZ'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        D: AndesiteAlloy,
        R: ElectronTube,
        Z: Air
    });

    // Create the mechanical crafting recipe for the grenade launcher
    event.recipes.createMechanicalCrafting('cgm:grenade_launcher', [
        'DABDB',
        'CZZEC'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        D: AndesiteAlloy,
        E: Barrel,
        Z: Air
    });

    // Create the mechanical crafting recipe for the minigun
    event.recipes.createMechanicalCrafting('cgm:mini_gun', [
        'ZADBBB',
        'DADBBB',
        'DADBBB',
        'ZADBBB'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        D: AndesiteAlloy,
        Z: Air
    });

    // Create the mechanical crafting recipe for the bazooka
    event.recipes.createMechanicalCrafting('cgm:bazooka', [
        'RADBB',
        'ZZCZZ'
    ], {
        A: PrecisionMechanism,
        B: FluidPipe,
        C: StoneRod,
        D: AndesiteAlloy,
        R: ElectronTube,
        Z: Air
    });
  })
}