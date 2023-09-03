const form = document.getElementById("form");
const input = document.getElementById("input");
const container = document.getElementById("container");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Inicializa una lista vacía para almacenar los Pokémon
const pokemonesCargados = [];

const renderizaArray = (array) => {
    // Limpiar el contenedor antes de agregar las tarjetas
    container.innerHTML = '';
    array.forEach(card => {
        const cardElement = renderiza(card);
        container.appendChild(cardElement);
    });
};

const requestPokemon = async () => {
    const idPokemon = input.value.trim();

    const response = await fetch(baseURL + idPokemon);

    if (response.ok) {
        const pokemon = await response.json();
        // Guarda el pokemon en la lista de Pokémon cargados
        pokemonesCargados.push(pokemon);
        // Renderiza todos los Pokémon en la lista
        renderizaArray(pokemonesCargados);
        // Guarda el pokemon en el localStorage
        localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
        return pokemon;
    } else {
        throw new Error("No se pudo encontrar el pokemon.");
    }
};

const cargarPokemonesDesdeLocalStorage = () => {
    // Obtiene todas las claves almacenadas en el localStorage
    const keys = Object.keys(localStorage);
    const pokemones = [];

    // Recorre las claves y recupera los pokemones almacenados
    keys.forEach(key => {
        try {
            const pokemon = JSON.parse(localStorage.getItem(key));
            pokemones.push(pokemon);
        } catch (error) {
            console.error("Error al recuperar un pokemon del localStorage:", error);
        }
    });

    // Renderiza los pokemones almacenados
    renderizaArray(pokemones);
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        await requestPokemon();
        form.reset();
    } catch (error) {
        if (!input.value) {
            alert("Por favor, introduce un número");
        } else {
            alert("No se pudo encontrar el pokemon. Por favor, introduce un número válido");
        }
    }
});

const renderiza = (pokemon) => {
    const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

    const cardElement = document.createElement('div');
    cardElement.innerHTML = `
    <div id="card">
        <div>
            <h3>${capitalizedPokemonName}</h3>
            <p>Tipo: ${pokemon.types[0].type.name}</p>
            <p>Peso: ${pokemon.weight}</p>
        </div>
        <img src=${pokemon.sprites.front_default} width="200px" height="200px" style="border-radius: 20px;">
    </div>
    `;

    return cardElement;
};

// Llama a cargarPokemonesDesdeLocalStorage después de definirla
cargarPokemonesDesdeLocalStorage();
