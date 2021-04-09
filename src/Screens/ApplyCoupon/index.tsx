import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import constant from '../../utils/constant';
import {RootStackParamList} from '../AppNavigator';
import Button from '../../Components/Button';
import styles from './styles';
import {couponsCode} from '../../Data/data';

const backIcon = require('../../../assets/back.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const ApplyCoupon: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.flatListView}>
          <View style={styles.seventhView}>
            <FlatList
              data={couponsCode}
              ListHeaderComponent={
                <View style={styles.firstView}>
                  <View style={styles.secondView}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.goBack()}>
                      <View style={styles.thirdView}>
                        <Image
                          source={backIcon}
                          style={styles.backIcon}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.fourthView}>
                      <Text style={styles.firstText}>Apply Coupon</Text>
                    </View>
                  </View>
                  <View style={styles.fifthView}>
                    <View style={styles.sixthView}>
                      <TextInput
                        placeholder="Enter Coupon Code"
                        placeholderTextColor={constant.secondaryTextColor}
                        style={styles.textInput}
                        selectionColor={constant.secondaryTextColor}
                      />
                    </View>
                    <View>
                      <View style={styles.buttonView}>
                        <Button
                          style={styles.button}
                          onPress={() => navigation.goBack()}>
                          <Text style={styles.buttonText}>Apply</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              }
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.eighthView}>
                  <Text style={styles.secondText}>{item.card}</Text>
                  <Text style={styles.thirdText}>{item.offer1}</Text>
                  <Text style={styles.fourthText}>{item.offer2}</Text>
                  <View style={styles.ninthView}>
                    <Text>{item.code}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ApplyCoupon;
