# frontendChallenge-ReactNative

Task Manager App (Expo)
🚀 Setup Instructions

Clone this repository

Install dependencies

npm install


⚠️ Make sure to run this command before starting the project to ensure all dependencies are installed correctly.

Node version

Node.js v20.18.0

If you’re using a different Node version, it’s recommended to use nvm
 to match the correct version.

📱 How to Run the Project
Android

Make sure you have a connected Android device or an emulator running.

Start the project:

npm start


Press a to open the app on Android.

iOS

Only available on macOS with Xcode properly configured.

Start the project:

npx expo start

The project was tested on Android devices.

📦 Dependencies and Versions

Expo: latest stable version (SDK 51 or newer)

React Native: latest version supported by Expo

Node: v20.18.0

React: version aligned with Expo

Yup / React Hook Form / Context API / Reanimated 

⚙️ Special Configuration

No special configuration is required beyond installing dependencies.

Since the project uses Expo, there’s no need for manual native setup (Xcode or Android Studio).

💡 State Management

This project uses React Context API for global state management.

Reasoning:

It’s simple and straightforward to implement.

I have the most experience using it.

⚠️ Known Issues / Limitations

The app was mainly tested on Android; minor adjustments might be needed for iOS.

💭 Assumptions & Trade-offs

Prioritized development speed and simplicity over large-scale scalability.

Assumed the project would run entirely under Expo without native customization.

Context API was chosen for state management due to familiarity and ease of use.
