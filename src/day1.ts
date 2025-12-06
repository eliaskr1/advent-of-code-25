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

function solveDay1() {
    const input: string = readInput('../input/day1.txt');
    
    // Split the input into an array of lines
    const lines: string[] = input.split('\n');

    const movements: number[] = convertMovements(lines);

    let password: number = 0;
    let sum: number = 50;
    for (const move of movements) {
        sum += move;
        if (sum === 0 || sum % 100 === 0) {
            password += 1;
        }
    }

    console.log(`The final result is: ${password}`);
}

solveDay1();