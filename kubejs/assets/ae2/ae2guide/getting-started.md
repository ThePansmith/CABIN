---
navigation:
  title: Getting Started (CABIN)
  position: 10
---

<div class="notification is-info">
  The following information only applies to Applied Energistics 2 in CABIN! 

  Outside of this page, *some information may be inaccurate*, so be sure to consult your recipe viewer!
</div>

# Getting Started

## Getting The Initial Materials

<GameScene zoom="4" background="transparent">
  <ImportStructure src="assets/assemblies/meteor_interior.snbt" />
</GameScene>

To get started with Applied Energistics 2, one must first find a [meteorite](ae2-mechanics/meteorites.md). These are fairly common and tend to leave massive holes in the terrain, so you've probably encountered one in your travels.
If you haven't, you can craft a <ItemLink id="meteorite_compass" />, which will point toward the nearest <ItemLink id="mysterious_cube" />.

Once you have found a meteorite, mine into its center. You will find certus quartz clusters budding certus blocks, and a Mysterious Cube in the center.

Mine the certus quartz clusters and any certus quartz blocks you find, and mine the Mysterious Cube in the center of the meteorite to gain the presses.

## Growing Certus Quartz
<Recipe id="minecraft:kjs/certus_crystal_seed" />
Certus quartz can be grown by first crafting certus quartz dust into certus quartz seeds with sand or a mechanical crafter (note that the crafter doesn't need sand!) and dousing the certus quartz seeds with water repeatiably using a spout. This process can be repeated for automated certus quartz.


## A Quick Aside on Fluix

Another material you will need is Fluix, it is made by throwing charged certus, redstone, and nether quartz in water. Doing this automatically is "left as an exercise for the reader."

The <ItemLink id="charger" /> is required to produce <ItemLink id="charged_certus_quartz_crystal" />., if you haven't made one already.

If you don't have enough quartz to also make an <ItemLink id="energy_acceptor" /> or <ItemLink id="vibration_chamber" />,
you can make a <ItemLink id="crank" /> and stick it on the end of your accelerator.

## Inscribing Some Processors

In your looting of a meteorite, you will have found four "presses" from breaking the Mysterious Cube. These are used to make the three types of processor.

<ItemGrid>
  <ItemIcon id="silicon_press" />

  <ItemIcon id="logic_processor_press" />

  <ItemIcon id="calculation_processor_press" />

  <ItemIcon id="engineering_processor_press" />
</ItemGrid>

Produce a few of each type of processor in preparation for the next step, making a very basic ME system. Automating processor production is "left as an exercise for the reader".

## Matter Energy Tech: ME Networks and Storage

### What is ME Storage?

Its pronounced Emm-Eee, and stands for Matter Energy.

Matter Energy is the main component of Applied Energistics 2, it's like a mad scientist version of a Multi-Block chest,
and it can revolutionize your storage situation. ME is extremely different than other storage systems in Minecraft, and
it might take a little out of the box thinking to get used to; but once you get started vast amounts of storage in tiny
space, and multiple access terminals are just the tip of the iceberg of what becomes possible.

### What do I need to know to get started?

First, ME Stores items inside of other items, called [Storage cells](items-blocks-machines/storage_cells.md); there are 5 tiers with ever increasing amounts of
storage. In order to use a Storage Cell it must be placed inside either an <ItemLink id="chest" />,
or an <ItemLink id="drive" />.

The <ItemLink id="chest" /> shows you the contents of the Cell as soon as its placed inside, and you
can add and remove items from it as if it were a <ItemLink id="minecraft:chest" />, with the exception that the items are
actually stored in the Storage cells, and not the <ItemLink id="chest" /> itself.

While the <ItemLink id="chest" /> is a great way to get introduced to the concept of ME, to really
take advantage you need to set up an [ME Network](ae2-mechanics/me-network-connections.md).

## Your Very First ME System

Now that you have all of the basic materials and machines for Applied Energistics 2, you can make your first ME (Matter Energy) system. This will be a very basic one, no autocrafting, no logistics, just nice, simple, searchable storage.

<GameScene zoom="6" interactive={true}>
<ImportStructure src="assets/assemblies/tiny_me_system.snbt" />

</GameScene>

*   Your ingredients list:
    * 1x <ItemLink id="drive" />
    * 1x <ItemLink id="terminal" /> or <ItemLink id="crafting_terminal" />
    * 1x <ItemLink id="energy_acceptor" />
    * A few [cables](items-blocks-machines/cables.md), either glass, covered, or smart, but not dense
    * A few [storage cells](items-blocks-machines/storage_cells.md), recommended of the 4k variety for a good mix of
    capacity and types (it would be more efficient to [partition](items-blocks-machines/cell_workbench.md) a mix of 4k and 1k but that's a complexity we won't go into now)
---
1.  Place the drive down.
2.  The energy acceptor (and several other AE2 [devices](ae2-mechanics/devices.md)) comes in 2 modes, cube and flat. They can be switched between in a crafting grid. If your energy acceptor is a cube, place it down next to the drive. If it's a flat square, place a cable on the drive and place the acceptor on that.
3.  Run energy into the energy acceptor with a cable/pipe/conduit from your favorite energy-generation mod.
4.  Place a cable on top of the drive (or otherwise at eye level) and place your terminal or crafting terminal on it.
5.  Put your storage cells into the drive
6.  Profit
7.  Fiddle with the terminal's settings
8.  Bask in your ultimate power and ability
9.  Realize that this network is, in the grand scheme, rather small

### Expanding your Network

So you have some basic storage, and access to that storage, it's a good start, but you'll likely be looking to maybe
automate some processing.

A great example of this is to place a <ItemLink id="export_bus" /> on the top of a furnace to
dump in ores, and a <ItemLink id="import_bus" />
on the bottom of the furance to extract furnaced ores.

The <ItemLink id="export_bus" /> lets you export items from the network, into the attached
inventory, while the <ItemLink id="import_bus" /> imports items from the attached inventory into
the network.

### Overcoming Limits

At this point you probably getting close to 8 or so [devices](ae2-mechanics/devices.md), once you hit 9 devices you'll have to start
managing [channels](ae2-mechanics/channels.md). Many devices but not all, require a channel to
function.

By default a network can support 8 channels, once you break this limit, you'll have to add
an <ItemLink id="controller" /> to your network. this allows you to expand your network greatly.
[Smart cables](items-blocks-machines/cables.md) will allow you to see how channels are routed through your network. Use them extensively when starting out to learn how channels act, or if you have a lot of redstone and glowstone.
