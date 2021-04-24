import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react";
import {BeerItemType, fetchBeersThunk} from "./beer-reducer";
import {AppRootStateType} from "../../app/store";
import {BeerItem} from "./BeerItem/BeerItem";
import styles from "./BeersList.module.css"

export const BeersList = () => {

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const foodName = useSelector<AppRootStateType, string | null>(state => state.beer.foodName)

    useEffect(() => {
        dispatch(fetchBeersThunk(currentPage, foodName))
    }, [dispatch, currentPage, foodName])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    {beers.map(i => <div key={i.id}>
                        <BeerItem item={i}/>
                    </div>)}
                </div>
            </div>
        </>

    )
}