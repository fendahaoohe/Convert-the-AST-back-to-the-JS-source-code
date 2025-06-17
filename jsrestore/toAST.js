const fs = require('fs');
const esprima = require('esprima');

// 获取命令行参数
const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('❌ 用法错误：node toAST.js 输入文件路径 输出文件路径');
  process.exit(1);
}

try {
  const code = fs.readFileSync(inputPath, 'utf-8');
  const ast = esprima.parseScript(code, { range: true, loc: true, comment: true });
  fs.writeFileSync(outputPath, JSON.stringify(ast, null, 2), 'utf-8');
  console.log(`✅ AST 已写入 ${outputPath}`);
} catch (err) {
  console.error('❌ 出错:', err.message);
}
