const { app, BrowserWindow, ipcMain } = require("electron");
const os = require("os");
const { exec } = require("child_process");
const path = require("path");
const util = require("util");
const execPromise = util.promisify(exec);
const http = require("http");

// Variables pour le calcul CPU
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
  const platform = process.platform;

  try {
    if (platform === "win32") {
      const { stdout } = await execPromise(
        'powershell "Get-PSDrive C | Select-Object Used,Free | ConvertTo-Json"'
      );

      const data = JSON.parse(stdout);
      const used = parseInt(data.Used);
      const free = parseInt(data.Free);
      const total = used + free;

      return {
        used: used / 1024 ** 3,
        total: total / 1024 ** 3,
        percent: (used / total) * 100,
      };
    } else if (platform === "darwin") {
      const { stdout } = await execPromise("df -k /");
      const lines = stdout.trim().split("\n");
      const data = lines[1].split(/\s+/);

      const total = parseInt(data[1]) * 1024;
      const used = parseInt(data[2]) * 1024;

      return {
        used: used / 1024 ** 3,
        total: total / 1024 ** 3,
        percent: (used / total) * 100,
      };
    } else {
      const { stdout } = await execPromise("df -k /");
      const lines = stdout.trim().split("\n");
      const data = lines[1].split(/\s+/);

      const total = parseInt(data[1]) * 1024;
      const used = parseInt(data[2]) * 1024;

      return {
        used: used / 1024 ** 3,
        total: total / 1024 ** 3,
        percent: (used / total) * 100,
      };
    }
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
    uptime: os.uptime(),
  };
});

function waitForServer(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkServer = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) {
            console.log("✅ Serveur React prêt !");
            resolve();
          } else {
            retry();
          }
        })
        .on("error", () => {
          retry();
        });
    };

    const retry = () => {
      if (Date.now() - startTime > timeout) {
        reject(new Error("Timeout: le serveur React n'a pas démarré"));
      } else {
        setTimeout(checkServer, 200);
      }
    };

    checkServer();
  });
}

async function createWindow() {
  console.log("⏳ Attente du serveur React...");

  try {
    await waitForServer("http://localhost:3000");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    app.quit();
    return;
  }

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

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: blob: https:; " + // ← Images HTTPS autorisées
            "font-src 'self' data:; " +
            "connect-src 'self' http://localhost:* ws://localhost:* https:",
        ],
      },
    });
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
