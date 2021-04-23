import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import PopularFood from '../../Components/PopularFood';
import {RootStackParamList} from '../AppNavigator';
import FullMenu from '../../Components/FullMenu';
import constant from '../../utils/constant';

const searchIcon = require('../../../assets/search.png');
const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const MenuList: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggleSwitch = (val: boolean) => {
    setVisible(val);
  };
  const {navigation} = props;
  return (
    <View style={styles.view}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.view}>
        <View style={styles.firstView}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={backIcon}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
          <Text style={styles.firstText}>Kricket Brixt...</Text>
          <View style={styles.secondView}>
            <Image
              source={searchIcon}
              style={styles.imageIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.thirdView}>
          <View style={styles.fourthView}>
            <View style={styles.fifthView}>
              <Text style={styles.secondText}>Popular Items</Text>
            </View>
            <View style={styles.sixthView}>
              <Text style={styles.thirdText}>Veg</Text>
              <View style={styles.seventhView}>
                <Switch
                  trackColor={{
                    false: constant.secondaryTextColor,
                    true: constant.primaryColor,
                  }}
                  thumbColor={constant.paymentBackGround}
                  onValueChange={toggleSwitch}
                  value={visible}
                  style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                />
              </View>
            </View>
          </View>
          <View style={styles.eighthView}>
            <PopularFood />
          </View>
        </View>
      </View>
      <View style={styles.ninthView}>
        <FullMenu navigation={navigation} />
      </View>
    </View>
  );
};

export default MenuList;
