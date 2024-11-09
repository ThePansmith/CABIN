if(Platform.isLoaded("balancedflight")) {
	onEvent('recipes', event => {
	event.remove({ mod: 'balancedflight' })
	event.recipes.createSequencedAssembly([
	   'balancedflight:flight_anchor',
	], 'minecraft:beacon', [
		event.recipes.createDeploying(MC('beacon'), [MC('beacon'), KJ('inductive_mechanism')]),
		event.recipes.createDeploying(MC('beacon'), [MC('beacon'), CR('railway_casing')]),
		event.recipes.createDeploying(MC('beacon'), [MC('beacon'), CR('shaft')]),
		event.recipes.createDeploying(MC('beacon'), [MC('beacon'), MC('elytra')]),
	]).loops(1)
  })
}
