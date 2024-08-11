import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/profile/profile';
import WorkingCondition from '../screens/profile/workingConditions'

const Stack = createStackNavigator();

export default function Leavestack() {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WorkingConditions"
        component={WorkingCondition}
        options={{ title: 'Working Conditions' }}
      />
    </Stack.Navigator>
  );
}
