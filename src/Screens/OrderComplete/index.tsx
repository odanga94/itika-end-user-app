import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector /*useDispatch*/} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackParamList} from '../AppNavigator';
import {firebaseAppDatabase} from '../../../App';
import Spinner from '../../Components/UI/Spinner';
import Button from '../../Components/Button';
import constant from '../../utils/constant';
import styles from './styles';

const {heightRatio, height} = constant.styleGuide;

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const OrderComplete: React.FC<Props> = (props) => {
  const {navigation} = props;
  //const dispatch = useDispatch();

  const currentJob = useSelector((state: any) => state.currentJob);
  //console.log(currentJob);
  const currentOrder = useSelector((state: any) =>
    state.orders.orders.find(
      (order: any) =>
        order.id === currentJob.currentJobOrderId &&
        order.clientId === currentJob.currentJobClientId,
    ),
  );
  const userId = useSelector((state: any) => state.auth.userId);

  const [stars, setActiveStar] = useState([
    {id: '1', active: true},
    {id: '2', active: true},
    {id: '3', active: true},
    {id: '4', active: false},
    {id: '5', active: false},
  ]);
  const [active, setActive] = useState(3);
  const [comments, setComments] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const setRating = (ind: number) => {
    setActive(ind);
    setActiveStar(stars);
  };

  const inputChangeHandler = (value: string) => {
    setComments(value);
  };

  const submitRatingHandler = async () => {
    setSubmitLoading(true);
    try {
      let firstRating = 0;
      await firebaseAppDatabase
        .ref(`riders/${currentOrder.orderDetails.riderId}/ratings`)
        .transaction((currentData: any) => {
          const rating = {
            userId,
            rating: active + 1,
            comment: comments,
          };
          if (!currentData) {
            currentData = [rating];
            firstRating = rating.rating;
            return currentData;
          } else {
            currentData.push(rating);
            return currentData;
          }
        });
      if (firstRating) {
        await firebaseAppDatabase
          .ref(`riders/${currentOrder.orderDetails.riderId}`)
          .update({averageRating: firstRating});
      }
      await firebaseAppDatabase
        .ref(`user_profiles/${userId}/currentJobOrderId`)
        .remove();
      //navigation.setParams({fromOrderComplete: true});
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      Alert.alert('Something went wrong 😞', err.message, [{text: 'Okay'}]);
    }
    setSubmitLoading(false);
  };

  const skipHandler = async () => {
    setSubmitLoading(true);
    try {
      await firebaseAppDatabase
        .ref(`user_profiles/${userId}/currentJobOrderId`)
        .remove();
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      Alert.alert('Something went wrong 😞', err.message, [{text: 'Okay'}]);
    }
    setSubmitLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentOrder ? (
        <KeyboardAvoidingView
          keyboardVerticalOffset={height / 4}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyBoardView}>
          <View style={styles.firstView}>
            <View style={styles.secondView}>
              <Text style={styles.firstText}>Order Complete</Text>
              <Text style={styles.secondText}>
                Ksh. {currentOrder.orderDetails.amountPaid}
              </Text>
              <Text style={styles.thirdText}>Amount Paid</Text>
            </View>
            <View style={styles.thirdView}>
              <View style={styles.imgView}>
                {currentOrder.orderDetails.riderImage ? (
                  <Image
                    source={{uri: currentOrder.orderDetails.riderImage}}
                    style={styles.img}
                    resizeMode="cover"
                  />
                ) : (
                  <MaterialIcons
                    size={80 * heightRatio}
                    color="grey"
                    name="image"
                  />
                )}
              </View>
              <Text style={styles.fourthText}>
                {currentOrder.orderDetails.riderName}
              </Text>
              <FlatList
                data={stars}
                extraData={stars}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.fourthView}
                renderItem={({index}) => (
                  <TouchableWithoutFeedback onPress={() => setRating(index)}>
                    {active < index ? (
                      <Icon
                        name="star"
                        size={20}
                        color={constant.secondaryTextColor}
                      />
                    ) : (
                      <Icon
                        name="star"
                        size={20}
                        color={constant.primaryTextColor}
                      />
                    )}
                  </TouchableWithoutFeedback>
                )}
              />
              <TextInput
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={inputChangeHandler}
                value={comments}
                style={styles.textInput}
                //multiline={true}
                //numberOfLines={5}
                placeholder="Comment (optional):"
                returnKeyType="done"
              />
              {submitLoading ? (
                <Spinner size={undefined} style={undefined} />
              ) : (
                <Fragment>
                  <Button
                    style={styles.button}
                    onPress={() => submitRatingHandler()}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </Button>
                  <Button
                    style={styles.secondButton}
                    onPress={() => skipHandler()}>
                    <Text style={styles.secondButtonText}>Skip</Text>
                  </Button>
                </Fragment>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </SafeAreaView>
  );
};

export default OrderComplete;
