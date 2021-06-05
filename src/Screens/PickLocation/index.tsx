/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, Fragment} from 'react';
import {View, Text, TouchableWithoutFeedback, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
//import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import {StackNavigationProp} from '@react-navigation/stack';

//import {IonIconHeaderButton} from '../../Components/UI/HeaderButton';
import Card from '../../Components/UI/Card';
import SearchBar from '../../Components/UI/SearchBar';
import Button from '../../Components/Button';
import constants from '../../utils/constant';
import ENV from '../../../config';
import {HomeStackParamList} from '../TabNavigation';
import styles from './styles';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const PickLocationScreen: React.FC<Props> = (props) => {
  const {navigation, route} = props;

  const initialLocation = route.params.initialLocation;
  const initialAddress = route.params.userAddress;
  const isDropOff = route.params.isDropOff;

  const [selectedLocation, setSelectedLocation] = useState<any>(
    initialLocation,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedLocationAddress, setSelectedLocationAddress] = useState(
    initialAddress,
  );

  let mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : -1.2855641,
    longitude: initialLocation ? initialLocation.longitude : 36.8148359,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.1421,
  };

  //console.log('selloc', selectedLocation, 'inloc', initialLocation);

  useEffect(() => {
    if (initialAddress) {
      setLatLngOnAddressChange(initialAddress);
    }
  }, [initialAddress]);

  const setLatLngOnAddressChange = async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${ENV.googleApiKey}`,
      );
      if (!response.ok) {
        console.log(response);
        throw new Error('Something went wrong. Try again later.');
      }
      const resData = await response.json();
      //console.log('resData', resData.results[0].geometry.location);
      setSelectedLocation({
        latitude: resData.results[0].geometry.location.lat,
        longitude: resData.results[0].geometry.location.lng,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddressOnMapPressHandler = async (event: any) => {
    const location = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setSelectedLocation(location);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`,
      );
      if (!response.ok) {
        throw new Error('Unable to get your location. Try again later.');
      }
      const resData = await response.json();
      //console.log('resData', resData)
      if (!resData.results) {
        throw new Error('Something went wrong');
      }
      setSelectedLocationAddress(resData.results[0].formatted_address);
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchHandler = useCallback(async () => {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${
      ENV.googleApiKey
    }&input=${searchTerm}&location=${-1.2855641},${36.8148359}&radius=5000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      //console.log(json);
      setPredictions(json.predictions);
    } catch (err) {
      console.error(err);
    }
  }, [searchTerm]);

  const onSearchHandlerDebounced = _.debounce(onSearchHandler, 500);

  useEffect(() => {
    onSearchHandlerDebounced();
  }, [onSearchHandler]);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocationAddress || !selectedLocation) {
      Alert.alert('Please Select', "You haven't picked a location yet.", [
        {text: 'Okay'},
      ]);
      return;
    }
    if (isDropOff) {
      navigation.navigate('OrderDetails', {
        pickedDropOffLocation: selectedLocation,
        pickedDropOffAddress: selectedLocationAddress,
      });
    } else {
      navigation.navigate('OrderDetails', {
        pickedLocation: selectedLocation,
        pickedLocationAddress: selectedLocationAddress,
      });
    }
  }, [selectedLocationAddress, selectedLocation, navigation, isDropOff]);

  /* useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IonIconHeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={savePickedLocationHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [savePickedLocationHandler, navigation]); */

  let markerCoordinate: any = mapRegion;
  if (selectedLocation) {
    markerCoordinate = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
    //console.log('mcoord', markerCoordinate);
  }

  return (
    <Fragment>
      <MapView
        style={{flex: 1}}
        initialRegion={mapRegion}
        onPress={(event) => {
          fetchAddressOnMapPressHandler(event);
        }}>
        {markerCoordinate && (
          <Marker title="Picked Location" coordinate={markerCoordinate} />
        )}
      </MapView>
      <Card style={styles.searchBarCard}>
        <SearchBar
          placeholder="Search Location"
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
        {predictions
          ? predictions.map((prediction: any) => {
              return (
                <TouchableWithoutFeedback
                  key={prediction.id}
                  onPress={() => {
                    setSelectedLocationAddress(prediction.description);
                    setPredictions([]);
                    setLatLngOnAddressChange(prediction.description);
                  }}>
                  <View style={styles.suggestionContainer}>
                    <Text style={styles.suggestion}>
                      {prediction.description}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          : null}
        {selectedLocationAddress ? (
          <View style={styles.selectedLocationContainer}>
            <Entypo
              name="location-pin"
              color={constants.primaryTextColor}
              size={23}
            />
            <Text style={styles.selectedLocation}>
              {selectedLocationAddress}
            </Text>
          </View>
        ) : null}
      </Card>
      <Button style={styles.button} onPress={() => savePickedLocationHandler()}>
        <Text style={styles.thirdText}>Select Location</Text>
      </Button>
    </Fragment>
  );
};

export const pickLocationScreenOptions = (navData: any) => {
  return {
    headerTitle: 'Pick a Location',
  };
};

export default PickLocationScreen;
