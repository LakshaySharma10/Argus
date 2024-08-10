import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CustomTabBar from '@/components/CustomTabBar';
import ProfileScreen from '@/screens/profile/profile';
import CheckInScreen from '@/screens/checkin/checkin';
import AttendanceScreen from '@/screens/attendance/attendance';
import AuthStack from '@/navigation/Authstack';
import Health from '@/screens/health/health';
import Leavestack from '@/navigation/Leavestack'
import Healthstack from '@/navigation/HeathSectionStack'

const Tab = createBottomTabNavigator();

const tabBarIcon = (iconName: string) => ({ color, size }: { color: string; size: number }) => (
  <Icon name={iconName} color={color} size={size} />
);

export default function TabLayout() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={AuthStack}
        options={{
          tabBarIcon: tabBarIcon('home'),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: tabBarIcon('user'),
        }}
      />
      <Tab.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{
          tabBarIcon: tabBarIcon('check-circle'),
        }}
      />
      <Tab.Screen
        name="attendance"
        component={AttendanceScreen}
        options={{
          tabBarIcon: tabBarIcon('calendar-check-o'),
        }}
      />
      <Tab.Screen
        name="leaves"
        component={Leavestack}
        options={{
          tabBarIcon: tabBarIcon('leaf'),
        }}
      />
      <Tab.Screen
        name="healthCheck"
        component={Healthstack}
        options={{
          tabBarIcon: tabBarIcon('heartbeat'),
        }}
      />
    </Tab.Navigator>
  );
}
