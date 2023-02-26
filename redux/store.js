import {configureStore} from "@reduxjs/toolkit";
import {heroesReducer} from './heroesReducer'

const store = configureStore({reducer: {heroes: heroesReducer}})

export default store;
