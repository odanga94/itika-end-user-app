import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../../Screens/TabNavigation';
import {RootStackParamList} from '../../Screens/AppNavigator';
import {fetchPrediction} from '../../utils';
import styles from './styles';

const searchIcon = require('../../../assets/search.png');
const locIcon = require('../../../assets/placeholder.png');
const locateIcon = require('../../../assets/focus.png');

interface Props {
  handlePress: () => void;
  latLong: any;
  navigation: StackNavigationProp<HomeStackParamList>;
}

const SearchLocation: React.FC<Props> = (props) => {
  const [predictionArray, setPredictionArray] = useState<any>();
  const onChangeText = async (val: string) => {
    const predictResp = await fetchPrediction(val, props);
    setPredictionArray(predictResp);
  };
  const {handlePress, navigation} = props;
  return (
    <View style={styles.firstView}>
      <View style={styles.secondView}>
        <View style={styles.fifthView}>
          <View style={styles.thirdView}>
            <View style={styles.fourthView}>
              <Image
                source={searchIcon}
                style={styles.firstIcon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Search for your Location"
              selectionColor="#959ab1"
              autoCorrect={false}
              style={styles.textInput}
              onChangeText={(text) => onChangeText(text)}
            />
          </View>
        </View>
        {predictionArray ? (
          <View style={styles.sixthView}>
            <FlatList
              data={predictionArray.predictions}
              extraData={predictionArray.predictions}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View style={styles.seventhView}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      handlePress();
                      navigation.navigate('SaveAddress', {
                        address: item.description,
                      });
                    }}>
                    <Text style={styles.firstText}>{item.description}</Text>
                  </TouchableWithoutFeedback>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.eightView}>
            <TouchableWithoutFeedback onPress={() => handlePress()}>
              <View style={styles.ninthView}>
                <Image
                  source={locateIcon}
                  style={styles.locateIcon}
                  resizeMode="contain"
                />
                <Text style={styles.secondText}>Current Location</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.tenthView}>
              <Text style={styles.thirdText}>Saved Address</Text>
              <TouchableWithoutFeedback onPress={() => handlePress()}>
                <View style={styles.twelvethView}>
                  <Image
                    source={locIcon}
                    style={styles.secondIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.fourthText}>Westlands, Nairobi.</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchLocation;
