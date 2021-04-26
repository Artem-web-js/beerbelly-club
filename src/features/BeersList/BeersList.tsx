import {useDispatch, useSelector} from "react-redux"
import React, {useEffect, useState} from "react";
import {BeerItemType, fetchBeersThunk} from "./beer-reducer";
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

    useEffect(() => {
        debugger
        dispatch(fetchBeersThunk(currentPage, foodName))
    }, [dispatch, currentPage, foodName])

    // let sortBeers = () => {
    //     return console.log(beers.sort((a, b) => a.abv > b.abv ? 1 : -1))
    // }

    let [value, setValue] = useState('')

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (value === 'strong') {
            console.log('Add strong Alcohol')
        } else if (value === 'light') {
            console.log('Add light Alcohol')
        } else if (value === "az"){
            console.log('Alcohol A - Z')
        } else {
            console.log("Alcohol Z - A")
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.filtersWrapper}>
                    <Typography variant={"h4"}>Filters</Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl component="fieldset" className={styles.formControl}>
                            <RadioGroup name="filter" onChange={handleRadioChange}>

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
                    {beers.map(i => <div key={i.id}>
                        <BeerItem item={i}/>
                    </div>)}
                </div>
            </div>
        </>

    )
}