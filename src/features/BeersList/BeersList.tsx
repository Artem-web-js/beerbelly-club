import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react";
import {BeerItemType, fetchBeersThunk} from "./beer-reducer";
import {AppRootStateType} from "../../app/store";
import {BeerItem} from "./BeerItem/BeerItem";
import styles from "./BeersList.module.css"
import {Typography} from "@material-ui/core";
import {FiltersForm} from "../FiltersForm/FiltersForm";
import { sortedBeerSelector } from "../../utils/sortBeers";


export const BeersList = () => {

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(sortedBeerSelector)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const foodName = useSelector<AppRootStateType, string | null>(state => state.beer.foodName)

    useEffect(() => {
        dispatch(fetchBeersThunk(currentPage, foodName))
    }, [dispatch, currentPage, foodName])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.filtersWrapper}>
                    <Typography variant={"h4"}>Filters</Typography>
                    <FiltersForm/>
                </div>
                <div className={styles.block}>
                    {beers.map(i => <div key={i.id}>
                        <BeerItem item={i}/>
                    </div>)}
                </div>
            </div>
        </>

    )
}