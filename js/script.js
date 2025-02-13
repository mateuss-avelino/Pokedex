const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemon__image = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
   if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
   }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ...'; // Quando a API estiver buscando a informação vai aparecer a tela de loading
    pokemonNumber.innerHTML = ''; // Limpa o id do Pokemon quando a API estiver buscando as informações

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemon__image.style.display = 'block';
        pokemonName.innerHTML = data.name; // Puxando o nome do pokemon da API
        pokemonNumber.innerHTML = data.id; // Puxando id Do pokemon da API
        pokemon__image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // Acessando o objeto dentro da api para buscar as imagens para dentro do nosso projeto //
        input.value = ''; // limpa o valor do input ao final da pesquisa
        searchPokemon = data.id;
    } else{
        pokemon__image.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

renderPokemon(searchPokemon);

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) { // Essa função não deixa o mostrar um valor menor que 1 
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// ASYNC DEFINE QUE A NOSSA FUNÇÃO É ASICRONA