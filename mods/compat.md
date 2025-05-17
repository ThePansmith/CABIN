<!DOCTYPE html>
<html>
<head>
</head>

<body>
<h1> Addon Mods (AKA Optional Compats)</h1>
<p>To spice up your runs, you can add any of the following mods to your <code>minecraft/mods</code> folder for their recipes and config files to be automatically altered for compatibility with CABIN. If there is a mod that you think could fit on this list, look at <a href="https://github.com/ThePansmith/CABIN/blob/1.20.1/kubejs/server_scripts/server_compatability/_compatability_readme.md">this</a> and feel free to make a PR.</p>
<table>
  <tr>
    <th><p>Key</p></th>
    <th><p>Info</p></th>
  </tr>
  <tr>
    <td><p>SC</p></td>
    <td><p>Has explicit scripted compatability</p></td>
  </tr>
  <tr>
    <td>NSC</td>
    <td><p>Does not have scripted compatability, but the default recipes lets it fit in the progression line</p></td>
  </tr>
  <tr>
    <td><p>*</p></td>
    <td><p>Special case, read notes</p></td>
  </tr>
</table>

<h2>Compatible Mods</h2>
<table>
  <tr>
    <th><p>Mod</p></th>
    <th><p>Status</p></th>
    <th><p>Notes</p></th>
  </tr>
  <tr>
    <td><p><a href="https://www.curseforge.com/projects/688768">Create Enchantment Industry</a></p></td>
    <td><p>SC</p></td>
    <td>
        <p>Create: Enchantment Industry is a mod that adds ways to automate enchanting into Create. It adds blocks that can automatically enchant and disenchant items using liquid experience.</p>
    </td>
  </tr>
  <tr>
  <tr>
    <td><p><a href="https://curseforge.com/projects/936020">Create Powerloader</a></p></td>
    <td><p>SC</p></td>
    <td>
        <p>Powerloader adds machines that can chunkload areas in area up to 5x5 with Stress Units.</p>
    </td>
  </tr>
  <tr>
    <td><p><a href="https://curseforge.com/projects/815548">Integrated Strongholds</a></p></td>
    <td><p>*SC</p></td>
    <td>
    <p><b>Remove Yung's Better Strongholds if you're using this mod.</b></p>
    <p>The Integrated Strongholds mod overhauls strongholds into a massive dungeon that makes use of blocks from Create, Supplementaries, and Quark. We've decided against including this mod in the base pack because its heavy focus on puzzles and lore, however, if that sounds like something you're interested in, consider giving this mod a try.</p>
    </td>
  </tr>
  <tr>
    <td><p><a href="https://curseforge.com/projects/581495">Oculus</a></p></td>
    <td><p>SC</p></td>
    <td>
    <p><b>Don't let your mod launcher install Rubidium alongside it, the pack aleady includes Embeddium which is a forked version of Rubidium with more features.</b></p>
    <p>Isn't in the base pack currently due to uncertainty around its performance with Create/Flywheel 6. May cause lag with massive factories</p>
    </td>
  </tr>
    <tr>
    <td><p><a href="https://curseforge.com/projects/295910">Integrated Terminals</a></p></td>
    <td><p>*SC</p></td>
    <td>
    <p>Intended as an early-game Storage Terminal to be used with Create Vaults or Drawer Controllers, before getting AE2. All logic and automation-related items have been disabled. Serves as a better QoL alternative to the PrettyPipes Item Terminal.</p>
    <p><b>The following dependencies and addons must be installed:</b></p>
    <ul>
        <li><a href="https://curseforge.com/projects/236307">Integrated Dynamics</a></li>
        <li><a href="https://curseforge.com/projects/295910">Integrated Terminals</a></li>
        <li><a href="https://curseforge.com/projects/251389">Integrated Tunnels</a></li>
        <li><a href="https://curseforge.com/projects/232758">Cyclops Core</a></li>
        <li><a href="https://curseforge.com/projects/247007">Common Capabilities</a></li>
    </ul>
    </td>
  </tr>
</table>

<!--<h2>Other Compatible Mods</h2>
<table>
  <tr>
    <th><p>Mod</p></th>
    <th><p>Status</p></th>
    <th><p>Notes</p></th>
  </tr>
  <tr>
    <td><p>Forbidden and Arcanus</p></td>
    <td><p>*SC</p></td>
    <td><p>Cut from CABIN because it didn't fit well into the pack. It's compatability script is incomplete and needs to be updated for 1.20</p></td>
  </tr>
</table>-->

</body>
</html>
