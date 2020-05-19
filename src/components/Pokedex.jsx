import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  LinearProgress,
  TextField,
  makeStyles,
  fade,
  Typography,
  Button,
} from "@material-ui/core";

import "./Pokedex.css";
import Pagination from "./Pagination";
import { getAllPokemon, getPokemon } from "../services/pokemon";
import PokemonCard from "./PokemonCard";

const Pokedex = (props) => {
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonPerPage, setPokemonPerPage] = useState(18);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();

  const initialUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonPerPage}`;

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      console.log(response);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextPageUrl);
    await loadingPokemon(data.results);
    setNextPageUrl(data.next);
    setPreviousPageUrl(data.previous);
    setLoading(false);
  };
  const prev = async () => {
    if (!previousPageUrl) return;
    setLoading(true);
    let data = await getAllPokemon(previousPageUrl);
    await loadingPokemon(data.results);
    setNextPageUrl(data.next);
    setPreviousPageUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  if (loading) return <LinearProgress />;

  return (
    <>
      <AppBar position="static">
        <Toolbar className="header-title">
          <Typography className="header-title-text" variant="h3">
            Pokemon List
          </Typography>
          <Button
            onClick={() => history.push("/allPokemons")}
            className="backButton"
            variant="text"
          >
            Go to all Pokemons
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        style={{ width: "100%" }}
        container
        spacing={2}
        className="pokedexContainer"
      >
        {pokemonData.map((pokemon, i) => {
          return (
            <PokemonCard pokemon={pokemon} history={history} id={i} key={i} />
          );
        })}
      </Grid>
      <Pagination nextPage={next} prevPage={prev} />
    </>
  );
};

export default Pokedex;
