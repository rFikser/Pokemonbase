import React, {useEffect, useState} from "react";
import axios from 'axios'
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    AppBar,
    TextField,
    Toolbar,
    makeStyles,
    fade,
    LinearProgress,
    Typography,
    Button
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import './Pokedex.css'

const useStyles = makeStyles((theme) => ({
    fadeSearch: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        display: "flex",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px"
    }
}))

const AllPokemonsPage = (props) => {

    const styles = useStyles();
    let {history} = props;
    const [pokemonData, setPokemonData] = useState({})
    const [filter, setFilter] = useState('');

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }


    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=964`)
            .then(function (response) {
                const {data} = response;
                const {results} = data;
                const newPokemonData = {};
                results.forEach((pokemon, id) => {
                    newPokemonData[id + 1] = {
                        id: id + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`
                    };
                });
                setPokemonData(newPokemonData)
            });
    }, []);

    const toFirstCharUpperCase = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const getPokemonCard = (pokemonId) => {
        let {id, name, sprite} = pokemonData[pokemonId]
        return (
            <Grid onClick={() => history.push(`/pokemon/${id}`)} item lg={2} md={6} sm={12} xs={12} key={pokemonId}>
                <Card className="card">
                    <CardMedia image={sprite} className="cardMedia"/>
                    <CardContent className="cardContent">
                        <Typography>{`${toFirstCharUpperCase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar className="header-title">
                    <div className={styles.fadeSearch}>
                        <SearchIcon className="searchIcon"/>
                        <TextField onChange={handleSearchChange}
                                   className="searchField"
                                   label="Search for pokemon"
                                   variant="standard"
                        />
                    </div>
                    <div className="backToList">
                        <Button onClick={() => history.push("/")} className='backButton' variant="text"> Back to List </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ?
                <Grid style={{width: "100%"}} container spacing={2} className="pokedexContainer">
                    {Object.keys(pokemonData).map(
                        (id) =>
                        pokemonData[id].name.includes(filter.toLowerCase()) && getPokemonCard(id))}
                </Grid>
                : <LinearProgress/>
            }
        </>
    )
}

export default AllPokemonsPage;