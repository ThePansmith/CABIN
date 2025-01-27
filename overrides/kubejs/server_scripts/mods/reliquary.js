if(Platform.isLoaded("reliquary")) {
	onEvent('recipes', event => {
		event.forEachRecipe({id: /alkahestry/}, recipe => {
			recipe.id(recipe.getId() + '_manual_only')
		})

		//Vials contain fluid
		let vialAmount = 240 //Should be mod 3, < 250
		let container = RQ('empty_potion_vial')
		let vials = ['glowing_water','angelheart_vial','aphrodite_potion','fertile_potion']
		let ingredients = [
			[Fluid.of(MC('water'),vialAmount),MC('glowstone_dust'),MC('nether_wart'),MC('gunpowder')],
			[Fluid.of(KJ('fertile_potion'),vialAmount*2),RQ('infernal_claw')],
			[Fluid.of(KJ('fertile_potion'),vialAmount),MC('red_dye'),MC('cocoa_beans')],
			[Fluid.of(MC('water'),vialAmount),RQ('slime_pearl'),RQ('catalyzing_gland'),RQ('rib_bone')]
		]
		for (let i = 0; i < vials.length; i++) {
			var potion = Fluid.of(KJ(vials[i]),vialAmount)
			event.recipes.createFilling(RQ(vials[i]), [container, potion])
			event.recipes.createEmptying([container, potion], RQ(vials[i]))
			event.recipes.createMixing(potion, ingredients[i])
		}

		//Recipes
		event.recipes.createFilling(RQ('glowing_bread'),[F('#bread'),Fluid.of(KJ('glowing_water'),vialAmount/3)])
		event.recipes.createMixing(RQ('holy_hand_grenade',4),[Fluid.of(KJ('glowing_water'),vialAmount),MC('gold_nugget'),MC('tnt'),RQ('catalyzing_gland')])

		event.recipes.createFilling(RQ('phoenix_down'), [RQ('angelic_feather'),Fluid.of(KJ('angelheart_vial'),vialAmount*3)])

		event.recipes.createFilling(RQ('fertile_essence'),[MC('green_dye'),Fluid.of(KJ('fertile_potion'),vialAmount)])
		event.recipes.createEmptying([MC('green_dye'),Fluid.of(KJ('fertile_potion'),vialAmount)], RQ('fertile_essence'))
		event.recipes.createMixing(RQ('witherless_rose'),[MC('rose_bush'),Fluid.of(KJ('fertile_potion'),vialAmount*4),F('#nether_stars',4)])
		event.recipes.createFilling(RQ('fertile_lily_pad'),[MC('lily_pad'),Fluid.of(KJ('fertile_potion'),vialAmount*3)])
		event.recipes.createMixing(RQ('angelic_feather'),[F('#feathers'),RQ('nebulous_heart'),RQ('bat_wing'),Fluid.of(KJ('fertile_potion'),vialAmount)])
		if (Platform.isLoaded("sliceanddice")){
			event.recipes.create.mixing(
				[Fluid.of('sliceanddice:fertilizer',240)],
				[Fluid.of('kubejs:fertile_potion',24),Fluid.of('minecraft:water',216)]
			)
		}

		//Mob drops
		event.remove({id:"reliquary:uncrafting/bone"})
		let boneProcess = (rib, bone, dye) => {
			event.shapeless(`3x ${bone}`,[rib])
			event.stonecutting(`5x ${bone}`,rib)
			event.recipes.createMilling([
				MC('bone_meal',15),
				Item.of(dye).withCount(5).withChance(0.40),
				Item.of(MC('bone_meal',15)).withChance(0.40)
			], rib)
			if(Platform.isLoaded('thermal')){
				event.recipes.thermal.pulverizer([
					MC('bone_meal',15),
					Item.of(dye).withCount(5).withChance(0.40),
					Item.of(MC('bone_meal',15)).withChance(0.40)
				], rib)
			}
		}
		let crushing = (outputs, input) => {
			event.recipes.createMilling(outputs,input)
			if(Platform.isLoaded('thermal')){event.recipes.thermal.pulverizer(outputs,input)}
		}
		let melting = (output, input, temp, time) => {
			if(Platform.isLoaded('thermal')){event.recipes.thermal.crucible(output[0],input)}
			if(Platform.isLoaded("tconstruct")){
				var recipe = {
					"type":"tconstruct:melting",
					"ingredient":{item:input},
					"result": output.shift().toJson(),
					"temperature": temp,
					"time": time
				}
				//Sadly, tcon doesn't want our empty byproducts array :(
				if(output.length>0){recipe["byproducts"] = output.map(element => element.toJson())}
				event.custom(recipe)
			}
		}
		boneProcess(RQ('rib_bone'), MC('bone'), MC('white_dye'))
		crushing([MC('gunpowder',8)],RQ('catalyzing_gland'))
		crushing([MC('gunpowder',12)],RQ('eye_of_the_storm'))
		crushing([MC('snowball',6)],RQ('frozen_core'))
		crushing(['4x ae2:ender_dust'],RQ('nebulous_heart'))
		crushing([MC('prismarine_shard',6)],RQ('guardian_spike'))
		crushing([MC('black_dye',15),MC('gray_dye')],RQ('squid_beak'))
		crushing([MC('rotten_flesh',8)],RQ('zombie_heart'))
		melting([Fluid.of(TC('earth_slime'),1500)],RQ('slime_pearl'),50,60)
		melting([Fluid.of(TC('blazing_blood'),150),Fluid.of(TC('magma'),500)],RQ('molten_core'),300,92)
		melting([Fluid.of(TC('molten_ender'),1000)],RQ('nebulous_heart'),477,160)
		melting([Fluid.of(TC('powdered_snow'),500)],RQ('frozen_core'),0,80)
		melting([Fluid.of(TC('molten_gold'),30),Fluid.of(TC('blood'),150)],RQ('zombie_heart'),700,60)
		if(Platform.isLoaded("tconstruct")){boneProcess(RQ('withered_rib'),TC('necrotic_bone'),MC('black_dye'))
			event.recipes.minecraft.stonecutting('5x minecraft:bone',RQ('withered_rib'))
		}
		if(Platform.isLoaded('create_enchantment_industry')){melting([Fluid.of('create_enchantment_industry:ink',4000)],RQ('squid_beak'),75,60)}
		if(Platform.isLoaded('thermal')){event.custom({"type": "thermal:crystallizer",
			"ingredients": [
				{
					"fluid": "minecraft:water",
					"amount": 2000
				},
				{"item": "reliquary:guardian_spike"}
			],
			"result": [{
				"item":'minecraft:prismarine_crystals',
				"count":6
			}]
		})}
		if(Platform.isLoaded("createaddition")){//Rolling
			event.custom({"type":"createaddition:rolling","input": {"item": "reliquary:chelicerae"},
				"result": {
					"item": "minecraft:string",
					"count": 8
				}
			})
			event.custom({"type":"createaddition:rolling","input": {"item": "reliquary:molten_core"},
				"result": {
					"item": "minecraft:blaze_rod",
					"count": 2
				}
			})
		}
	})
}