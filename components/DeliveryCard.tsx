import { View, Text } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { Card, Divider, Icon } from '@rneui/themed';
import MapView, { Marker } from 'react-native-maps';

type Props = {
    order: Order;
    fullWidth?: boolean;
};

// fullWidth argument is optional as specified by the ? symbol in the Props type
const DeliveryCard = ({ order, fullWidth }: Props) => {
    // Variable to hold Tailwind CSS
    const tw = useTailwind();

    return (
        // Displaying Card component from '@rneui/themed'
        <Card
            // if fullWidth is true, then the card will take the full width of the screen and have pink colors
            containerStyle={[
                tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"} my-2`),
                {
                    backgroundColor: fullWidth ? "#EB6A7C" : '#59C1CC',
                    padding: 0,
                    paddingTop: 16,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                },
            ]}
        >
            {/* General View inside the Card component */}
            <View style={fullWidth && { height: "100%" }}>
                {/* Displaying the Icon from '@rneui/themed'  */}
                <Icon name='box' type='entypo' size={50} color='white' />
                {/* View to display the Carrier, Tracking ID, and Expected Delivery Date */}
                <View style={tw('items-start p-5 -mt-3')}>
                    <View style={tw('mx-auto')}>
                        <Text style={tw('text-xs text-center uppercase text-white font-bold')}>
                            {order.carrier} - {order.trackingId}
                        </Text>
                        <Text style={tw('text-white text-center text-lg font-bold')}>
                            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
                        </Text>
                        {/* Displaying a Divider component from '@rneui/themed' */}
                        <Divider color='white' />
                    </View>
                    {/* View to display the Delivery Address and Shipping Cost */}
                    <View style={tw('mx-auto pb-5')}>
                        <Text style={tw('text-base text-center text-white font-bold mt-5')}>
                            Address
                        </Text>
                        <Text style={tw('text-sm text-center text-white')}>
                            {order.Address}, {order.City}
                        </Text>
                        <Text style={tw('text-sm text-center italic text-white')}>
                            Shipping Cost: £{order.shippingCost}
                        </Text>
                    </View>
                    {/* </View> */}
                </View>
                {/* Displaying a Divider component from '@rneui/themed' */}
                <Divider color='white' />
                {/* View to display the order items (name and quantity) */}
                <View style={tw('p-5')}>
                    {/* Looping through order items and displaying the name and quantity */}
                    {order.trackingItems.items.map((item) => (
                        <View
                            key={item.item_id}
                            style={tw('flex-row justify-between items-center')}
                        >
                            <Text style={tw('text-sm italic text-white')}>
                                {item.name}
                            </Text>
                            <Text style={tw('text-xl text-white')}>
                                x {item.quantity}
                            </Text>
                        </View>
                    ))}
                </View>
                {/* Displaying the MapView component from react-native-maps */}
                <MapView
                    initialRegion={{
                        latitude: order.Lat,
                        longitude: order.Lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    style={[tw('w-full'), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
                >
                    {/* Displaying a Marker icon in the map only if the order has Lat and Lng values */}
                    {order.Lat && order.Lng && (
                        <Marker
                            coordinate={{
                                latitude: order.Lat,
                                longitude: order.Lng,
                            }}
                            title="Delivery Location"
                            description={order.Address}
                            identifier="destination"
                        />
                    )}
                </MapView>
            </View>
        </Card>
    )
}

export default DeliveryCard