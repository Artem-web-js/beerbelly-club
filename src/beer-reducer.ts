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

export type BeersItemsType = {
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
    beers: Array<BeersItemsType>
    pageSize: number
    currentPage: number
}

const IState: IStateType = {
    beers: [] as Array<BeersItemsType>,
    pageSize: 5,
    currentPage: 1
}

export const beerReducer = (state = IState, action: any) => {
    switch (action.type) {
        case "xxx":
            return state
        case "yyy":
            return state
        default:
            throw new Error("Some things wrong!")
    }
}

