describe('tac-tac-toe', () => {
    console.log = jest.fn();

    const getLogInOneLine = (index = 0) => console.log.mock.calls[index][0].split('\n')
        .join('').split('').filter(character => character.trim().length).join('');

    beforeEach(() => {
        console.log.mockReset();
    });

    it('should be able to detect completed game', () => {
        // horizontal
        require('./tic-tac-toe')([
            'X', 'X', 'X',
            'O', 'O', null,
            null, null, null,
        ]);

        expect(getLogInOneLine().startsWith('XXXOO....')).toBe(true);

        // vertical
        require('./tic-tac-toe')([
            'O', 'X', 'X',
            'X', 'O', null,
            null, null, 'O',
        ]);

        expect(getLogInOneLine(1).startsWith('OXXXO...O')).toBe(true);

        // diagonally
        require('./tic-tac-toe')([
            'O', 'X', 'O',
            'O', 'X', null,
            null, 'X', 'O',
        ]);

        expect(getLogInOneLine(2).startsWith('OXOOX..XO')).toBe(true);
    });

    it('should be able to finish a game', () => {
        require('./tic-tac-toe')();

        const board = getLogInOneLine().substring(0, 9).trim();
        const totalX = board.split('').reduce((totalX, next) => next === 'X' ? totalX + 1 : totalX, 0);
        const totalO = board.split('').reduce((totalO, next) => next === 'O' ? totalO + 1 : totalO, 0);

        // board is filled with valid characters
        expect(board.split('').every(character => ['X', 'O', '.'].includes(character))).toBe(true);

        // the minimum moves for X and O
        expect(totalX).toBeGreaterThanOrEqual(3);
        expect(totalO).toBeGreaterThanOrEqual(2);

        // should not make double moves
        expect([0, 1]).toContain(totalX - totalO);
    });

    it('should be able to print a winner', () => {
        require('./tic-tac-toe')([
            'X', 'X', 'X',
            'O', 'O', null,
            null, null, null,
        ]);

        expect(getLogInOneLine().substring(9)).toBe('Xwon');

        require('./tic-tac-toe')([
            'O', 'O', 'O',
            'X', 'X', null,
            null, null, null,
        ]);

        expect(getLogInOneLine(1).substring(9)).toBe('Owon');

        require('./tic-tac-toe')([
            'O', 'X', 'O',
            'X', 'O', 'X',
            'X', 'O', 'X'
        ]);

        expect(getLogInOneLine(2).substring(9)).toBe('Nobodywon');
    });
})
