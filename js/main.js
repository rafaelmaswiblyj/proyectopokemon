const form = document.getElementById("form");
const input = document.getElementById("input");
const container = document.getElementById("container");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const idColocada = input.value.trim();
////////////////
const requestPokemon = async () => {
    const baseURL = `https://pokeapi.co/api/v2/pokemon/`;
  
    const idPokemon = input.value.trim();
  
    const response = await fetch(baseURL + idPokemon);
  
    const pokemon = await response.json();
    console.log(pokemon);
    return pokemon;
  };
  
//////////////////
form.addEventListener("submit", async e =>{
    e.preventDefault();
    const pokemon = await requestPokemon();
    renderiza(pokemon);
})

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

const renderiza = (pokemon) =>{
 
    const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

    container.innerHTML = `
    <div id="card">
        <div>
            <h3>${capitalizedPokemonName}</h3>
            <p>Tipo: ${pokemon.types[0].type.name}</p>
            <p>Peso: ${pokemon.weight}</p>
        </div>
        <img src=${pokemon.sprites.front_default} width="200px"
         height="200px" style="border-radius: 20px;">
    </div>
    `
}