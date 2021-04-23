import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import {resDetails} from '../../Data/data';
import {RootStackParamList} from '../../Screens/AppNavigator';
//import CardDetails from '../CardDetails';
import Button from '../../Components/Button';

const pkgImage = require('../../../assets/package-yellow.png');
const errandImage = require('../../../assets/errand.png');

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const RestaurantCard: React.FC<Props> = (props) => {
  const {navigation} = props;

  const handlePressed = () => {
    Alert.alert('Pressed', 'Work in progress!', [{text: 'Okay'}]);
  };

  return (
    <View style={styles.firstView}>
      <Text style={styles.firstText}>Welcome!</Text>
      <TouchableOpacity style={styles.secondView} onPress={handlePressed}>
        <Image source={pkgImage} style={styles.image} resizeMode="contain" />
        <Button
          style={styles.button}
          onPress={() => {
            handlePressed();
          }}>
          <Text style={styles.thirdText}>Send Package</Text>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondView} onPress={handlePressed}>
        <Image source={errandImage} style={styles.image} resizeMode="contain" />
        <Button
          style={styles.button}
          onPress={() => {
            handlePressed();
          }}>
          <Text style={styles.thirdText}>Request Errand</Text>
        </Button>
      </TouchableOpacity>
      {/* <FlatList
        data={resDetails}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CardDetails details={item} navigation={navigation} />
        )}
      /> */}
    </View>
  );
};
export default RestaurantCard;
