import React from "react";
import {BeerItemType} from "./beer-reducer";
import { makeStyles } from '@material-ui/core/styles'
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
// import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 10
    },
    media: {
        width: 50,
        margin: 10
    },
    actionArea: {
        display: "flex"
    }
});

export const BeerItem = (props: {item: BeerItemType }) => {
    const classes = useStyles();

    // const redirectTo = (id: number) => {
    //     return <Redirect to={`/beer_description/${id}`}/>
    // }

    return (
        <Card className={classes.root}>
            <Box className={classes.actionArea}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    alt={props.item.name}
                    image={props.item.image_url}
                    title={props.item.name}
                />
                <CardContent >
                    <Typography variant="h5" component="h2">
                        {props.item.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        ABV: {props.item.abv}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Button size="small" color="primary" variant="outlined">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}