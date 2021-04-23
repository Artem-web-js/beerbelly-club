import {useDispatch, useSelector} from "react-redux"
import React, {useEffect} from "react";
import {BeerItemType, decrementPageAC, fetchBeersThunk, incrementPageAC} from "./beer-reducer";
import {AppRootStateType} from "./app/store";
import {BeerItem} from "./BeerItem";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexWrap: "wrap"
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px 0"
    },
    pageNumber: {
        margin: "0 10px"

    }
});

export const BeersList = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const beers = useSelector<AppRootStateType, Array<BeerItemType>>(state => state.beer.beers)
    const currentPage = useSelector<AppRootStateType, number>(state => state.beer.currentPage)
    const prevDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.previousButton)
    const nextDisabled = useSelector<AppRootStateType, boolean>(state => state.beer.nextButton)

    // let [editMode, setEditMode] = useState(false)

    useEffect(() => {
        dispatch(fetchBeersThunk(currentPage))
    }, [dispatch, currentPage])

    const nextPage = () => {
        dispatch(incrementPageAC(currentPage))
    }

    const previousPage = () => {
        dispatch(decrementPageAC(currentPage))
    }

    // const onChangePage = (e: ChangeEvent<HTMLInputElement>) => {
    //     dispatch(incrementPageAC(+e.currentTarget.value))
    // }

    return (
        <>
            <div className={classes.buttons}>
                <Button onClick={previousPage} color="primary" variant="text" disabled={prevDisabled}>Previous</Button>
                <Typography variant="h5"
                            className={classes.pageNumber}>
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
            <div className={classes.wrapper}>
                {beers.map(i => <div key={i.id}>
                    <BeerItem item={i}/>
                </div>)}
            </div>
        </>

    )
}