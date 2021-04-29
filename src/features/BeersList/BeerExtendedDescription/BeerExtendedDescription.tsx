import React, {useEffect} from "react";
import {BeerItemType, getBeerThunk} from "../beer-reducer";
import {Box, Button, Card, CardContent, CardMedia, Paper, Typography} from "@material-ui/core";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import styles from "./BeerExtendedDescription.module.css";
import noImagePhoto from "../../../assets/unnamed.png";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export const BeerExtendedDescription = () => {
    const item = useSelector<AppRootStateType, BeerItemType>(state => state.beer.currentBeer)
    const dispatch = useDispatch()

    let {id} = useParams<{ id?: string }>()

    useEffect(() => {
        dispatch(getBeerThunk(Number(id)))
    }, [dispatch, id])

    return (
        <>
            <Paper square className={styles.backButtonWrapper}>
                <NavLink to={"/"} className={styles.backNavLink}>
                    <Button size="large"
                            color={"primary"}
                            startIcon={<ChevronLeftIcon/>}>Back</Button>
                </NavLink>
            </Paper>
            <div className={styles.wrapper}>
                <Card className={styles.root}>
                    <Box className={styles.actionArea}>
                        <CardMedia
                            component="img"
                            className={styles.image}
                            alt={item.name}
                            image={item.image_url ? item.image_url : noImagePhoto}
                            title={item.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                Tagline: {item.tagline}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p">
                                ABV: {item.abv}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Description: {item.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Food pairing: {item && item.food_pairing && item.food_pairing.map(i => <p
                                style={{margin: "3px 0"}}>{"- " + i}</p>)}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </>
    );
}