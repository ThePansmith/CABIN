const Minecraft = java('net.minecraft.client.Minecraft')
const ResourceOverridesManager = java('fuzs.resourcepackoverrides.client.data.ResourceOverridesManager')

//Resets resource packs to the default, including resource packs configured by Resource Pack Overrides.
//The version only needs to be updated when the default enabled resource packs are changed. Otherwise this number can stay the same.
//Give each part of the semantic version 2 digits 1.3.3 -> 010303 = 10303.
const resourceOptionsVersion = 10305
const fileName = 'kubejs_client_data.json'
{

	//read data from the file saved in the client's Kubejs folder
	let data = JsonIO.read(fileName) || {}

	if (data.resourceOptionsVersion!=resourceOptionsVersion) {
		let instance = Minecraft.getInstance()
		let resourcePacks = ResourceOverridesManager.getDefaultResourcePacks(true)

		//If we set options to use our list of resource packs here, it'll load up the game using these resources
		instance.options.resourcePacks.clear()
		for(let i=0;i<resourcePacks.size();++i) {
			instance.options.resourcePacks.add(resourcePacks.get(i))
		}

		//Trying to save the options will not work until we get to the title screen, so we need to create another event
		let saveNeeded = true
		onEvent('ClientGuiEvent.post_init', event => {
			if (saveNeeded) {
				console.log(instance.options.resourcePacks.size())
				instance.options.resourcePacks.clear()
				for(let i=0;i<resourcePacks.size();++i) {
					instance.options.resourcePacks.add(resourcePacks.get(i))
				}
				instance.options.save()
				//write the new version into the file so that we don't reset enabled resource packs until the defaults are changed again.
				data.resourceOptionsVersion = resourceOptionsVersion
				JsonIO.write(fileName, data)
				saveNeeded = false
			}
		})
	}
}