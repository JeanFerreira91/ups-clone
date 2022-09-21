import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import DeliveryCard from '../components/DeliveryCard';

// RouteProp to fetch the order from the route.params
type OrderScreenRouteProp = RouteProp<
    RootStackParamList, 'Order'
>;

// Customising the Navigation Prop
export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<
        TabStackParamList, 'Orders'
    >,
    NativeStackNavigationProp<
        RootStackParamList
    >
>;

const OrderScreen = () => {
    // Variable to hold Tailwind CSS
    const tw = useTailwind();
    // Variable to hold the useNavigation Hook
    const navigation = useNavigation<OrdersScreenNavigationProp>();
    // Variable to hold the route.params
    const { params: { order } } = useRoute<OrderScreenRouteProp>();

    // useLayoutEffect to set the header options
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: order.trackingItems.customer.name,
            headerTintColor: '#EB6A7C',
            headerTitleStyle: tw('text-[black]'),
            headerBackTitle: "Deliveries",
        })
    })

    return (
        <View style={tw('-mt-2')}>
            {/* Displaying the DeliveryCard component passing the order information */}
            <DeliveryCard order={order} fullWidth />
        </View>
    )
}

export default OrderScreen