const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const URL = 'https://www.xtrafondos.com/wallpapers/rick-y-morty-en-universo-de-dragon-ball-6401.jpg';
const URL_PLAYER = 'https://www.clipartmax.com/png/full/210-2105236_four-eyes-rick-rick-and-morty-sprite-morty.png';

const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image;
        image.src = url;
        image.onload = resolve(image);
        reject(new Error('Error while loading element from url' + url));
    })
}

const loadElement = async (url) => {
    const element = await loadImage(url);
    return element
}

const background = {
    imagen: null,
}

const player = {
    imagen: null,
    posx: null,
    posy: null, 
}

var keys = {
    UP : 38,
    DOWN : 40,
    LEFT : 37,
    RIGHT : 39
};

loadElement(URL).then((response) => {
    background.imagen = response;
})

loadElement(URL_PLAYER).then((response) => {
    player.imagen = response;
})

dpi = window.devicePixelRatio;
function fix_dpi() {
//create a style object that returns width and height
    let style = {
        height() {
            return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
        },
        width() {
            return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
        }
    }
//set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', style.width() * dpi);
    canvas.setAttribute('height', style.height() * dpi);
}

const drawBG = () => {
    ctx.drawImage(background.imagen, 0, 0, canvas.width,canvas.height);
}
const drawPlayer = (posx, posy) => {
    ctx.drawImage(player.imagen, posx, posy, 35, 50);
}
setTimeout(() => {
    fix_dpi();
    drawBG();
    player.posx = 0;
    player.posy = canvas.height - 50;
    drawPlayer(player.posx, player.posy);
    document.addEventListener("keydown", dibujar)
}, 0)

const dibujar = (event) => {
    drawBG();
    switch (event.keyCode) {
        case keys.UP:
            player.posy = player.posy - 5;
            drawPlayer(player.posx, player.posy);
        break;
        case keys.DOWN:
            player.posy = player.posy + 5;
            drawPlayer(player.posx, player.posy);
        break;
        case keys.LEFT:
            player.posx = player.posx - 5;
            drawPlayer(player.posx, player.posy);
        break;
        case keys.RIGHT:
            player.posx = player.posx + 5;
            drawPlayer(player.posx, player.posy);
        break;
        default:
            drawPlayer(player.posx, player.posy);   
    }
}