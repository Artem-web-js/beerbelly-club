import {Dispatch} from "react";
import {beerAPI} from "./api/beer-api";

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
}

const IState: IStateType = {
    beers: [] as Array<BeerItemType>,
    pageSize: 5,
    currentPage: 1,
    loading: false,
}

export const beerReducer = (state = IState, action: ActionType) => {
    switch (action.type) {
        case "SET_BEERS":
            return {...state, beers: action.beers}
        case "SET_LOADING":
            return {...state, loading: action.loading}
        // case "FIND_BEER":
        //     return state.beers.find(i => i.id === action.id ? i : null)
        default:
            return state
    }
}

//actions
export const setBeersAC = (beers: Array<BeerItemType>) => ({type: 'SET_BEERS', beers} as const)
// export const findBeerAC = (id: number) => ({type: 'FIND_BEER', id} as const)
export const loadingAC = (loading: boolean) => ({type: 'SET_LOADING', loading} as const)

//thunks
export const fetchBeersThunk = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(loadingAC(true))
    return beerAPI.getBeer(1, 5)

        .then((res) => {
            dispatch(setBeersAC(res.data))
            dispatch(loadingAC(false))
        })
}

//ActionType
type ActionType = ReturnType<typeof setBeersAC>
| ReturnType<typeof loadingAC>
// | ReturnType<typeof findBeerAC>