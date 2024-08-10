import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainLeavesScreen from '../screens/leaves/LeavesScreen'; // Main Leaves Screen
import ApplyLeavesScreen from '../screens/leaves/ApplyLeaveScreen'; // Apply Leaves Screen

const Stack = createStackNavigator();

export default function Leavestack() {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
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
