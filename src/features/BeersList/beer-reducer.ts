import {Dispatch} from "react";
import {beerAPI} from "../../api/beer-api";

type BeerMaltType = {
    name: string
    amount: {
        value: number
        unit: string
    }
}
type BeerHopsType = {
    name: string
    amount: {
        value: number
        unit: string
    },
    add: string
    attribute: string
}

export type BeerItemType = {
    id: number
    name: string
    tagline: string
    first_brewed: string
    description: string
    image_url: string
    abv: number
    ibu: number
    target_fg: number
    target_og: number
    ebc: number
    srm: number
    ph: number
    attenuation_level: number
    volume: {
        value: number
        unit: string
    }
    boil_volume: {
        value: number
        unit: string
    }
    method: {
        mash_temp: [
            {
                temp: {
                    value: number
                    unit: string
                }
                duration: number
            }
        ]
        fermentation: {
            temp: {
                value: number
                unit: string
            }
        }
        "twist": null
    }
    ingredients: {
        malt: Array<BeerMaltType>
        hops: Array<BeerHopsType>,
        yeast: string
    }
    food_pairing: Array<string>
    brewers_tips: string
    contributed_by: string
}
type IStateType = {
    beers: Array<BeerItemType>
    pageSize: number
    currentPage: number
    loading: boolean
    currentBeer: BeerItemType
    previousButton: boolean
    nextButton: boolean
    foodName: string | null
    hideTabsAndPagination: boolean
}

const IState: IStateType = {
    beers: [] as Array<BeerItemType>,
    pageSize: 5,
    currentPage: 1,
    loading: false,
    currentBeer: {} as BeerItemType,
    previousButton: true,
    nextButton: false,
    foodName: null,
    hideTabsAndPagination: false
}

export const beerReducer = (state = IState, action: ActionType) => {
    switch (action.type) {
        case "SET_BEERS":
            if (action.beers.length < 15) {
                return {
                    ...state,
                    beers: action.beers,
                    foodName: action.foodName,
                    currentPage: action.page,
                    nextButton: true
                }
            } else {
                return {
                    ...state,
                    beers: action.beers,
                    foodName: action.foodName,
                    currentPage: action.page,
                    nextButton: false
                }
            }
        case "SET_LOADING":
            return {...state, loading: action.loading}
        case "CURRENT_BEER":
            return {...state, currentBeer: action.currentBeer}
        case "INCREMENT":
            return {...state, currentPage: action.page + 1, previousButton: false}
        case "DECREMENT":
            if (action.page === 2) return {...state, currentPage: 1, previousButton: true}
            return {...state, currentPage: action.page - 1}
        case "HIDE_TABS_AND_PAGINATION":
            return {...state, hideTabsAndPagination: action.value}
        case "DISABLE_PREV_BUTTON":
            if (state.currentPage === 1) return {...state, currentPage: 1, previousButton: true}
            return {...state, previousButton: action.value}
        case "DISABLE_NEXT_BUTTON":
            if (state.beers.length < 15) return {...state, nextButton: true}
            return {...state, nextButton: action.value}
        default:
            return state
    }
}

//actions
export const setBeersAC = (beers: Array<BeerItemType>, foodName: string | null, page: number) => ({
    type: 'SET_BEERS',
    beers,
    foodName,
    page
} as const)
export const findBeerAC = (currentBeer: BeerItemType) => ({type: 'CURRENT_BEER', currentBeer} as const)
export const loadingAC = (loading: boolean) => ({type: 'SET_LOADING', loading} as const)
export const incrementPageAC = (page: number) => ({type: 'INCREMENT', page} as const)
export const decrementPageAC = (page: number) => ({type: 'DECREMENT', page} as const)
export const hideTabsAndPaginationAC = (value: boolean) => ({type: 'HIDE_TABS_AND_PAGINATION', value} as const)
export const disableNextButton = (value: boolean) => ({type: 'DISABLE_NEXT_BUTTON', value} as const)
export const disablePrevButton = (value: boolean) => ({type: 'DISABLE_PREV_BUTTON', value} as const)

//thunks
export const fetchBeersThunk = (page: number, foodName: string | null) => (dispatch: Dispatch<ActionType>) => {
    dispatch(loadingAC(true))
    return beerAPI.getBeers(foodName, page, 15)
        .then((res) => {
            dispatch(setBeersAC(res.data, foodName, page))
            dispatch(disableNextButton(false))
            dispatch(disablePrevButton(false))
            dispatch(loadingAC(false))
        })
}

export const getBeerThunk = (beerId: number) => (dispatch: Dispatch<ActionType>) => {
    dispatch(loadingAC(true))
    return beerAPI.getBeer(beerId)
        .then((res) => {
            dispatch(findBeerAC(res.data[0]))
            dispatch(loadingAC(false))
        })
}

//ActionType
type ActionType = ReturnType<typeof setBeersAC>
    | ReturnType<typeof loadingAC>
    | ReturnType<typeof findBeerAC>
    | ReturnType<typeof incrementPageAC>
    | ReturnType<typeof decrementPageAC>
    | ReturnType<typeof hideTabsAndPaginationAC>
    | ReturnType<typeof disablePrevButton>
    | ReturnType<typeof disableNextButton>