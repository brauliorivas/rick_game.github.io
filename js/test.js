const menu = document.getElementsByClassName('menu');
const documentSection = document.getElementsByClassName('game');

export const game = (URL, ANIMATEDPLAYER, RIGHTANM, SECONDIMAGE, coordinatesInitMovement, coordinatesUpMovement, coordinatesDownMovement, coordinatesLeftMovement, coordinatesRightMovement, WALL, longAnm, columns, rows, step, coordinatesWalls, apex, heightfirst, widthfirst, heightsecond, widthsecond, sourceimageheightfirst, sourceimagewidthfirst, sourceimageheightsecond, sourceimagewidthsecond, startx, starty) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const playAgain = () => {
        window.location.href = "./index.html"
    }
    const button = document.getElementById('playagain').addEventListener('click', playAgain);
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
        width: widthfirst,
        height: heightfirst,
        sourcewidth: sourceimagewidthfirst,
        sourceheight: sourceimageheightfirst,
    }
    
    let playerToBeSaved = {
        posx: null,
        posy: null,
        imagen: null,
        ximage: startx,
        yimage: starty,
        width: sourceimagewidthsecond,
        height: sourceimageheightsecond,
        finalheight: heightsecond,
        finalwidth: widthsecond,
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

    loadElement(SECONDIMAGE).then((response) => {
        playerToBeSaved.imagen = response;
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

    const checkOutside = (object, step, direction) => {
        let outside = false;
        if ((object.posx - step) < 0 && direction == 'left') {
            outside = true;
        } else if ((object.posy - step) < 0 && direction == 'up') {
            outside = true;
        }
        return !outside;
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

    const win = (player1, player2) => {
        if ((player1.posx >= (obstacle.width * (columns - 1)) && (player1.posx <= (obstacle.width * columns))) && (player1.posy <= (player2.posy + player2.finalheight))) {
            menu[0].style.display = "flex";
            documentSection[0].style.filter = "brightness(50%)";
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
                    if (!collide(animatedPlayer, apex, 'up', step) && checkOutside(animatedPlayer, step, 'up')) {
                        object.posy -= step;
                        ctx.drawImage(object.imagen, coordinatesUpMovement[i][0], coordinatesUpMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
                    }
                } else if (direction == 'abajo') {
                    if (!collide(animatedPlayer, apex, 'down', step)) {
                        object.posy += step;
                        ctx.drawImage(object.imagen, coordinatesDownMovement[i][0], coordinatesDownMovement[i][1], object.sourcewidth, object.sourceheight, object.posx, object.posy, object.width, object.height);
                    }
                } else if (direction == 'izquierda') {
                    if (!collide(animatedPlayer, apex, 'left', step) && checkOutside(animatedPlayer, step, 'left')) {
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
                win(animatedPlayer, playerToBeSaved)
            }, i * longAnm)
        }
        restore(object, 4);
    }

    const constructLevel = () => {
        drawBG();
        drawObstacles(canvas, obstacle, coordinatesWalls);
        playerToBeSaved.posx = canvas.width - obstacle.width;
        ctx.drawImage(playerToBeSaved.imagen, playerToBeSaved.ximage, playerToBeSaved.yimage, playerToBeSaved.width, playerToBeSaved.height, playerToBeSaved.posx,  playerToBeSaved.posy, playerToBeSaved.finalwidth, playerToBeSaved.finalheight)
    }

    setTimeout(() => {
        fix_dpi();
        updateApex(animatedPlayer);
        animatedPlayer.posy = canvas.height - animatedPlayer.height - 10;
        playerToBeSaved.posy = 5;
        constructLevel();
        ctx.drawImage(animatedPlayer.imagen, coordinatesInitMovement[0], coordinatesInitMovement[1], animatedPlayer.sourcewidth, animatedPlayer.sourceheight, animatedPlayer.posx, animatedPlayer.posy, animatedPlayer.width, animatedPlayer.height);
        getApex(obstacle);
        document.addEventListener("keydown", dibujar);
    }, 60)
}