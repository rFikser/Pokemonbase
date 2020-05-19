import React from 'react';
import Pokedex from "./components/Pokedex";
import PokemonPage from "./components/PokemonPage";
import {Route} from "react-router-dom";
import AllPokemonsPage from "./components/AllPokemonsPage";


function App() {
    return (
        <>
                <Route exact path="/" render={(props) => <Pokedex {...props}/>}></Route>
                <Route exact path="/pokemon/:id" render={(props) => <PokemonPage {...props} />}></Route>
                <Route exact path="/allPokemons" render={(props) => <AllPokemonsPage {...props} />}></Route>
        </>
    );
}

export default App;
