import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Restaurants from './Restaurant';
import Cart from './Cart';
import Favourite from './Favourite';
import Account, {accountScreenOptions} from './Account';
import FooterTab from '../Components/FooterTab';
import constant from '../utils/constant';
import EditProfile from './EditProfile';

export type AccountStackParamList = {
  MyAccount: undefined;
  EditProfile: undefined;
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

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <FooterTab {...props} />}>
      <Tab.Screen name="Home" component={Restaurants} />
      <Tab.Screen name="Support" component={Favourite} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={MyAccountStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
