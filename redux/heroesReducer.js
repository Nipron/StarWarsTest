import {getHeroes} from "../APIs/heroesAPIs";

const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_FAVORITES = "SET_FAVORITES";

let userInitialState = {
    currentPage: null,
    favorites: {}
};

//Action creators
const setPage = page => ({type: SET_CURRENT_PAGE, payload: page})
const setFavorites = (name, gender, shouldLike) => ({type: SET_FAVORITES, payload: {name, gender, shouldLike}})

//Thunk creators
export const setPageThunk = url => async dispatch => {
    const currentPage = await getHeroes(url)
    dispatch(setPage(currentPage))
}

export const setFavoritesThunk = (name, gender, shouldLike) => async dispatch => {
    dispatch(setFavorites(name, gender, shouldLike))
}

export const heroesReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            state = {...state, currentPage: action.payload}
            return state;
        case SET_FAVORITES:
            if (action.payload.shouldLike) {
                state = {...state, favorites: {...state.favorites, [action.payload.name]: action.payload.gender}}
            } else {
                state = {...state, favorites: Object.keys(state.favorites).filter(key =>
                        key !== action.payload.name).reduce((obj, key) =>
                        {
                            obj[key] = state.favorites[key];
                            return obj;
                        }, {}
                    )}
            }
            return state;
        default:
            return state;
    }
}


