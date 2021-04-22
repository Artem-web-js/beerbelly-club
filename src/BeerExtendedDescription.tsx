import React from "react";
import {BeerItemType} from "./beer-reducer";
import { makeStyles } from '@material-ui/core/styles'
import {Box, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
// import { useParams } from "react-router-dom";

const useStyles = makeStyles({
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

export const BeerExtendedDescription = (props: {item: BeerItemType}) => {
    const classes = useStyles();
    // let {id} = useParams<{id?: string}>()
    // let item: BeerItemType

    // item = props.beers.find(i => i.id === id ? i : null)

    return (
        <div>
            <Card className={classes.root}>
                <Box className={classes.actionArea}>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        alt={props.item.name}
                        image={props.item.image_url}
                        title={props.item.name}
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {props.item.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Tagline: {props.item.tagline}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            ABV: {props.item.abv}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Description: {props.item.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Food pairing: {props.item.food_pairing.map(i => <p style={{margin:"3px 0"}}>{"- " + i}</p>)}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </div>

    );
}