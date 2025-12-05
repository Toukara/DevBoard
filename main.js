const { app, BrowserWindow, ipcMain } = require("electron");
const os = require("os");
const { exec } = require("child_process");
const path = require("path");
const util = require("util");
const execPromise = util.promisify(exec);

const checkDiskSpace = require("check-disk-space").default;

// ... (gardez vos fonctions getCpuUsage et getDiskSpace)

let previousCpuInfo = null;

function getCpuUsage() {
  const cpus = os.cpus();

  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  const currentCpuInfo = { idle: totalIdle, total: totalTick };

  if (!previousCpuInfo) {
    previousCpuInfo = currentCpuInfo;
    return 0;
  }

  const idleDiff = currentCpuInfo.idle - previousCpuInfo.idle;
  const totalDiff = currentCpuInfo.total - previousCpuInfo.total;

  const cpuPercentage = 100 - (100 * idleDiff) / totalDiff;

  previousCpuInfo = currentCpuInfo;

  return Math.max(0, Math.min(100, cpuPercentage));
}

async function getDiskSpace() {
  try {
    // Pour Windows : 'C:/', pour macOS/Linux : '/'
    const diskPath = process.platform === "win32" ? "C:/" : "/";
    const diskSpace = await checkDiskSpace(diskPath);

    return {
      used: (diskSpace.size - diskSpace.free) / 1024 ** 3,
      total: diskSpace.size / 1024 ** 3,
      percent: ((diskSpace.size - diskSpace.free) / diskSpace.size) * 100,
    };
  } catch (error) {
    console.error("Erreur récupération disque:", error);
    return {
      used: 0,
      total: 0,
      percent: 0,
    };
  }
}

ipcMain.handle("get-system-stats", async () => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  const cpuUsage = getCpuUsage();
  const diskSpace = await getDiskSpace();

  return {
    cpu: cpuUsage,
    memory: {
      used: usedMem / 1024 ** 3,
      total: totalMem / 1024 ** 3,
      percent: (usedMem / totalMem) * 100,
    },
    disk: diskSpace,
  };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: false,
    },
  });

  // Configuration CORS + CSP corrigée
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "connect-src *",
          +"img-src 'self' data: https://openweathermap.org",
        ],
      },
    });
  });

  win.webContents.on("did-finish-load", () => {
    win.show();
  });

  win.webContents.on("did-fail-load", () => {
    console.log("Échec du chargement, réessai...");
    setTimeout(() => {
      win.loadURL("http://localhost:3000");
    }, 1000);
  });

  win.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
