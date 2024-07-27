if(Platform.isLoaded("computercraft")) {
	onEvent('recipes', event => {
		event.replaceInput({ id: "computercraft:cable" }, MC('redstone'), PR_C('red_ingot'))
		event.replaceInput({ id: "computercraft:wired_modem" }, MC('redstone'), PR_C('red_ingot'))

		event.remove({ id: "computercraft:turtle_advanced" })
		event.remove({ id: "computercraft:turtle_advanced_upgrade" })
		event.remove({ id: "computercraft:turtle_normal" })
	
		event.smithing("computercraft:turtle_normal", "computercraft:computer_normal", TE("invar_gear"))
		event.smithing("computercraft:turtle_advanced", "computercraft:computer_advanced", TE("invar_gear"))
		event.recipes.createMechanicalCrafting("computercraft:turtle_normal", "AB", { A: "computercraft:computer_normal", B: TE("invar_gear") })
		event.recipes.createMechanicalCrafting("computercraft:turtle_advanced", "AB", { A: "computercraft:computer_advanced", B: TE("invar_gear") })
	
		event.shaped("computercraft:turtle_advanced", [
			'SSS',
			'SMS',
			'S S'
		], {
			M: "computercraft:turtle_normal",
			S: MC('gold_ingot')
		})
	})
}