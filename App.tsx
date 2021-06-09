/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Root} from 'native-base';
import messaging from '@react-native-firebase/messaging';

import Stack from './src/Screens';
import authReducer from './src/store/reducers/user/auth';
import supportReducer from './src/store/reducers/support';
import profileReducer from './src/store/reducers/user/profile';
import ordersReducer from './src/store/reducers/orders';
import currentJobReducer from './src/store/reducers/currentJob';
import locationReducer from './src/store/reducers/location';
import appSettingsReducer from './src/store/reducers/app-settings';

/* export const firebaseConfig = {
  apiKey: 'AIzaSyA7pNSJGB6fqJ5Y8OngV0kav42wAkp_i3g',
  authDomain: 'itika-6fe70.firebaseapp.com',
  projectId: 'itika-6fe70',
  storageBucket: 'itika-6fe70.appspot.com',
  messagingSenderId: '201382863145',
  appId: '1:201382863145:web:594ebc242dbb552e101738',
  measurementId: 'G-3L52RB385V',
  databaseURL: 'https://itika-6fe70-default-rtdb.firebaseio.com/',
};

// if(!firebase.apps.length){
const firebaseApp = firebase.initializeApp(firebaseConfig);
// } */

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  orders: ordersReducer,
  currentJob: currentJobReducer,
  location: locationReducer,
  support: supportReducer,
  appSettings: appSettingsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

declare const global: {HermesInternal: null | {}};

const App = () => {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        //console.log('Authorization status:', authStatus);
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          if (remoteMessage.data) {
            //const orderId = JSON.parse(remoteMessage.data.orderId);
            if (remoteMessage.data.messageText) {
              const senderId = JSON.parse(remoteMessage.data.senderId);
              const messageText = JSON.parse(remoteMessage.data.messageText);
              console.log(
                `The user "${senderId}" wrote a new chat message "${messageText}" whiile app is in the background."`,
              );
              return;
            } else if (remoteMessage.data.newStatus) {
              const orderId = JSON.parse(remoteMessage.data.orderId);
              const newStatus = JSON.parse(remoteMessage.data.newStatus);
              console.log(
                `The order "${orderId}" has been updated: "${newStatus}"`,
              );
              return;
            }
          }
        });
      }
    }

    SplashScreen.hide();
    requestUserPermission();
  }, []);

  return (
    <Provider store={store}>
      <Root>
        <SafeAreaProvider>
          <Stack />
        </SafeAreaProvider>
      </Root>
    </Provider>
  );
};

export default App;
