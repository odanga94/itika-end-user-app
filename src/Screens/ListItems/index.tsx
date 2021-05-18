/* eslint-disable react-native/no-inline-styles */
import React, {useReducer, useEffect, useCallback} from 'react';
import {Text, ScrollView, View} from 'react-native';
import {ListItem, Left, Right} from 'native-base';
//mport {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import {HomeStackParamList} from '../TabNavigation';
import Button from '../../Components/Button';
import constants from '../../utils/constant';
//import {IoniconHeaderButton} from '../components/UI/HeaderButton';
import styles from './styles';

const ITEMS_UPDATE = 'ITEMS_UPDATE';
const ITEMS_UPDATE_ONE_SELECTABLE = 'ITEMS_UPDATE_ONE_SELECTABLE';

const itemsReducer = (state: any, action: any) => {
  if (action.type === ITEMS_UPDATE) {
    const updatedItem = {
      ...state[action.key],
      selected: action.value,
    };
    return {
      ...state,
      [action.key]: updatedItem,
    };
  } else if (action.type === ITEMS_UPDATE_ONE_SELECTABLE) {
    const updatedState: any = {};
    for (let key in state) {
      if (key == action.key) {
        updatedState[key] = {
          ...state[key],
          selected: action.value,
        };
        //console.log('updated');
      } else {
        updatedState[key] = {
          ...state[key],
          selected: false,
        };
      }
    }
    return updatedState;
  }
  return state;
};

interface Props {
  navigation: StackNavigationProp<HomeStackParamList>;
  route: any;
}

const ListItemsScreen: React.FC<Props> = (props) => {
  const {navigation, route} = props;

  const items = route.params.items;
  const alreadySelectedItems = route.params.alreadySelected;
  const type = route.params.type;
  const manySelectable = route.params.manySelectable;

  //console.log(route.params);

  let initialItemsState: any = {};
  items.forEach((item: any, index: number) => {
    initialItemsState[index] = {
      name: item,
      selected: false,
    };
  });
  const [itemsState, dispatchItemsState] = useReducer(
    itemsReducer,
    initialItemsState,
  );

  useEffect(() => {
    //console.log('as', alreadySelectedItems, itemsState);
    if (
      alreadySelectedItems &&
      Object.keys(alreadySelectedItems).length !== 0
    ) {
      Object.keys(alreadySelectedItems).forEach((key) => {
        dispatchItemsState({
          type: ITEMS_UPDATE,
          key,
          value: true,
        });
      });
    }
  }, [alreadySelectedItems]);

  const submitHandler = useCallback(() => {
    const selectedItems: any = {};
    for (let item in itemsState) {
      if (itemsState[item].selected) {
        selectedItems[item] = {...itemsState[item]};
      }
    }
    //console.log(selectedItems, type);
    navigation.navigate('OrderDetails', {selectedItems, type});
  }, [itemsState, navigation, type]);

  /* useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]); */

  //console.log(itemsState, manySelectable);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {items.map((item: any, index: number) => (
          <ListItem
            key={index}
            onPress={() => {
              if (!manySelectable) {
                dispatchItemsState({
                  type: ITEMS_UPDATE_ONE_SELECTABLE,
                  key: index,
                  value: !itemsState[index].selected,
                });
                return;
              }
              dispatchItemsState({
                type: ITEMS_UPDATE,
                key: index,
                value: !itemsState[index].selected,
              });
            }}>
            <Left>
              {itemsState[index].selected ? (
                <Text
                  style={{
                    ...styles.secondText,
                    fontWeight: 'normal',
                    color: constants.primaryTextColor,
                  }}>
                  {item}
                </Text>
              ) : (
                <Text style={{...styles.secondText, fontWeight: 'normal'}}>
                  {item}
                </Text>
              )}
            </Left>
            {itemsState[index].selected && (
              <Right>
                <Ionicons
                  name="ios-checkmark"
                  size={23}
                  color={constants.primaryTextColor}
                />
              </Right>
            )}
          </ListItem>
        ))}
      </ScrollView>
      <View style={{marginVertical: 10, backgroundColor: '#f3f3f3'}}>
        <Button style={styles.button} onPress={() => submitHandler()}>
          <Text style={styles.thirdText}>Save Item</Text>
        </Button>
      </View>
    </View>
  );
};

export const listItemsScreenOptions = (navData: any) => {
  const headerTitle = navData.route.params.title;

  return {
    headerTitle: headerTitle,
  };
};

export default ListItemsScreen;
