import React from "react";
import Grid from "@material-ui/core/Grid";
import './Pokedex.css'


const Pagination = ({ nextPage, prevPage }) => {
    return (
        <Grid container className="buttonsContainer">
            <Grid item>
                <button onClick={prevPage} className="nextButton">Previous</button>
            </Grid>
            <Grid item>
                <button onClick={nextPage} className="prevButton">Next</button>
            </Grid>
        </Grid>
    )
}

export default Pagination;