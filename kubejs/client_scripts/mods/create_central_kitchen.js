if(Platform.isLoaded("create_central_kitchen")) {
    ClientEvents.highPriorityAssets(event=>{
        let emiHide = [
            "item:create_central_kitchen:creative_tab_icon",

            "item:create_central_kitchen:incomplete_egg_sandwich",
            "item:create_central_kitchen:incomplete_chicken_sandwich",
            "item:create_central_kitchen:incomplete_hamburger",
            "item:create_central_kitchen:incomplete_bacon_sandwich",
            "item:create_central_kitchen:incomplete_mutton_wrap",
            "item:create_central_kitchen:incomplete_apple_pie",
            "item:create_central_kitchen:incomplete_sweet_berry_cheesecake",
            "item:create_central_kitchen:incomplete_pumpkin_pie",
            "item:create_central_kitchen:incomplete_cherry_pie",
            "item:create_central_kitchen:incomplete_truffle_pie",
            "item:create_central_kitchen:incomplete_mulberry_pie",
        ];

        if (!Platform.isLoaded("upgrade_aquatic")) emiHide.push("item:create_central_kitchen:mulberry_pie_slice")
            if (!Platform.isLoaded("peculiars")) {
                emiHide.push("item:create_central_kitchen:aloe_cake_slice")
                emiHide.push("item:create_central_kitchen:yucca_cake_slice")
                emiHide.push("item:create_central_kitchen:passionfruit_cake_slice")
            }
        if (!Platform.isLoaded("seasonals")) {
            emiHide.push("item:create_central_kitchen:pumpkin_cake_slice")
            emiHide.push("item:create_central_kitchen:sweet_berry_cake_slice")
        }
        if (!Platform.isLoaded("createaddition")) {
            emiHide.push("item:create_central_kitchen:chocolate_cake_slice")
            emiHide.push("item:create_central_kitchen:honey_cake_slice")
        }

        let json = {
            removed: emiHide
        }
        event.add("emi:index/stacks/create_central_kitchen_removed_stacks", json)
        
        //Hide CABIN's fern deploying recipes from EMI since cck has an automated cuting tab.
        let hiddenRecipes = [
            "jei:/kubejs/deploying/earth_slime_fern_leaf_using_deployer",
            "jei:/kubejs/deploying/sky_slime_fern_leaf_using_deployer",
            "jei:/kubejs/deploying/ender_slime_fern_leaf_using_deployer"
        ]

        json = {
            filters: hiddenRecipes.map(recipe=>{return {id: recipe}})
        }

        event.add("emi:recipe/filters/create_central_kitchen_hidden_recipes", json)
        
    })
}