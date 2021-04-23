import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

import {checkPermission} from '../../utils';
import RestaurantCard from '../../Components/RestaurantCard';
import {RootStackParamList} from '../AppNavigator';
import constant from '../../utils/constant';
import CategoriesCard from '../../Components/CategoriesCard';
import SearchLocation from '../../Components/SearchLocation';
import styles from './styles';

const locIcon = require('../../../assets/placeholder.png');
const searchIcon = require('../../../assets/search.png');
const filterIcon = require('../../../assets/filter.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Restaurants: React.FC<Props> = (props) => {
  /* const userProfile = useSelector((state: any) => state.profile);
  console.log(userProfile); */

  /* const userId = useSelector((state: any) => state.auth.userId);
  console.log('uid', userId); */

  const [address, setAddress] = useState<string>('');
  const [gpsLoc, setGpsLoc] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const permission = async () => {
      const resp: any = await checkPermission();
      if (resp) {
        setGpsLoc(resp.coords);
        setAddress(resp.resp.formatted_address);
      } else {
        setAddress('Select Address');
      }
    };
    permission();
  }, []);
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <ScrollView contentContainerStyle={styles.safeArea}>
        <View style={styles.firstView}>
          <View style={styles.secondView}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <View style={styles.eightView}>
                <Image
                  source={locIcon}
                  style={styles.firstIcon}
                  resizeMode="contain"
                />

                <Text numberOfLines={1} style={styles.firstText}>
                  {/* {address && address.length > 28
                    ? `${address.substring(0, 28 - 3)}...`
                    : address} */ address}
                </Text>
              </View>
            </TouchableOpacity>
            {/* <View style={styles.searchView}>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Search')}>
                <View style={styles.thirdView}>
                  <Image
                    source={searchIcon}
                    style={styles.secondIcon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.fourthView}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Filter')}>
                  <Image
                    source={filterIcon}
                    style={styles.thirdIcon}
                    resizeMode="contain"
                  />
                </TouchableWithoutFeedback>
              </View>
            </View> */}
          </View>
          {visible && (
            <Modal
              isVisible={visible}
              backdropOpacity={0.5}
              onBackdropPress={() => setVisible(false)}>
              <SearchLocation
                latLong={gpsLoc}
                handlePress={() => setVisible(false)}
                navigation={navigation}
              />
            </Modal>
          )}
        </View>
        <View style={styles.fifthView}>
          <RestaurantCard navigation={navigation} />
        </View>
        {/* <View style={styles.sixthView}>
          <View style={styles.seventhView}>
            <Text style={styles.secondText}>Top categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoriesCard navigation={navigation} />
          </ScrollView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurants;
