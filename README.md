### Overview
This is a solver for https://www.7littlewords.com/ puzzles.

This package is on npm:
https://www.npmjs.com/package/7-little-words

I followed this tutorial--hopefully I set up my package properly!
https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

### Word List
English word list was drawn from https://github.com/dwyl/english-words which was in turn drawn from https://www.infochimps.com/datasets/word-list-350000-simple-english-words-excel-readable


### Usage
Node CLI example of solving http://hobbes.blueoxtech.com/hosted_7LW_for_website/dailyPDFs/7LW_Daily_Puzzle_2023_04_10.pdf
```
> let Solver = require('7-little-words').default
> let solver = new Solver()
> solver.loadDictionary() // Returns a promise, 
> solver.tiles = ['ezu', 'th', 'ven', 'an', 'eds', 'pa', 'bo', 'dd', 'hig', 'ing', 'gs', 'xca', 'an', 'se', 'in', 'rs', 'sc', 'mic', 'el', 'are']

> answer = solver.solveForWordLength(10)
Map(1) { 'venezuelan' => [ 'ven', 'ezu', 'el', 'an' ] }
> solver.removeTiles(answer.get('venezuelan'))

> answer = solver.solveForWordLength(8)
Map(3) {
  'paddings' => [ 'pa', 'dd', 'in', 'gs' ],
  'parsings' => [ 'pa', 'rs', 'in', 'gs' ],
  'michigan' => [ 'mic', 'hig', 'an' ]
}
> solver.removeTiles(answer.get('michigan'))

> answer = solver.solveForWordLength(7)
Map(6) {
  'padding' => [ 'pa', 'dd', 'ing' ],
  'paining' => [ 'pa', 'in', 'ing' ],
  'parsing' => [ 'pa', 'rs', 'ing' ],
  'boxcars' => [ 'bo', 'xca', 'rs' ],
  'seining' => [ 'se', 'in', 'ing' ],
  'scarers' => [ 'sc', 'are', 'rs' ]
}
> solver.removeTiles(['pa', 'dd', 'ing'])
> solver.removeTiles(['bo', 'xca', 'rs'])

> answer = solver.solveForWordLength(6)
Map(1) { 'things' => [ 'th', 'in', 'gs' ] }

> answer = solver.solveForWordLength(5)
Map(2) { 
  'seeds' => [ 'se', 'eds' ], 
  'scare' => [ 'sc', 'are' ] 
}
```