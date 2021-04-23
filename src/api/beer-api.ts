import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.punkapi.com/v2/"
})

export const beerAPI = {
    getBeers(currentPage: number, pageSize: number) {
        return instance.get(`beers?page=${currentPage}&per_page=${pageSize}`)
    },
    getBeer(id: number) {
        return instance.get(`beers/${id}`)
    }
}