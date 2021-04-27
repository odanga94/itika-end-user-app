/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useReducer, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import * as profileActions from '../../store/actions/user/profile';
import Spinner from '../../Components/UI/Spinner';
import {MaterialHeaderButton} from '../../Components/UI/HeaderButton';

const profileIcon = require('../../../assets/profile.png');
const icon = require('../../../assets/left-arrow1.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Account: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.userId);
  const userProfile = useSelector((state: any) => state.profile);

  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const userData = await dispatch(profileActions.fetchProfile(userId));
        //console.log('data', userData);
      } catch (err) {
        Alert.alert('An error occurred!', err.message, [{text: 'Okay'}]);
      }
      setProfileLoading(false);
    };
    fetchProfile();
  }, [dispatch, userId]);

  return (
    <SafeAreaView style={styles.commonView}>
      <View style={styles.secondView}>
        <View style={styles.thirdView}>
          <View style={styles.imgView}>
            {profileLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Spinner />
              </View>
            ) : userProfile.imageUri ? (
              <Image source={{uri: userProfile.imageUri}} style={styles.img} />
            ) : (
              <Image
                source={profileIcon}
                style={styles.img}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
        <View style={styles.commonView}>
          {profileLoading ? (
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <Spinner />
            </View>
          ) : (
            <Fragment>
              <Text
                style={
                  styles.firstText
                }>{`${userProfile.firstName} ${userProfile.lastName}`}</Text>
              <Text style={styles.secondText}>{userProfile.email}</Text>
              <Text style={{...styles.secondText, paddingTop: 0}}>
                {userProfile.phone}
              </Text>
            </Fragment>
          )}
        </View>
      </View>
      <View style={styles.fourthView}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Orders')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Your Orders</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('PaymentOptions')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Payment Options</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ManageAddress')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Manage Address</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('LogOut')}>
          <View style={styles.sixthView}>
            <Text style={styles.thirdText}>Logout</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export const accountScreenOptions = (navData: any) => {
  //const editFn = navData.navigation.getParam('edit')
  return {
    headerTitle: 'My Account',
    headerTitleAlign: 'center',
    headerShown: true,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item
          title="Edit"
          iconName="account-edit"
          onPress={() => {
            navData.navigation.navigate('EditProfile');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Account;
