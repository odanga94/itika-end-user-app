/* eslint-disable react-native/no-inline-styles */
import React, {useState, Fragment} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import Button from '../../Components/Button';
import * as authActions from '../../store/actions/user/auth';
import Spinner from '../../Components/UI/Spinner';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const LogOut: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const [logOutLoading, setLogOutLoading] = useState(false);

  const logOutHandler = async () => {
    setLogOutLoading(true);
    try {
      await dispatch(authActions.logOut());
      navigation.reset({
        index: 0,
        routes: [{name: 'Splash'}],
      });
    } catch (err) {
      Alert.alert('Something went wrong', err.message, [{text: 'Okay'}]);
    }
    setLogOutLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {logOutLoading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Spinner />
        </View>
      ) : (
        <Fragment>
          <View style={styles.firstView}>
            <Text style={styles.firstText}>
              Are you sure you want to logout?{' '}
            </Text>
          </View>
          <Button style={styles.button} onPress={() => logOutHandler()}>
            <Text style={styles.secondText}>Confirm</Text>
          </Button>
          <Button
            style={styles.secondButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.thirdText}>Cancel</Text>
          </Button>
        </Fragment>
      )}
    </SafeAreaView>
  );
};

export default LogOut;
