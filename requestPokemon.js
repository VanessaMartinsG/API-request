let arraypokemons = []; //armazena todos os pokemons da primeira url
let arrayUrls = [];      //todas urls dos pokemons


function getpokemon(){
const dataArray = fetch("https://pokeapi.co/api/v2/pokemon?limit=12000");
dataArray.then((response) => response.json())
.then((data) =>{
    arraypokemons = data.results;
    arraypokemons.forEach((item) =>{
        const urlpokemon = fetch(`${item.url}`);
        urlpokemon.then((response) => response.json())
        .then((data) =>{
            creatHTML(data);
        })
});
});
}

function creatHTML(item) {
    const main = document.querySelector("main");
    console.log(item);

        let div = document.createElement("div");
        let image = document.createElement("img");
        let name = document.createElement("h2");
        // let tipo = document.createElement("h3");
 
        image.src = item.sprites.front_default;
        name.textContent = item.name;
        

        // tipo.textContent = item.type.name;
        
        div.appendChild(name);
        div.appendChild(image);
        // div.appendChild(tipo);
        main.appendChild(div);
        item.types.forEach((item) =>{
            let types = document.createElement("h3");
            types.textContent = item.type.name; 
            div.appendChild(types);
        })
        

}

getpokemon();