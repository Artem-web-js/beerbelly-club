import axios from "axios";
import {BeerItemType} from "../features/BeersList/beer-reducer";

const instance = axios.create({
    baseURL: "https://api.punkapi.com/v2/"
})

export const beerAPI = {
    getBeers(foodName: string | null, currentPage: number, pageSize: number) {
        if(foodName !== null) {
            return instance.get<Array<BeerItemType>>(`beers?food=${foodName}&page=${currentPage}&per_page=${pageSize}`)
        } else {
            return instance.get<Array<BeerItemType>>(`beers?page=${currentPage}&per_page=${pageSize}`)
        }
    },
    getBeer(id: number) {
        return instance.get<Array<BeerItemType>>(`beers/${id}`)
    }
}