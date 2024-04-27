// api.ts
// API integration module for SmartStream Studio

import axios from 'axios';
import { config } from './config';
import { logWithTimestamp } from './utils';

export class API {
    /**
     * Sends a request to the specified streaming platform's API.
     * @param platform - The platform to which the request is sent (e.g., 'twitch', 'youtube', 'facebook').
     * @param endpoint - The API endpoint.
     * @param method - The HTTP method (e.g., 'GET', 'POST').
     * @param data - The payload for POST requests.
     * @returns The response from the API.
     */
    async sendRequest(platform: string, endpoint: string, method: 'GET' | 'POST' = 'GET', data: any = null) {
        const platformConfig = config.platforms[platform];
        const url = `${platformConfig.apiUrl}${endpoint}`;

        const headers = {
            'Authorization': `Bearer ${platformConfig.apiKey}`,
            'Content-Type': 'application/json'
        };

        try {
            const response = await axios({
                method: method,
                url: url,
                headers: headers,
                data: data
            });
            logWithTimestamp(`API Request to ${platform} successful: ${endpoint}`);
            return response.data;
        } catch (error) {
            logWithTimestamp(`API Request to ${platform} failed: ${endpoint} - ${error}`);
            throw new Error(`API Request Failed: ${error}`);
        }
    }

    /**
     * Fetches the current stream status from a platform.
     * @param platform - The platform from which to fetch the status.
     * @returns The current stream status.
     */
    async getStreamStatus(platform: string) {
        return this.sendRequest(platform, '/stream/status');
    }

    /**
     * Updates the stream information on a platform.
     * @param platform - The platform where the stream info will be updated.
     * @param data - The new stream information.
     * @returns The response from the API.
     */
    async updateStreamInfo(platform: string, data: any) {
        return this.sendRequest(platform, '/stream/update', 'POST', data);
    }
}

