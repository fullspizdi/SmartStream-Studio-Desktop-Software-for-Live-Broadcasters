// contentGenerator.ts
// AI-driven content generation tools for SmartStream Studio

import { API } from './api';
import { logWithTimestamp } from './utils';
import { config } from './config';

export class ContentGenerator {
    private api: API;

    constructor() {
        this.api = new API();
    }

    /**
     * Generates interactive content such as polls, games, and Q&A sessions during live streams.
     */
    public async generateInteractiveContent(streamId: string): Promise<void> {
        try {
            const contentTypes = ['poll', 'game', 'qa'];
            const selectedType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
            const contentData = await this.fetchContentData(selectedType);

            await this.api.updateStreamInfo(streamId, {
                interactiveContent: {
                    type: selectedType,
                    data: contentData
                }
            });

            logWithTimestamp(`Interactive content (${selectedType}) generated and sent to stream: ${streamId}`);
        } catch (error) {
            logWithTimestamp(`Failed to generate interactive content for stream ${streamId}: ${error}`);
        }
    }

    /**
     * Fetches data for the specified type of interactive content.
     * @param type - The type of content (e.g., 'poll', 'game', 'qa').
     * @returns The data for the content.
     */
    private async fetchContentData(type: string): Promise<any> {
        const endpoint = `/content/${type}`;
        try {
            const response = await this.api.sendRequest('contentProvider', endpoint);
            return response;
        } catch (error) {
            logWithTimestamp(`Error fetching data for content type ${type}: ${error}`);
            throw new Error(`Failed to fetch content data: ${error}`);
        }
    }
}
