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
    const Firework = 'minecraft:firework_rocket';
    const GlassBottle = 'minecraft:glass_bottle';
    const Gunpowder = 'minecraft:gunpowder';
    const RefinedRadiance = 'create:refined_radiance';
    const IronNugget = 'minecraft:iron_nugget';
    const IronIngot = 'minecraft:iron_ingot';
    const IronBlock = 'minecraft:iron_block';
    const ElectronTube = 'create:electron_tube';
    const KineticMechanism = 'kubejs:kinetic_mechanism';
    const SealedMechanism = 'kubejs:sealed_mechanism';
    const PrecisionMechanism = 'create:precision_mechanism';
    const FluidPipe = 'create:fluid_pipe';
    const StoneRod = 'cb_microblock:stone_rod';
    const AndesiteAlloy = 'create:andesite_alloy';
    const BlankGunAttachment = 'kubejs:blank_gun_attachment';
    const Glass = 'minecraft:glass';
    const Amethyst = 'minecraft:amethyst_shard';
    const Spyglass = 'minecraft:spyglass';
    const Wool = 'minecraft:white_wool';
    const Rubber = 'thermal:cured_rubber';
    const TNT = 'minecraft:tnt';

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
        'DADBB',
        'CZECZ'
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

    // Create the mechanical crafting recipe for blank gun attachment
    brassMachine(event, 'kubejs:blank_gun_attachment', FluidPipe);

    // Smithing recipes for Attachments
    event.smithing('cgm:short_scope', BlankGunAttachment, Glass);
    event.smithing('cgm:medium_scope', BlankGunAttachment, Amethyst);
    event.smithing('cgm:long_scope', BlankGunAttachment, Spyglass);

    event.smithing('cgm:silencer', BlankGunAttachment, Wool);

    event.smithing('cgm:light_grip', BlankGunAttachment, Rubber);
    event.smithing('cgm:specialised_grip', BlankGunAttachment, SealedMechanism);

    event.smithing('cgm:light_stock', BlankGunAttachment, IronNugget);
    event.smithing('cgm:tactical_stock', BlankGunAttachment, IronIngot);
    event.smithing('cgm:weighted_stock', BlankGunAttachment, IronBlock);

    // Manual Crafting for bullets and missiles
    event.shaped('cgm:basic_bullet', [
        'ZAZ',
        'ABA',
        'ZAZ'
    ], {
        A: IronNugget,
        B: Firework,
        Z: Air
    });

    event.shaped('cgm:advanced_bullet', [
        'ZAZ',
        'ABA',
        'ZAZ'
    ], {
        A: IronNugget,
        B: 'cgm:basic_bullet',
        Z: Air
    });

    event.shaped('cgm:shell', [
        'ZAZ',
        'ABA',
        'ZAZ'
    ], {
        A: IronNugget,
        B: 'cgm:basic_bullet',
        Z: Air
    });

    event.shaped('cgm:grenade', [
        'ZAZ',
        'ABA',
        'ZAZ'
    ], {
        A: Gunpowder,
        B: GlassBottle,
        Z: Air
    });

    event.shaped('cgm:stun_grenade', [
        'CAC',
        'ABA',
        'CAC'
    ], {
        A: Gunpowder,
        B: GlassBottle,
        C: RefinedRadiance,
    });

    event.shaped('cgm:stun_grenade', [
        'ZAZ',
        'ABA',
        'ZAZ'
    ], {
        A: RefinedRadiance,
        B: 'cgm:grenade',
        Z: Air
    });

    // Sequenced Assembly for bullets and missiles
    event.recipes.createSequencedAssembly([
        'cgm:basic_bullet'
    ], 'minecraft:firework_rocket', [
        event.recipes.createDeploying('cgm:basic_bullet', [Firework, IronNugget])
    ]).transitionalItem('cgm:basic_bullet').loops(2);

    event.recipes.createSequencedAssembly([
        'cgm:advanced_bullet'
    ], 'cgm:basic_bullet', [
        event.recipes.createDeploying('cgm:advanced_bullet', ['cgm:basic_bullet', ElectronTube])
    ]).transitionalItem('cgm:advanced_bullet').loops(1);

    event.recipes.createSequencedAssembly([
        'cgm:shell'
    ], 'cgm:basic_bullet', [
        event.recipes.createDeploying('cgm:shell', ['cgm:basic_bullet', IronNugget])
    ]).transitionalItem('cgm:shell').loops(1);

    event.recipes.createSequencedAssembly([
        'cgm:missile'
    ], 'cgm:advanced_bullet', [
        event.recipes.createDeploying('cgm:missile', ['cgm:advanced_bullet', TNT])
    ]).transitionalItem('cgm:missile').loops(2);

    event.recipes.createSequencedAssembly([
        'cgm:grenade'
    ], 'minecraft:gunpowder', [
        event.recipes.createDeploying('cgm:grenade', [GlassBottle, Gunpowder])
    ]).transitionalItem('cgm:grenade').loops(2);

    event.recipes.createSequencedAssembly([
        'cgm:stun_grenade'
    ], 'cgm:grenade', [
        event.recipes.createDeploying('cgm:stun_grenade', ['cgm:grenade', RefinedRadiance])
    ]).transitionalItem('cgm:stun_grenade').loops(2);
  });
}