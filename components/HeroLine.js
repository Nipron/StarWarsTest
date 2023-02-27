import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios'
import {addFavoriteThunk, removeFavoriteThunk} from "../redux/heroesReducer";

import HeartEmpty from "../assets/HeartEmpty.svg"
import HeartFull from "../assets/HeartFull.svg"

const HeroLine = ({hero}) => {

    const dispatch = useDispatch()
    const heroes = useSelector(state => state.heroes)

    const [isOpen, setIsOpen] = useState(false)
    const [homeWorld, setHomeWorld] = useState(null)
    const [species, setSpecies] = useState(null)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const homeWorld = await axios.get(hero.homeworld)
                setHomeWorld(homeWorld.data.name)
            } catch (e) {
                setHomeWorld("")
            }
            try {
                let speciesArray = []
                for (let i = 0; i < hero.species.length; i++) {
                    const getSpecies = async () => {
                        const species = await axios.get(hero.species[i])
                        speciesArray.push(species.data.name)
                    }
                    await getSpecies()
                }
                setSpecies(speciesArray)
            } catch (e) {
                setSpecies([""])
            }
        }
        if (isOpen) {
            getInfo()
        }
    }, [isOpen])

    const isFavorite = !!heroes?.favorites?.[hero.name]

    const handleLike = () => {
        if (isFavorite) {
            dispatch(removeFavoriteThunk(hero.name))
        } else {
            dispatch(addFavoriteThunk(hero.name, hero.gender))
        }
    }

    return (<TouchableOpacity onPress={() => setIsOpen(!isOpen)}
                              style={[s.outer, isOpen && {backgroundColor: "rgba(255, 255, 255, 0.15)"}]}>
        <View style={s.headerRow}>
            <TouchableOpacity style={s.heartBox} onPress={handleLike}>
                {isFavorite ? <HeartFull/> : <HeartEmpty/>}
            </TouchableOpacity>
            <Text style={[s.nameText, isFavorite && {color: "#FCC200", fontSize: 28}]}>{hero.name}</Text>
        </View>
        {isOpen &&
            <View style={s.infoBlock}>
                <View style={s.infoRow}>
                    <Text style={s.parameterText}>Birth year: </Text>
                    <Text style={s.valueText}> {hero.birth_year}</Text>
                </View>
                <View style={s.infoRow}>
                    <Text style={s.parameterText}>Gender: </Text>
                    <Text style={s.valueText}> {hero.gender}</Text>
                </View>
                <View style={s.infoRow}>
                    <Text style={s.parameterText}>Home world: </Text>
                    <Text style={s.valueText}> {homeWorld}</Text>
                </View>
                <View style={s.infoRow}>
                    <Text style={s.parameterText}>Species: </Text>
                    <Text style={s.valueText}>
                        {species?.map((item, index) => <Text key={index}> {item} </Text>)}
                    </Text>
                </View>
            </View>
        }
    </TouchableOpacity>)
}


export default HeroLine

const s = StyleSheet.create({

    valueText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },

    parameterText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ADADAD"
    },

    infoRow: {
        marginVertical: 2,
        flexDirection: "row",
        alignItems: "flex-end"
    },

    infoBlock: {
        paddingLeft: 50
    },

    nameText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    },

    heartBox: {
        width: 30,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },

    headerRow: {
        height: 80,
        flexDirection: "row",
        alignItems: "center"
    },

    outer: {
        borderRadius: 10,
        marginBottom: 10
    }
})
