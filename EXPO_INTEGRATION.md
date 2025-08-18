# Expo Integration for Twilio Voice React Native SDK

This SDK includes full Expo support with automatic configuration plugins for both iOS and Android platforms.

## Compatibility

- **Expo SDK 53**: ✅ Fully compatible
- **React Native**: 0.76.5
- **React**: 18.3.1
- **Node.js**: >= 20.0.0
- **New Architecture**: Supported

## Installation

```bash
npm install @ashworthhub/twilio-voice-expo
```

## Configuration

### Using app.json/app.config.js

Add the plugin to your Expo configuration:

```json
{
  "expo": {
    "plugins": [
      "@ashworthhub/twilio-voice-expo"
    ]
  }
}
```

### What the Plugin Does

#### iOS Configuration
- Adds required entitlements for push notifications
- Configures background modes (voip, audio)
- Adds microphone usage description
- Includes TwilioVoice pod dependency

#### Android Configuration
- Adds all required permissions (RECORD_AUDIO, MODIFY_AUDIO_SETTINGS, etc.)
- Configures Firebase Cloud Messaging service
- Sets up VoiceService with foreground service support
- Initializes VoiceApplicationProxy automatically
- Adds lifecycle listeners for proper SDK integration

## Platform-Specific Setup

### iOS Additional Setup

1. Configure Push Notifications in your Apple Developer account
2. Upload your VoIP Services certificate to Twilio Console
3. Ensure your app has proper provisioning profiles with Push Notifications capability

### Android Additional Setup

1. Add your `google-services.json` file to your project
2. Configure Firebase Cloud Messaging in Firebase Console
3. Add your FCM Server Key to Twilio Console

## Features Included

### Automatic Lifecycle Management
The Expo modules automatically handle:
- Application lifecycle events
- Activity lifecycle events  
- VoiceApplicationProxy initialization
- VoiceActivityProxy management

### Config Plugins
Three config plugins are available:
- `withTwilioVoice` - Combined iOS and Android configuration (recommended)
- `withTwilioVoiceIos` - iOS-only configuration
- `withTwilioVoiceAndroid` - Android-only configuration

### Kotlin Support
The Android module includes Kotlin support for better Expo integration and modern Android development.

## Usage

After installation and configuration, use the SDK as normal:

```javascript
import { Voice } from '@ashworthhub/twilio-voice-expo';

// Register for incoming calls
const token = await getAccessToken();
await Voice.register(token);

// Handle incoming calls
Voice.on('callInvite', (callInvite) => {
  // Handle incoming call
});
```

## Troubleshooting

### Android Build Issues
If you encounter Kotlin-related build issues:
1. Ensure your project uses Kotlin 1.8.0 or higher
2. Clean and rebuild: `cd android && ./gradlew clean`

### iOS Build Issues
If pods fail to install:
1. Clear pod cache: `cd ios && pod cache clean --all`
2. Reinstall pods: `npx pod-install`

## Migration from Non-Expo Setup

If migrating from a bare React Native setup:
1. Remove manual MainApplication.java modifications
2. Remove manual Info.plist modifications
3. Remove manual AndroidManifest.xml modifications
4. Add the plugin to your Expo config
5. Run `expo prebuild` to regenerate native files