import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {BeersList} from '../features/BeersList/BeersList';
import styles from './App.module.css';
import {LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {NavLink, Route, Switch} from 'react-router-dom';
import {BeerExtendedDescription} from '../features/BeersList/BeerExtendedDescription/BeerExtendedDescription';
import {hideTabsAndPaginationAC,} from '../features/BeersList/beer-reducer';

function App() {

    const loading = useSelector<AppRootStateType, boolean>(state => state.beer.loading)

    const dispatch = useDispatch()

    return (
        <div className={styles.App}>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" onClick={() => dispatch(hideTabsAndPaginationAC(false))}>
                        <NavLink to={"/"} className={styles.navLink}>BeerClub</NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>

            <LinearProgress style={{visibility: loading ? "visible" : "hidden"}} color="secondary"/>

            <Switch>
                <Route exact path={'/'} render={() => <BeersList/>}/>
                <Route path={'/desc/:id?'} render={() => <BeerExtendedDescription/>}/>
            </Switch>
        </div>
    );
}

export default App;
