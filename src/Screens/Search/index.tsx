import React from 'react';
import {
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import styles from './styles';
import constant from '../../utils/constant';

const backIcon = require('../../../assets/back.png');
const searchIcon = require('../../../assets/search.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Search: React.FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.view}>
        <View style={styles.firstView}>
          <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
            <Image source={backIcon} style={styles.icon} resizeMode="contain" />
          </TouchableWithoutFeedback>
          <View style={styles.secondView}>
            <Image
              source={searchIcon}
              style={styles.secondIcon}
              resizeMode="contain"
            />
            <TextInput
              placeholder="Search"
              selectionColor={constant.secondaryTextColor}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.fourthView} />
      </View>
    </SafeAreaView>
  );
};
export default Search;
