// aiModerator.ts
// AI-driven moderation tool for SmartStream Studio

import { config } from './config';
import { logWithTimestamp } from './utils';
import { API } from './api';

export class AIModerator {
    private api: API;

    constructor() {
        this.api = new API();
    }

    /**
     * Activates moderation for the current stream.
     */
    public activateModeration(): void {
        logWithTimestamp('Moderation activated.');
        this.filterInappropriateContent();
        this.manageViewerInteractions();
    }

    /**
     * Filters out inappropriate content using AI services.
     */
    private filterInappropriateContent(): void {
        const contentFilterEndpoint = '/moderation/filter';
        const platforms = Object.keys(config.platforms);

        platforms.forEach(async (platform) => {
            try {
                const response = await this.api.sendRequest(platform, contentFilterEndpoint, 'POST');
                if (response.data.action === 'block') {
                    logWithTimestamp(`Inappropriate content blocked on ${platform}.`);
                }
            } catch (error) {
                logWithTimestamp(`Error filtering content on ${platform}: ${error.message}`);
            }
        });
    }

    /**
     * Manages viewer interactions to ensure a safe environment.
     */
    private manageViewerInteractions(): void {
        const interactionManagementEndpoint = '/moderation/manage';
        const platforms = Object.keys(config.platforms);

        platforms.forEach(async (platform) => {
            try {
                const response = await this.api.sendRequest(platform, interactionManagementEndpoint, 'POST');
                if (response.data.action === 'timeout') {
                    logWithTimestamp(`Viewer timed out for inappropriate behavior on ${platform}.`);
                }
            } catch (error) {
                logWithTimestamp(`Error managing viewer interactions on ${platform}: ${error.message}`);
            }
        });
    }
}
