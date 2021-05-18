import * as React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from './Splash';
import Verify from './Verify';
import Login from './Register';
import OtpVerify from './OtpVerify';
import SignUp from './SignUp';
import TabNavigation from './TabNavigation';
import Filter from './Filter';
import Search from './Search';
import RestaurantList from './RestaurantList';
import MenuList from './MenuList';
import Cart from './Cart';
import ApplyCoupon from './ApplyCoupon';
import ChatHistory from './ChatHistory';
import AddChatRoom from './AddChatRoom';
import ManageAddress from './ManageAddress';
import ManageAddressEdit from './ManageAddressEdit';
import Legal from './Legal';
import PaymentOptions from './PaymentOptions';
import AddCard from './AddCard';
import LogOut from './LogOut';
import Auth from './Auth';
import ResetPassword from './ResetPassword';
import constant from '../utils/constant';

export type RootStackParamList = {
  Splash: undefined;
  Verify: undefined;
  Login: undefined;
  OtpVerify: undefined;
  SignUp: undefined;
  Tabs: undefined;
  Search: undefined;
  Filter: undefined;
  SaveAddress: object;
  MenuList: undefined;
  //Cart: object;
  ApplyCoupon: undefined;
  RestaurantList: undefined;
  Chats: undefined;
  ChatHistory: undefined;
  AddChatRoom: object;
  ManageAddress: undefined;
  ManageAddressEdit: undefined;
  Legal: undefined;
  PaymentOptions: undefined;
  AddCard: undefined;
  LogOut: undefined;
  Auth: undefined;
  ResetPassword: undefined;
  Cart: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

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

const ChatsStack = () => {
  return (
    <RootStack.Navigator screenOptions={defaultNavOptions}>
      <RootStack.Screen
        name="ChatHistory"
        component={ChatHistory}
        options={{headerTitleAlign: 'center', title: 'Chats'}}
      />
      <RootStack.Screen name="AddChatRoom" component={AddChatRoom} />
    </RootStack.Navigator>
  );
};

const AddressStack = () => {
  return (
    <RootStack.Navigator headerMode={'none'}>
      <RootStack.Screen name="ManageAddress" component={ManageAddress} />
      <RootStack.Screen
        name="ManageAddressEdit"
        component={ManageAddressEdit}
      />
    </RootStack.Navigator>
  );
};
const PaymentStack = () => {
  return (
    <RootStack.Navigator headerMode={'none'}>
      <RootStack.Screen name="PaymentOptions" component={PaymentOptions} />
      <RootStack.Screen name="AddCard" component={AddCard} />
    </RootStack.Navigator>
  );
};

const AppStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      headerMode={'screen'}
      screenOptions={defaultNavOptions}>
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="OtpVerify"
        component={OtpVerify}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Auth"
        component={Auth}
        options={{
          title: 'Sign In',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: 'Reset Password',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <RootStack.Screen
        name="Tabs"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      />
      {/*      <RootStack.Screen
        name="SaveAddress"
        component={SaveAddress}
        options={{headerShown: false}}
      /> */}
      <RootStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MenuList"
        component={MenuList}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ApplyCoupon"
        component={ApplyCoupon}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="RestaurantList"
        component={RestaurantList}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Chats"
        component={ChatsStack}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ManageAddress"
        component={AddressStack}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PaymentOptions"
        component={PaymentStack}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Cart"
        component={Cart}
        //options={{headerShown: false}}
      />
      <RootStack.Screen name="Legal" component={Legal} />
      <RootStack.Screen
        name="LogOut"
        component={LogOut}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default AppStack;
