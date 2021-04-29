import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react";
import {
    BeerItemType,
    decrementPageAC,
    disableNextButton,
    disablePrevButton,
    fetchBeersThunk,
    incrementPageAC
} from "./beer-reducer";
import {AppRootStateType} from "../../app/store";
import {BeerItem} from "./BeerItem/BeerItem";
import styles from "./BeersList.module.css"
import {Button, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {FiltersForm} from "../FiltersForm/FiltersForm";
import { sortedBeerSelector } from "../../utils/sortBeers";


export const BeersList = () => {

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(sortedBeerSelector)
    const foodName = useSelector<AppRootStateType, string | null>(state => state.beer.foodName)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const prevDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.previousButton)
    const nextDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.nextButton)

    useEffect(() => {
        dispatch(fetchBeersThunk(currentPage, foodName))
    }, [dispatch, currentPage, foodName])

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const chooseBear = (foodName: string | null) => {
        dispatch(fetchBeersThunk(1, foodName))
        dispatch(disablePrevButton(true))
    }

    const nextPage = () => {
        dispatch(incrementPageAC(currentPage))
        dispatch(disableNextButton(true))
    }

    const previousPage = () => {
        dispatch(decrementPageAC(currentPage))
        dispatch(disablePrevButton(true))
    }

    return (
        <>
            <Paper square className={styles.tabsWrapper}>
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="All Bear" onClick={() => chooseBear(null)}/>
                    <Tab label="Tasty with Pizza" onClick={() => chooseBear("pizza")}/>
                    <Tab label="Tasty with Steak" onClick={() => chooseBear("steak")}/>
                </Tabs>
            </Paper>
            <div className={styles.buttons}>
                <Button onClick={previousPage} color="primary" variant="text"
                        disabled={prevDisabled}>Previous</Button>
                <Typography variant="h5"
                            className={styles.pageNumber}>
                    {currentPage}
                </Typography>
                <Button onClick={nextPage}
                        color="primary"
                        variant="text"
                        disabled={nextDisabled}>Next</Button>
            </div>
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