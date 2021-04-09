import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import Button from '../../Components/Button';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const LogOut: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstView}>
        <Text style={styles.firstText}>Are you sure you want to logout? </Text>
      </View>
      <Button
        style={styles.button}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Splash'}],
          })
        }>
        <Text style={styles.secondText}>Confirm</Text>
      </Button>
      <Button style={styles.secondButton} onPress={() => navigation.goBack()}>
        <Text style={styles.thirdText}>Cancel</Text>
      </Button>
    </SafeAreaView>
  );
};

export default LogOut;
