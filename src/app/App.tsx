import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {BeersList} from '../features/BeersList/BeersList';
import styles from './App.module.css';
import {Button, LinearProgress, Paper, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {NavLink, Route, Switch} from 'react-router-dom';
import {BeerExtendedDescription} from '../features/BeersList/BeerExtendedDescription/BeerExtendedDescription';
import {
    decrementPageAC, disableButton,
    fetchBeersThunk, hideTabsAndPaginationAC,
    incrementPageAC
} from '../features/BeersList/beer-reducer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function App() {

    const loading = useSelector<AppRootStateType, boolean>(state => state.beer.loading)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const prevDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.previousButton)
    const nextDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.nextButton)
    const hideTabsAndPagination = useSelector<AppRootStateType, boolean>(state => state.beer.hideTabsAndPagination)

    const dispatch = useDispatch()

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const chooseBear = (foodName: string | null) => {
        dispatch(fetchBeersThunk(1, foodName))
        dispatch(disableButton(true))
    }

    const nextPage = () => {
        dispatch(incrementPageAC(currentPage))
    }

    const previousPage = () => {
        dispatch(decrementPageAC(currentPage))
    }

    return (
        <div className={styles.App}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" onClick={() => dispatch(hideTabsAndPaginationAC(false))}>
                        <NavLink to={"/"} className={styles.navLink}>BeerClub</NavLink>
                    </Typography>
                </Toolbar>
                {loading && <LinearProgress color="secondary"/>}
            </AppBar>

            {
                !hideTabsAndPagination
                    ? <>
                        <Paper square className={styles.tabsWrapper}>
                            <Tabs
                                value={value}
                                indicatorColor="secondary"
                                textColor="secondary"
                                onChange={handleChange}
                                aria-label="disabled tabs example"
                            >
                                <Tab label="All Bear" onClick={() => chooseBear(null)}/>
                                <Tab label="Tasty with Pizza" onClick={() => chooseBear("pizza")}/>
                                <Tab label="Tasty with Steak" onClick={() => chooseBear("steak")}/>
                            </Tabs>
                        </Paper>
                        <div className={styles.buttons}>
                            <Button onClick={previousPage} color="primary" variant="text"
                                    disabled={prevDisabled}>Previous</Button>
                            <Typography variant="h5"
                                        className={styles.pageNumber}>
                                {currentPage}
                            </Typography>
                            <Button onClick={nextPage}
                                    color="primary"
                                    variant="text"
                                    disabled={nextDisabled}>Next</Button>
                        </div>
                    </>
                    : <Paper square className={styles.backButtonWrapper}>
                        <NavLink to={"/"} className={styles.backNavLink}>
                            <Button size="large"
                                    color={"primary"}
                                    onClick={() => dispatch(hideTabsAndPaginationAC(false))}
                                    startIcon={<ChevronLeftIcon/>}>Back</Button>
                        </NavLink>
                    </Paper>
            }

            <Switch>
                <Route exact path={'/'} render={() => <BeersList/>}/>
                <Route path={'/desc/:id?'} render={() => <BeerExtendedDescription/>}/>
            </Switch>
        </div>
    );
}

export default App;
