# Changelog

## [Unreleased]
### Changes
 * Java 25 support
    * Updated forge, along with various mods.
 * Replaced Blockswap with AE2 meteor mixin
 * Updated Tinker's Construct
 * Added slime vines to overworld slime patches
 * Added more splashes and cleaned up questbook a minor amount

### Fixes
* Fixed a Quark and Soph Storage compat bug
* Fixed the trade machine model
* Fixed pewter being unobtainable
* Fuxed the ponder command in the questbook

## [2.1.2]
### Changes
 * Hotfix for curseforge not accepting the server builds because of Trial Chambers Reuploaded

## [2.1.1]
### Changes
 * Hotfix for curseforge not accepting CC:tweaked 1.116.2

## [2.1.0]
### Changes
 * Updated Create to 6.0.8, updated various other mods
 * Reworked Main Menu
  * Added a submenu with links to information
  * Added an ingame changelog
  * New loading screen Acey gif

### Texture work
 * New textures for Ad Astra, Pretty Pipes, Fluxducts to better match their recipes
 * Trading Station texture updated to match current brass textures and animated texture while active
 * Machine models and Lead Casing clean up

### Tooltips, quests, and other info
 * Tooltips now highlight when shift is held, like create's tooltips
 * Added tooltips to a variety of items
 * Reworked a bit of AE2's guidebook to match CABIN progression
 * Renamed BoP's rose quartz to blood quartz to set it apart from create's version
 * Added quests for EMI and more
 * Added a search alias for the configuration tool

### Compat additions
 * Added Create: Steam 'n' Rails Compat
 * Added Create: Factory Logistics Compat
 * Added Create: Mobile Packages Compat
 * Added Create: Balanced Flight Compat
 * Added Create: Extra Gauges Compat
 * Added Create: Railways Navigation Compat
   
### Fixes
* Fixed Logistic Mechanisms not working with Tinker's haste potion
* Fixed Create: Diesel Generator Oil bug
* Made Create: Power Loader Cheaper

## [2.0.11]
### Changes
* Updated Create to 6.0.6, thanks to Fix Unbreakables in Create 6.0.6
* Added and udated various other mods, see below
  * Added TConJEI, to be able to easily see TCon materials and abilities 
* Decreased logistic mechanism cost
* Added a tooltip for the strainer 
* Added coloring to various tooltips
* Updated Questbook

### Fixes
* Fixed Darkmodeeverywhere button overlapping with other buttons
* Strainer is no longer waterloggable
* Fixed Stainer and Alchemy JEI tabs
* Spelling fixes
* Fixed a broken link


## [2.0.10]
### Changes
* Now using Panpack template, among backend changes, this also includes a new serverpack that should be easier to use
* Updated localization files
* Updated Questbook

## [2.0.9]
### Changes
* Added Create Ore Excavation Compatibility
* Added neptunium fillet knife (now unbreakable and usable in slimy fern recipes)
* Added Not Enough Recipe Book
* Added alkaherstry recipes for ores
* Added exposed and weathered illusionary copper block variants
* Added a Questbook tooltip about opening it with a keybind
* Updated Questbook (noted the new AE2 singularity behavior, etc)
* Updated the compatibility script readme file
* Cleaned up some recipes

### Bug fixes
* Fixed Create: Diesel Generators Compatibility
* Fixed clientside compatibility scripts
* Fixed Prettypipes Crafting Terminal model
* Fixed Gemstone Catalysts not having recipes

## [2.0.8]
### Changes
* Hotfix to downgrade Create to 6.0.5 until unbreakable items work properly in deployers
* Readded missing resourcepacks

## [2.0.7]
### Changes
* Updated Create to 6.0.5
* Updated many other mods
* Added Create: Hypertube Compat
* Updated Localization Files

### Bug fixes
* Fixed Infernal Mechanism having the incorrect number of loops
* Fixed Moon quest
* Various Questbook fixes

