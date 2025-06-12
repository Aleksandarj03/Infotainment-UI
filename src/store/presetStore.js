import {defineStore} from 'pinia';

export const usePresetStore = defineStore('presetStore', {
    state: () => ({
        selectedPreset: "Comfort",
        selectedOptions: {},
        toggledIcons: [],
        presetStyles: {
            Comfort: {
                backgroundImage: "url('icons/blue-background.jpg')",
                primaryColor: "#4CAF50",
                textColor: "#FFFFFF"
            },
            GT: {
                backgroundImage: "url('icons/dark-gold-background.jpg')",
                primaryColor: "#FF9800",
                textColor: "#222222"
            },
            Sport: {
                backgroundImage: "url('icons/dark-red-background.jpg')",
                primaryColor: "#D32F2F",
                textColor: "#FFFFFF"
            },
            Track: {
                backgroundImage: "url('icons/black-white-background.jpg')",
                primaryColor: "#000000",
                textColor: "#FFEB3B"
            }
        }
    }),
    actions: {
        setPreset(preset, options) {
            this.selectedPreset = preset;
            this.selectedOptions = {...options};
        },
        selectOption(param, option) {
            this.selectedOptions[param] = option;
        },
        toggleIcon(name) { // ← Add this new action
            const index = this.toggledIcons.indexOf(name);
            if (index === -1) {
                this.toggledIcons.push(name);
            } else {
                this.toggledIcons.splice(index, 1);
            }
        }
    }
});
