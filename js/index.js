const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const URL = 'https://www.xtrafondos.com/wallpapers/rick-y-morty-en-universo-de-dragon-ball-6401.jpg';
const ANIMATEDPLAYER = 'https://www.spriters-resource.com/resources/sheets/77/80159.png?updated=1477720942';
const RIGHTANM = '../src/image.png';
const longAnm = 50;

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

let animatedPlayer = {
    imagen: null,
    flipped: null,
    posx: 0,
    posy: null,
    width: 35,
    height: 55,
    sourcewidth: 120,
    sourceheight: 150,
}

const keys = {
    UP : 38,
    DOWN : 40,
    LEFT : 37,
    RIGHT : 39
};

const coordinatesInitMovement = [5, 741];
const coordinatesUpMovement = [[5, 1074], [138, 1074], [267, 1074], [398, 1074]];
const coordinatesDownMovement = [[5, 741], [136, 739], [266, 739], [397, 739]];
const coordinatesLeftMovement = [[5, 907], [136, 907], [267, 907], [397, 907]];
const coordinatesRightMovement = [[296, 908], [428, 908], [557, 908], [688, 908]];

loadElement(URL).then((response) => {
    background.imagen = response;
})

loadElement(ANIMATEDPLAYER).then((response) => {
    animatedPlayer.imagen = response;
})

loadElement(RIGHTANM).then((response) => {
    animatedPlayer.flipped = response;
})

const dpi = window.devicePixelRatio;
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

const dibujar = (event) => {
    drawBG();
    switch (event.keyCode) {
        case keys.UP:
            drawDirection(animatedPlayer, 2, 'arriba');
        break;
        case keys.DOWN:
            drawDirection(animatedPlayer, 2, 'abajo');
        break;
        case keys.LEFT:
            drawDirection(animatedPlayer, 2, 'izquierda');
        break;
        case keys.RIGHT:
            drawDirection(animatedPlayer, 2, 'derecha');
        break;
        default:
            restore(animatedPlayer, 0);
    }
}

const restore = (object, i) => {
    setTimeout(() => {
        drawBG();
        ctx.drawImage(object.imagen, coordinatesInitMovement[0], coordinatesInitMovement[1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
    }, i * longAnm + longAnm);
}

const drawDirection = (object, step, direction) => {
    for ( let i = 0 ; i < 4 ; i++) {
        setTimeout(() => {
            drawBG();
            if (direction == 'arriba') {  
                object.posy -= step;
                ctx.drawImage(object.imagen, coordinatesUpMovement[i][0], coordinatesUpMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
            }  else if (direction == 'abajo') {
                object.posy += step;
                ctx.drawImage(object.imagen, coordinatesDownMovement[i][0], coordinatesDownMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
            } else if (direction == 'izquierda') {
                object.posx -= step;
                ctx.drawImage(object.imagen, coordinatesLeftMovement[i][0], coordinatesLeftMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
            } else if (direction == 'derecha') {
                object.posx += step;
                ctx.drawImage(object.flipped, coordinatesRightMovement[i][0], coordinatesRightMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
            } 
        }, i * longAnm)
    }
    restore(object, 3);
}

setTimeout(() => {
    fix_dpi();
    drawBG();
    animatedPlayer.posy = canvas.height - animatedPlayer.height;
    restore(animatedPlayer, 0);
    document.addEventListener("keydown", dibujar);
}, 0)