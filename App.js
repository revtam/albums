import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from "./app/config/colors.js";
import WelcomeScreen from "./app/screens/WelcomeScreen.js";
import ArtistScreen from "./app/screens/ArtistScreen.js";
import AlbumScreen from "./app/screens/AlbumScreen.js";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
            screenOptions={{
              headerTintColor: colors.primaryWhite,
              headerStyle: { 
                backgroundColor: colors.baseDark 
              }
            }}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Artist"
          component={ArtistScreen} 
          options={{
            headerTitle: ""
          }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={({ route }) => ({ title: route.params.albumData.strArtist })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
