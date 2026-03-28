import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ShopProvider } from './src/context';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ShopProvider>
        <AppNavigator />
      </ShopProvider>
    </GestureHandlerRootView>
  );
}