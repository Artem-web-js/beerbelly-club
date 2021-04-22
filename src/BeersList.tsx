import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react";
import {BeerItemType, fetchBeersThunk} from "./beer-reducer";
import {AppRootStateType} from "./app/store";
import {BeerItem} from "./BeerItem";

export const BeersList = () => {

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)

    useEffect(() => {
        dispatch(fetchBeersThunk())
    }, [dispatch])

    return (
        <div>
            {beers.map(i => <div key={i.id}>
                <BeerItem item={i}/>
            </div>)}
        </div>
    )
}