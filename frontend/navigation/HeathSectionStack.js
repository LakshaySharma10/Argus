import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Health from '../screens/health/health';
import SafetyIncidents from '../screens/health/safetyincidents';
import SafetyAudits from '../screens/health/safetyaudits';

const Stack = createStackNavigator();

export default function Healthstack() {
return (
    <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="MainScreen"
            component={Health}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="SafetyIncidentsScreen"
            component={SafetyIncidents}
            options={{ title: 'Safety Incidents' }}
        />
        <Stack.Screen
            name="SafetyAuditsScreen"
            component={SafetyAudits}
            options={{ title: 'Safety Audits' }}
        />
    </Stack.Navigator>
);
}
