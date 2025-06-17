const fs = require('fs');
const escodegen = require('escodegen');
const path = require('path');

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('❌ 请提供 AST JSON 文件路径，如：node restore.js F:/tools/ast.json');
  process.exit(1);
}

let ast;
try {
  const content = fs.readFileSync(inputFile, 'utf-8');
  ast = JSON.parse(content);
} catch (err) {
  console.error('❌ 读取或解析文件出错:', err.message);
  process.exit(1);
}

const code = escodegen.generate(ast);

// 自动生成 output 路径
const outputPath = path.join(path.dirname(inputFile), 'output.js');
fs.writeFileSync(outputPath, code, 'utf-8');

console.log('✅ JS 代码已还原为', outputPath);
