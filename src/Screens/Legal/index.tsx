/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import constant from '../../utils/constant';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Legal: React.FC<Props> = (props) => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <ScrollView>
        <View style={{backgroundColor: '#f5f5f5'}}>
          <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => {
              Linking.openURL(
                'https://drive.google.com/file/d/1FuSf8AS7qgniDApdRSzuehHoyO5v6rRM/view?usp=sharing',
              );
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.firstText}>Privacy Policy</Text>
              <Feather
                size={30}
                color={constant.primaryTextColor}
                name="external-link"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#f5f5f5'}}>
          <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => {
              Linking.openURL(
                'https://drive.google.com/file/d/1gqXMafAuQTT_6FgaKJQhooRlScEb4ENq/view?usp=sharing',
              );
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.firstText}>Terms and Conditions</Text>
              <Feather
                size={30}
                color={constant.primaryTextColor}
                name="external-link"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Legal;
