const fs = require('fs');

const filePath = './inputs.txt';

const fileContents = fs.readFileSync(filePath, 'utf-8');
const lines = fileContents.split(/\r?\n/);

console.log(fileContents);
