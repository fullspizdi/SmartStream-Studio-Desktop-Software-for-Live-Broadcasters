// platformIntegration.ts
// Handles integration with multiple streaming platforms for SmartStream Studio

import { StreamManager } from './streamManager';
import { logWithTimestamp } from './utils';
import { config } from './config';

export class PlatformIntegration {
    private streamManager: StreamManager;

    constructor() {
        this.streamManager = new StreamManager();
    }

    /**
     * Initializes streaming on all supported platforms.
     */
    public initializeAllPlatforms(): void {
        logWithTimestamp('Initializing streaming on all supported platforms...');
        Object.keys(config.platforms).forEach(platform => {
            this.initializePlatform(platform);
        });
    }

    /**
     * Shuts down streaming on all supported platforms.
     */
    public shutdownAllPlatforms(): void {
        logWithTimestamp('Shutting down streaming on all supported platforms...');
        Object.keys(config.platforms).forEach(platform => {
            this.shutdownPlatform(platform);
        });
    }

    /**
     * Initializes streaming on a specific platform.
     * @param platform - The platform to initialize.
     */
    private initializePlatform(platform: string): void {
        logWithTimestamp(`Initializing streaming on ${platform}...`);
        // Additional initialization logic can be added here if needed
        this.streamManager.startStreamOnPlatform(platform);
    }

    /**
     * Shuts down streaming on a specific platform.
     * @param platform - The platform to shut down.
     */
    private shutdownPlatform(platform: string): void {
        logWithTimestamp(`Shutting down streaming on ${platform}...`);
        // Additional shutdown logic can be added here if needed
        this.streamManager.stopStreamOnPlatform(platform);
    }
}
