import React, { useState, useEffect } from "react";

export default function PhoneFrame({ children }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "오후" : "오전";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="phone-container">
      {/* Device notch / speaker area */}
      <div className="device-speaker"></div>
      <div className="device-island">
        <div className="device-island-camera"></div>
        <div className="device-island-sensor"></div>
      </div>

      <div className="phone-screen">
        {/* iOS style Status Bar */}
        <div className="status-bar">
          <span style={{ fontSize: "13px", fontWeight: "700" }}>{time}</span>
          <div className="status-icons">
            {/* Cellular signal */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M2 22h20V2L2 22z" />
            </svg>
            {/* Wifi */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 21l-12-12c5-5 14-5 19 0l-7 12z" />
            </svg>
            {/* Battery */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ marginLeft: "2px" }}>
              <path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m2 3h2v8h-2V8z" />
            </svg>
          </div>
        </div>

        {/* Screen Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
          {children}
        </div>

        {/* Home indicator bar */}
        <div className="home-indicator-bar"></div>
      </div>
    </div>
  );
}
