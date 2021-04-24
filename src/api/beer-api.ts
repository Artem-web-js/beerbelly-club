import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.punkapi.com/v2/"
})

export const beerAPI = {
    getBeers(foodName: string | null, currentPage: number, pageSize: number) {
        if(foodName !== null) {
            return instance.get(`beers?food=${foodName}&page=${currentPage}&per_page=${pageSize}`)
        } else {
            return instance.get(`beers?page=${currentPage}&per_page=${pageSize}`)
        }
    },
    getBeer(id: number) {
        return instance.get(`beers/${id}`)
    }
}