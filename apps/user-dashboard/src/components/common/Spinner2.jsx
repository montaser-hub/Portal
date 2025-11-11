
import React from "react";

export default function HeartbeatSpinner() {
  const animationDuration = 1.5;
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <style>{`
        @keyframes moveDot {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        @keyframes drawLine {
          0% { stroke-dashoffset: 800; }
          100% { stroke-dashoffset: 180; }
        }
        .ecg-container {
          width: 400px;
          height: 150px;
          position: relative;
        }
        .ecg-dot {
          width: 14px;
          height: 14px;
          background: #00ff88;
          border-radius: 50%;
          position: absolute;
          offset-path: path("M0 75 L50 75 L70 75 L85 35 L100 115 L115 75 L180 75 L200 75 L215 40 L230 110 L245 75 L310 75 L400 75");
          animation: moveDot ${animationDuration}s linear infinite;
          box-shadow: 0 0 15px #00ff88, 0 0 30px #00ff88, 0 0 45px #00ff88;
          z-index: 10;
        }
        .ecg-line {
          stroke: #00ff88;
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: drawLine ${animationDuration}s linear infinite;
          filter: drop-shadow(0 0 8px #00ff88);
        }
        .ecg-grid line {
          stroke: rgba(0, 255, 136, 0.1);
          stroke-width: 1;
        }
      `}</style>
      <div className="ecg-container">
        <svg width="400" height="150" className="absolute top-0 left-0">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" />
              <line x1="0" y1="0" x2="20" y2="0" />
            </pattern>
          </defs>
          <rect width="400" height="150" fill="url(#grid)" className="ecg-grid" />
          <path
            className="ecg-line"
            d="M0 75 L50 75 L70 75 L85 35 L100 115 L115 75 L180 75 L200 75 L215 40 L230 110 L245 75 L310 75 L400 75"
          />
        </svg>
        <div className="ecg-dot"></div>
      </div>
    </div>
  );
}
