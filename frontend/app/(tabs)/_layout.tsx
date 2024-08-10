import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTabBar from '@/components/CustomTabBar';
import ProfileScreen from '@/screens/profile/profile';
import CheckInScreen from '@/screens/checkin/checkin';
import AttendanceScreen from '@/screens/attendance/attendance';
import AuthStack from '@/navigation/Authstack';
import Leavestack from '@/navigation/Leavestack';
import Healthstack from '@/navigation/HeathSectionStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const tabBarIcon = (iconName: string) => ({ color, size }: { color: string; size: number }) => (
  <Icon name={iconName} color={color} size={size} />
);

export default function TabLayout() {
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJWT = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        setJwt(token);
      } catch (error) {
        console.error('Error retrieving JWT', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJWT();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {jwt ? (
        <>
          <Tab.Screen
            name="CheckIn"
            component={CheckInScreen}
            options={{
              tabBarIcon: tabBarIcon('check-circle'),
            }}
          />
          <Tab.Screen
            name="Attendance"
            component={AttendanceScreen}
            options={{
              tabBarIcon: tabBarIcon('calendar-check-o'),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: tabBarIcon('user'),
            }}
          />
          <Tab.Screen
            name="Leaves"
            component={Leavestack}
            options={{
              tabBarIcon: tabBarIcon('leaf'),
            }}
          />
          <Tab.Screen
            name="HealthCheck"
            component={Healthstack}
            options={{
              tabBarIcon: tabBarIcon('heartbeat'),
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name="Profile"
          component={AuthStack}
          options={{
            tabBarIcon: tabBarIcon('home'),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