## [2.0.6]
### Changes
* Reintroduced Compatibility Scripts for:
  * Create Connected
  * Create Crafts & Additions
* Logistic Mechanisms made cheaper
* Added more flowers to the phytoenic insolator
* Cleaned up Certus Quartz EMI
* Added localization support for Trades and Professions
* Updated localization files

### Bug fixes
* Fixed More Minecarts Filter Unloader

## [2.0.5]
### Changes
* **Textures:**
  * New mechanism textures
  * New Lead Machine Model

* **Mods:**
  * Added Sophisticated Storage Create Integration (allows SophStorage barrels on contraptions)
  * Added Oculus, Create Better FPS
  * Updated Jade, Jade Addons, Occultism, Create Central Kitchen
* Reimplemented the Alchemical Laser Ponder
* Variant chests and cabinets now work on contraptions
* Replaced written book quest reward with clipboard
* Unified Dough Recipes
* Halved AE energy cost for crafting blizz rods
* Updated Localization files

## [2.0.4]
### Changes
* Disabled autoclaim on some quests (may require `/ftbquest reset` on existing worlds)
* Added Create: Powerloader compatibility
* Deprecated the trials crafter in favor of the Quark variant
* Updated localization files

### Bug fixes
* Fixed wooden slab cutting, tree extracting, and cutting board recipes
* Minor recipe cleanup
* Sealed mechanism recipe end step now uses a press

## [2.0.3]
### Changes
* Questbook Cleanup:
  * Now uses linear mode by default
  * Chapters hidden by default
  * Nether Fortress quest gives a map
  * Fixed quest reward type issues
  * General cleanup and corrections
* Added Mangrove Propagule to exotic saplings pack
* Added Create Central Kitchen
* Added various optimization mods
* Changed item hatch to use default recipe
* Cherry Logs now sellable
* Improved Lumisene recipes
* Internal cleanup
* Updated Localization Files

### Bug fixes
* Fixed items being insertable into strainer output slots
* Removed Better Chunkloading (causing crashes)

## [2.0.2]
### Changes
* Updated Create to 6.0.4
* Added Create Enchantment Industry Compatibility (with custom textures)
* Updated Localization Files

### Bug fixes
* Removed FTB Quests Optimizer (was causing issues)
* Fixed Gold and Lead Machine hitboxes
* Fixed constantan induction smelter recipe

## [2.0.1]
### Changes
* Swapped out Create Deco cards for Quark blocks
* New gold machine model
* Adjusted strainer base to reduce z-fighting
* Updated Localization Files

### Bug fixes
* Various alchemy-related fixes
* Fixed saws not shown in EMI
* Fixed market, bulletin board, and shipments giving team rewards
* Fixed profession quests not being repeatable
* Miscellaneous recipe fixes

## [2.0.0]
### Major Changes
* Updated to Minecraft 1.20
* Now using Create v6
  * Added a new machine: **Lead**
  * Added a new quest chapter: **2B** for new items
  * Trimmed modlist (integration support still available for ported addons)
* Smithing table transformations replaced with manual application/deployer recipes
* **Ore Processing Buffs:**
  * Base yields 2–3 crushed ores
  * Fortune has been buffed
  * Washing ores can now yield byproducts
* Pack now supports localization (via Weblate)

### Mod Changes
* Added **1.21 Trial Chambers** with custom loot
* Added **Custom Pottery Sherds**
* Replaced **Storage Drawers** with **Functional Storage**
* Replaced **Iron Barrels** with **Sophisticated Storage** (same materials)
* Replaced **Beyond Earth** with **Ad Astra**
* Added **EMI**

### Other Changes
* Cleaned up various models
* Added splash texts (suggestions welcome in *#CABIN's Splashes*)
* Added trades for 1.19 & 1.20 items
* Added tooltips for various items
* Added **Illusionary Copper** — decorative, builder-focused block
* Reduced structure frequency
* The pack now has a **mascot: Acey!**
