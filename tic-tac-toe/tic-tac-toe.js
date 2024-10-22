let tiles;

const possibleWinningLineIndexes = [
    [0, 3, 6], [1, 4, 7], [2, 5, 8],    // vertical
    [0, 1, 2], [3, 4, 5], [6, 7, 8],    // horizontal
    [0, 4, 8], [2, 4, 6]                // diagonal
];

const getWinner = () => possibleWinningLineIndexes
    .map(line => line.map(cellNumber => tiles[cellNumber]).join(''))
    .filter(line => line === 'OOO' || line === 'XXX')
    .reduce((winner, next) => next.charAt(0), null);

const getEmptyTileIndexes = () => tiles
    .map((value, index) => value === null ? index : null)
    .filter(index => index !== null);

const getRandomFromList = list => list[Math.floor(Math.random() * list.length)];

const getCurrentXorO = () => 
    tiles.filter(value => value === 'X').length >
    tiles.filter(value => value === 'O').length ? 'O' : 'X';

const print = () => {
    console.log(' ' + tiles.map(value => value ?? '.')
        .map((value, index) => index === 2 || index === 5 ? `${value}\n` : value)
        .join(' ') + `\n\n ${getWinner() ?? 'Nobody' } won`);
}

const play = (initialTiles = Array(9).fill(null)) => {
    tiles = initialTiles;

    while (!getWinner() && !tiles.every(Boolean)) {
        tiles[getRandomFromList(getEmptyTileIndexes())] = getCurrentXorO();
    }

    print();
}

module.exports = play;
