StartupEvents.registry("item", event => {
  // Creates a duplicate tool with a given texture to be used as non-consumable ingredient in auxiliary deployer recipes
  function createEnchanted(tool, texture) {
    event
      .create("enchanted_" + tool.toLowerCase().replace(" ", "_"))
      .unstackable()
      .glow(true)
      .displayName("Enchanted " + tool)
      .rarity("uncommon")
      .texture(texture)
      .tooltip(Text.darkPurple("To be used ONLY with deployers"));
  }
  createEnchanted("Saw", "cb_microblock:item/diamond_saw");
  createEnchanted("Screwdriver", "projectred_core:item/screwdriver");
  createEnchanted("Chromatic Resonator", "cabin:item/chromatic_resonator");
  createEnchanted("Flash Drive", "cabin:item/boot_medium");
});
