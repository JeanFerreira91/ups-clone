import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';

const useOrders = () => {
    // Hook to get the customer orders from the GraphQL DB using Apollo Client
    const { data, loading, error } = useQuery(GET_ORDERS);
    // Hook to hold the state of the customer orders
    const [orders, setOrders] = useState<Order[]>([]);

    // Using useEffect to set the state of the customer orders
    useEffect(() => {
        // If there is no data, return
        if (!data) return;
        // If there is data, create a new orders object of type Order
        const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
            carrier: value.carrier,
            createdAt: value.createdAt,
            shippingCost: value.shippingCost,
            trackingId: value.trackingId,
            trackingItems: value.trackingItems,
            Address: value.Address,
            City: value.City,
            Lat: value.Lat,
            Lng: value.Lng,
        }));
        // Setting the state of the customer orders
        setOrders(orders);
    }, [data]);

    return { orders, loading, error };
};

export default useOrders;