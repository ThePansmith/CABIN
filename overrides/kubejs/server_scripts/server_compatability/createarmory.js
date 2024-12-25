// Create Armory
if(Platform.isLoaded("createarmory")) {
	onEvent('recipes', event => {
  
    // Strengthened Molten Brass Rework
    //event.remove({id: 'createarmory:strengthened_brass_recipe'})
    //event.recipes.createMixing(Fluid.of('createarmory:molten_brass', 3), [Fluid.of('tconstruct:molten_brass', 3), Fluid.of('tconstruct:molten_copper', 3)]).processingTime(1)
    //event.recipes.createMixing(Fluid.of('createarmory:molten_brass', 1), [Fluid.of('tconstruct:molten_brass', 1), Fluid.of('tconstruct:molten_copper', 1)]).processingTime(1)

    // Bullet Casings Rework
    event.remove({id: 'createarmory:nine_mm_mold_complete_recipe'})
    event.remove({id: 'createarmory:fifty_cal_mold_complete_recipe'})
    event.remove({id: 'createarmory:five_five_six_mold_complete_recipe'})
    let casing = (type, brassAmount) => {
      let inter = `kubejs:unfinished_${type}_mold`
      event.recipes.createSequencedAssembly([
        'createarmory:' + type + '_mold_complete',],
        'createarmory:' + type + '_mold',[
		  event.recipes.createFilling(inter, [inter, {fluid: 'createarmory:molten_brass', amount: brassAmount}]),
      event.recipes.createPressing(inter, inter),])
      .loops(1)
      .transitionalItem(inter)
    }
    casing('nine_mm', 10)
    casing('fifty_cal', 25)
    casing('five_five_six', 15)

    // Bullet Molds Rework
    event.remove({id: 'createarmory:nine_mm_mold_break'})
    event.remove({id: 'createarmory:fifty_cal_mold_break'})
    event.remove({id: 'createarmory:five_five_six_mold_break'})
    let mold = (casing, mold) => {
      event.recipes.createCutting('createarmory:' + casing, 'createarmory:' + mold)
    }
    mold('nine_mm_casing', 'nine_mm_mold_complete')
    mold('fifty_cal_casing', 'fifty_cal_mold_complete')
    mold('five_five_six_casing', 'five_five_six_mold_complete')

    // Bullets Rework
    event.remove({id: 'createarmory:shotgun_shell_recipe'})
    let bullet = (type, inter) => {
      event.recipes.createSequencedAssembly([
        'createarmory:' + type],
        'createarmory:' + type + '_casing',[
      event.recipes.createDeploying(inter, [inter, [Platform.isLoaded('createbigcannons') ? "createbigcannons:gunpowder_pinch" : 'minecraft:gunpowder']]),
      event.recipes.createDeploying(inter, [inter, '#forge:nuggets/brass']),
      event.recipes.createPressing(inter, inter),])
      .loops(1)
      .transitionalItem(inter)
    }
    bullet('nine_mm', 'createarmory:unfinished_nine_mm')
    bullet('fifty_cal', 'createarmory:unfinished_fifty_cal_casing')
    bullet('five_five_six', 'createarmory:unfinished_five_five_six_casing')

    // Shotgun Shells Rework
    let inter = 'createarmory:unfinished_shotgun_shell'
      event.recipes.createSequencedAssembly([
      'createarmory:shotgun_shell',],
      'minecraft:paper',[
    event.recipes.createDeploying(inter, [inter, [Platform.isLoaded('createbigcannons') ? "createbigcannons:gunpowder_pinch" : 'minecraft:gunpowder']]),
    event.recipes.createDeploying(inter, [inter, [Platform.isLoaded('createbigcannons') ? "createbigcannons:shot_balls" : '#forge:nuggets/lead']]),
    event.recipes.createDeploying(inter, [inter, [Platform.isLoaded('createbigcannons') ? "createbigcannons:shot_balls" : '#forge:nuggets/lead']]),
    event.recipes.createPressing(inter, inter),
    ])
    .loops(1)
    .transitionalItem(inter)

    // Other Fixes & Tweaks
    event.replaceInput({mod: 'createarmory'}, 'minecraft:iron_ingot', '#forge:ingots/steel')
    event.replaceInput({mod: 'createarmory'}, 'create:sturdy_sheet', '#forge:plates/steel')
    event.replaceInput({mod: 'createarmory'}, 'minecraft:clay', 'minecraft:clay_ball')
    event.replaceOutput({mod: 'createarmory'}, 'createarmory:junk_gun', 'createarmory:empty_junk_gun')
    event.shapeless('createarmory:mounted_rpg', ['createarmory:empty_rpg', 'createarmory:gun_mount'])
  })

  onEvent('server.datapack.first', event => {

    // Janky-ass Bucket Deleter Fix
    event.addJson(`createarmory:recipes/molten_brass_bucket_to_fluid`, {
      "type": "create:emptying",
      "ingredients": [{"item": "createarmory:molten_brass_bucket"}],
      "results": [{
        "fluid": "createarmory:molten_brass", "amount": 1000},{
        "item": "minecraft:bucket"}]
    })
  })
}