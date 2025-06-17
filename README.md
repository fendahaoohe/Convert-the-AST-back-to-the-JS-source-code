![2c6d139cc8b3f8454cd4bd8a70b7d0a](https://github.com/user-attachments/assets/35d9fdba-af48-4456-9562-8efa8b44a97c)# Convert-the-AST-back-to-the-JS-source-code
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
