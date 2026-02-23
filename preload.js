const { contextBridge, ipcRenderer, shell } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemStats: () => ipcRenderer.invoke("get-system-stats"),
  openExternal: (url) => {
    try {
      return shell.openExternal(url);
    } catch (e) {
      console.error("Failed to open external URL:", e);
      return null;
    }
  },
});

console.log("Preload script loaded!");
