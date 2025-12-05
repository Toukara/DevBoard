import React, { useState, useEffect } from "react";

export default function PCPerformanceWidget() {
  const [stats, setStats] = useState({
    cpu: 0,
    memory: { used: 0, total: 0, percent: 0 },
    disk: { used: 0, total: 0, percent: 0 },
  });

  useEffect(() => {
    const updateStats = async () => {
      console.log("Fetching system stats...");
      console.log("window.electronAPI:", window.electronAPI);
      if (window.electronAPI) {
        try {
          const data = await window.electronAPI.getSystemStats();
          setStats(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des stats:", error);
        }
      } else return;
    };

    updateStats();
    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes) => {
    return `${bytes.toFixed(1)} GB`;
  };

  return (
    <>
      <div>
        <h2>Need to be use in electron to work</h2>
        <h2>Performances Système</h2>

        <p>
          <strong>CPU :</strong> {stats.cpu.toFixed(1)}%
        </p>

        <p>
          <strong>RAM :</strong> {formatBytes(stats.memory.used)} /{" "}
          {formatBytes(stats.memory.total)} ({stats.memory.percent.toFixed(1)}%)
        </p>

        <p>
          <strong>Disque :</strong> {formatBytes(stats.disk.used)} /{" "}
          {formatBytes(stats.disk.total)} ({stats.disk.percent.toFixed(1)}%)
        </p>
      </div>
    </>
  );
}
