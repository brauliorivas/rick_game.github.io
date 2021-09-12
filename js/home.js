const API = 'https://rickandmortyapi.com/api/character/';
let table = document.getElementById('cards');
let characters = [];
let response;

const getCharacters = async (url, index) => {
    let name, count, dimension;
    const image = new Image;
    try {
        const data = await fetch(url).then((response) => {
            return response.json()
        });
        count = data.info.count;
        const character = await fetch(`${API}${data.results[index].id}`).then((response) => {
            return response.json()
        });
        name = character.name;
        image.src = character.image
        const origin = await fetch(character.origin.url).then((response) => {
            return response.json()
        });
        dimension = origin.dimension;
    } catch (error){
        console.error('Error while loading characters', error)
    }
    return [count, name, dimension, image]
}

const buildContainer = (array) => {
    for (let i of array) {
        table.innerHTML += `
        <div class="player-option">
            <h3>${i[1]}</h3>
            <p>Origin: ${i[2]}</p>
            <img src="${i[3].src}" width="150px" height="150px"/>
            <span class="play" onclick="getValuePlayer('${i[1]}')">Play</span>
        </div class="player-option">
        `
    }
}

const getValuePlayer = (name) => {
    localStorage.setItem("playerselection", name);
    window.location.href = './game.html';
}

getCharacters(API, 0)
    .then((response) => {
        characters.push(response);
    });
getCharacters(API, 1)
    .then((response) => { 
        characters.push(response)
        buildContainer(characters);
    });