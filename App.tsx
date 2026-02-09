import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { PostsScreen } from './src/screens/PostsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <PostsScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
