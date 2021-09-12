
const URL = 'https://www.xtrafondos.com/wallpapers/rick-y-morty-en-universo-de-dragon-ball-6401.jpg';
const RICK = 'https://www.spriters-resource.com/resources/sheets/77/80159.png?updated=1477720942';
const MORTY = 'https://www.spriters-resource.com/resources/sheets/72/75538.png?updated=1460968102';
const RIGHTANMMORTY = '../src/morty.png'
const RIGHTANMRICK = '../src/rick.png';
const WALL = 'https://image.freepik.com/foto-gratis/fondo-pared-ladrillo-textura-negro_53876-63583.jpg';
const longAnm = 50;
const columns = 27;
const rows = 13;
const step = 2;
const coordinatesInitMovementRick = [5, 741];
const coordinatesUpMovementRick = [[5, 1074], [138, 1074], [267, 1074], [398, 1074]];
const coordinatesDownMovementRick = [[5, 741], [136, 739], [266, 739], [397, 739]];
const coordinatesLeftMovementRick = [[5, 907], [136, 907], [267, 907], [397, 907]];
const coordinatesRightMovementRick = [[296, 908], [428, 908], [557, 908], [688, 908]];
const coordinatesWalls = [[0, 10], [0, 22], [0, 25], [1, 1], [1, 2], [1, 3], [1, 5], [1, 7], [1, 8], [1, 9], [1, 10], [1, 12], [1, 13], [1, 14], [1, 15], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21], [1, 22], [1, 23], [1, 25], [2, 1], [2, 3], [2, 5], [2, 7], [2, 8], [2, 12], [2, 17], [2, 25], [3, 1], [3, 3], [3, 5], [3, 7], [3, 8], [3, 10], [3, 12], [3, 14], [3, 15], [3, 19], [3, 21], [3, 23], [3, 25], [4, 3], [4, 5], [4, 7], [4, 8], [4, 10], [4, 12], [4, 14], [4, 15], [4, 17], [4, 18], [4, 19], [4, 20], [4, 21], [4, 23], [4, 25], [5, 1], [5, 3], [5, 5], [5, 10], [5, 12], [5, 23], [5, 25], [6, 1], [6, 3], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 12], [6, 13], [6, 14], [6, 15], [6, 16], [6, 18], [6, 19], [6, 20], [6, 21], [6, 22], [6, 23], [6, 25], [7, 1], [7, 3], [7, 12], [7, 22], [7, 25], [8, 1], [8, 3], [8, 5], [8, 6], [8, 7], [8, 9], [8, 10], [8, 12], [8, 14], [8, 15], [8, 16], [8, 17], [8, 18], [8, 19], [8, 20], [8, 21], [8, 22], [8, 24], [8, 25], [9, 1], [9, 3], [9, 5], [9, 7], [9, 9], [9, 12], [9, 14], [8, 24], [8, 25], [9, 1], [9, 3], [9, 5], [9, 7], [9, 9], [9, 12], [9, 14], [9, 24], [9, 25], [10, 1], [10, 3], [10, 5], [10, 7], [10, 9], [10, 11], [10, 12], [10, 14], [10, 16], [10, 17], [10, 18], [10, 19], [10, 20], [10, 21], [10, 22], [10, 23], [10, 24],[10, 25], [11, 1], [11, 3], [11, 5], [11, 7], [11, 9], [11, 11], [11, 14], [11, 16], [11, 20], [11, 25], [12, 1], [12, 5], [12, 9], [12, 11], [12, 13], [12, 14], [12, 18], [12, 22], [13, 0], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15], [13, 16], [13, 17], [13, 18], [13, 19], [13, 20], [13, 21], [13, 22], [13, 23], [13, 24], [13, 25], [13, 26], [13, 27], [0, 27], [1, 27], [2, 27], [3, 27], [4, 27], [5, 27], [6, 27], [7, 27],  [8, 27], [9, 27], [10, 27], [11, 27], [12, 27]];
const coordinatesInitMovementMorty = [22, 678];
const coordinatesUpMovementMorty = [[22, 1010], [151, 1010], [280, 1010], [409, 1010]];
const coordinatesDownMovementMorty = [[22, 678], [148, 678], [280, 678], [409, 678]];
const coordinatesLeftMovementMorty = [[22, 842], [148, 842], [280, 842], [409, 842]];
const coordinatesRightMovementMorty = [[92, 845], [221, 845], [348, 845], [475, 845]];
let apex = [];
const choosenPlayer = localStorage.getItem('playerselection');

import {game} from './test.js';

if (choosenPlayer == 'Morty Smith') {
    game(URL, MORTY, RIGHTANMMORTY, RICK, coordinatesInitMovementMorty, coordinatesUpMovementMorty, coordinatesDownMovementMorty, coordinatesLeftMovementMorty, coordinatesRightMovementMorty, WALL, longAnm, columns, rows, step, coordinatesWalls, apex, 35, 27, 40, 30, 122, 94, 150, 120, coordinatesInitMovementRick[0], coordinatesInitMovementRick[1]);
} else if (choosenPlayer == 'Rick Sanchez') {
    game(URL, RICK, RIGHTANMRICK, MORTY, coordinatesInitMovementRick, coordinatesUpMovementRick, coordinatesDownMovementRick, coordinatesLeftMovementRick, coordinatesRightMovementRick, WALL, longAnm, columns, rows, step, coordinatesWalls, apex, 40, 30, 35, 27, 150, 120, 122, 94, coordinatesInitMovementMorty[0], coordinatesInitMovementMorty[1] );
}
