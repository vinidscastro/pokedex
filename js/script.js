const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const input = document.querySelector('.input__search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
let searchPokemon = 1;

const form = document.querySelector('.form__poke');
const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (ApiResponse.status == 200) {
        const data = await ApiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
    input.value = '';
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon)