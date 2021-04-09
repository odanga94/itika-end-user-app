import React from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import {RootStackParamList} from '../../Screens/AppNavigator';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  title: string;
}

const Header: React.FC<Props> = (props) => {
  const {navigation, title} = props;
  return (
    <View style={styles.firstView}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={styles.secondView}>
          <Image
            source={backIcon}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.thirdView}>
        <Text style={styles.firstText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
