/**
 * Custom ESLint plugin for PanPack Template's KubeJS
 */

import recipeSpacing from "./recipe-spacing.mjs"
import multiblockDeclaration from "./multiblock-declaration.mjs"

/**
 * Creates a custom ESLint plugin
 * @param {string} name Plugin name
 * @param {Record<string, *>} rules Plugin rules
 */
function customPluginWithAllRulesError(name, rules) {
    return {
        plugins: {
            [name]: { rules }
        },
        rules: Object.fromEntries(
            Object.entries(rules).map(([rule]) =>
                [`${name}/${rule}`, "error"]
            )
        )
    }
}

export const PanPack = customPluginWithAllRulesError("PanPack", {
    "recipe-spacing": recipeSpacing,
    "multiblock-declaration": multiblockDeclaration
})
