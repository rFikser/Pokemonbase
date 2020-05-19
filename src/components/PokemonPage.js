import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Typography } from "@material-ui/core";
import './Pokedex.css'
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";


const PokemonPage = ({ match, history }) => {
    let { params } = match
    let { id } = params

    const [pokemon, setPokemon] = useState(undefined)

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(function (response) {
                console.log(response)
                const { data } = response;
                setPokemon(data)
            })
            .catch(function () {
                setPokemon(false)
            })
    }, [id])

    const toFirstCharUpperCase = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const getPokemon = () => {
        let { name, id, height, weight, types } = pokemon;
        let imageURL = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        return (
            <Grid justify="center" container>
                <Grid xs={12} className=" wrapperClass">
                    <Typography className="pokemonTitle" variant="h1">
                        {`${id}. ${toFirstCharUpperCase(name)}`}
                    </Typography>
                    <img src={imageURL} className="pokemonImage" />

                </Grid>
                <Grid container className="mainInfoWrapper">
                    <Grid item lg={4} className="infoWrapper">
                        <Typography variant="h1">Info:</Typography>
                        <Typography variant="h3">Height: {height}</Typography>
                        <Typography variant="h3">Weight: {weight}</Typography>
                    </Grid>
                    <Grid item lg={4} className="typeWrapper">
                        <Typography variant="h1">Types:</Typography>
                        {types.map(typeInfo => {
                            const { type } = typeInfo
                            const { name } = type
                            return <Typography variant="h3" key={name}>{`${name}`}</Typography>
                        })}
                    </Grid>
                </Grid>


            </Grid>
        )

    }

    return (
        <div className="wrapper">
            {pokemon === undefined && <LinearProgress />}
            {
                pokemon !== undefined && pokemon &&
                getPokemon()
            }
            {pokemon === false && <Typography variant="h1"> Pokemon not found</Typography>}
            {pokemon !== undefined && (
                <Button variant="text" onClick={() => history.push("/")}>Back to PokeList</Button>

            )}
            {pokemon !== undefined &&
                <Button variant="text" onClick={() => history.push("/allPokemons")}>Back to All Pokemons</Button>
            }
        </div>
    )
}

export default PokemonPage;