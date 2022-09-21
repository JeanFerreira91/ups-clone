import { gql } from "@apollo/client";

// Query to get the Customers
export const GET_CUSTOMERS = gql`
    query GetCustomers {
        getCustomers {
            value {
                email
                name
            }
            name
        }
    }
`;

// Query to get the Orders
export const GET_ORDERS = gql`
    query GetOrders {
        getOrders {
            value {
                carrier
                createdAt
                trackingId
                shippingCost
                Address
                City
                Lng
                Lat
                trackingItems {
                    customer_id
                    customer {
                        email
                        name
                    }
                    items {
                        item_id
                        name
                        price
                        quantity
                    }
                }
            }
        }
    }
`;