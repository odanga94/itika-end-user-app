import React from 'react';
import {View, Text, Image, FlatList, SafeAreaView} from 'react-native';
import {pastOrders} from '../../Data/data';
import Button from '../Button';

import styles from './styles';
const mapPoint = require('../../../assets/placeholder.png');

const PastOrder: React.FC = () => {
  return (
    <SafeAreaView style={styles.firstView}>
      <View style={styles.secondView}>
        <Text style={styles.firstText}>Past Order</Text>
      </View>
      <View style={styles.thirdView}>
        <FlatList
          data={pastOrders}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={styles.firstView}>
              <View style={styles.fourthView}>
                <View style={styles.fifthView}>
                  <Image
                    source={item.img}
                    style={styles.img}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.firstView}>
                  <Text style={styles.secondText}>{item.name}</Text>
                  <Text style={styles.thirdText}>{item.name1}</Text>
                  <View style={styles.sixthView}>
                    <Image
                      source={mapPoint}
                      style={styles.mapIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.fourthText}>{item.address}</Text>
                  </View>
                  <View style={styles.priceView}>
                    <Text style={styles.fifthText}>$224</Text>
                    <Text style={styles.sixthText}>(16 Oct 2019 11:54PM)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.seventhView}>
                {item.fooditems.map((itm, index) => {
                  return (
                    <View
                      style={
                        item.fooditems.length - 1 !== index
                          ? styles.eighthView
                          : styles.nonActiveView
                      }
                      key={itm.id}>
                      <Text style={styles.eighthText}>{itm.name}</Text>
                      <Text style={styles.seventhText}>{itm.price}</Text>
                    </View>
                  );
                })}
                <Button
                  onPress={() => console.log('pressed')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Re-order</Text>
                </Button>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PastOrder;
