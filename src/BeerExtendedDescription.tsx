import React, {useEffect} from "react";
import {BeerItemType, getBeerThunk} from "./beer-reducer";
import {makeStyles} from '@material-ui/core/styles'
import {Box, Card, CardContent, CardMedia, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./app/store";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    root: {
        maxWidth: 345,
        margin: 10
    },
    media: {
        width: 50,
        margin: 10,
        alignSelf: "flex-start"
    },
    actionArea: {
        display: "flex"
    }
});

export const BeerExtendedDescription = () => {
    const classes = useStyles();

    const item = useSelector<AppRootStateType, BeerItemType>(state => state.beer.currentBeer)
    debugger
    const dispatch = useDispatch()

    let {id} = useParams<{ id?: string }>()

    useEffect(() => {
        dispatch(getBeerThunk(Number(id)))
    }, [dispatch, id])

    return (
        <div className={classes.wrapper}>
            <Card className={classes.root}>
                <Box className={classes.actionArea}>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        alt={item.name}
                        image={item.image_url}
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
                            {/*Food pairing: {item.food_pairing.map(i => <p style={{margin:"3px 0"}}>{"- " + i}</p>)}*/}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>

    );
}