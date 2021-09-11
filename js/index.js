const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const URL = 'https://www.xtrafondos.com/wallpapers/rick-y-morty-en-universo-de-dragon-ball-6401.jpg';
const ANIMATEDPLAYER = 'https://www.spriters-resource.com/resources/sheets/77/80159.png?updated=1477720942';
const RIGHTANM = '../src/image.png';
const WALL = 'https://image.freepik.com/foto-gratis/fondo-pared-ladrillo-textura-negro_53876-63583.jpg';
const longAnm = 50;
const columns = 27;
const rows = 13;
const step = 2;
const coordinatesInitMovement = [5, 741];
const coordinatesUpMovement = [[5, 1074], [138, 1074], [267, 1074], [398, 1074]];
const coordinatesDownMovement = [[5, 741], [136, 739], [266, 739], [397, 739]];
const coordinatesLeftMovement = [[5, 907], [136, 907], [267, 907], [397, 907]];
const coordinatesRightMovement = [[296, 908], [428, 908], [557, 908], [688, 908]];
const coordinatesWalls = [[0, 10], [0, 22], [0, 25], [1, 1], [1, 2], [1, 3], [1, 5], [1, 7], [1, 8], [1, 9], [1, 10], [1, 12], [1, 13], [1, 14], [1, 15], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21], [1, 22], [1, 23], [1, 25], [2, 1], [2, 3], [2, 5], [2, 7], [2, 8], [2, 12], [2, 17], [2, 25], [3, 1], [3, 3], [3, 5], [3, 7], [3, 8], [3, 10], [3, 12], [3, 14], [3, 15], [3, 19], [3, 21], [3, 23], [3, 25], [4, 3], [4, 5], [4, 7], [4, 8], [4, 10], [4, 12], [4, 14], [4, 15], [4, 17], [4, 18], [4, 19], [4, 20], [4, 21], [4, 23], [4, 25], [5, 1], [5, 3], [5, 5], [5, 10], [5, 12], [5, 23], [5, 25], [6, 1], [6, 3], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 12], [6, 13], [6, 14], [6, 15], [6, 16], [6, 18], [6, 19], [6, 20], [6, 21], [6, 22], [6, 23], [6, 25], [7, 1], [7, 3], [7, 12], [7, 22], [7, 25], [8, 1], [8, 3], [8, 5], [8, 6], [8, 7], [8, 9], [8, 10], [8, 12], [8, 14], [8, 15], [8, 16], [8, 17], [8, 18], [8, 19], [8, 20], [8, 21], [8, 22], [8, 24], [8, 25], [9, 1], [9, 3], [9, 5], [9, 7], [9, 9], [9, 12], [9, 14], [8, 24], [8, 25], [9, 1], [9, 3], [9, 5], [9, 7], [9, 9], [9, 12], [9, 14], [9, 24], [9, 25], [10, 1], [10, 3], [10, 5], [10, 7], [10, 9], [10, 11], [10, 12], [10, 14], [10, 16], [10, 17], [10, 18], [10, 19], [10, 20], [10, 21], [10, 22], [10, 23], [10, 24],[10, 25], [11, 1], [11, 3], [11, 5], [11, 7], [11, 9], [11, 11], [11, 14], [11, 16], [11, 20], [11, 25], [12, 1], [12, 5], [12, 9], [12, 11], [12, 13], [12, 14], [12, 18], [12, 22], [13, 0], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15], [13, 16], [13, 17], [13, 18], [13, 19], [13, 20], [13, 21], [13, 22], [13, 23], [13, 24], [13, 25], [13, 26], [13, 27], [0, 27], [1, 27], [2, 27], [3, 27], [4, 27], [5, 27], [6, 27], [7, 27],  [8, 27], [9, 27], [10, 27], [11, 27], [12, 27]];
let apex = [];

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

const obstacle = {
    imagen: null,
    width: null,
    height: null,
    sourcewidth: 100, 
    sourceheight: 100,
}

let animatedPlayer = {
    imagen: null,
    flipped: null,
    posx: 7,
    posy: null,
    width: 30,
    height: 40,
    sourcewidth: 120,
    sourceheight: 150,
}

const keys = {
    UP : 38,
    DOWN : 40,
    LEFT : 37,
    RIGHT : 39
};

loadElement(URL).then((response) => {
    background.imagen = response;
})

loadElement(ANIMATEDPLAYER).then((response) => {
    animatedPlayer.imagen = response;
})

loadElement(RIGHTANM).then((response) => {
    animatedPlayer.flipped = response;
})

