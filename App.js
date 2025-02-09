import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Platform } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Page3 from './src/screens/Page3';
import AIcon from './src/components/atomes/AIcon';
import icon from './src/data/icon';

import Inscription from "./src/screens/Inscription";
import Login from "./src/screens/Login";
import Produits from "./src/screens/Produits";
import Commande from "./src/screens/Commande";
import Delivery from "./src/screens/Delivery";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Permission not granted to get push token for push notification!');
      return;
    }
    try {
      const pushTokenString = (await Notifications.getDevicePushTokenAsync()).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      alert(`${e}`);
    }
  } else {
    alert('Must use physical device for push notifications');
  }
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Inscription" 
          component={Inscription} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Produits" 
          component={Produits} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Page3" 
          component={Page3} 
          options={{ 
            headerTitle: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Detail</Text>
                <AIcon
                  borderRadius={12}
                  width={30}
                  height={28}
                  url={icon[9]} 
                />
              </View>
            ),
          }} 
        />
        <Stack.Screen 
          name="Commande" 
          component={Commande} 
          options={{ 
            headerTitle: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Commande</Text>
                <AIcon
                  borderRadius={12}
                  width={30}
                  height={28}
                  url={icon[9]} 
                />
              </View>
            ),
          }} 
        />
        <Stack.Screen 
          name="Delivery" 
          component={Delivery} 
          options={{ 
            headerTitle: () => (
              <View style={styles.header}>
                <Text style={styles.headerText}>Delivery</Text>
                <AIcon
                  borderRadius={12}
                  width={30}
                  height={28}
                  url={icon[9]} 
                />
              </View>
            ),
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
  },
  headerText: {
    fontSize: 14, 
    fontWeight: 'bold',
    marginLeft: "75%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

