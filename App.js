import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import login from './screens/login';
import register from './screens/register';
import onbording from './screens/onbording';
import onbording1 from './screens/onbording1';
import onbording2 from './screens/onbording2';
import home from './screens/Tabs/home';
import settings from './screens/Tabs/settings';
import wallet from './screens/Tabs/wallet';
import profile from './screens/Tabs/profile';
import statistics from './screens/Tabs/statistics';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Import Ionicons for the logo
import AddTransactionScreen from './screens/AddTransactionScreen';
import Icon from "react-native-vector-icons/FontAwesome";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accesstoken');
      setIsLoggedIn(!!token); 
      setTimeout(() => {
        setLoading(false);
      }, 5000); 
    };
    checkLoginStatus();
  }, []);

  function MoreTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            elevation: 5,
            paddingBottom: 10,
            paddingTop: 10,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: '#601ef1',
          tabBarInactiveTintColor: 'grey',
        }}
      >
        <Tab.Screen
          name="Home"
          component={home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Icon name='home' size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="statistics"
          component={statistics}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Icon name='bar-chart' color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Wallet"
          component={wallet}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name='wallet-outline' color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Icon name='user' color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    );
  }

  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
      <View style={{flexDirection:'row'}}>
      <Ionicons name="logo-usd" size={80} color="#fff" style={styles.moneyLogo} />
      <Ionicons name="logo-usd" size={80} color="#fff" style={styles.moneyLogo} />
      </View>
        
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "moretabs" : "onbording"}>
        <Stack.Screen name="onbording" component={onbording} options={{ headerShown: false }} />
        <Stack.Screen name="onbording1" component={onbording1} options={{ headerShown: false }} />
        <Stack.Screen name="onbording2" component={onbording2} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={register} options={{ headerShown: false }} />
        <Stack.Screen name="moretabs" component={MoreTabs} options={{ headerShown: false }} />
        <Stack.Screen name="addtransaction" component={AddTransactionScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    backgroundColor: '#601ef1'
  },
  moneyLogo: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
