import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import styles from './styles';
import {resDetails} from '../../Data/data';
import {RootStackParamList} from '../../Screens/AppNavigator';
import CardDetails from '../CardDetails';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const RestaurantCard: React.FC<Props> = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.firstView}>
      <Text style={styles.firstText}>Restaurants near me</Text>
      <FlatList
        data={resDetails}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CardDetails details={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
export default RestaurantCard;
