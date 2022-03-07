import "./App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  let [pokemon, setPokemon] = React.useState([]); //Hook, declares a new state variable named pokemon with an empty array as the default value
  let [selectedPokemonName, setSelectedPokemonName] =
    React.useState("bulbasaur");
  let [selectedPokemon, setSelectedPokemon] = React.useState(null);
  let [abilities, setAbilities] = React.useState([]);
  let [types, setTypes] = React.useState([]);
  let handlePokemonClick = (pokeName) => {
    setSelectedPokemonName(pokeName);
  };

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.results);
        setPokemon(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setSelectedPokemon(json);
        setAbilities(json.abilities);
        setTypes(json.types);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [selectedPokemonName]);

  return (
    <div className="main-container">
      <aside className="pokemon-list">
        <ol>
          {pokemon.map(function (poke) {
            let isSelected = poke.name === selectedPokemonName;
            return (
              <li
                key={poke.name}
                className={isSelected ? "selected" : "unselected"}
                onClick={() => handlePokemonClick(poke.name)}
              >
                {poke.name}
              </li>
            );
          })}
        </ol>
      </aside>
      <header>
        <img src="images/pokemon-logo.png" alt="pokemon logo"></img>
      </header>
      {selectedPokemon && (
        <div className="selected-pokemon">
          <div className="name-sprite">
            <h1>{selectedPokemon.name}</h1>
            <img src={selectedPokemon.sprites.front_default}></img>
            <img className="tv-static" src="images/tv-static.gif"></img>
          </div>
          <div className="types">
            {types.map(function (pokemonType) {
              return (
                <span
                  key={pokemonType.type.name}
                  id="type"
                  className={pokemonType.type.name}
                >
                  {pokemonType.type.name.toUpperCase()}
                </span>
              );
            })}
          </div>
          <div className="stats">
            <span>► height: {selectedPokemon.height}</span>
            <span>► weight: {selectedPokemon.weight}</span>
            <span>► base experience: {selectedPokemon.base_experience}</span>
            <div className="abilities">
              ► abilities:
              {abilities.map(function (pokemonAbility) {
                return (
                  <li key={pokemonAbility.ability.name} className="ability">
                    {pokemonAbility.ability.name}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
