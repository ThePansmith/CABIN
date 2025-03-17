const Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const ResourceOverridesManager = Java.loadClass("fuzs.resourcepackoverrides.client.data.ResourceOverridesManager")

// Resets resource packs to the default, including resource packs configured by Resource Pack Overrides.
// The version only needs to be updated when the default enabled resource packs are changed. Otherwise this number can stay the same.
// Uses the 3 numbers from the semantic version. 5.3.2 would have 5 as the major version, 3 as the minor version, 2 as the patch version.
const MAJOR_VERSION = 2;
const MINOR_VERSION = 0;
const PATCH_VERSION = 0;

const RESOURCE_VERSION = (MAJOR_VERSION << 16) + (MINOR_VERSION << 8) + PATCH_VERSION;
const FILE_NAME = "kubejs_client_data.json";
{

    // read data from the file saved in the client's Minecraft folder
    let data = JsonIO.read(FILE_NAME) || {}

    if (data.resourceOptionsVersion != RESOURCE_VERSION) {
        let instance = Minecraft.getInstance()
        let resourcePacks = ResourceOverridesManager.getDefaultResourcePacks(true)

        // In client_scripts, If we set the resource packs in options to our list of resource packs we want to use, it'll load up the game using those resources
        instance.options.resourcePacks.clear()
        for(let i = 0;i < resourcePacks.size();++i) {
            instance.options.resourcePacks.add(resourcePacks.get(i))
        }
        instance.options.save()

        // write the new version into the file so that we don't reset enabled resource packs until the defaults are changed again.
        data.resourceOptionsVersion = RESOURCE_VERSION
        JsonIO.write(FILE_NAME, data)
    }
}
