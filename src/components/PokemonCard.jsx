import React from "react";
import {Card, CardContent, CardMedia, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import './Pokedex.css'


const PokemonCard = ({pokemon, history}) => {

    const toFirstCharUpperCase = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        <Grid item lg={2} md={6} sm={12} xs={12}>
            <Card className="card" onClick={() => history.push(`/pokemon/${pokemon.id}`)}>
                <CardMedia image={pokemon.sprites.front_default} className="cardMedia"/>
                <CardContent className="cardContent">
                    <Typography>{`${toFirstCharUpperCase(pokemon.forms[0].name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default PokemonCard;