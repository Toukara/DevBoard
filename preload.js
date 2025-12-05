const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemStats: () => ipcRenderer.invoke("get-system-stats"),
});

console.log("Preload script loaded!");
