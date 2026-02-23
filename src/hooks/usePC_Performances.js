import { useEffect, useState } from "react";

export default function PCPerformanceWidget() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      console.log("Fetching system stats...");
      if (window.electronAPI) {
        try {
          const data = await window.electronAPI.getSystemStats();
          setStats(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des stats:", error);
        }
      } else {
        setStats(null);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  console.log("Current stats:", stats);
}

export { PCPerformanceWidget };
