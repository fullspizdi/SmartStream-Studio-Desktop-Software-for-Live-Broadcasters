// streamManager.ts
// Manages the streaming operations for SmartStream Studio

import { config } from './config';
import { logWithTimestamp } from './utils';
import { API } from './api';

export class StreamManager {
    private api: API;

    constructor() {
        this.api = new API();
    }

    /**
     * Starts the streaming process on all configured platforms.
     */
    public startStreaming(): void {
        logWithTimestamp('Starting streams on all platforms...');
        Object.keys(config.platforms).forEach(platform => {
            this.startStreamOnPlatform(platform);
        });
    }

    /**
     * Stops the streaming process on all configured platforms.
     */
    public stopStreaming(): void {
        logWithTimestamp('Stopping streams on all platforms...');
        Object.keys(config.platforms).forEach(platform => {
            this.stopStreamOnPlatform(platform);
        });
    }

    /**
     * Starts streaming on a specific platform.
     * @param platform - The platform on which to start streaming.
     */
    private startStreamOnPlatform(platform: string): void {
        logWithTimestamp(`Attempting to start stream on ${platform}...`);
        this.api.sendRequest(platform, '/startStream', 'POST')
            .then(() => {
                logWithTimestamp(`Stream started successfully on ${platform}.`);
            })
            .catch(error => {
                logWithTimestamp(`Error starting stream on ${platform}: ${error.message}`);
            });
    }

    /**
     * Stops streaming on a specific platform.
     * @param platform - The platform on which to stop streaming.
     */
    private stopStreamOnPlatform(platform: string): void {
        logWithTimestamp(`Attempting to stop stream on ${platform}...`);
        this.api.sendRequest(platform, '/stopStream', 'POST')
            .then(() => {
                logWithTimestamp(`Stream stopped successfully on ${platform}.`);
            })
            .catch(error => {
                logWithTimestamp(`Error stopping stream on ${platform}: ${error.message}`);
            });
    }
}
