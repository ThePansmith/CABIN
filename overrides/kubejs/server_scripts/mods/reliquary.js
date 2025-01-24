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
				[Fluid.of('minecraft:water',216),Fluid.of('kubejs:fertile_potion',24)],
				[Fluid.of('sliceanddice:fertilizer',240)]
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
		boneProcess(RQ('rib_bone'), MC('bone'), MC('white_dye'))
		event.recipes.createMilling([MC('gunpowder',8)],RQ('catalyzing_gland'))
		event.recipes.createMilling([MC('gunpowder',12)],RQ('eye_of_the_storm'))
		event.recipes.createMilling([MC('snowball',6)],RQ('frozen_core'))
		event.recipes.createMilling(['4x ae2:ender_dust'],RQ('nebulous_heart'))
		event.recipes.createMilling([MC('prismarine_shard',6)],RQ('guardian_spike'))
		event.recipes.createMilling([MC('black_dye',15),MC('gray_dye')],RQ('squid_beak'))
		if(Platform.isLoaded("createaddition")){//Rolling
			event.custom({"type":"createaddition:rolling",
				"input": {"item": "reliquary:chelicerae"},
				"result": {
					"item": "minecraft:string",
					"count": 8
				}
			})
			event.custom({"type":"createaddition:rolling",
				"input": {"item": "reliquary:molten_core"},
				"result": {
					"item": "minecraft:blaze_rod",
					"count": 2
				}
			})
		}
		if(Platform.isLoaded("tconstruct")){//Melting, necrotic bones
			event.custom({"type": "tconstruct:melting",
				"ingredient": {"item": "reliquary:slime_pearl"},
				"result": {
					"fluid": "tconstruct:earth_slime",
					"amount": 1500
				},
				"temperature": 50,
				"time": 60
			})
			event.custom({"type": "tconstruct:melting",
				"ingredient": {"item": "reliquary:molten_core"},
				"result": {
					"fluid": "tconstruct:magma",
					"amount": 750
				},
				"temperature": 300,
				"time": 92
			})
			event.custom({"type": "tconstruct:melting",
				"ingredient": {"item": "reliquary:nebulous_heart"},
				"result": {
					"fluid": "tconstruct:molten_ender",
					"amount": 1000
				},
				"temperature": 477,
				"time": 160
			})
			event.custom({"type": "tconstruct:melting",
				"ingredient": {"item": "reliquary:frozen_core"},
				"result": {
					"fluid": "tconstruct:powdered_snow",
					"amount": 500
				},
				"temperature": 0,
				"time": 80
			})
			boneProcess(RQ('withered_rib'),TC('necrotic_bone'),MC('black_dye'))
			event.recipes.minecraft.stonecutting('5x minecraft:bone',RQ('withered_rib'))
		}
		if(Platform.isLoaded('thermal')){//Crystallizer
			event.custom({"type": "thermal:crystallizer",
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
			})
			event.recipes.thermal.pulverizer([MC('gunpowder',8)],RQ('catalyzing_gland'))
			event.recipes.thermal.pulverizer([MC('gunpowder',12)],RQ('eye_of_the_storm'))
			event.recipes.thermal.pulverizer([MC('snowball',6)],RQ('frozen_core'))
			event.recipes.thermal.pulverizer(['4x ae2:ender_dust'],RQ('nebulous_heart'))
			event.recipes.thermal.pulverizer([MC('prismarine_shard',6)],RQ('guardian_spike'))
			event.recipes.thermal.pulverizer([MC('black_dye',15),MC('gray_dye')],RQ('squid_beak'))
		}
	})
}