import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './Splash';
import Verify from './Verify';
import Login from './Register';
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
import Auth from './Auth';

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
  Auth: undefined;
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
    <RootStack.Navigator initialRouteName="Splash" headerMode={'screen'}>
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
        name="Tabs"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="SaveAddress"
        component={SaveAddress}
        options={{headerShown: false}}
      />
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
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ApplyCoupon"
        component={ApplyCoupon}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="DoneOrder"
        component={DoneOrder}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="RestaurantList"
        component={RestaurantList}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Orders"
        component={OrderStack}
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
        name="LogOut"
        component={LogOut}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default AppStack;
