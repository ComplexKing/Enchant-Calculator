# Minecraft Enchant Calculator

A web app that shows all Minecraft enchantments with details like max level, applicable items, conflicts, and versions supported.

---

## Features

* Lists every Minecraft enchantment
* Supports versions 1.12, 1.13, 1.16, 1.20, and 1.21
* Shows which items can have each enchantment
* Displays conflicts and treasure status
* Easy to use and responsive

---

## How to Run Locally

1. Clone the repo:

   ```bash
   git clone https://github.com/ComplexKing/Enchant-Calculator.git
   ```
2. Go to the project folder:

   ```bash
   cd Enchant-Calculator
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm run dev
   ```
5. Open your browser at [http://localhost:5173](http://localhost:5173)

---

## How to Deploy

Make sure your `package.json` has this:

```json
"homepage": "https://complexking.github.io/Enchant-Calculator"
```

Make sure `vite.config.js` has:

```js
export default defineConfig({
  base: '/Enchant-Calculator/',
})
```

Build and deploy with:

```bash
npm run build
npm run deploy
```

## Contributing

Feel free to open issues or pull requests to improve the app.

---

## License

MIT License — see the LICENSE file.
