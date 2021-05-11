/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {Image, Text, View, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import Card from '../UI/Card';
//import CustomAccordion from '../components/UI/CustomAccordion';

import ENV from '../../../config';
import constants from '../../utils/constant';
//import Spinner from '../UI/Spinner';
import styles from './styles';

const tickIcon = require('../../../assets/checked.png');

/* const dataArray = [
  {title: 'Payment Note', content: 'Lorem ipsum dolor sit amet'},
]; */

const OrderSummary = (props: any) => {
  const {orderDetails} = props;
  //console.log('det', orderDetails);

  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${orderDetails.pickUpLocation.latitude},${orderDetails.pickUpLocation.longitude}&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Clabel:%7C${orderDetails.pickUpLocation.latitude},${orderDetails.pickUpLocation.longitude}&key=${ENV.googleApiKey}`;

  const formatToSentenceCase = (text: string) =>
    text.split('')[0].toUpperCase() + text.slice(1);

  //console.log(orderDetails);
  const getReadableDate = (date: string) => {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  };

  return (
    <ScrollView
      contentContainerStyle={{width: '100%', justifyContent: 'center'}}>
      <Image source={{uri: imagePreviewUrl}} style={styles.image} />
      <View style={{...styles.infoContainer, marginTop: 5, marginBottom: -5}}>
        <View style={styles.datePriceContainer}>
          <Text style={styles.datePrice}>
            {getReadableDate(orderDetails.dateRequested)}
          </Text>
        </View>
      </View>

      <View style={styles.fourthView}>
        <View style={styles.fifthView}>
          <View style={styles.sixthView}>
            <Text style={styles.thirdText}>PICK UP ADDRESS:</Text>
            <View>
              <Text style={styles.fourthText}>
                {orderDetails.pickUpLocationAddress}
              </Text>
            </View>
          </View>
          <View style={styles.seventhView}>
            <View style={styles.eighthView}>
              <Image
                source={tickIcon}
                style={styles.tickIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.fourthView}>
        <View
          style={{...styles.fifthView, borderColor: constants.primaryColor}}>
          <View style={styles.sixthView}>
            <Text style={{...styles.thirdText, color: constants.primaryColor}}>
              DROP OFF ADDRESS
            </Text>
            <View>
              <Text style={styles.fourthText}>
                {orderDetails.dropOffLocationAddress}
              </Text>
            </View>
          </View>
          <View style={styles.seventhView}>
            <View
              style={{
                ...styles.eighthView,
                backgroundColor: constants.primaryColor,
              }}>
              <Image
                source={tickIcon}
                style={{...styles.tickIcon}}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.title}>
            Recipient Name:{' '}
            <Text
              style={{
                fontFamily: 'poppins-bold',
                color: constants.primaryColor,
              }}>
              {formatToSentenceCase(orderDetails.recipientName)}
            </Text>
          </Text>
          <Text style={styles.title}>
            Recipient Phone:{' '}
            <Text
              style={{
                fontFamily: 'poppins-bold',
                color: constants.primaryColor,
              }}>
              {formatToSentenceCase(orderDetails.recipientPhone)}
            </Text>
          </Text>
          <Text style={styles.title}>
            status:{' '}
            <Text
              style={{
                fontFamily: 'poppins-bold',
                color:
                  orderDetails.status === 'cancelled'
                    ? 'red'
                    : constants.primaryTextColor,
              }}>
              {formatToSentenceCase(orderDetails.status)}
            </Text>
          </Text>
          {
            /* orderDetails.status === 'completed' && orderDetails.amountPaid ? (
            <Text style={styles.title}>
              Amount Paid:{' '}
              <Text style={styles.price}>
                Ksh.{orderDetails.amountPaid.toFixed(2)}
              </Text>
            </Text>
          ) : null}
          {orderDetails.status === 'pending' ||
          orderDetails.status === 'in progress' ? (
            <CustomAccordion dataArray={dataArray}>
              <View style={{margin: 10}}>
                <Text style={{...DefaultStyles.bodyText, fontSize: 14}}>
                  Currently we only accept payments via M-Pesa. Once the job is
                  done, kindly pay to the till number below.
                </Text>
                <View style={styles.mpesaContainer}>
                  <Image
                    style={styles.mpesaImage}
                    source={require('../assets/mpesa-till.jpg')}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </CustomAccordion>
          ) : null *
        </View>
        {/* (orderDetails.status === 'in progress' ||
          orderDetails.status === 'completed') && (
          <Card style={{padding: 10, marginVertical: 10}}>
            {!orderDetails.proName || !orderDetails.proPhone ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Spinner />
              </View>
            ) : (
            ) 
          </Card>
        )}*/
            <View style={{marginVertical: 10}}>
              {/* <Text style={styles.title}>
            You requested for{' '}
            <Text style={{fontFamily: 'poppins-bold'}}>
              {formatToSentenceCase(orderDetails.problemType)}
            </Text>{' '}
            service.
          </Text> */}
              {/* orderDetails.problemNames && (
            <Text style={styles.description}>
              Description: {orderDetails.problemNames}
            </Text>
          ) */}
              {/*        {orderDetails.partsThatNeedWork && (
            <Text style={styles.description}>
              Fixtures that needed work: {orderDetails.partsThatNeedWork}
            </Text>
          )}
          {orderDetails.buildingType && (
            <Text style={styles.description}>
              Building Type: {orderDetails.buildingType}
            </Text>
          )}
          {orderDetails.roomsThatNeedWork && (
            <Text style={styles.description}>
              Applicable rooms: {orderDetails.roomsThatNeedWork}
            </Text>
          )}
          {orderDetails.bucketsOfClothes && (
            <Text style={styles.description}>
              Buckets Of Clothes: {orderDetails.bucketsOfClothes}
            </Text>
          )}
          {orderDetails.mealDescription && (
            <Text style={styles.description}>
              Meal Description: {orderDetails.mealDescription}
            </Text>
          )}
          {orderDetails.numberOfPeople && (
            <Text style={styles.description}>
              Number Of People: {orderDetails.numberOfPeople}
            </Text>
          )}
          {orderDetails.serviceNeeded && (
            <Text style={styles.description}>
              {orderDetails.problemType === 'events' ? 'Service(s)' : 'Pro'}{' '}
              requested: {orderDetails.serviceNeeded}
            </Text>
          )}
          {orderDetails.proGender && (
            <Text style={styles.description}>
              Preferred Gender: {orderDetails.proGender}
            </Text>
          )}
          {orderDetails.equipmentNeeded ? (
            orderDetails.problemType === 'moving' ? (
              <Text style={styles.description}>
                Equipment needed: {orderDetails.equipmentNeeded}
              </Text>
            ) : (
              <Text style={styles.description}>
                Equipment/Supplies provided by: {orderDetails.equipmentNeeded}
              </Text>
            )
          ) : null} */}
              <Text style={styles.title}>
                Package Type:{' '}
                <Text
                  style={{
                    fontFamily: 'poppins-bold',
                    color: constants.primaryTextColor,
                  }}>
                  {orderDetails.packageType}
                </Text>
              </Text>
              {orderDetails.packageDescription ? (
                <Text style={styles.title}>
                  Package Description: {orderDetails.packageDescription}
                </Text>
              ) : null}

              {orderDetails.packagePhotoUri || orderDetails.packageImage ? (
                <View style={styles.problemImageContainer}>
                  <Image
                    source={{
                      uri: orderDetails.packagePhotoUri
                        ? orderDetails.packagePhotoUri
                        : orderDetails.packageImage
                        ? orderDetails.packageImage
                        : '',
                    }}
                    style={styles.problemImage}
                  />
                </View>
              ) : null}
            </View>
            // orderDetails.status !== "cancelled" && <Text style={{ ...//styles.title, marginVertical: 15 }}>Connection Fee: <Text style={{ fontFamily: 'poppins-bold' }}>KES.{totalAmount.toFixed(2)}</Text></Text
          }
          {orderDetails.riderName ? (
            <Card
              style={{
                padding: 10,
                marginVertical: 10,
                //height: constants.styleGuide.height / 8,
              }}>
              <Fragment>
                <Text style={{...styles.title, textAlign: 'center'}}>
                  <Text style={{fontFamily: 'poppins-bold'}}>
                    Rider Details
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', flex: 2}}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: orderDetails.riderImage}}
                        style={styles.proImage}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        maxHeight: 30,
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={[
                          styles.description,
                          {
                            //textAlign: 'left',
                            fontWeight: 'bold',
                            color: 'black',
                            marginLeft: 5,
                          },
                        ]}>
                        {orderDetails.riderName}
                      </Text>
                      {orderDetails.riderRating ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            //top: 30,
                          }}>
                          <Text
                            style={[
                              styles.description,
                              {
                                //textAlign: 'left',
                                fontWeight: 'bold',
                                color: 'black',
                                marginHorizontal: 7.5,
                              },
                            ]}>
                            |
                          </Text>
                          <MaterialIcons
                            name="star"
                            size={23}
                            color={constants.primaryTextColor}
                          />
                          <Text
                            style={[
                              styles.description,
                              {
                                //textAlign: 'left',
                                fontWeight: 'bold',
                                color: 'black',
                                marginHorizontal: 7.5,
                              },
                            ]}>
                            {orderDetails.riderRating.toFixed(1)}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </Fragment>
            </Card>
          ) : null}

          <Text style={styles.title}>
            Your Phone:{' '}
            <Text
              style={{
                fontFamily: 'poppins-bold',
                color: constants.primaryTextColor,
              }}>
              {formatToSentenceCase(orderDetails.clientPhone)}
            </Text>
          </Text>
          <View
            style={{
              paddingVertical: 5,
              borderTopColor: '#ccc',
              borderBottomColor: '#ccc',
              borderTopWidth: 2,
              borderBottomWidth: 2,
              marginVertical: 10,
            }}>
            <Text style={styles.title}>
              Price:{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: constants.primaryTextColor,
                }}>
                KES. {orderDetails.estimatedPrice}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderSummary;
