Electron setup

Development (run server + React dev server + Electron):

```
npm run electron:dev
```

Production (build the React app, then start Electron which will load `build/index.html`):

```
npm run build
npm run electron:prod
```

Notes:

- The Electron main entry is `electron-main.js` and a small `preload.js` is provided.
- In development the script waits for `http://localhost:3000` before launching Electron.
