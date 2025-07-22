const { withEntitlementsPlist, withInfoPlist, withPods } = require('@expo/config-plugins');

function ensureBackgroundModes(existing = [], required = []) {
  const set = new Set([...existing, ...required]);
  return Array.from(set);
}

module.exports = function withTwilioVoiceIos(config) {
  config = withEntitlementsPlist(config, (c) => {
    c.modResults['com.apple.developer.voip'] = true;
    c.modResults['aps-environment'] = 'production'; // TODO: make configurable if needed
    return c;
  });

  config = withInfoPlist(config, (c) => {
    c.modResults.UIBackgroundModes = ensureBackgroundModes(
      c.modResults.UIBackgroundModes,
      ['voip', 'audio']
    );

    c.modResults.NSMicrophoneUsageDescription =
      c.modResults.NSMicrophoneUsageDescription ||
      'SimpleVox needs microphone access to make and receive business calls.';
    return c;
  });

  config = withPods(config, (c) => {
    c.modResults.push(`pod 'TwilioVoice', '~> 6.2'`);
    return c;
  });

  return config;
};
