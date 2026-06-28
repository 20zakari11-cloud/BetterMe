const config = {
  appId: 'com.betterme.app',
  appName: 'Better Me',
  webDir: 'dist',
  android: {
    minSdkVersion: 28,
    backgroundColor: '#f0faf0',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6db56d',
      showSpinner: false,
    },
  },
};

export default config;
