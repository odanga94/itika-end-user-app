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
import firebase from 'firebase/app';
//import 'firebase/auth';
import {Root} from 'native-base';

import Stack from './src/Screens';
import authReducer from './src/store/reducers/user/auth';
import profileReducer from './src/store/reducers/user/profile';
import ordersReducer from './src/store/reducers/orders';
import currentJobReducer from './src/store/reducers/currentJob';

export const firebaseConfig = {
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
// }

export const firebaseAppAuth = firebaseApp.auth();
export const firebaseAppDatabase = firebaseApp.database();
export const firebaseAppStorage = firebaseApp.storage();

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  orders: ordersReducer,
  currentJob: currentJobReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

declare const global: {HermesInternal: null | {}};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
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
