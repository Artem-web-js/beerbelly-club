import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react";
import {BeerItemType, fetchBeersThunk} from "./beer-reducer";
import {AppRootStateType} from "../../app/store";
import {BeerItem} from "./BeerItem/BeerItem";
import styles from "./BeersList.module.css"
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography} from "@material-ui/core";

export const BeersList = () => {

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const foodName = useSelector<AppRootStateType, string | null>(state => state.beer.foodName)

    useEffect(() => {
        dispatch(fetchBeersThunk(currentPage, foodName))
    }, [dispatch, currentPage, foodName])

    // let sortBeers = () => {
    //     return console.log(beers.sort((a, b) => a.abv > b.abv ? 1 : -1))
    // }

    const [state, setState] = React.useState({
        jason: false,
        antoine: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { jason, antoine } = state;

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.filtersWrapper}>
                    <Typography variant={"h4"}>Filters</Typography>
                    <FormControl component="fieldset" className={styles.formControl}>
                        <FormLabel component="legend">Alcohol by Volume</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                                label="from less to more"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                label="from more to less"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={styles.formControl}>
                        <FormLabel component="legend">Sort by Name</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                                label="A - Z"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                                label="Z - A"
                            />
                        </FormGroup>
                    </FormControl>
                    <Button color={"secondary"} variant={"outlined"}>Set filters</Button>
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