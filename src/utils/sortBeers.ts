import {AppRootStateType} from "../app/store";
import {BeerItemType} from "../features/BeersList/beer-reducer";

export const sortedBeerSelector = (state: AppRootStateType): Array<BeerItemType> => {
    const res = [...state.beer.beers]
    const sortValue = state.beer.sortBeers
    if (sortValue === "strong") {
        res.sort((a, b) => a.abv < b.abv ? 1 : -1)
    } else if (sortValue === "light") {
        res.sort((a, b) => a.abv > b.abv ? 1 : -1)
    } else if (sortValue === "az") {
        res.sort((a, b) => a.name > b.name ? 1 : -1)
    } else if (sortValue === "za") {
        res.sort((a, b) => a.name < b.name ? 1 : -1)
    }
    return res
}