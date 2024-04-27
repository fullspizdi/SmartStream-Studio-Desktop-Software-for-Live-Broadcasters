// analytics.ts
// Provides analytics and insights for live streams in SmartStream Studio

import { API } from './api';
import { logWithTimestamp } from './utils';
import { config } from './config';

export class Analytics {
    private api: API;

    constructor() {
        this.api = new API();
    }

    /**
     * Fetches and logs viewer analytics from all configured platforms.
     */
    public async fetchViewerAnalytics(): Promise<void> {
        logWithTimestamp('Fetching viewer analytics from all platforms...');
        Object.keys(config.platforms).forEach(async (platform) => {
            try {
                const analyticsData = await this.api.sendRequest(platform, '/analytics/viewers', 'GET');
                logWithTimestamp(`${platform} viewer analytics: ${JSON.stringify(analyticsData)}`);
            } catch (error) {
                logWithTimestamp(`Error fetching viewer analytics from ${platform}: ${error.message}`);
            }
        });
    }

    /**
     * Fetches and logs engagement analytics, such as likes, shares, and comments.
     */
    public async fetchEngagementAnalytics(): Promise<void> {
        logWithTimestamp('Fetching engagement analytics from all platforms...');
        Object.keys(config.platforms).forEach(async (platform) => {
            try {
                const engagementData = await this.api.sendRequest(platform, '/analytics/engagement', 'GET');
                logWithTimestamp(`${platform} engagement analytics: ${JSON.stringify(engagementData)}`);
            } catch (error) {
                logWithTimestamp(`Error fetching engagement analytics from ${platform}: ${error.message}`);
            }
        });
    }

    /**
     * Analyzes and logs content performance based on viewer reactions and comments.
     */
    public async analyzeContentPerformance(): Promise<void> {
        logWithTimestamp('Analyzing content performance across all platforms...');
        Object.keys(config.platforms).forEach(async (platform) => {
            try {
                const performanceData = await this.api.sendRequest(platform, '/analytics/performance', 'GET');
                logWithTimestamp(`${platform} content performance: ${JSON.stringify(performanceData)}`);
            } catch (error) {
                logWithTimestamp(`Error analyzing content performance on ${platform}: ${error.message}`);
            }
        });
    }
}
