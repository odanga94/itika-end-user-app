import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import Orders from './Orders';
import TrackOrder from './TrackOrder';
import PastOrderDetails, {
  pastOrderDetailsScreenOptions,
} from './PastOrderDetails';
import OrderDetails, {orderDetailsScreenOptions} from './OrderDetails';
import PickLocation, {pickLocationScreenOptions} from './PickLocation';
import OrderComplete from './OrderComplete';
import ListItems, {listItemsScreenOptions} from './ListItems';
import CheckOut from './CheckOut';
import AddChatRoom from './AddChatRoom';
import DoneOrder from './DoneOrder';
import SaveAddress from './SaveAddress';
import Cart from './Cart';
import Support, {supportScreenOptions} from './Support';
import SupportChatRoom from './SupportChatRoom';
import Account, {accountScreenOptions} from './Account';
import FooterTab from '../Components/FooterTab';
import constant from '../utils/constant';
import EditProfile from './EditProfile';

export type AccountStackParamList = {
  MyAccount: undefined;
  EditProfile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  OrderDetails: object;
  SaveAddress: object;
  PickLocation: object;
  CheckOut: object;
  DoneOrder: object;
  ListItems: object;
  TrackOrder: object;
  AddChatRoom: object;
  OrderComplete: object;
};

export type OrdersStackParamList = {
  Orders: undefined;
  PastOrderDetails: object;
  TrackOrder: undefined;
};

export type SupportStackParamList = {
  Support: undefined;
  SupportChatRoom: object;
};

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? constant.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : constant.primaryColor,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const AccountStack = createStackNavigator<AccountStackParamList>();

const MyAccountStack = () => {
  return (
    <AccountStack.Navigator screenOptions={defaultNavOptions}>
      <AccountStack.Screen
        name="MyAccount"
        component={Account}
        options={accountScreenOptions}
      />
      <AccountStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: 'Edit Profile', headerTitleAlign: 'center'}}
      />
    </AccountStack.Navigator>
  );
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const MyHomeStack = () => {
  return (
    <HomeStack.Navigator screenOptions={defaultNavOptions}>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="TrackOrder"
        component={TrackOrder}
        options={{title: 'Track Order'}}
      />
      <HomeStack.Screen
        name="AddChatRoom"
        component={AddChatRoom}
        //options={{title: 'Chat Room'}}
      />
      <HomeStack.Screen
        name="OrderComplete"
        component={OrderComplete}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={orderDetailsScreenOptions}
      />
      <HomeStack.Screen
        name="SaveAddress"
        component={SaveAddress}
        options={{title: 'Save Address'}}
      />
      <HomeStack.Screen
        name="PickLocation"
        component={PickLocation}
        options={pickLocationScreenOptions}
      />
      <HomeStack.Screen
        name="ListItems"
        component={ListItems}
        options={listItemsScreenOptions}
      />
      <HomeStack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{title: 'Check Out'}}
      />
      <HomeStack.Screen
        name="DoneOrder"
        component={DoneOrder}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const OrdersStack = createStackNavigator<OrdersStackParamList>();

const MyOrdersStack = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavOptions}>
      <OrdersStack.Screen
        name="Orders"
        component={Orders}
        options={{headerTitleAlign: 'center'}}
      />
      <OrdersStack.Screen
        options={{headerShown: false}}
        name="TrackOrder"
        component={TrackOrder}
      />
      <OrdersStack.Screen
        name="PastOrderDetails"
        component={PastOrderDetails}
        options={pastOrderDetailsScreenOptions}
      />
    </OrdersStack.Navigator>
  );
};

const SupportStack = createStackNavigator<SupportStackParamList>();

const MySupportStack = () => {
  return (
    <SupportStack.Navigator screenOptions={defaultNavOptions}>
      <SupportStack.Screen
        name="Support"
        component={Support}
        options={supportScreenOptions}
      />
      <SupportStack.Screen name="SupportChatRoom" component={SupportChatRoom} />
    </SupportStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <FooterTab {...props} />}>
      <Tab.Screen name="Home" component={MyHomeStack} />
      <Tab.Screen name="Support" component={MySupportStack} />
      <Tab.Screen name="Orders" component={MyOrdersStack} />
      <Tab.Screen name="Account" component={MyAccountStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
