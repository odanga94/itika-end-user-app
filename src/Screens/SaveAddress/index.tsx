import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import {fetchCoordinatesFromAddress} from '../../utils';
import Button from '../../Components/Button';
import styles from './styles';

const pinIcon = require('../../../assets/pin-color.png');
const locIcon = require('../../../assets/placeholder.png');
const backIcon = require('../../../assets/back.png');

interface Props {
  route: any;
  navigation: StackNavigationProp<RootStackParamList>;
}

const SaveAddress: React.FC<Props> = (props) => {
  const {address} = props.route.params;
  const [coords, setCoords] = useState<any>(null);
  useEffect(() => {
    const fetchCoords = async () => {
      const resp = await fetchCoordinatesFromAddress(address);
      setCoords(resp.geometry.location);
    };
    fetchCoords();
  }, [address]);
  const region = {
    latitude: coords && coords.lat,
    longitude: coords && coords.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <View style={styles.view}>
      {coords && (
        <View style={styles.view}>
          <MapView
            initialRegion={{
              latitude: coords.lat,
              longitude: coords.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapView}>
            <Marker coordinate={region}>
              <View>
                <Image
                  style={styles.firstIcon}
                  source={pinIcon}
                  resizeMode="contain"
                />
              </View>
            </Marker>
            <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
              <Image
                source={backIcon}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          </MapView>
          <View style={styles.secondView}>
            <View style={styles.thirdView}>
              <Text style={styles.firstText}>Your delivery location</Text>
              <View style={styles.fourthView}>
                <Image
                  source={locIcon}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={1}
                  style={styles.secondText}
                  ellipsizeMode="middle">
                  {address.length > 30
                    ? `${address.substring(0, 30 - 3)}...`
                    : address}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => Alert.alert('Pressed')}>
                  <View style={styles.firstView}>
                    <Text style={styles.thirdText}>Change</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Button
                style={styles.button}
                onPress={() => props.navigation.navigate('Tabs')}>
                <Text style={styles.locationText}>Confirm location</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SaveAddress;
