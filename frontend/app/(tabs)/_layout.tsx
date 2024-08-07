// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react';
// import { useColorScheme } from '@/hooks/useColorScheme';

// // Import screens and stack
// import ProfileScreen from '@/screens/profile/profile';
// import CheckInScreen from '@/screens/checkin/checkin';
// import AttendanceScreen from '@/screens/attendance/attendance';
// import AuthStack from '@/navigation/Authstack';
// import { TabBarIcon } from '@/components/navigation/TabBarIcon';

// const Tab = createBottomTabNavigator();

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: 'white',
//         tabBarInactiveTintColor: 'white',
//         tabBarStyle: {
//           backgroundColor: '#EF2A39', // Tab bar background color
//           borderTopWidth: 0, // Optional: remove the border on top of the tab bar
//         },
//         tabBarLabelStyle: {
//           fontSize: 12, // Customize the font size of the tab labels
//           fontWeight: 'bold', // Customize the font weight of the tab labels
//         },
//         headerShown: false,
//       }}>
//       <Tab.Screen
//         name="home"
//         component={AuthStack}
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home'} color={color} focused={focused} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="profile"
//         component={ProfileScreen}
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} focused={focused} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CheckIn"
//         component={CheckInScreen}
//         options={{
//           title: 'CheckIn',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'check-circle' : 'check-circle-outline'} color={color} focused={focused} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="attendance"
//         component={AttendanceScreen}
//         options={{
//           title: 'Attendance',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'check-circle' : 'check-circle-outline'} color={color} focused={focused} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// app/(tabs)/_layout.tsx
// TabLayout.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomTabBar from '@/components/CustomTabBar';
import ProfileScreen from '@/screens/profile/profile';
import CheckInScreen from '@/screens/checkin/checkin';
import AttendanceScreen from '@/screens/attendance/attendance';
import LeavesScreen from '@/screens/leaves/LeavesScreen'; // Import the LeavesScreen
import AuthStack from '@/navigation/Authstack';

const Tab = createBottomTabNavigator();

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
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Tab.Screen
        name="CheckIn"
        component={CheckInScreen}
        options={{
          title: 'CheckIn',
        }}
      />
      <Tab.Screen
        name="attendance"
        component={AttendanceScreen}
        options={{
          title: 'Attendance',
        }}
      />
      <Tab.Screen
        name="leaves"
        component={LeavesScreen}
        options={{
          title: 'Leaves',
        }}
      />
    </Tab.Navigator>
  );
}



