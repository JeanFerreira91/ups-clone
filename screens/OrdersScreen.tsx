import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigator/RootNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTailwind } from 'tailwind-rn/dist';
import useOrders from '../hooks/useOrders';
import { Button, Image } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

// Customizing the Props type
export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<
      TabStackParamList, 'Orders'
  >,
  NativeStackNavigationProp<
      RootStackParamList
  >
>;

const OrdersScreen = () => {
  // Variable to hold Tailwind CSS
  const tw = useTailwind();
  // Variable to hold the useNavigation Hook
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  // Pulling the useOrders Hook
  const { orders, loading, error } = useOrders();
  // Variable to hold ...
  const [ascending, setAscending] = useState<boolean>(false);

  // Changing the Layout to have a different color in OrdersScreen
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    // Displaying a ScrollView
    <ScrollView style={tw('bg-[#EB6A7C]')}>
      <Image
        source={{ uri: "https://links.papareact.com/m51"}}
        containerStyle={tw('w-full h-64')}
        PlaceholderContent={<ActivityIndicator />}
      />
      {/* View to display ... */}
      <View>
        {/* Displaying Button component from '@rneui/themed' that controls how results are shown */}
        <Button
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400"}}
          style={tw('py-2 px-5')}
          onPress={() => setAscending(!ascending)}
        >
          {/* If 'ascending' it shows oldest first, otherwise, most recents first */}
          {ascending ? 'Showing: Oldest First' : 'Showing: Most Recent First'}
        </Button>
        {/* Sorting the orders based on the 'ascending' Hook */}
        {orders?.sort((a, b) => {
          if (ascending) {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
          } else {
            return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
          }
        // Then, mapping through the orders and displaying the OrderCard component */}
        }).map(order => (
          <OrderCard key={order.trackingId} item={order} />
        ))}
      </View>
    </ScrollView>
  )
}

export default OrdersScreen