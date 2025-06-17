#!/usr/bin/env node
const fs = require('fs');
const esprima = require('esprima');

function printUsage() {
  console.log('Usage: esprima-cli <file.js> [--format=json|plain]');
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length < 1) {
  printUsage();
}

const filePath = args[0];
const formatArg = args[1] || '--format=json';
const format = formatArg.split('=')[1] || 'json';

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const code = fs.readFileSync(filePath, 'utf-8');
const ast = esprima.parseScript(code, { range: true, tokens: true, comment: true });

if (format === 'json') {
  console.log(JSON.stringify(ast, null, 2));
} else if (format === 'plain') {
  console.log(ast);
} else {
  console.error(`Unsupported format: ${format}`);
  process.exit(1);
}
