const form = document.getElementById("form");
const input = document.getElementById("input");
const container = document.getElementById("container");
const mensaje = document.getElementById("mensaje");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const mensajeVisible = () =>{
    if(pokemonesCargados.length){
        mensaje.classList.add("hidden");
        return;
    } else{
        mensaje.classList.add("visible");
        return;
    }
}

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

const renderiza = (pokemon, id) => {
    const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-id', id); // Agrega un identificador único
    cardElement.innerHTML = `
    <div id="card">
        <div>
            <h3>${capitalizedPokemonName}</h3>
            <p>Tipo: ${pokemon.types[0].type.name}</p>
            <p>Peso: ${pokemon.weight}</p>
        </div>
        <img src=${pokemon.sprites.front_default} width="200px" height="200px" style="border-radius: 20px;">
        <button class="eliminar" data-id="${id}">X</button>
    </div>
    `;

    mensajeVisible();
    return cardElement;
};


// Llama a cargarPokemonesDesdeLocalStorage después de definirla
cargarPokemonesDesdeLocalStorage();

/*
¡Claro! Aquí están los cambios que hice en el código con explicaciones sencillas:

1. **Lista de Pokémon Cargados**: Antes, el código sobrescribía el Pokémon en el contenedor cada vez que presionabas el botón. Ahora, hemos creado una lista llamada `pokemonesCargados` que almacena todos los Pokémon que se han cargado.

2. **Renderizar Todos los Pokémon**: En lugar de reemplazar el Pokémon existente en el contenedor, ahora utilizamos una función llamada `renderizaArray` que toma la lista de Pokémon cargados y los muestra en el contenedor. Esto asegura que todos los Pokémon cargados se muestren en la página, no solo el último.

3. **Guardar en el LocalStorage**: Después de cargar un nuevo Pokémon, lo guardamos en el `localStorage`, como lo hicimos antes. Esto garantiza que los Pokémon persistan incluso después de recargar la página.

4. **Formulario de Envío**: Cuando envías el formulario, llamamos a `requestPokemon` para cargar el nuevo Pokémon. Luego, reiniciamos el formulario para que puedas ingresar otro número si lo deseas.

5. **Función `renderiza`**: Esta función se encarga de crear el HTML para mostrar un Pokémon en la página. La usamos tanto al cargar los Pokémon desde el `localStorage` como al cargar uno nuevo.

En resumen, estos cambios permiten agregar y mostrar varios Pokémon en la página cada vez que presionas el botón, en lugar de reemplazar el Pokémon existente. Además, los Pokémon cargados se almacenan en el `localStorage` para que persistan después de recargar la página.
*/