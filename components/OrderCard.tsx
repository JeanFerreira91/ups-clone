import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, Icon } from '@rneui/themed';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';

// Customising the Navigation Prop
export type OrdersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<
        TabStackParamList, 'Orders'
    >,
    NativeStackNavigationProp<
        RootStackParamList
    >
>;

// Defining the type Props
type Props = {
    item: Order;
};

const OrderCard = ({ item }: Props) => {
    // Variable to hold Tailwind CSS
    const tw = useTailwind();
    // Variable to hold the useNavigation Hook
    const navigation = useNavigation<OrdersScreenNavigationProp>();

    return (
        // TouchableOpacity to give the Card component a touchable effect
        <TouchableOpacity
            // onPress to navigate to the OrderScreen
            onPress={() => navigation.navigate("Order", { order: item })}
        >
            {/* Displaying a Card component from '@rneui/themed' */}
            <Card containerStyle={tw('px-5 rounded-lg')}>
                {/* General View of the OrderCard component */}
                <View style={tw('flex-row justify-between items-center')}>
                    {/* View to Display an Icon, item's date */}
                    <View>
                        <Icon
                            name='truck-delivery'
                            color={"#EB6A7C"}
                            type='material-community'
                        />
                        <Text style={{ fontSize: 10 }}>
                            {new Date(item.createdAt).toDateString()}
                        </Text>
                    </View>
                    {/* View to display the item's carrier, trackingID, and customer's name */}
                    <View>
                        <Text style={[tw('text-gray-400'), { fontSize: 10 }]}>
                            {item.carrier} - {item.trackingId}
                        </Text>
                        <Text style={tw('text-gray-500 text-xl')}>
                            {item.trackingItems.customer.name}
                        </Text>
                    </View>
                    {/* View to display item's length and an icon */}
                    <View style={tw('flex-row items-center')}>
                        <Text style={tw('text-sm text-[#EB6A7C]')}>
                            {item.trackingItems.items.length} x
                        </Text>
                        <Icon style={tw('ml-2')} name="box" type="feather" />
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default OrderCard