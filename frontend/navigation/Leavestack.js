import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainLeavesScreen from '../screens/leaves/LeavesScreen';
import ApplyLeavesScreen from '../screens/leaves/ApplyLeaveScreen';

const Stack = createStackNavigator();

export default function Leavestack() {
  return (
    <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainScreen"
        component={MainLeavesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeavesScreen"
        component={ApplyLeavesScreen}
        options={{ title: 'Apply Leave' }}
      />
    </Stack.Navigator>
  );
}
