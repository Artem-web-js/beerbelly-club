import React from "react";
import {BeerItemType, /*hideTabsAndPaginationAC*/} from "../beer-reducer";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import styles from "./BeerItem.module.css";
// import {useDispatch} from "react-redux";
import noImagePhoto from "../../../assets/unnamed.png"

export const BeerItem = (props: { item: BeerItemType }) => {

    // const dispatch = useDispatch()

    // const hideTabsHandler = () => {
    //     dispatch(hideTabsAndPaginationAC(true))
    // }

    return (
        <Card className={styles.wrapper}>
            <Box className={styles.actionArea}>
                <CardMedia
                    component="img"
                    className={styles.image}
                    alt={props.item.name}
                    image={props.item.image_url ? props.item.image_url : noImagePhoto}
                    title={props.item.name}
                />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.item.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        ABV: {props.item.abv}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <NavLink to={`/desc/${props.item.id}`} className={styles.navLink}>
                        <Button size="small" color="primary" variant="outlined">
                            Learn More
                        </Button>
                </NavLink>
            </CardActions>
        </Card>
    );
}