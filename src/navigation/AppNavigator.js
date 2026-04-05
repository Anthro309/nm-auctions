import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../theme';
import HomeScreen          from '../screens/HomeScreen';
import AuctionsScreen      from '../screens/AuctionsScreen';
import AuctionDetailScreen from '../screens/AuctionDetailScreen';
import LotDetailScreen     from '../screens/LotDetailScreen';
import MyBidsScreen        from '../screens/MyBidsScreen';
import AccountScreen       from '../screens/AccountScreen';

const Tab          = createBottomTabNavigator();
const HomeStack    = createNativeStackNavigator();
const AuctionStack = createNativeStackNavigator();
const BidsStack    = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

const SO = { headerShown: false, animation: 'slide_from_right' };

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={SO}>
      <HomeStack.Screen name="HomeMain"      component={HomeScreen} />
      <HomeStack.Screen name="AuctionDetail" component={AuctionDetailScreen} />
      <HomeStack.Screen name="LotDetail"     component={LotDetailScreen} />
    </HomeStack.Navigator>
  );
}

function AuctionStackNav() {
  return (
    <AuctionStack.Navigator screenOptions={SO}>
      <AuctionStack.Screen name="AuctionsMain"  component={AuctionsScreen} />
      <AuctionStack.Screen name="AuctionDetail" component={AuctionDetailScreen} />
      <AuctionStack.Screen name="LotDetail"     component={LotDetailScreen} />
    </AuctionStack.Navigator>
  );
}

function BidsStackNav() {
  return (
    <BidsStack.Navigator screenOptions={SO}>
      <BidsStack.Screen name="MyBidsMain" component={MyBidsScreen} />
    </BidsStack.Navigator>
  );
}

function AccountStackNav() {
  return (
    <AccountStack.Navigator screenOptions={SO}>
      <AccountStack.Screen name="AccountMain" component={AccountScreen} />
    </AccountStack.Navigator>
  );
}

const ICONS = {
  Home:      { on: 'home',      off: 'home-outline' },
  Auctions:  { on: 'hammer',    off: 'hammer-outline' },
  'My Bids': { on: 'bar-chart', off: 'bar-chart-outline' },
  Account:   { on: 'person',    off: 'person-outline' },
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor:  colors.border,
          borderTopWidth:  1,
          height:         Platform.OS === 'ios' ? 86 : 62,
          paddingBottom:  Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor:   colors.accent,
        tabBarInactiveTintColor: colors.text3,
        tabBarLabelStyle: {
          fontFamily: fonts.body.bold,
          fontSize: 11,
          marginTop: 1,
        },
        tabBarIcon: ({ focused, color }) => {
          const { on, off } = ICONS[route.name];
          return <Ionicons name={focused ? on : off} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"     component={HomeStackNav} />
      <Tab.Screen name="Auctions" component={AuctionStackNav} />
      <Tab.Screen name="My Bids"  component={BidsStackNav} />
      <Tab.Screen name="Account"  component={AccountStackNav} />
    </Tab.Navigator>
  );
}
