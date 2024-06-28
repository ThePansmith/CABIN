// priority: 9999

// Mod shortcuts
const MOD = (domain, id, x) => (x ? `${x}x ` : "") + (id.startsWith('#') ? '#' : "") + domain + ":" + id.replace('#', '')

const AC = (id, x) => MOD("aquaculture", id, x)
const AE2 = (id, x) => MOD("ae2", id, x)
const AL = (id, x) => MOD("alloyed", id, x)
const AP = (id, x) => MOD("architects_palette", id, x)
const BE = (id, x) => MOD("beyond_earth", id, x)
const BOP = (id, x) => MOD("biomesoplenty", id, x)
const CD = (id, x) => MOD("createdeco", id, x)
const CR = (id, x) => MOD("create", id, x)
const EXP = (id, x) => MOD("expcaves", id, x)
const F = (id, x) => MOD("forge", id, x)
const FD = (id, x) => MOD("farmersdelight", id, x)
const KJ = (id, x) => MOD("kubejs", id, x)
const LV = (id, x) => MOD("libvulpes", id, x)
const MC = (id, x) => MOD("minecraft", id, x)
const OC = (id, x) => MOD("occultism", id, x)
const PP = (id, x) => MOD("prettypipes", id, x)
const PR_C = (id, x) => MOD("projectred_core", id, x)
const PR_I = (id, x) => MOD("projectred_illumination", id, x)
const PR_T = (id, x) => MOD("projectred_transmission", id, x)
const QU = (id, x) => MOD("quark", id, x)
const RQ = (id, x) => MOD("reliquary", id, x)
const SD = (id, x) => MOD("storagedrawers", id, x)
const SP = (id, x) => MOD("supplementaries", id, x)
const TC = (id, x) => MOD("tconstruct", id, x)
const TE = (id, x) => MOD("thermal", id, x)

const colours = ['white', 'orange', 'magenta', 'light_blue', 'lime', 'pink', 'purple', 'light_gray', 'gray', 'cyan', 'brown', 'green', 'blue', 'red', 'black', 'yellow']
const native_metals = ['iron', 'zinc', 'lead', 'copper', 'nickel', 'gold']
const wood_types = [MC('oak'), MC('spruce'), MC('birch'), MC('jungle'), MC('acacia'), MC('dark_oak'), MC('crimson'), MC('warped'), BOP('fir'), BOP('redwood'), BOP('cherry'), BOP('mahogany'), BOP('jacaranda'), BOP('palm'), BOP('willow'), BOP('dead'), BOP('magic'), BOP('umbran'), BOP('hellbark'), AP('twisted')]

const donutCraft = (event, output, center, ring) => {
	return event.shaped(output, [
		'SSS',
		'SCS',
		'SSS'
	], {
		C: center,
		S: ring
	})
}