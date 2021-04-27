import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import constant from '../../utils/constant';

export const IonIconHeaderButton = (props: any) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={IonIcon}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : constant.primaryColor}
    />
  );
};

export const MaterialHeaderButton = (props: any) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialCommunityIcons}
      iconSize={27}
      color={Platform.OS === 'android' ? 'white' : constant.primaryColor}
    />
  );
};
