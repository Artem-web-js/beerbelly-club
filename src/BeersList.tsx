import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react";
import {BeerItemType, fetchBeersThunk} from "./beer-reducer";
import {AppRootStateType} from "./app/store";
import {BeerItem} from "./BeerItem";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexWrap: "wrap"
    }
});

export const BeersList = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)

    useEffect(() => {
        dispatch(fetchBeersThunk())
    }, [dispatch])

    return (
        <div className={classes.wrapper}>
            {beers.map(i => <div key={i.id}>
                <BeerItem item={i}/>
            </div>)}
        </div>
    )
}