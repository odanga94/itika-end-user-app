/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {View, Text, Image, StatusBar, Linking} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import constant from '../../utils/constant';
import Button from '../../Components/Button';

const updateIcon = require('../../../assets/update-app.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const UpdateApp: React.FC<Props> = (props) => {
  const {navigation} = props;

  return (
    <View style={styles.firstView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.secondView}>
        <Image
          source={updateIcon}
          style={styles.imgIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.firstText}>
        There is a new version available! Kindly update Itika App to continue.
      </Text>
      {/* <Text style={{color: '#505050', fontSize: 16, textAlign: 'center'}}>
        Reason:{' '}
        <Text style={{color: constant.highlightTextColor}}>
          {riderProfile.disApproveReason ? riderProfile.disApproveReason : ''}
        </Text>
      </Text>
      <Text style={{color: '#505050', fontSize: 16, marginTop: 10}}>
        Kindly contact Itika Admin to resolve the issue.
      </Text> */}
      <View style={styles.fifthView}>
        <Fragment>
          <Button
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.itika',
              )
            }>
            <Text style={styles.thirdText}>GO TO PLAYSTORE</Text>
            <Ionicons name="logo-google-playstore" size={25} color="#fff" />
          </Button>
        </Fragment>
      </View>
    </View>
  );
};

export default UpdateApp;
