ServerEvents.recipes(event => {
  // Generates new recipes for the mechanisms that does not consume the tool in the deploying process if they are the "Enchanted" (unbreakable) ones
  function unbreakableRecipe(toolid, mechanismid) {
    event.recipes.create
      .deploying(mechanismid, [Item.of(mechanismid.replace(":", ":incomplete_"), "{SequencedAssembly:{Progress:0.6666667f,Step:2}}").weakNBT(), toolid])
      .keepHeldItem();
  }
  unbreakableRecipe("kubejs:enchanted_saw", "kubejs:kinetic_mechanism");
  unbreakableRecipe("kubejs:enchanted_screwdriver", "create:precision_mechanism");
  unbreakableRecipe("kubejs:enchanted_chromatic_resonator", "kubejs:inductive_mechanism");
  unbreakableRecipe("kubejs:enchanted_flash_drive", "kubejs:calculation_mechanism");
});
