import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import { BeersList } from '../BeersList';
import './App.css';
import {IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {NavLink, Route, Switch } from 'react-router-dom';
import { BeerExtendedDescription } from '../BeerExtendedDescription';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    navLink: {
        textDecoration: "none",
        color: "white"
    }
});


function App() {
    const classes = useStyles();

    let loading = useSelector<AppRootStateType, boolean>(state => state.beer.loading)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        <NavLink to={"/"} className={classes.navLink}>BeerClub</NavLink>
                    </Typography>
                </Toolbar>
                {loading && <LinearProgress color="secondary"/>}
            </AppBar>
            <Switch>
                <Route exact path={'/'} render={() => <BeersList/>}/>
                <Route path={'/desc/:id?'} render={() => <BeerExtendedDescription />}/>
            </Switch>
        </div>
    );
}

export default App;
