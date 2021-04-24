import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import {BeersList} from '../features/BeersList/BeersList';
import styles from './App.module.css';
import {Button, IconButton, LinearProgress, Paper, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {NavLink, Route, Switch} from 'react-router-dom';
import {BeerExtendedDescription} from '../features/BeersList/BeerExtendedDescription/BeerExtendedDescription';
import {
    decrementPageAC,
    fetchBeersThunk, hideTabsAndPaginationAC,
    incrementPageAC
} from '../features/BeersList/beer-reducer';

function App() {

    const loading = useSelector<AppRootStateType, boolean>(state => state.beer.loading)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const prevDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.previousButton)
    const nextDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.nextButton)
    const hideTabsAndPagination = useSelector<AppRootStateType, boolean>(state => state.beer.hideTabsAndPagination)
    // const currentFood = useSelector<AppRootStateType, string | null>(state => state.beer.foodName)

    const dispatch = useDispatch()

    // let [editMode, setEditMode] = useState(false)

    // const onChangePage = (e: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(incrementPageAC(+e.currentTarget.value))
    // }

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const chooseBear = (foodName: string | null) => {
        dispatch(fetchBeersThunk(1, foodName))
    }

    const nextPage = () => {
        dispatch(incrementPageAC(currentPage))
    }

    const previousPage = () => {
        dispatch(decrementPageAC(currentPage))
    }

    // const backToMain = () => {
    //     dispatch(hideTabsAndPaginationAC(false))
    //     dispatch(fetchBeersThunk(currentPage, currentFood))
    // }

    return (
        <div className={styles.App}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
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
                                {/*{editMode
                    ? <input onChange={onChangePage}
                             onBlur={() => setEditMode(false)}
                             value={currentPage}
                             type={"number"}
                        />
                    : {currentPage}}*/}
                                {currentPage}
                            </Typography>
                            <Button onClick={nextPage} color="primary" variant="text" disabled={nextDisabled}>Next</Button>
                        </div>
                    </>
                    : <Paper square className={styles.tabsWrapper}>
                        <Button size="large" onClick={() => dispatch(hideTabsAndPaginationAC(false))}>back</Button>
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
