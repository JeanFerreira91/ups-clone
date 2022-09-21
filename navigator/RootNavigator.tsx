import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ModalScreen from '../screens/ModalScreen';
import OrderScreen from '../screens/OrderScreen';

export type RootStackParamList = {
    Main: undefined;
    MyModal: { userId: string; name: string }
    Order: { order: Order }
}

// Variable to hold the Root of the Stack Navigator
const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      {/* Stack Group for the Tab Navigator */}
      <RootStack.Group>
        <RootStack.Screen
          name="Main"
          component={TabNavigator}
        />
      </RootStack.Group>
      {/* Stack Group for the Modal Screen */}
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <RootStack.Screen
          options={{ headerShown: false }}
          name="MyModal"
          component={ModalScreen}
        />
      </RootStack.Group>
      {/* Stack Group for the Order Screen */}
      <RootStack.Group>
        <RootStack.Screen
          name='Order'
          component={OrderScreen}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default RootNavigator