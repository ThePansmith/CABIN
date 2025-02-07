// priority: 99
const POTION_BOTTLES = ['REGULAR', 'SPLASH', 'LINGERING'];
const POTIONS = [ //The order that we create these rei entries in is important!
    ["minecraft:mundane", []],
    ["minecraft:thick", []],
    ["minecraft:awkward", []],
    ["minecraft:night_vision", ['long']],
    ["minecraft:invisibility", ['long']],
    ["minecraft:leaping", ['long', 'strong']],
    ["minecraft:fire_resistance", ['long']],
    ["minecraft:swiftness", ['long', 'strong']],
    ["minecraft:slowness", ['long', 'strong']],
    ["minecraft:turtle_master", ['long', 'strong']],
    ["minecraft:water_breathing", ['long']],
    ["minecraft:healing", ['strong']],
    ["minecraft:harming", ['strong']],
    ["minecraft:poison", ['long', 'strong']],
    ["minecraft:regeneration", ['long', 'strong']],
    ["minecraft:strength", ['long', 'strong']],
    ["minecraft:weakness", ['long']],
    ["minecraft:luck", []],
    ["minecraft:slow_falling", ['long']]
];

//Add Potion fluids to REI
JEIEvents.add('fluid', event => {
    POTION_BOTTLES.forEach(bottle=>{
        for (let i=0;i<POTIONS.length;++i) {
            let potionName = POTIONS[i][0];
            event.add(Fluid.of("create:potion", `{Bottle: "${bottle}", Potion: "${potionName}"}`));
            for (let j=0;j<POTIONS[i][1].length;++j) {
                let subPotionNameArray = potionName.split(':');
                subPotionNameArray.splice(1, 0, ':',POTIONS[i][1][j],'_');
                let subPotionName = subPotionNameArray.join('');
                event.add(Fluid.of("create:potion", `{Bottle: "${bottle}", Potion: "${subPotionName}"}`));
            }
        }
    })
})