import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from './src/screens/ResultScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#007AFF" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Usiamo header personalizzati
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Rivalutazione Monetaria'
            }}
          />
          <Stack.Screen 
            name="Result" 
            component={ResultScreen}
            options={{
              title: 'Risultato Calcolo'
            }}
          />
          <Stack.Screen 
            name="History" 
            component={HistoryScreen}
            options={{
              title: 'Cronologia Calcoli'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

AppRegistry.registerComponent('main', () => App);

export default App;