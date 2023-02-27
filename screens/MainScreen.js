import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as ScreenOrientation from 'expo-screen-orientation';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import {killAllFavoritesThunk, setPageNumberThunk, setPageThunk} from "../redux/heroesReducer";
import HeroLine from "../components/HeroLine";

const MainScreen = () => {

    const dispatch = useDispatch()
    const heroes = useSelector(state => state.heroes)
    const [blocked, setBlocked] = useState(false)

    useEffect(() => {
        const lockScreenOrientation = async () => await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        lockScreenOrientation()
        if (!heroes.currentPage) {
            dispatch(setPageThunk("https://swapi.dev/api/people/?page=1"))
        }
        if (!heroes.currentPageNumber) {
            dispatch(setPageNumberThunk(1))
        }
    }, [])

    useEffect(() => {
        setBlocked(false)
    }, [heroes.currentPage]);

    const handlePrev = () => {
        setBlocked(true)
        if (heroes?.currentPage?.previous) {
            dispatch(setPageThunk(heroes.currentPage.previous))
            dispatch(setPageNumberThunk(heroes.currentPageNumber - 1))
        }
    }

    const handleNext = () => {
        setBlocked(true)
        if (heroes?.currentPage?.next) {
            dispatch(setPageThunk(heroes.currentPage.next))
            dispatch(setPageNumberThunk(heroes.currentPageNumber + 1))
        }
    }

    return (<ImageBackground style={s.outer} source={require("../assets/background.jpg")}>
            <View style={s.header}>
                <View style={s.headerRow}>
                    <Text style={s.rebelsText}>My rebels:</Text>
                    <TouchableOpacity style={s.buttonRed} onPress={() => dispatch(killAllFavoritesThunk())}>
                        <Text style={s.killAllText}>KILL ALL</Text>
                    </TouchableOpacity>
                </View>
                <View style={s.headerRow}>
                    <View style={s.genderBlock}>
                        <Text style={s.genderText}>Male:</Text>
                        <Text style={s.amountText}>
                            {Object.values(heroes.favorites).reduce((acc, curr) => acc + (curr === "male" ? 1 : 0), 0)}
                        </Text>
                    </View>
                    <View style={s.genderBlock}>
                        <Text style={s.genderText}>Female:</Text>
                        <Text style={s.amountText}>
                            {Object.values(heroes.favorites).reduce((acc, curr) => acc + (curr === "female" ? 1 : 0), 0)}
                        </Text>
                    </View>
                    <View style={s.genderBlock}>
                        <Text style={s.genderText}>N/A:</Text>
                        <Text style={s.amountText}>
                            {Object.values(heroes.favorites).reduce((acc, curr) => acc + ((curr !== "male" && curr !== "female") ? 1 : 0), 0)}
                        </Text>
                    </View>
                </View>
            </View>

            {heroes?.currentPage?.results &&
                <FlatList data={heroes.currentPage.results}
                          style={s.flatList}
                          renderItem={({item}) => <HeroLine hero={item}/>}
                          keyExtractor={(item) => item.name}
                />}

            <View style={s.footer}>
                <TouchableOpacity style={[s.buttonWhite, (blocked || !heroes?.currentPage?.previous) && {backgroundColor: "#333333"}]} onPress={handlePrev}
                                  disabled={blocked || !heroes?.currentPage?.previous}>
                    <Text style={[s.buttonText, (blocked || !heroes?.currentPage?.previous) && {color: "#777777"}]}>Prev</Text>
                </TouchableOpacity>
                <Text style={s.pageText}>
                    {`${heroes?.currentPageNumber
                        ? ((heroes.currentPageNumber - 1) * 10 + 1)
                        : "0"}-${(heroes?.currentPageNumber && heroes?.currentPage?.count)
                        ? (heroes.currentPageNumber * 10 <= heroes.currentPage.count
                                ? heroes.currentPageNumber * 10
                                : heroes.currentPage.count
                        )
                        : "0"} of ${heroes?.currentPage?.count || "0"}`}</Text>
                <TouchableOpacity style={[s.buttonWhite, (blocked || !heroes?.currentPage?.next) && {backgroundColor: "#333333"}]} onPress={handleNext}
                                  disabled={blocked || !heroes?.currentPage?.next}>
                    <Text style={[s.buttonText, (blocked || !heroes?.currentPage?.next) && {color: "#777777"}]}>Next</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default MainScreen

const s = StyleSheet.create({

    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
    },

    pageText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 40
    },

    buttonWhite: {
        height: 30,
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: "white",
        justifyContent: "center",
    },

    amountText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },

    genderText: {
        fontSize: 14,
        color: "white"
    },

    buttonRed: {
        height: 24,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "crimson",
        justifyContent: "center",
    },

    killAllText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },

    rebelsText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },

    flatList: {
        width: "100%",
    },

    genderBlock: {
        width: '20%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5
    },

    header: {
        width: '100%',
        paddingTop: 40,
    },

    footer: {
        width: '100%',
        marginBottom: 30,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },

    outer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingBottom: 10,
    }

})
