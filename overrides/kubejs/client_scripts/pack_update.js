const Minecraft = java('net.minecraft.client.Minecraft');
const ResourceOverridesManager = java('fuzs.resourcepackoverrides.client.data.ResourceOverridesManager')

//Resets resource packs to the default, including resource packs configured by Resource Pack Overrides.
onEvent('client.init', event => {
	//The version only needs to be updated when the default enabled resource packs are changed. Otherwise this number can stay the same.
	//Give each part of the semantic version 2 digits 1.3.3 -> 010303 = 10303.
	const resourceOptionsVersion = 10303;
	const fileName = 'kubejs_client_data.json';

	//read data from the file saved in the client's Kubejs folder
	let data = JsonIO.read(fileName) || {};

	if (data.resourceOptionsVersion!=resourceOptionsVersion) {
		//reset to the new default resource pack options
		const instance = Minecraft.getInstance();

		instance.options.resourcePacks.clear()
		let resourcePacks = ResourceOverridesManager.getDefaultResourcePacks(true)
		for(let i=0;i<resourcePacks.size();++i) {
			instance.options.resourcePacks.add(resourcePacks.get(i))
		}
		instance.options.save()
		instance.reloadResourcePacks()
		
		//write the new version into the file so that we don't reset enabled resource packs until the defaults are changed again.
		data.resourceOptionsVersion = resourceOptionsVersion;
		JsonIO.write(fileName, data);
	}
})