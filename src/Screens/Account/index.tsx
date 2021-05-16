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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import * as profileActions from '../../store/actions/user/profile';
import Spinner from '../../Components/UI/Spinner';
import {MaterialHeaderButton} from '../../Components/UI/HeaderButton';
import constants from '../../utils/constant';

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
    if (userId && !userProfile.firstName) {
      fetchProfile();
    }
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
                <Spinner size={undefined} style={undefined} />
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
              <Spinner style={undefined} size={undefined} />
            </View>
          ) : (
            <Fragment>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.firstText}>
                  {`${userProfile.firstName} ${userProfile.lastName}`}
                </Text>
                {userProfile.averageRating >= 0 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      top: 30,
                    }}>
                    <Text
                      style={{
                        ...styles.firstText,
                        top: 0,
                        marginHorizontal: 7.5,
                      }}>
                      |
                    </Text>
                    <MaterialIcons
                      name="star"
                      size={23}
                      color={constants.primaryTextColor}
                    />
                    <Text style={{...styles.firstText, top: 0, left: 0}}>
                      {userProfile.averageRating.toFixed(1)}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Text style={styles.secondText}>{userProfile.email}</Text>
              <Text style={{...styles.secondText, paddingTop: 0}}>
                {userProfile.phone}
              </Text>
            </Fragment>
          )}
        </View>
      </View>
      <View style={styles.fourthView}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Cart</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Chats')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Chats</Text>
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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Legal')}>
          <View style={styles.fifthView}>
            <Text style={styles.commonText}>Legal</Text>
            <Image source={icon} style={styles.icons} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('LogOut')}>
          <View style={styles.sixthView}>
            <Text style={{...styles.thirdText, color: constants.primaryColor}}>
              Logout
            </Text>
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
