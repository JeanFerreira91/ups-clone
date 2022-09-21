import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomersScreen';
import { Card, Icon } from '@rneui/themed';

// Taking the Props
type Props = {
    userId: string;
    name: string;
    email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
    // Special customers order Hook to pull in the appropriate data based on the customer's ID
    const { orders, loading, error } = useCustomerOrders(userId);
    // Variable to hold Tailwind CSS
    const tw = useTailwind();
    // Variable for the Navigation Prop
    const navigation = useNavigation<CustomerScreenNavigationProp>();

    return (
        <TouchableOpacity
            // When the user presses the Card, navifate to the Modal Screen
            onPress={() =>
                navigation.navigate('MyModal',{
                    // Passing the Props to the Modal Screen (userId and name)
                    name: name,
                    userId: userId,
                })
            }
        >
            {/* Displaying Card component from '@rneui/themed', then displaying Customer's related information  */}
            <Card containerStyle={tw('p-5 rounded-lg')}>
                <View>
                    <View style={tw('flex-row justify-between')}>
                        {/* View to Display the name and ID of the Customers */}
                        <View>
                            <Text style={tw('text-2xl font-bold')}>{name}</Text>
                            <Text style={tw('text-sm text-[#59C1CC]')}>ID: {userId}</Text>
                        </View>

                        {/* View to Display the number of Items and an Icon */}
                        <View style={tw('flex-row items-center justify-end')}>
                            <Text style={tw('text-[#59C1CC]')}>
                                {/* If it's loading, show loading, otherwise, show the length and an icon */}
                                {loading ? "Loading..." : `${orders.length} x`}
                            </Text>
                            <Icon
                                style={tw('mb-5 ml-auto')}
                                name='box'
                                type='entypo'
                                color='#59C1CC'
                                size={50}
                            />
                        </View>
                    </View>
                </View>
                {/* Displaying a Card Divider and the Customer's email below it */}
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default CustomerCard