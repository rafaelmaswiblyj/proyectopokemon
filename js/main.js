const form = document.getElementById("form");
const input = document.getElementById("input");
const container = document.getElementById("container");
const mensaje = document.getElementById("mensaje");

const baseURL = "https://pokeapi.co/api/v2/pokemon/";

// Inicializa una lista vacía para almacenar los Pokémon
let pokemonesCargados =  JSON.parse(localStorage.getItem('pokemonesCargados')) || [] ;

console.log(pokemonesCargados);

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
        localStorage.setItem(`pokemonesCargados`, JSON.stringify(pokemonesCargados));
        //Checkeamos el mensaje
        checkeaMensaje(pokemonesCargados);
        return pokemon;
    } else {
        throw new Error("No se pudo encontrar el pokemon.");
    }
};

const renderizaArray = (array) => {
    container.innerHTML = array.map(card => renderiza(card)).join('');
};

const renderiza = (pokemon, id) => {
    const capitalizedPokemonName = capitalizeFirstLetter(pokemon.name);

    return `
    <div id="card">
        <div>
            <h3>${capitalizedPokemonName}</h3>
            <p>Tipo: ${pokemon.types[0].type.name}</p>
            <p>Peso: ${pokemon.weight / 10} kg.</p>
            <p>Id: ${pokemon.id}</p>
        </div>
        <img src=${pokemon.sprites.front_default} width="150px" height="150px" style="border-radius: 20px;">
        <button class="close" data-id="${pokemon.id}">X</button>
    </div>
    `;
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

//////
const removePokemon = e => {
    // Si lo que estamos clickeando NO CONTIENE la clase close, que no haga nada retorna.
    if (!e.target.classList.contains('close')) return;
    //   Si no pasa esto
    //   Guardamos el data-id (Ese data-id es el id de la ciudad.) de las x en una variable
    console.log("Hola");
    const filterId = Number(e.target.dataset.id);
    //   console.log(`Este es el dataset de la x: ${filterId}`);
    //  Preguntamos si queremos eliminar con un window.confirm
    if (window.confirm('¿Estas seguro que queres eleminar este pokemon?')) {
      // Filtramos el pokemon del array, me saca la card que estoy clickeando (que quiero borrar) y me deja las demas.
      pokemonesCargados = pokemonesCargados.filter(card => card.id !== filterId);
      // Renderizamos, guardamos el ls y verificamos el mensaje ese
      renderizaArray(pokemonesCargados);
      localStorage.setItem(`pokemonesCargados`, JSON.stringify(pokemonesCargados));
    }
    checkeaMensaje(pokemonesCargados);
  };

container.addEventListener("click", removePokemon);
//////

/////
const checkeaMensaje = (array) =>{
    if(array.length){
        console.log("Hay algo en el array");
        mensaje.classList.add("hidden");
        return;
    }else{
        console.log("No hay nada en el array");
        mensaje.classList.remove("hidden");
    }
}
//////

const init = () =>{
    renderizaArray(pokemonesCargados);
    checkeaMensaje(pokemonesCargados);
}

init();



/*
¡Claro! Aquí están los cambios que hice en el código con explicaciones sencillas:

1. **Lista de Pokémon Cargados**: Antes, el código sobrescribía el Pokémon en el contenedor cada vez que presionabas el botón. Ahora, hemos creado una lista llamada `pokemonesCargados` que almacena todos los Pokémon que se han cargado.

2. **Renderizar Todos los Pokémon**: En lugar de reemplazar el Pokémon existente en el contenedor, ahora utilizamos una función llamada `renderizaArray` que toma la lista de Pokémon cargados y los muestra en el contenedor. Esto asegura que todos los Pokémon cargados se muestren en la página, no solo el último.

3. **Guardar en el LocalStorage**: Después de cargar un nuevo Pokémon, lo guardamos en el `localStorage`, como lo hicimos antes. Esto garantiza que los Pokémon persistan incluso después de recargar la página.

4. **Formulario de Envío**: Cuando envías el formulario, llamamos a `requestPokemon` para cargar el nuevo Pokémon. Luego, reiniciamos el formulario para que puedas ingresar otro número si lo deseas.

5. **Función `renderiza`**: Esta función se encarga de crear el HTML para mostrar un Pokémon en la página. La usamos tanto al cargar los Pokémon desde el `localStorage` como al cargar uno nuevo.

En resumen, estos cambios permiten agregar y mostrar varios Pokémon en la página cada vez que presionas el botón, en lugar de reemplazar el Pokémon existente. Además, los Pokémon cargados se almacenan en el `localStorage` para que persistan después de recargar la página.
*/