import { Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Image, Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';

// Creating a composite navigation prop type
export type CustomerScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<
        TabStackParamList, 'Customers'
    >,
    NativeStackNavigationProp<
        RootStackParamList
    >
>;

const CustomersScreen = () => {
    // Variable to hold Tailwind CSS
    const tw = useTailwind();
    // Hidding the Header of the Customers Screen
    const navigation = useNavigation<CustomerScreenNavigationProp>();
    // Variable to hold the state of the search input
    const [input, setInput] = useState<string>('');
    // Pulling the Hook from the useCustomerOrders.tsx file
    const { data, loading, error } = useQuery(GET_CUSTOMERS);
    // When the UI mounts, set the header to be hidden
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        // Setting the view to a ScrollView
        <ScrollView style={tw('bg-[#59C1CC]')}>
            {/* Displaying the Header Image for the Customers Screen */}
            <Image
                source={{ uri: 'https://links.papareact.com/3jc' }}
                containerStyle={tw('w-full h-64')}
                PlaceholderContent={<ActivityIndicator />}
            />

            {/* Displaying a Search Bar that queries by Customer */}
            <Input
                placeholder='Search by Customer'
                value={input}
                onChangeText={setInput}
                containerStyle={tw('bg-white pt-5 pb-0 px-10')}
            />
            {/* Filtering based on the Input in the Search Bar */}
            {data?.getCustomers?.filter((customer: CustomerList) => 
                customer.value.name.includes(input)
            ) // Mapping through the Customers
            .map(
                ({ name: ID, value: { email, name } }: CustomerResponse) => (
                    <CustomerCard key={ID} email={email} name={name} userId={ID} />
                )
            )}
        </ScrollView>
    )
}

export default CustomersScreen