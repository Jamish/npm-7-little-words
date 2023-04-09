import Solver, { Solution } from '../src/index';

describe('Seven Little Words', () => {
    let solver: Solver;

    beforeEach(() => {
        solver = new Solver();
        return solver.loadDictionary();
    });

    function verifyAndAcceptWord(solution: Solution, word: string) {
        expect(solution.has(word))
        solver.removeTiles(solution.get(word)!);
    }

    test('Can set and remove tiles', () => {
        expect(solver.isInitialized()).toBe(true);
        solver.tiles = ['abc', 'def', 'ghi']
        solver.removeTiles(['abc', 'ghi']);
        expect(solver.tiles).toEqual(['def']);
    });

    test('Can find words of a specific length matching tiles', () => {
        solver.tiles = ['spa', 'ghe', 'tti'];
        const solution = solver.solveForWordLength(9);
        expect(solution.has("spaghetti"));
    });

    test('Can choose a solution, remove the tiles, and find the next solution', () => {
        // Based on the Daily Puzzle for 4/7/2023
        // https://www.7littlewords.com/daily-puzzles
        solver.tiles = [
            'ke', 'tu', 'bi', 'pic', 'to',
            'ins', 'ig', 'ver', 'ram', 'rn',
            'red', 'ula', 'ba', 'ali', 'te',
            'ic', 'ad', 'lly', 'blo', 'dec'
        ]
        expect(solver.tiles.length).toBe(20)
        verifyAndAcceptWord(solver.solveForWordLength(8), "verbally");
        expect(solver.tiles.length).toBe(17)
        verifyAndAcceptWord(solver.solveForWordLength(8), "insulate");
        expect(solver.tiles.length).toBe(14)
        verifyAndAcceptWord(solver.solveForWordLength(8), "decigram");
        expect(solver.tiles.length).toBe(11)
        verifyAndAcceptWord(solver.solveForWordLength(8), "pictured");
        expect(solver.tiles.length).toBe(8)
        verifyAndAcceptWord(solver.solveForWordLength(8), "tornadic");
        expect(solver.tiles.length).toBe(4)
        verifyAndAcceptWord(solver.solveForWordLength(5), "alibi");
        expect(solver.tiles.length).toBe(2)
        verifyAndAcceptWord(solver.solveForWordLength(5), "bloke");
        expect(solver.tiles.length).toBe(0)
    });
});



