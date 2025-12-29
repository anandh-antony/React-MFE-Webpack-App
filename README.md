# React-MFE-Webpack-App — Custom Webpack Setup

A concise, step-by-step guide to set up a custom Webpack configuration for a React MFE app.

---

## ✅ Prerequisites

- Node.js and npm installed
- Basic knowledge of React

---

## 1. Initialize the project

```bash
mkdir React-MFE-Webpack-App
cd React-MFE-Webpack-App
npm init --y
```

This creates a basic Node project.

---

## 2. Install core dependencies

React:

```bash
npm install react react-dom
```

Webpack & related tools:

```bash
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin
```

- `webpack` → bundler
- `webpack-cli` → CLI commands
- `webpack-dev-server` → local dev server + HMR
- `html-webpack-plugin` → automatically injects bundled JS into HTML

---

## 3. Install Babel (for JSX & modern JS)

```bash
npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```

Browsers don’t understand JSX — Babel transpiles JSX + modern JS for browsers.

---

## 4. Create Babel config

Create `babel.config.json`:

```json
{
  "presets": ["@babel/preset-react"],
  "ignore": ["node_modules", "dist/*", "docs/dist/*"]
}
```

This enables:

- Modern JS → browser-compatible JS
- JSX → React code

---

## 5. Create HTML template

Create `public/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>MFE Host</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

## 6. Create React entry files

`src/App.js` (or `src/App.tsx` if using TypeScript):

```jsx
export default function App() {
  return <h1>Hello from Custom Webpack</h1>;
}
```

`src/index.js` (or `src/index.tsx`):

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 7. Install CSS & asset loaders

```bash
npm install -D css-loader style-loader
```

Add rules to your webpack module rules:

```js
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
},
{
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: 'asset/resource',
},
{
  test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
  type: 'asset/inline',
},
```

---

## 8. Create Webpack config files


`webpack.dev.js` (env-aware loader):

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

const mfConfig = require('./mf.config.dev.js');
const commonConfig = require('./webpack.common.js');

module.exports = {
  ...commonConfig,
  mode: "development",
  devtool: 'cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, "..", "dist"),
    port: 3001,
    open: true,
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin(mfConfig),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
  ],
};

```

`mf.config.dev.js` (mfe config):


```js

module.exports = {
  name: "host",
  filename: 'remoteEntry.js',
  remotes: {
    cart: "cart@http://localhost:3002/remoteEntry.js",
  },
  exposes: {
  },
  shared: {'react': {singleton: true}, "react-dom": {singleton: true}},
};

```

`webpack.common.js` (shared config):

```js
const path = require('path');

module.exports = {
 entry: path.resolve(__dirname, '..', './src/index.js'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
    ],
  },
  stats: 'errors-only',
};
```

**What this does:**

- Entry → `index.js`/`index.tsx`
- Babel → JSX & modern JS support
- HTML auto-generation
- Dev server with HMR

---

## 9. Useful npm scripts

Add to `package.json`:

```json
"scripts": {
  "start": "webpack serve --config config/webpack.dev.js",
  "build": "webpack --config config/webpack.prod.js"
}
```

Run dev server:

```bash
npm start
```

Build production bundle:

```bash
npm run build
```

---

## Notes & best practices

- If using `DefinePlugin` to inject values like `process.env.name`, do not put secrets there — bundle is public.
- For TypeScript, add a declaration for custom env keys (e.g., `name`) in `src/declarations.d.ts`:

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    name?: string;
  }
}
```

- Keep configs small and composable — split env-specific options into `webpack.dev.js` / `webpack.prod.js`.

---

