// themeManager.ts
// Manages themes and visual overlays for SmartStream Studio

import { config } from './config';
import { logWithTimestamp } from './utils';

interface Theme {
    name: string;
    description: string;
    cssFile: string;
}

class ThemeManager {
    private currentTheme: Theme;
    private availableThemes: Theme[];

    constructor() {
        this.availableThemes = this.loadAvailableThemes();
        this.currentTheme = this.getDefaultTheme();
    }

    /**
     * Loads available themes from configuration.
     * @returns An array of Theme objects.
     */
    private loadAvailableThemes(): Theme[] {
        return config.themes.availableThemes.map(themeName => ({
            name: themeName,
            description: `${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme for enhanced streaming experience.`,
            cssFile: `${themeName}.css`
        }));
    }

    /**
     * Retrieves the default theme from configuration.
     * @returns The default Theme object.
     */
    private getDefaultTheme(): Theme {
        const defaultThemeName = config.themes.defaultTheme;
        const theme = this.availableThemes.find(theme => theme.name === defaultThemeName);
        if (!theme) {
            throw new Error('Default theme configuration is invalid');
        }
        return theme;
    }

    /**
     * Sets the current theme to a new theme.
     * @param themeName - The name of the theme to set.
     */
    public setCurrentTheme(themeName: string): void {
        const theme = this.availableThemes.find(theme => theme.name === themeName);
        if (!theme) {
            logWithTimestamp(`Theme change failed: Theme ${themeName} not found.`);
            return;
        }
        this.currentTheme = theme;
        logWithTimestamp(`Theme changed to ${themeName}.`);
        this.applyTheme(theme);
    }

    /**
     * Applies the theme's CSS to the streaming interface.
     * @param theme - The theme to apply.
     */
    private applyTheme(theme: Theme): void {
        // This would typically involve DOM manipulation or similar logic to apply CSS
        logWithTimestamp(`Applying theme: ${theme.cssFile}`);
        // Example: document.getElementById('theme-style').href = `styles/${theme.cssFile}`;
    }

    /**
     * Gets the current theme.
     * @returns The current Theme object.
     */
    public getCurrentTheme(): Theme {
        return this.currentTheme;
    }
}

export const themeManager = new ThemeManager();
