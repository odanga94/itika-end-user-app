import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import {RootStackParamList} from '../AppNavigator';
import constant from '../../utils/constant';

const {widthRatio} = constant.styleGuide;

const tickIcon = require('../../../assets/checked.png');
interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

interface cuisines {
  id: string;
  name: string;
}

const Filter: React.FC<Props> = (props) => {
  const [cuisines] = useState<Array<cuisines>>([
    {id: '1', name: 'American'},
    {id: '2', name: 'Turkish'},
    {id: '3', name: 'Asia'},
    {id: '4', name: 'Fast Food'},
    {id: '5', name: 'Pizza'},
    {id: '6', name: 'Desserts'},
    {id: '7', name: 'Mexican'},
  ]);
  const [sort] = useState<Array<cuisines>>([
    {id: '1', name: 'Top Rated'},
    {id: '2', name: 'Nearest Me'},
    {id: '3', name: 'Cost High to Low'},
    {id: '4', name: 'Cost Low to High'},
  ]);
  const [filter] = useState<Array<cuisines>>([
    {id: '1', name: 'Open Now'},
    {id: '2', name: 'Credits Cards'},
    {id: '3', name: 'Free Delivery'},
  ]);
  const [selecCuisines, setSelectedCuisines] = useState<cuisines>();
  const [priceRange, setPriceRange] = useState<any>([20, 1000]);
  const [ratefilter, setRateFilter] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.firstView}>
        <View style={styles.secondView}>
          <Text style={styles.commonText}>Reset</Text>
          <Text style={styles.commonText}>Filters</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('RestaurantList')}>
            <Text style={styles.doneTewxt}>Done</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.thirdView}>
          <Text style={styles.firstText}>CUISINES</Text>
          <View style={styles.fourthView}>
            <FlatList
              data={cuisines}
              keyExtractor={(item) => item.id}
              numColumns={4}
              scrollEnabled={false}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => setSelectedCuisines(item)}>
                  <View
                    style={
                      selecCuisines && selecCuisines.id === item.id
                        ? styles.activeView
                        : styles.fifthView
                    }>
                    <Text
                      style={
                        selecCuisines && selecCuisines.id === item.id
                          ? styles.activeText
                          : styles.secondText
                      }>
                      {item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        </View>
        <View style={styles.seventhView}>
          <Text style={styles.firstText}>SORT BY</Text>
          <View style={styles.sortView}>
            <FlatList
              data={sort}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({item}) =>
                ratefilter !== item.id ? (
                  <TouchableWithoutFeedback
                    onPress={() => setRateFilter(item.id)}>
                    <View style={styles.eightView}>
                      <Text style={styles.thirdText}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback onPress={() => setRateFilter('')}>
                    <View style={styles.eightView}>
                      <Text style={styles.activeThirdText}>{item.name}</Text>
                      <Image
                        source={tickIcon}
                        style={styles.tickIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
            />
          </View>
        </View>
        <View style={styles.ninthView}>
          <Text style={styles.fourthText}>FILTER</Text>
          <View style={styles.sortView}>
            <FlatList
              data={filter}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({item}) =>
                deliveryFilter !== item.id ? (
                  <TouchableWithoutFeedback
                    onPress={() => setDeliveryFilter(item.id)}>
                    <View style={styles.eightView}>
                      <Text style={styles.thirdText}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback
                    onPress={() => setDeliveryFilter('')}>
                    <View style={styles.eightView}>
                      <Text style={styles.activeThirdText}>{item.name}</Text>
                      <Image
                        source={tickIcon}
                        style={styles.tickIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )
              }
            />
          </View>
        </View>
        <View style={styles.sixthView}>
          <Text style={styles.fourthText}>Price</Text>
          <View style={styles.tenthView}>
            <Text style={styles.priceText}>
              {' '}
              ${priceRange && priceRange[0]}
            </Text>
            <Text style={styles.priceText}>
              {' '}
              ${priceRange && priceRange[1]}
            </Text>
          </View>
          <MultiSlider
            min={20}
            max={1000}
            step={50}
            sliderLength={300 * widthRatio}
            values={[20, 1000]}
            onValuesChange={(values) => setPriceRange(values)}
            allowOverlap
            snapped
            markerStyle={styles.marker}
            containerStyle={styles.container}
            selectedStyle={styles.select}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Filter;
