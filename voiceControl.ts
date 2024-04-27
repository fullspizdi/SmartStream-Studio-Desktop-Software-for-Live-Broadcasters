// voiceControl.ts
// Manages voice-controlled operations for SmartStream Studio

import { config } from './config';
import { logWithTimestamp } from './utils';

export class VoiceControl {
    private recognition: any;

    constructor() {
        this.setupVoiceRecognition();
    }

    /**
     * Sets up the voice recognition service using the Web Speech API.
     */
    private setupVoiceRecognition(): void {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = false;
            this.recognition.onresult = this.handleVoiceCommand.bind(this);
            logWithTimestamp('Voice recognition setup complete.');
        } else {
            logWithTimestamp('Voice recognition is not supported on this browser.');
        }
    }

    /**
     * Enables voice recognition to start listening to voice commands.
     */
    public enableVoiceControl(): void {
        if (this.recognition) {
            this.recognition.start();
            logWithTimestamp('Voice control enabled and listening...');
        } else {
            logWithTimestamp('Failed to enable voice control: Voice recognition not initialized.');
        }
    }

    /**
     * Handles voice commands and triggers appropriate actions.
     * @param event - The speech recognition result event.
     */
    private handleVoiceCommand(event: any): void {
        const lastResult = event.results[event.resultIndex];
        const command = lastResult[0].transcript.trim().toLowerCase();

        logWithTimestamp(`Received voice command: ${command}`);

        switch (command) {
            case 'start stream':
                // Assuming there's a global access to SmartStreamStudio instance
                SmartStreamStudio.startStream();
                break;
            case 'end stream':
                SmartStreamStudio.endStream();
                break;
            case 'optimize stream':
                SmartStreamStudio.streamOptimizer.optimizeStreamSettings();
                break;
            case 'generate highlight reel':
                SmartStreamStudio.highlightReelGenerator.generateHighlightReel();
                break;
            default:
                logWithTimestamp(`Unknown command: ${command}`);
                break;
        }
    }

    /**
     * Disables the voice recognition service.
     */
    public disableVoiceControl(): void {
        if (this.recognition) {
            this.recognition.stop();
            logWithTimestamp('Voice control disabled.');
        }
    }
}
