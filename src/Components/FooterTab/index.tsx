import * as React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import styles from './styles';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import SupportIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

const resIcon = require('../../../assets/fork.png');
const resIconColor = require('../../../assets/fork-color.png');
const favIcon = require('../../../assets/heart1.png');
const favIconColor = require('../../../assets/heart-color.png');
const cartIcon = require('../../../assets/mine.png');
const cartIconColor = require('../../../assets/cart-color.png');
const accIcon = require('../../../assets/user.png');
const accIconColor = require('../../../assets/user-color.png');

import constant from '../../utils/constant';

interface Props {
  state: object | any;
  descriptors: any;
  navigation: any;
}

const FooterTab: React.FC<Props> = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: object | any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName;

        if (route.name === 'Home') {
          iconName = (
            <HomeIcon
              name="home"
              size={30}
              color={isFocused ? constant.primaryTextColor : '#ccc'}
            />
          );
        } else if (route.name === 'Support') {
          iconName = (
            <SupportIcon
              name="help-outline"
              size={30}
              color={isFocused ? constant.primaryTextColor : '#ccc'}
            />
          );
        } else if (route.name === 'Cart') {
          iconName = (
            <IonIcon
              name="cart-outline"
              size={30}
              color={isFocused ? constant.primaryTextColor : '#ccc'}
            />
          );
        } else if (route.name === 'Account') {
          iconName = (
            <IonIcon
              name="md-person"
              size={30}
              color={isFocused ? constant.primaryTextColor : '#ccc'}
            />
          );
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.touch}>
            {/* <Image
              source={iconName}
              style={styles.image}
              resizeMode="contain"
            /> */}
            {iconName}
            <Text style={isFocused ? styles.focusedText : styles.text}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default FooterTab;
