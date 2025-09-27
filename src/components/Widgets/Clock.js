import { useEffect, useState } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds();
  const percent = (seconds / 60) * 100;
  const radius = 104;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  // Start at top (12h): rotate -90deg
  const offset = circumference * (1 - percent / 100);

  return (
    <div
      className="widget clock-widget"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <svg width="220" height="220" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="transparent"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#A8A8A8"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s linear" }}
          transform="rotate(-90 110 110)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="3.6rem"
          fill="#A8A8A8"
          fontWeight="bold"
        >
          {hours} : {minutes}
        </text>
      </svg>
    </div>
  );
}

export default Clock;
