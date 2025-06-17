# Convert-the-AST-back-to-the-JS-source-code
适合CTF中的AST(JSON)代码转换成源JS代码，也可以使JS封装成AST
# 准备环境
首先需要确保安装好 Node.js 和 npm，且项目文件夹里安装了必要模块
写一个简单的命令行工具脚本，用 `esprima` 生成 AST
初始化 npm 项目并安装依赖
```
npm init -y
```
```
npm install esprima
```
修改 `package.json` 让它支持全局命令
	在 `package.json` 里添加：
```
"bin": {
  "esprima-cli": "./esprima-cli.js"
}
```
（注意在添加时一定要在上一语句中用"，"号结束）

如果是Linux/macOS，还需要给脚本加执行权限
```
chmod +x esprima-cli.js
```
![2c6d139cc8b3f8454cd4bd8a70b7d0a](https://github.com/user-attachments/assets/d186094a-cf24-4d01-9ade-b316a2328c77)
以上就是正确的示例
---
如果更改了位置怎么办？
进入对应目录
```
npm link
```

![3cc9ff75d25ec052f85c787117a2bc0](https://github.com/user-attachments/assets/042318df-00b8-44e3-b44b-61e05391e7c1)
这样就成功把 CLI 工具注册为全局命令

在任意位置（如 `C:\Users\lenovo`）都可以直接运行：
```
esprima-cli F:\123.js --format=json > ast.json
```
如果以后换了电脑或路径改了，只需要重新执行一次 `npm link` 即可重新注册全局命令。

还没完还需要在当前目录（`F:\tools\jsrestore`）中安装 `escodegen` 模块。==（当前目录！！！）==
```
npm install escodegen
```
想取消这个全局命令？
```
npm unlink -g
```

---

### 封装
写一个`toAST.js`脚本（保存到 `F:\tools\jsrestore\toAST.js`）
```
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
```
命令如下
```
node toAST.js 输入路径 输出路径\文件名.json
```
功能
- ✅ 把 JS 文件转换为 AST（JSON）
    
- ✅ 输出到 **指定目录**
    
- ✅ 可以 自定义输出文件名

---
### 还原
写一个`restore.js`脚本（保存到 `F:\tools\jsrestore\restore.js`）
```
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

```
命令如下
```
node restore.js 目标AST文件
```
会输出到"F\\output.js"
直接运行
```
node F:\output.js
```
即可在终端看到js代码结果
支持
- ✅ 接收命令行参数来指定 AST 文件路径（例如：`node restore.js F:/abc.json`）
    
- ✅ 自动还原 JS 并写入同目录下的 `output.js`
    
- ✅ 支持错误提示
---
![0d7854a516b229ac7f24939542c156d](https://github.com/user-attachments/assets/b99e3aee-4cc6-4fc9-b3ea-41ff844ca919)
好的现在一切准备就绪，可以进行封装和还原JS 了
祝你玩的开心！
