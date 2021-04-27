import {useDispatch, useSelector} from "react-redux"
import React, {useEffect, useState} from "react";
import {BeerItemType, BeersFilterType, fetchBeersThunk, sortBeersByValue} from "./beer-reducer";
import {AppRootStateType} from "../../app/store";
import {BeerItem} from "./BeerItem/BeerItem";
import styles from "./BeersList.module.css"
import {
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Typography
} from "@material-ui/core";
import {Radio} from "@material-ui/core";

export const BeersList = () => {

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const foodName = useSelector<AppRootStateType, string | null>(state => state.beer.foodName)
    const sortValue = useSelector<AppRootStateType, BeersFilterType>(state => state.beer.sortBeers)

    useEffect(() => {
        dispatch(fetchBeersThunk(currentPage, foodName))
    }, [dispatch, currentPage, foodName])

    let [value, setValue] = useState<BeersFilterType>(sortValue)

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value as BeersFilterType)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(sortBeersByValue(value))
    }

    let beersList = beers

    if (sortValue === "strong") {
        beersList.sort((a, b) => a.abv < b.abv ? 1 : -1)
    } else if (sortValue === "light") {
        beersList.sort((a, b) => a.abv > b.abv ? 1 : -1)
    } else if (sortValue === "az") {
        beersList.sort((a, b) => a.name > b.name ? 1 : -1)
    } else if (sortValue === "za") {
        beersList.sort((a, b) => a.name < b.name ? 1 : -1)
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.filtersWrapper}>
                    <Typography variant={"h4"}>Filters</Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <RadioGroup name="filter" value={value} onChange={handleRadioChange}>

                                <FormControlLabel value="no filters" control={<Radio/>} label="No filters"/>
                                <FormLabel component="legend">Alcohol by Volume</FormLabel>
                                <FormControlLabel value="strong" control={<Radio/>} label="Strong First"/>
                                <FormControlLabel value="light" control={<Radio/>} label="Light First"/>

                                <FormLabel component="legend">Alcohol by Name</FormLabel>
                                <FormControlLabel value="az" control={<Radio/>} label="A - Z"/>
                                <FormControlLabel value="za" control={<Radio/>} label="Z - A"/>

                            </RadioGroup>
                            <Button type={"submit"} color={"secondary"} variant={"outlined"}>Set filters</Button>
                        </FormControl>
                    </form>
                </div>
                <div className={styles.block}>
                    {beersList.map(i => <div key={i.id}>
                        <BeerItem item={i}/>
                    </div>)}
                </div>
            </div>
        </>

    )
}