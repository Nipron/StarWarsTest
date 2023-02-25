import React, {useEffect, useState, useCallback} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {
    StyleSheet,
    SafeAreaView,
    Alert,
    Text,
    Image,
    View,
    Animated,
    TouchableOpacity,
    ImageBackground, TouchableWithoutFeedback, Keyboard, Modal, KeyboardAvoidingView, Linking, ScrollView, TextInput
} from 'react-native'
import {setPageThunk} from "../redux/heroesReducer";
import HeroLine from "../components/HeroLine";


const MainScreen = () => {

    const dispatch = useDispatch()

    const heroes = useSelector(state => state.heroes)


    useEffect(() => {
        if (!heroes.currentPage) {
            dispatch(setPageThunk("https://swapi.dev/api/people/?page=1"))
        }
    }, [heroes])

    useEffect(() => {
        return () => {
            if (heroes.currentPage) {
               // console.log("FF FF ", heroes.currentPage)
              //  console.log("FF FF ", heroes.currentPage.previous)
              //  console.log("FF FF ", heroes.currentPage.count)
            }
        };
    }, [heroes.favorites]);


    if (heroes.favorites) {
        console.log("FF FF2 ", Object.values(heroes.favorites))
    }

    const handlePrev = () => {
        if (heroes?.currentPage?.previous) {
            dispatch(setPageThunk(heroes.currentPage.previous))
        }
    }

    const handleNext = () => {
        if (heroes?.currentPage?.next) {
            dispatch(setPageThunk(heroes.currentPage.next))
        }
    }

    return (

        <View style={s.outer}>
            <Text>MALE: {Object.values(heroes.favorites).reduce((acc, curr) => acc + (curr === "male" ? 1 : 0),
                0)}</Text>
            <Text>FEMALE: {Object.values(heroes.favorites).reduce((acc, curr) => acc + (curr === "female" ? 1 : 0),
                0)}</Text>
            <Text>EPdTA</Text>
            {heroes?.currentPage?.results.map((hero, index) =>
                <HeroLine hero={hero} key={index}/>)

            }
            <TouchableOpacity onPress={handlePrev}>
                <Text>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>

    )
}

export default MainScreen

const s = StyleSheet.create({

    outer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "pink",
        paddingHorizontal: 15,
        paddingBottom: 10
    },

})
