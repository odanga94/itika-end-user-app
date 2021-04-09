import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Restaurants from './Restaurant';
import Cart from './Cart';
import Favourite from './Favourite';
import Account from './Account';
import FooterTab from '../Components/FooterTab';

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <FooterTab {...props} />}>
      <Tab.Screen name="Restaurants" component={Restaurants} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
