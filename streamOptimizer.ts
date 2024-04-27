// streamOptimizer.ts
// Manages stream optimization for SmartStream Studio

import { config } from './config';
import { logWithTimestamp } from './utils';
import { StreamManager } from './streamManager';

export class StreamOptimizer {
    private streamManager: StreamManager;

    constructor(streamManager: StreamManager) {
        this.streamManager = streamManager;
    }

    /**
     * Optimizes the stream settings based on current network and system performance.
     */
    public optimizeStreamSettings(): void {
        logWithTimestamp('Optimizing stream settings based on current network and system performance...');
        this.adjustResolutionAndFrameRate();
        this.adjustBitrate();
    }

    /**
     * Adjusts the stream's resolution and frame rate based on the system's capabilities.
     */
    private adjustResolutionAndFrameRate(): void {
        const { defaultResolution, defaultFrameRate, adaptiveQuality } = config.streamOptimization;
        if (adaptiveQuality) {
            const systemPerformance = this.checkSystemPerformance();
            const adjustedResolution = systemPerformance.cpu > 50 ? '720p' : defaultResolution;
            const adjustedFrameRate = systemPerformance.cpu > 50 ? 30 : defaultFrameRate;
            logWithTimestamp(`Adjusting resolution to ${adjustedResolution} and frame rate to ${adjustedFrameRate} FPS.`);
            this.streamManager.updateStreamSettings({ resolution: adjustedResolution, frameRate: adjustedFrameRate });
        } else {
            logWithTimestamp(`Using default resolution ${defaultResolution} and frame rate ${defaultFrameRate} FPS.`);
        }
    }

    /**
     * Adjusts the stream's bitrate based on current network conditions.
     */
    private adjustBitrate(): void {
        const networkSpeed = this.checkNetworkSpeed();
        const adjustedBitrate = networkSpeed < 5 ? 2500 : 4500; // Bitrate in kbps
        logWithTimestamp(`Adjusting bitrate to ${adjustedBitrate} kbps based on current network speed.`);
        this.streamManager.updateStreamSettings({ bitrate: adjustedBitrate });
    }

    /**
     * Simulates checking the system's performance.
     * @returns An object containing CPU and GPU usage percentages.
     */
    private checkSystemPerformance(): { cpu: number; gpu: number } {
        // Placeholder values for CPU and GPU usage
        return { cpu: Math.random() * 100, gpu: Math.random() * 100 };
    }

    /**
     * Simulates checking the current network speed.
     * @returns The current network speed in Mbps.
     */
    private checkNetworkSpeed(): number {
        // Placeholder value for network speed
        return Math.random() * 10;
    }
}
