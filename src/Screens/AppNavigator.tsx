import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Splash';
import Verify from './Verify';
import Login from './Login';
import OtpVerify from './OtpVerify';
import SignUp from './SignUp';
import TabNavigation from './TabNavigation';
import Filter from './Filter';
import SaveAddress from './SaveAddress';
import Search from './Search';
import RestaurantList from './RestaurantList';
import MenuList from './MenuList';
import Cart from './Cart';
import ApplyCoupon from './ApplyCoupon';
import CheckOut from './CheckOut';
import DoneOrder from './DoneOrder';
import Orders from './Orders';
import ManageAddress from './ManageAddress';
import ManageAddressEdit from './ManageAddressEdit';
import PaymentOptions from './PaymentOptions';
import TrackOrder from './TrackOrder';
import AddCard from './AddCard';
import LogOut from './LogOut';

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
  Cart: object;
  ApplyCoupon: undefined;
  CheckOut: undefined;
  DoneOrder: undefined;
  RestaurantList: undefined;
  Orders: undefined;
  ManageAddress: undefined;
  ManageAddressEdit: undefined;
  PaymentOptions: undefined;
  TrackOrder: undefined;
  AddCard: undefined;
  LogOut: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const OrderStack = () => {
  return (
    <RootStack.Navigator headerMode={'none'}>
      <RootStack.Screen name="Orders" component={Orders} />
      <RootStack.Screen name="TrackOrder" component={TrackOrder} />
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
    <RootStack.Navigator initialRouteName="Splash" headerMode={'none'}>
      <RootStack.Screen name="Splash" component={Splash} />
      <RootStack.Screen name="Verify" component={Verify} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="OtpVerify" component={OtpVerify} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="Tabs" component={TabNavigation} />
      <RootStack.Screen name="Filter" component={Filter} />
      <RootStack.Screen name="SaveAddress" component={SaveAddress} />
      <RootStack.Screen name="Search" component={Search} />
      <RootStack.Screen name="MenuList" component={MenuList} />
      <RootStack.Screen name="Cart" component={Cart} />
      <RootStack.Screen name="ApplyCoupon" component={ApplyCoupon} />
      <RootStack.Screen name="CheckOut" component={CheckOut} />
      <RootStack.Screen name="DoneOrder" component={DoneOrder} />
      <RootStack.Screen name="RestaurantList" component={RestaurantList} />
      <RootStack.Screen name="Orders" component={OrderStack} />
      <RootStack.Screen name="ManageAddress" component={AddressStack} />
      <RootStack.Screen name="PaymentOptions" component={PaymentStack} />
      <RootStack.Screen name="LogOut" component={LogOut} />
    </RootStack.Navigator>
  );
};

export default AppStack;
