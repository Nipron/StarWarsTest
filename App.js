import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

import MainScreen from "./screens/MainScreen";
import store from './redux/store'

export default function App() {
    return (
        <View style={s.container}>
            <Provider store={store}>
                <MainScreen/>
            </Provider>
        </View>

    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});