loadElement(WALL).then((response) => {
    obstacle.imagen = response;
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
    ctx.drawImage(background.imagen, 0, 0, canvas.width, canvas.height);
}

const drawWalls = (object, posx, posy) => {
    ctx.drawImage(object.imagen, 0, 0, object.sourcewidth, object.sourceheight, posx, posy, object.width, object.height);
}

const getApex = (object) => {
    for (let i of coordinatesWalls ) {
        const width = object.width;
        const height = object.height;
        let posx = i[1];
        let posy = i[0];
        let coordinatex = posx * width;
        let coordinatey = posy * height;
        apex.push([[coordinatex, coordinatey], [coordinatex + width, coordinatey], [coordinatex, coordinatey + height], [coordinatex + width, coordinatey + height]]);
    } 
}

const updateApex = (object) => {
    object.rightup = {
        x: object.posx + object.width,
        y: object.posy
    }
    object.rightdown = {
        x: object.posx + object.width,
        y: object.posy + object.height
    }
    object.leftup = {
        x: object.posx,
        y: object.posy
    } 
    object.leftdown = {
        x: object.posx,
        y: object.posy + object.height
    }
}

const collide = (object, array, direction, step) => {
    let touch = false;
    for (let i of array ) {
        if ( direction == 'up') {
            if ( ((i[0][1] <= (object.rightup.y - step) && i[2][1] >= (object.rightup.y - step)) && (i[0][0] <= object.rightup.x && i[1][0] >= object.rightup.x))||(((i[0][1] <= (object.leftup.y - step) && i[2][1] >= (object.leftdown.y - step)) && (i[0][0] <= object.leftup.x && i[1][0] >= object.leftup.x) ))) {
                touch = true;
            }
        } else if (direction == 'down') {
            if ( ( ( i[0][1] <= (object.rightdown.y + step) && (i[2][1] >= (object.rightdown.y + step) ) ) && (i[0][0] <= object.rightdown.x && i[1][0] >= object.rightdown.x) ) || ( ( i[0][1] <= (object.leftdown.y + step) && (i[2][1] >= (object.leftdown.y + step) ) ) && (i[0][0] <= object.leftdown.x && i[1][0] >= object.leftdown.x) ) )  {
                touch = true;
            }
        } else if (direction == 'left') {
            if ((( i[0][0] <= (object.leftdown.x - step) && (i[1][0] >= (object.leftdown.x - step)) && ((i[1][1] <= object.leftdown.y) && (i[3][1] >= object.leftdown.y)))) || (( i[0][0] <= (object.leftup.x - step) && (i[1][0] >= (object.leftup.x - step)) && ((i[1][1] <= object.leftup.y) && (i[3][1] >= object.leftup.y)))) ) {
                touch = true;
            }
        } else if (direction == 'right') {
            if ((( i[0][0] <= (object.rightdown.x + step) && (i[1][0] >= (object.rightdown.x + step)) && ((i[0][1] <= object.rightdown.y) && (i[2][1] >= object.rightdown.y)))) || (( i[0][0] <= (object.rightup.x + step) && (i[1][0] >= (object.rightup.x + step)) && ((i[1][1] <= object.rightup.y) && (i[3][1] >= object.rightup.y)))) ) {
                touch = true;           
            }
        }
    }
    return touch
}

const drawObstacles = (canvas, object, array) => {
    const screenHeight = canvas.height;
    const screenWidth = canvas.width;
    const objectWidth = Math.trunc(screenWidth / columns);
    const objectHeight = Math.trunc(screenHeight / rows);
    object.width = objectWidth;
    object.height = objectHeight;
    for (let i of array) {
        drawWalls(object, i[1] * object.width, i[0] * object.height);
    }
}

const dibujar = (event) => {
    constructLevel();
    switch (event.keyCode) {
        case keys.UP:
            drawDirection(animatedPlayer, step, 'arriba');
        break;
        case keys.DOWN:
            drawDirection(animatedPlayer, step, 'abajo');
        break;
        case keys.LEFT: 
            drawDirection(animatedPlayer, step, 'izquierda');
        break;
        case keys.RIGHT:
            drawDirection(animatedPlayer, step, 'derecha');
        break;
        default:
            restore(animatedPlayer, 0);
    }
}

const restore = (object, i) => {
    setTimeout(() => {
        constructLevel();
        ctx.drawImage(object.imagen, coordinatesInitMovement[0], coordinatesInitMovement[1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
    }, i * longAnm);
}

const drawDirection = (object, step, direction) => {
    for ( let i = 0 ; i < 4 ; i++) {
        setTimeout(() => {
            constructLevel();
            if (direction == 'arriba') {
                if (!collide(animatedPlayer, apex, 'up', step)) {
                    object.posy -= step;
                    ctx.drawImage(object.imagen, coordinatesUpMovement[i][0], coordinatesUpMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
                }
            } else if (direction == 'abajo') {
                if (!collide(animatedPlayer, apex, 'down', step)) {
                    object.posy += step;
                    ctx.drawImage(object.imagen, coordinatesDownMovement[i][0], coordinatesDownMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
                }
            } else if (direction == 'izquierda') {
                if (!collide(animatedPlayer, apex, 'left', step)) {
                    object.posx -= step;    
                    ctx.drawImage(object.imagen, coordinatesLeftMovement[i][0], coordinatesLeftMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
                }
            } else if (direction == 'derecha') {
                if (!collide(animatedPlayer, apex, 'right', step)) {
                    object.posx += step;
                    ctx.drawImage(object.flipped, coordinatesRightMovement[i][0], coordinatesRightMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
                }
            }
            updateApex(animatedPlayer);
        }, i * longAnm)
    }
    restore(object, 4);
}

const constructLevel = () => {
    drawBG();
    drawObstacles(canvas, obstacle, coordinatesWalls);
}

setTimeout(() => {
    fix_dpi();
    constructLevel();
    updateApex(animatedPlayer);
    animatedPlayer.posy = canvas.height - animatedPlayer.height - 10;
    ctx.drawImage(animatedPlayer.imagen, coordinatesInitMovement[0], coordinatesInitMovement[1], animatedPlayer.sourcewidth, animatedPlayer.sourceheight, animatedPlayer.posx, animatedPlayer.posy, animatedPlayer.width, animatedPlayer.height);
    getApex(obstacle);
    document.addEventListener("keydown", dibujar);
}, 0)