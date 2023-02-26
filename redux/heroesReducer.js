import {getHeroes} from "../APIs/heroesAPIs";

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_CURRENT_PAGE_NUMBER = "SET_CURRENT_PAGE_NUMBER";
const ADD_FAVORITE = "ADD_FAVORITE";
const REMOVE_FAVORITE = "REMOVE_FAVORITE";
const KILL_ALL_FAVORITES = "KILL_ALL_FAVORITES";

let userInitialState = {
    currentPage: null,
    currentPageNumber: null,
    favorites: {}
};

//Action creators
const setPage = page => ({type: SET_CURRENT_PAGE, payload: page})
const setPageNumber = pageNumber => ({type: SET_CURRENT_PAGE_NUMBER, payload: pageNumber})
const addFavorite = (name, gender) => ({type: ADD_FAVORITE, payload: {name, gender}})
const removeFavorite = name => ({type: REMOVE_FAVORITE, payload: name})
const killAllFavorites = () => ({type: KILL_ALL_FAVORITES})

//Thunk creators
export const setPageThunk = url => async dispatch => {
    const currentPage = await getHeroes(url)
    dispatch(setPage(currentPage))
}

export const setPageNumberThunk = pageNumber => dispatch => {
    dispatch(setPageNumber(pageNumber))
}

export const addFavoriteThunk = (name, gender) => dispatch => {
    dispatch(addFavorite(name, gender))
}

export const removeFavoriteThunk = name => dispatch => {
    dispatch(removeFavorite(name))
}

export const killAllFavoritesThunk = () => dispatch => {
    dispatch(killAllFavorites())
}

export const heroesReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            state = {...state, currentPage: action.payload}
            return state;
        case SET_CURRENT_PAGE_NUMBER:
            state = {...state, currentPageNumber: action.payload}
            return state;
        case ADD_FAVORITE:
            state = {...state, favorites: {...state.favorites, [action.payload.name]: action.payload.gender}}
            return state;
        case REMOVE_FAVORITE:
            state = {
                ...state, favorites: Object.keys(state.favorites).filter(key =>
                    key !== action.payload).reduce((obj, key) => {
                        obj[key] = state.favorites[key];
                        return obj;
                    }, {}
                )
            }
            return state;
        case KILL_ALL_FAVORITES:
            state = {...state, favorites: {}}
            return state;
        default:
            return state;
    }
}


