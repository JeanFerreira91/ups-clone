import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomersScreen from '../screens/CustomersScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

// Exporting the type definition of the Tab Navigator
export type TabStackParamList = {
    Customers: undefined;
    Orders: undefined;
};

// Vaqriable to hold the Bottom Tab Navigator
const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
    // Pulling the Navigation Object
    const navigation = useNavigation();

    // Using UseLayoutEffect to set the Header properties of the Tab Navigator
    useLayoutEffect(() => {
        navigation.setOptions({
            // Hidding the header
            headerShown: false,
        });
    }, [])
    
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            // Setting the Tab Bar Icons
            tabBarActiveTintColor: "#59C1CC",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Customers") {
                    return (
                        <Icon
                            name="users"
                            type="entypo"
                            color={focused ? "#59C1CC" : "gray"}
                        />
                    );
                } else if (route.name === "Orders") {
                    return (
                        <Icon
                            name="box"
                            type="entypo"
                            color={focused ? "#EB6A7C" : "gray"}
                        />
                    )
                }
            }
        })}
    >
      {/* Tab to navigate to the Customers Screen */}
      <Tab.Screen name="Customers" component={CustomersScreen} />
      {/* Tab to navigate to the Orders Screen */}
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator