import React from 'react'
import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {setFavoritesThunk} from "../redux/heroesReducer";

const HeroLine = ({hero}) => {

    const dispatch = useDispatch()

    const heroes = useSelector(state => state.heroes)

    //console.log(kk)


    const favorite = !!heroes?.favorites?.[hero.name]

    if (favorite) {
       // console.log(favorite)
    }

   if (heroes.favorites) {
       // console.log(heroes.favorites)
        //console.log(hero.gender)
    }

    const handleHero = () => {
        dispatch(setFavoritesThunk(hero.name, hero.gender, !favorite))
    }

    return (<TouchableOpacity onPress={handleHero} style={[{backgroundColor: "grey"}, favorite && {backgroundColor: "green"}]}>
        <Text>{hero.name}</Text>

    </TouchableOpacity>)
}


export default HeroLine

const s = StyleSheet.create({




})
