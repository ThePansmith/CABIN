// Thermal Systeams (Works best when used with Create: Steam Powered)
if(Platform.isLoaded("systeams")) {
	ServerEvents.recipes(event => {

    // Boiler Crafting Removal
    event.remove({mod: 'systeams', input: 'minecraft:redstone', output: '#systeams:boilers'})

    // Steam Bucket
    // thermalBottler(event, 'minecraft:bucket', [Fluid.of('#forge:steam', 1000), 'systeams:steam_bucket'])
    // Seems like KubeJS Thermal doesn't support Fluid Tags, so a custom event will be used as a placeholder:
    event.custom({
      "type": "thermal:bottler",
      "ingredients": [
        {"item": "minecraft:bucket"},
        {"fluid_tag": "forge:steam", "amount": 1000}
      ],
      "result": [
        {"item": "systeams:steam_bucket"}
      ]
    })
    
    // Steam Dynamo & Pipe
    zincMachine(event,Item.of('systeams:steam_dynamo'), 'thermal:rf_coil')
    event.replaceInput({ id: 'systeams:boiler_pipe' }, 'thermal:cured_rubber', 'create:brass_sheet')

    // Boiler to Dynamo Fix
    let dynamo = (output, thermalBoiler) => { 
      event.custom({
        "type": "systeams:upgrade_shapeless",
        "ingredients": [
          {"item": thermalBoiler},
          {"item": "thermal:rf_coil"}
        ],
        "result": {
          "item": output
        },
        "replacement": "systeams:boiler_pipe"
      })
    }
    dynamo('thermal:dynamo_compression', 'systeams:compression_boiler')
    dynamo('thermal:dynamo_disenchantment', 'systeams:disenchantment_boiler')
    dynamo('thermal:dynamo_gourmand', 'systeams:gourmand_boiler')
    dynamo('thermal:dynamo_lapidary', 'systeams:lapidary_boiler')
    dynamo('thermal:dynamo_magmatic', 'systeams:magmatic_boiler')
    dynamo('thermal:dynamo_numismatic', 'systeams:numismatic_boiler')
    dynamo('thermal:dynamo_stirling', 'systeams:stirling_boiler')
  })
}
