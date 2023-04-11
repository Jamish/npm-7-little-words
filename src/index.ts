import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import * as _ from 'lodash';

export type Solution = Map<string, string[]>;

class Solver {
    private _dictionary: Map<number, Set<string>>;
    private _isInitialized: boolean;
    public tiles: string[];

    constructor() {
        this._dictionary = new Map<number, Set<string>>();
        this._isInitialized = false;
        this.tiles = [];
    }

    async loadDictionary(): Promise<void> {
        try {
            const filePath = path.resolve(__dirname, '../resources/words.txt');
            const contents = await readFile(filePath, { encoding: 'utf8' });

            const words = contents.toString().split('\n');

            words.forEach((untrimmedWord) => {
                const word = untrimmedWord.trim();
                let sameLengthWordSet = this._dictionary.get(word.length);
                if (sameLengthWordSet === undefined) {
                    sameLengthWordSet = new Set();
                    this._dictionary.set(word.length, sameLengthWordSet);
                }

                sameLengthWordSet.add(word);
            });

            this._isInitialized = true;
        } catch (err: any) {
            console.error(err.message);
        }
    }

    isInitialized(): boolean {
        return this._isInitialized;
    }

    removeTiles(tilesToRemove: string[]): void {
        _.pullAll(this.tiles, tilesToRemove);
    }

    solveForWordLength(wordLength: number): Solution {
        const words: Set<string> = this._dictionary.get(wordLength)!;
        const solution: Solution = new Map();

        function recurse(currentString: string, usedTiles: string[], remainingTiles: string[]) {
            if (words.has(currentString)) {
                solution.set(currentString, usedTiles);
                return;
            }

            remainingTiles.forEach((tile) => {
                const newString = currentString + tile;
                if (newString.length > wordLength) {
                    return [];
                }
                const newUsedTiles = [...usedTiles, tile];
                const newRemainingTiles = _.without(remainingTiles, tile);
                return recurse(newString, newUsedTiles, newRemainingTiles);
            });
        }

        recurse('', [], this.tiles);
        return solution;
    }
}
export default Solver;
