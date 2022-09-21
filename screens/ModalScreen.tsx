import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

// Creating a composite navigation prop type
type ModalScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<
        TabStackParamList
    >,
    NativeStackNavigationProp<
        RootStackParamList, 'MyModal'
    >
>;

// Creating a composite navigation prop type
type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>;

const ModalScreen = () => {
    // Variable to hold Tailwind CSS
    const tw = useTailwind();
    // Variable for the Navigation Prop
    const navigation = useNavigation<ModalScreenNavigationProp>();
    // Variable to pull the userId and name from the route
    const {
        params: {name, userId}
    } = useRoute<ModalScreenRouteProp>();
    // Pulling the information using our Custom Hook based on the userId
    const { orders, loading, error } = useCustomerOrders(userId);

    return (
        <View>
            <TouchableOpacity
                style={tw('absolute right-5 top-5 z-10')}
                // When the user presses the X, navigate back to the Main Screen
                onPress={navigation.goBack}
            >
                <Icon
                    name='closecircle'
                    type='antdesign'
                />
            </TouchableOpacity>
            {/* View to Display the Header */}
            <View style={tw('mt-10')}>
                <View style={tw('py-5 border-b border-[#59C1CC]')}>
                    <Text style={tw('text-center text-xl font-bold text-[#59C1CC]')}>{name}</Text>
                    <Text style={tw('text-center italic text-sm')}>deliveries</Text>
                </View>
            </View>
            {/* FlatList to display the Customer's Delivery list */}
            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                data={orders}
                keyExtractor={(order) => order.trackingId}
                renderItem={({ item: order }) => <DeliveryCard order={order} />}
            />
        </View>
    )
}

export default ModalScreen