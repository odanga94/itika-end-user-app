/* eslint-disable react-native/no-inline-styles */
import React, {/*Fragment,*/ useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  //Alert,
  Linking,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';

import {SupportStackParamList} from '../TabNavigation';
import {MaterialHeaderButton} from '../../Components/UI/HeaderButton';
import Button from '../../Components/Button';
import Spinner from '../../Components/UI/Spinner';
import ErrorMessage from '../../Components/ErrorMessage';
import styles from './styles';
import constant from '../../utils/constant';
import {
  SET_CHAT_ID_BEING_PROCESSED,
  fetchChats,
} from '../../store/actions/support';
import Chat from '../../models/chat';

interface Props {
  navigation: StackNavigationProp<SupportStackParamList>;
}

const Support: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const chats = useSelector((state: any) => state.support.chats);
  const userId = useSelector((state: any) => state.auth.userId);

  const [error, setError] = useState('');
  const [fetchChatsLoading, setFetchChatsLoading] = useState(false);

  const handlePressed = () => {
    //Alert.alert('Pressed', 'Work in progress!', [{text: 'Okay'}]);
    navigation.navigate('SupportChatRoom', {});
  };

  const loadChats = useCallback(async () => {
    setError('');
    //console.log(chats.length)
    //if (chats.length === 0) {
    setFetchChatsLoading(true);
    //}
    try {
      await dispatch(fetchChats(userId));
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setFetchChatsLoading(false);
  }, [dispatch, userId]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  if (fetchChatsLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Spinner size={undefined} style={undefined} />
      </View>
    );
  }

  if (error) {
    return <ErrorMessage retry={loadChats} error={error} />;
  }

  if (chats.length === 0) {
    return (
      <SafeAreaView style={styles.firstView}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={constant.primaryColor}
        />
        <View style={styles.firstView}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={{...styles.firstText, left: undefined}}>
              You haven't raised any issues yet.
            </Text>
            <Button
              style={styles.button}
              onPress={() => {
                handlePressed();
              }}>
              <Text style={styles.thirdText}>Chat with Support</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.firstView}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constant.primaryColor}
      />
      <View style={styles.commonView}>
        <View style={styles.ninthView}>
          <FlatList
            onRefresh={loadChats}
            refreshing={fetchChatsLoading}
            data={chats}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item: any) => item.id}
            /* onEndReached={(info: {distanceFromEnd: number}) =>
          console.log(info, 'check end ')
        } */
            renderItem={({item}) => {
              //console.log('it', item);
              const messagesIdArr = Object.keys(item.chatDetails);
              //console.log(timeStampArr);
              const messageId = messagesIdArr[messagesIdArr.length - 2];
              //console.log('ts', chatTimeStamp);

              const messageDetails = item.chatDetails[messageId];
              //console.log(chatDetails);
              return (
                <View style={{backgroundColor: '#f5f5f5'}}>
                  <TouchableOpacity
                    style={styles.chatContainer}
                    onPress={() => {
                      dispatch({
                        type: SET_CHAT_ID_BEING_PROCESSED,
                        chatId: item.id,
                      });
                      navigation.navigate('SupportChatRoom', {});
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {messageDetails.user ? (
                        <Text style={styles.chatText}>
                          {messageDetails.user.name}
                        </Text>
                      ) : (
                        <Text style={styles.chatText}>System Message</Text>
                      )}
                      <Text>
                        {new Date(messageDetails.createdAt).toDateString()}{' '}
                        {new Date(messageDetails.createdAt).toLocaleTimeString(
                          'en-US',
                        )}
                      </Text>
                    </View>
                    <Text style={{...styles.chatText, fontWeight: 'normal'}}>
                      {messageDetails.text ? messageDetails.text : 'Photo'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const supportScreenOptions = (navData: any) => {
  //const editFn = navData.navigation.getParam('edit')
  return {
    headerTitle: 'Support',
    headerTitleAlign: 'center',
    headerRight: () => (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="Chat"
            iconName="chat-plus"
            onPress={() => {
              navData.navigation.navigate('SupportChatRoom', {});
            }}
          />
        </HeaderButtons>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="Call"
            iconName="phone-plus"
            onPress={() => {
              Linking.openURL('tel:0755694769');
            }}
          />
        </HeaderButtons>
      </View>
    ),
  };
};

export default Support;
