# RN Posts (JSON Placeholder)

A React Native app that fetches posts from a public API and displays them in a list of cards, including basic loading and error handling with a retry option.

## Screenshots

### Error state
<img width="" height="320" alt="Screenshot 2026-02-09 at 1 12 07 AM" src="https://github.com/user-attachments/assets/827cb7e1-cab3-4e15-987d-a9318768c1c3" />

### Loaded posts (collapsed)
<img width="" height="320" alt="Screenshot 2026-02-09 at 1 12 14 AM" src="https://github.com/user-attachments/assets/f3cd61c7-ae17-4c6b-b2a9-213dfd056429" />

### Expanded post
<img width="" height="320" alt="Screenshot 2026-02-09 at 1 12 16 AM" src="https://github.com/user-attachments/assets/f013fc2b-e917-49f5-8322-f6d9b906d6b9" />

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
