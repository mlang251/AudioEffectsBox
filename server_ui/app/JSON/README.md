**Read these instructions when updating the Max patch. When effects are added or changed, the effects.json and defaults.json files need to be modified to reflect these changes**

###effects.json
**This file describes which effects are available in the Max patch so that the UI can render them properly**

Adding new effects to this file will not break the UI, as long as you follow the structure

*This is example code, see explanation of data structure below the code*

```json
{
    "list": ["Reverb"],
    "effects": {
        "reverb": {
            "type": "reverb",
            "name": "Reverb",
            "IDs": ["reverb1", "reverb2", "reverb3"],
            "parameterList": ["Liveness", "Crossover", "Damping"],
            "parameters": {
                "Liveness": "fader",
                "Crossover": "fader",
                "Damping": "fader"
            }
        },
        "overdrive": {
            "same format as above": "overdrive specific values"
        },
        "effect type 3": "etc..."
    }
}
```

Description of effects.json data structure from top to bottom, keep in mind capitalization is important if it is mentioned:

1. list - This is a list of all the effect types in the Max patch, if a new effect type gets added, you need to add the type to the list, capitalize the first letter. This list is used for rendering the buttons on the UI that say "Add [effect type]". The order of effects in this list is the order that the buttons will be rendered in on the UI
2. effects - This is the specific data that describes each type of effect, if a new effect is added recreate this format with the specific descriptions of that effect
    1. reverb/overdrive/effect type 3 - The type of effect, in all lowercase
        1. type - The type of effect in all lowercase
        2. name - Same, but capitalize the first letter
        3. IDs - Array of IDs that the effect type has in the Max patch, it is important that these match what the patch has. If there are three overdrive effects in the patch, they should be called "overdrive1", "overdrive2", "overdrive3", and use this structure for all other effect types. IDs are all lowercase.
        4. parameterList - A list of the parameters the effect has, the order of this list is the order from left to right that the parameters will be rendered in the UI when the effect is added. Capitalize first letter
        5. parameters - An object with descriptions of the parameters
            - Each parameter (first letter capitalized) gets a parameter type (lowercase). For now, only faders are possible but in the future, knobs and buttons might be available


###defaults.json
**This file gives the default values for each parameter so that when an effect with a unique ID is rendered, the parameters start at a predicatable value. This also serves as a template for creating presets in the future.**

Adding new effects to this file will not break the UI, as long as you follow the structure

*This is example code, see explanation of data structure below the code*

```json
{
    "reverb1": {
        "Liveness": 0,
        "Crossover": 0,
        "Damping": 0
    },
    "reverb2": {
        "Liveness": 0,
        "Crossover": 0,
        "Damping": 0
    },
    "reverb3": {
        "Liveness": 0,
        "Crossover": 0,
        "Damping": 0
    },
    "overdrive1": {"etc..."}
}

```

Description of defaults.json data structure from top to bottom, keep in mind capitalization is important if it is mentioned:

1. reverb1/reverb2/reverb3/etc - The unique ID of each effect in the Max patch, if a new effect type is added to the patch, and this type has 3 unique IDs, you will need to create 3 entries in defaults.json
    - Each parameter (first letter capitalized) gets a starting value, which can just be 0
