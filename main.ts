import { StreamManager } from './streamManager';
import { StreamOptimizer } from './streamOptimizer';
import { ContentGenerator } from './contentGenerator';
import { AIModerator } from './aiModerator';
import { HighlightReelGenerator } from './highlightReelGenerator';
import { ThemeManager } from './themeManager';
import { VoiceControl } from './voiceControl';
import { Analytics } from './analytics';
import { Security } from './security';
import { Accessibility } from './accessibility';
import { PlatformIntegration } from './platformIntegration';

class SmartStreamStudio {
    private streamManager: StreamManager;
    private streamOptimizer: StreamOptimizer;
    private contentGenerator: ContentGenerator;
    private aiModerator: AIModerator;
    private highlightReelGenerator: HighlightReelGenerator;
    private themeManager: ThemeManager;
    private voiceControl: VoiceControl;
    private analytics: Analytics;
    private security: Security;
    private accessibility: Accessibility;
    private platformIntegration: PlatformIntegration;

    constructor() {
        this.streamManager = new StreamManager();
        this.streamOptimizer = new StreamOptimizer();
        this.contentGenerator = new ContentGenerator();
        this.aiModerator = new AIModerator();
        this.highlightReelGenerator = new HighlightReelGenerator();
        this.themeManager = new ThemeManager();
        this.voiceControl = new VoiceControl();
        this.analytics = new Analytics();
        this.security = new Security();
        this.accessibility = new Accessibility();
        this.platformIntegration = new PlatformIntegration();

        this.initialize();
    }

    private initialize(): void {
        this.security.setupSecurityProtocols();
        this.accessibility.enableAccessibilityFeatures();
        this.platformIntegration.setupPlatformIntegration();
        this.voiceControl.enableVoiceControl();
        this.themeManager.applyInitialTheme();
    }

    public startStream(): void {
        this.streamOptimizer.optimizeStreamSettings();
        this.streamManager.startStreaming();
        this.aiModerator.activateModeration();
        this.contentGenerator.startContentGeneration();
        this.analytics.startAnalytics();
    }

    public endStream(): void {
        this.streamManager.stopStreaming();
        this.highlightReelGenerator.generateHighlightReel();
        this.analytics.generateReport();
    }
}

const smartStreamStudio = new SmartStreamStudio();
smartStreamStudio.startStream();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('Ending Stream and shutting down...');
    smartStreamStudio.endStream();
    process.exit();
});
