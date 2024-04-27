// config.ts
// Configuration settings for SmartStream Studio

export const config = {
    // Streaming platforms integration
    platforms: {
        twitch: {
            clientId: 'YOUR_TWITCH_CLIENT_ID',
            clientSecret: 'YOUR_TWITCH_CLIENT_SECRET',
            redirectUri: 'http://localhost/callback',
        },
        youtube: {
            apiKey: 'YOUR_YOUTUBE_API_KEY',
            clientId: 'YOUR_YOUTUBE_CLIENT_ID',
            clientSecret: 'YOUR_YOUTUBE_CLIENT_SECRET',
        },
        facebook: {
            appId: 'YOUR_FACEBOOK_APP_ID',
            appSecret: 'YOUR_FACEBOOK_APP_SECRET',
        }
    },

    // AI Services configuration
    aiServices: {
        openAI: {
            apiKey: 'YOUR_OPENAI_API_KEY',
        },
        googleAI: {
            apiKey: 'YOUR_GOOGLE_AI_API_KEY',
        },
        anthropic: {
            apiKey: 'YOUR_ANTHROPIC_API_KEY',
        }
    },

    // Security settings
    security: {
        encryptionKey: 'YOUR_ENCRYPTION_KEY',
        allowedIPs: ['127.0.0.1', '192.168.1.1'],
    },

    // Accessibility settings
    accessibility: {
        speechToTextEnabled: true,
        voiceNavigationEnabled: true,
    },

    // Stream optimization settings
    streamOptimization: {
        defaultResolution: '1080p',
        defaultFrameRate: 60,
        adaptiveQuality: true,
    },

    // Theme settings
    themes: {
        defaultTheme: 'dark',
        availableThemes: ['dark', 'light', 'classic'],
    },

    // Voice control settings
    voiceControl: {
        enabled: true,
        commands: {
            startStream: 'start stream',
            endStream: 'end stream',
            switchScene: 'switch scene',
        }
    },

    // Analytics settings
    analytics: {
        trackViewerEngagement: true,
        trackDemographics: true,
    }
};

