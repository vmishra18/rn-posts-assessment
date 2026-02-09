# RN Posts (JSON Placeholder)

A React Native app that fetches posts from a public API and displays them in a list of cards, including basic loading and error handling with a retry option.

## Prerequisites

- Node.js 20+
- npm
- Xcode + CocoaPods (for iOS)
- Android Studio (for Android)

## API

Endpoint: https://jsonplaceholder.org/posts

## Getting Started

Install dependencies:

```bash
npm install
```

## iOS

```bash
cd ios
pod install
cd ..
npm run ios
```

## Android

```bash
npm run android
```

## Quality checks

```bash
npm test
npm run lint
npm run typecheck
```

## App behaviour

- Displays a loading indicator while posts are being fetched
- Shows an error message with a retry button if the request fails
- Renders posts in a scrollable list of cards
