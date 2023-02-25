import { StyleSheet, Text, View } from 'react-native';

import {Provider} from 'react-redux';

import reducers from './redux/store';
import {createStore, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import MainScreen from "./screens/MainScreen";

import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk))
//const store = configureStore({reducer: reducers})

export default function App() {
  return (
      <View style={{flex: 1}}>
          <Provider store={store}>

          <MainScreen/>
          </Provider>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
