import * as fs from 'fs';
import * as path from 'path';

function readInput(filename: string): string {
    const filePath = path.join(__dirname, '..', 'input', filename);
    return fs.readFileSync(filePath, 'utf-8').trim();
}

function convertMovements(moves: string[]): number[] {
    return moves.map(move => {
        // break out direction and magnitude
        const direction = move.charAt(0);
        const magnitudeString = move.substring(1);
        // convert to number
        const magnitude = +magnitudeString;

        if (direction === 'L') {
            return -magnitude; // Make L numbers negative
        } else if (direction === 'R') {
            return magnitude; // Keep R numbers positive
        } else {
        console.warn(`Unexpected direction character found: ${direction}`);
            return 0;
        }
    });
}

function solveDay1p2() {
    const input: string = readInput('../input/day1.txt');
    const lines: string[] = input.split('\n');
    const movements: number[] = convertMovements(lines);

    let sum: number = 50;
    let crossings: number = 0;
    
    for (const move of movements) {
        const from = sum;
        sum += move;
        const to = sum;

        let count = 0;

        if (move > 0) {
            // find first multiple strictly GREATER than "from"
            const firstHit = Math.ceil((from + 1) / 100) * 100;

            for (let p = firstHit; p <= to; p += 100) {
                count++;
            }
        } else if (move < 0) {
            // find first multiple strictly LESS than "from"
            const firstHit = Math.floor((from - 1) / 100) * 100;

            for (let p = firstHit; p >= to; p -= 100) {
                count++;
            }
        }

        crossings += count;
    }

    console.log(`The final result is: ${crossings}`);
}


solveDay1p2();