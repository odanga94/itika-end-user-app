import React, {useRef} from 'react';
import {View, SafeAreaView, StatusBar, Image, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../AppNavigator';
import constant from '../../utils/constant';
import mapStyle from '../../utils/customMap';
import config from '../../../config';
import Header from '../../Components/Header';
import styles from './styles';

const homeIcon = require('../../../assets/home-white.png');
const locIcon = require('../../../assets/mapPointer-white.png');
const resType = require('../../../assets/profile.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const TrackOrder: React.FC<Props> = (props) => {
  const {navigation} = props;
  const region = {
    latitude: 12.912,
    longitude: 77.6228,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const destLoc = {
    latitude: 12.9107,
    longitude: 77.6018,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const markers = [
    {
      titl: 'src',
      coordinate: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    },
    {
      titl: 'dest',
      coordinate: {
        latitude: destLoc.latitude,
        longitude: destLoc.longitude,
      },
    },
  ];
  const markersLength = markers.length;
  const mapRef = useRef(null);
  const {googleApiKey} = config;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.firstView}>
        <Header navigation={navigation} title="Track Order" />
      </View>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: 12.912,
            longitude: 77.6228,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.container}
          onMapReady={() =>
            mapRef.current.fitToCoordinates(
              [markers[0].coordinate, markers[1].coordinate],
              {
                edgePadding: styles.mapEdge,
                animated: false,
              },
            )
          }>
          {markers.map((marker, index) =>
            markersLength - 1 === index ? (
              <Marker key={index} coordinate={marker.coordinate}>
                <View style={styles.secondView}>
                  <Image
                    style={styles.icon}
                    source={locIcon}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ) : (
              <Marker key={index} coordinate={marker.coordinate}>
                <View style={styles.secondView}>
                  <Image
                    style={styles.icon}
                    source={homeIcon}
                    resizeMode="contain"
                  />
                </View>
              </Marker>
            ),
          )}
          <MapViewDirections
            origin={region}
            destination={destLoc}
            strokeWidth={2}
            optimizeWaypoints={true}
            strokeColor={constant.primaryColor}
            apikey={googleApiKey}
          />
        </MapView>
      </View>
      <View style={styles.thirdView}>
        <View style={styles.fourthView}>
          <Text style={styles.firstText}>Order Received</Text>
        </View>
        <View style={styles.fifthView}>
          <Text style={styles.secondText}>4 Items | $76.00</Text>
          <Text style={styles.thirdText}>16 Oct 2019 11:54 PM</Text>
        </View>
        <View style={styles.sixthView}>
          <View style={styles.seventhView}>
            <View style={styles.eighthView}>
              <Text style={styles.fourthText}>Robert Steve</Text>
              <Text style={styles.fifthText}>
                Robert is on his way to the restaurant to
              </Text>
              <Text style={styles.fifthText}>confirm your order </Text>
            </View>
            <View style={styles.thirdView}>
              <Image
                source={resType}
                style={styles.driverImg}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackOrder;
