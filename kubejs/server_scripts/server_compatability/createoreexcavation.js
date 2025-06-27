if(Platform.isLoaded("createoreexcavation")) {
    ServerEvents.recipes(event=> {

//Items
        event.shaped("1x createoreexcavation:vein_finder", [
            "  A" ,
            " B " ,
            "C  " 
	], {
            A: "minecraft:ender_eye" ,
            B: "create:precision_mechanism" ,
            C: "minecraft:stick"
	})

//Extraction Machines
        brassMachine(event, Item.of("createoreexcavation:sample_drill", 1), "thermal:drill_head")

        event.remove({output: "createoreexcavation:drilling_machine"})
        event.recipes.create.mechanical_crafting("createoreexcavation:drilling_machine", [
            " ADA " ,
            "ACBCA" ,
            "EBBBE" ,
            "GAFAG" ,
            "GAFAG"
        ], {
            A: "#forge:plates/brass" ,
            D: "kubejs:copper_machine" ,
            C: "create:precision_mechanism" ,
            B: "kubejs:brass_machine" ,
            E: "create:brass_block" ,
            F: "create:mechanical_drill" ,
            G: "create:metal_girder"
        })

        event.remove({output: "createoreexcavation:extractor"})
        event.recipes.create.mechanical_crafting("createoreexcavation:extractor", [
            " ADA " ,
            "ACBCA" ,
            "FBEBF" ,
            "GABAG" ,
            "GAFAG"
        ], {
            A: "#forge:plates/copper" ,
            B: "kubejs:copper_machine" ,
            C: "create:precision_mechanism" ,
            D: "kubejs:brass_machine" ,
            E: "create:mechanical_drill" ,
            F: "create:mechanical_pump" ,
            G: "create:metal_girder"
        })

//Ore Tweaks
//Replace Raw Redstone for Cinnabar
        event.remove({output: "createoreexcavation:raw_redstone", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("thermal:cinnabar", "createoreexcavation:ore_vein_type/redstone", 600)
            .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("thermal:cinnabar", "createoreexcavation:ore_vein_type/redstone", 300)
            .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("thermal:cinnabar", "createoreexcavation:ore_vein_type/redstone", 150)
            .drill("createoreexcavation:netherite_drill")

//Add Lead Ore
        event.recipes.createoreexcavation.vein('{"text": "Concentrated Raw Lead"}', "thermal:raw_lead")
            .placement(500, 128, 999).veinSize(1, 3).biomeWhitelist('minecraft:is_overworld')
            .id("kubejs:lead_ore")

        event.recipes.createoreexcavation.drilling("create:crushed_raw_lead", "kubejs:lead_ore", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("create:crushed_raw_lead", "kubejs:lead_ore", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("thermal:raw_lead", "kubejs:lead_ore", 1200)
             .drill("createoreexcavation:netherite_drill")

//Drill Retiers
//Iron Drill, slowest

        event.remove({output: "createoreexcavation:drill"})
        event.shaped("1x createoreexcavation:drill", [
            " AC",
            " AA",
            "B  ",
        ], {
            A: "minecraft:iron_block",
            B: "thermal:drill_head",
            C: "kubejs:zinc_machine"
        })

        event.remove({output: "minecraft:coal", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("minecraft:coal", "createoreexcavation:ore_vein_type/coal", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("minecraft:coal", "createoreexcavation:ore_vein_type/coal", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:coal", "createoreexcavation:ore_vein_type/coal", 150)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "minecraft:raw_iron", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("create:crushed_raw_iron", "createoreexcavation:ore_vein_type/iron", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("create:crushed_raw_iron", "createoreexcavation:ore_vein_type/iron", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:raw_iron", "createoreexcavation:ore_vein_type/iron", 1200)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "minecraft:lapis_lazuli", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("minecraft:lapis_lazuli", "createoreexcavation:ore_vein_type/lapis", 200)
             .drill("createoreexcavation:drill")
    //48 per minute at 256
        event.recipes.createoreexcavation.drilling("minecraft:lapis_lazuli", "createoreexcavation:ore_vein_type/lapis", 100)
             .drill("createoreexcavation:diamond_drill")
    //96 per minute at 256
        event.recipes.createoreexcavation.drilling("minecraft:lapis_ore", "createoreexcavation:ore_vein_type/lapis", 600)
             .drill("createoreexcavation:netherite_drill")
    //16 per minute, crushed into 160 per minute

        event.remove({output: "minecraft:raw_copper", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("create:crushed_raw_copper", "createoreexcavation:ore_vein_type/copper", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("create:crushed_raw_copper", "createoreexcavation:ore_vein_type/copper", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:raw_copper", "createoreexcavation:ore_vein_type/copper", 1200)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "create:raw_zinc", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("create:crushed_raw_zinc", "createoreexcavation:ore_vein_type/zinc", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("create:crushed_raw_zinc", "createoreexcavation:ore_vein_type/zinc", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("create:raw_zinc", "createoreexcavation:ore_vein_type/zinc", 1200)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "minecraft:quartz", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("minecraft:quartz", "createoreexcavation:ore_vein_type/quartz", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("minecraft:quartz", "createoreexcavation:ore_vein_type/quartz", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:nether_quartz_ore", "createoreexcavation:ore_vein_type/quartz", 300)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "minecraft:glowstone_dust", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("minecraft:glowstone_dust", "createoreexcavation:ore_vein_type/glowstone", 400)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("minecraft:glowstone_dust", "createoreexcavation:ore_vein_type/glowstone", 200)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:glowstone", "createoreexcavation:ore_vein_type/glowstone", 400)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "minecraft:raw_gold", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("create:crushed_raw_gold", "createoreexcavation:ore_vein_type/gold", 600)
             .drill("createoreexcavation:drill")
        event.recipes.createoreexcavation.drilling("create:crushed_raw_gold", "createoreexcavation:ore_vein_type/gold", 300)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:raw_gold", "createoreexcavation:ore_vein_type/gold", 1200)
             .drill("createoreexcavation:netherite_drill")

//Diamond Drill, fastest

        event.remove({output: "createoreexcavation:diamond_drill"})
        event.shaped("1x createoreexcavation:diamond_drill", [
            " AC",
            " DA",
            "B  ",
        ], {
            A: "minecraft:diamond_block",
            B: "createoreexcavation:drill",
            C: "thermal:machine_frame",
            D: "minecraft:diamond"
        })

        event.remove({input: "createoreexcavation:raw_diamond"})
        event.recipes.create.crushing(["minecraft:diamond", Item.of("minecraft:diamond").withChance(0.5)], "createoreexcavation:raw_diamond")
        event.remove({output: "minecraft:diamond", type: "createoreexcavation:drilling"})
        event.remove({output: "createoreexcavation:raw_diamond", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("minecraft:diamond", "createoreexcavation:ore_vein_type/diamond", 600)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("createoreexcavation:raw_diamond", "createoreexcavation:ore_vein_type/diamond", 1200)
             .drill("createoreexcavation:netherite_drill")

        event.remove({output: "minecraft:emerald", type: "createoreexcavation:drilling"})
        event.remove({output: "createoreexcavation:raw_emerald", type: "createoreexcavation:drilling"})
        event.recipes.createoreexcavation.drilling("minecraft:emerald", "createoreexcavation:ore_vein_type/emerald", 600)
             .drill("createoreexcavation:diamond_drill")
        event.recipes.createoreexcavation.drilling("minecraft:emerald", "createoreexcavation:ore_vein_type/emerald", 400)
             .drill("createoreexcavation:netherite_drill")

//Netherite Drill, slowest, but allows extracting concentrated ore instead

        event.remove({output: "createoreexcavation:netherite_drill"})
        event.smithing("createoreexcavation:netherite_drill", "kubejs:enderium_machine", "createoreexcavation:diamond_drill", "minecraft:netherite_ingot")
		
        event.recipes.createoreexcavation.drilling("createoreexcavation:raw_diamond", "createoreexcavation:ore_vein_type/hardened_diamond", 600)
             .drill("createoreexcavation:netherite_drill") 
    })
}
