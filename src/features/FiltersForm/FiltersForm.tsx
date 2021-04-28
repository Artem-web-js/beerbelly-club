import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import styles from "../BeersList/BeersList.module.css";
import React from "react";
import {useFormik} from "formik";
import {BeersFilterType, sortBeersByValue} from "../BeersList/beer-reducer";
import {useDispatch} from "react-redux";

interface MyFormValues {
    filter: BeersFilterType
}

export const FiltersForm = () => {
    const dispatch = useDispatch()

    const initialValues: MyFormValues = {filter: 'no filters'};

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            dispatch(sortBeersByValue(values.filter))
        },
    });

    return <form onSubmit={formik.handleSubmit}>
        <FormControl component="fieldset" className={styles.formControl}>
            <RadioGroup name="filter" value={formik.values.filter} onChange={formik.handleChange}>

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
}