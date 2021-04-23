import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {StackNavigationProp} from '@react-navigation/stack';
import Geolocation from '@react-native-community/geolocation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {RootStackParamList} from '../AppNavigator';
import mapStyle from '../../utils/customMap';
import Button from '../../Components/Button';
import constant from '../../utils/constant';
import styles from './styles';

const searchIcon = require('../../../assets/search.png');
const locIcon = require('../../../assets/placeholder.png');
const workIcon = require('../../../assets/briefcase.png');
const homeIcon = require('../../../assets/home.png');
const backIcon = require('../../../assets/back.png');
const locateIcon = require('../../../assets/focus.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const ManageAddressEdit: React.FC<Props> = (props) => {
  const [active, setActive] = useState<string>('');
  const [gpsLoc, setGpsLoc] = useState<any>(null);
  const {navigation} = props;
  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (info: any) => {
        const {latitude, longitude} = info.coords;
        const region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setGpsLoc(region);
      },
      (err) => console.log(err),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1800000},
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        contentContainerStyle={styles.container}
        scrollEnabled={true}>
        <View style={styles.mapView}>
          {gpsLoc && (
            <View style={styles.mapView}>
              <MapView
                initialRegion={gpsLoc}
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                style={styles.map}>
                <Marker coordinate={gpsLoc}>
                  <Image
                    style={styles.locIcon}
                    source={locIcon}
                    resizeMode="contain"
                  />
                </Marker>
              </MapView>
              <View style={styles.backView}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                  <Image
                    source={backIcon}
                    style={styles.backIcon}
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.secondView}>
            <View style={styles.thirdView}>
              <Image
                source={searchIcon}
                style={styles.firstIcon}
                resizeMode="contain"
              />
            </View>
            <TextInput
              placeholder="Search for area, street name.."
              selectionColor={constant.lightText}
              autoCorrect={false}
              style={styles.textInput}
            />
            <TouchableWithoutFeedback>
              <View style={styles.locateView}>
                <Image
                  source={locateIcon}
                  style={styles.locateIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.fourthView}>
            <TextInput
              placeholder="House / Flat / Block No "
              selectionColor={constant.lightText}
              autoCorrect={false}
              style={styles.secondTextInput}
            />
          </View>
          <View style={styles.fifthView}>
            <TextInput
              placeholder="LankMark"
              selectionColor={constant.lightText}
              autoCorrect={false}
              style={styles.thirdTextInput}
            />
          </View>
          <View style={styles.sixthView}>
            <TouchableWithoutFeedback onPress={() => setActive('Home')}>
              <View
                style={[
                  active === 'Home'
                    ? styles.activeSeventhView
                    : styles.seventhView,
                ]}>
                <Image
                  source={homeIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.commonText}>Home</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setActive('Work')}>
              <View
                style={[
                  active === 'Work' ? styles.activeView : styles.eighthView,
                ]}>
                <Image
                  source={workIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.firstText}>Work</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setActive('Other')}>
              <View
                style={[
                  active === 'Other' ? styles.activeView : styles.eighthView,
                ]}>
                <Image
                  source={locIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.commonText}>Other</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Button
            style={styles.button}
            onPress={() =>
              Alert.alert('Pressed', 'Work in progress!', [{text: 'Okay'}])
            }>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ManageAddressEdit;
