import { readFileSync } from 'fs';

const filePath = './inputs.txt';

const fileContents = readFileSync(filePath, 'utf-8');
const lines = fileContents.split(/\r?\n/);

console.log(fileContents);
