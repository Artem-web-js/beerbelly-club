import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import { BeersList } from '../BeersList';
import './App.css';
import {IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import { Route, Switch } from 'react-router-dom';
// import {BeerExtendedDescription} from "../BeerExtendedDescription";
// import {BeerItemType} from "../beer-reducer";

function App() {

    let loading = useSelector<AppRootStateType, boolean>(state => state.beer.loading)
    // const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        BeerClub
                    </Typography>
                </Toolbar>
                {loading && <LinearProgress color="secondary"/>}
            </AppBar>
            <Switch>
                <Route path={'/'} render={() => <BeersList/>}/>
                {/*<Route path={'/beer_description/:id?'} render={() => <BeerExtendedDescription beers={beers}/>}/>*/}
            </Switch>
        </div>
    );
}

export default App;
