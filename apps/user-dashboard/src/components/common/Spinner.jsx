import React from "react";
const ECGHeartSpinner = ({
  className = "w-20 h-20",
  heartColorClass = "text-teal-500",
  animationDuration = "1s",
}) => {
  const fullHeartPath =
    "M27.8,6.3C26.3,4.8,24.4,4,22.3,4c-2.1,0-4,0.8-5.4,2.3L16,7.2l-0.9-0.9C13.7,4.8,11.8,4,9.7,4c-2.1,0-4,0.8-5.4,2.3 c-3,3.1-3,8.1,0,11.1L15,28.6c0.3,0.3,0.6,0.4,1,0.4s0.7-0.2,1-0.4l10.8-11.1C30.7,14.4,30.7,9.4,27.8,6.3z";
  const ecgPathData =
    "M23,16h-3c-0.3,0-0.6-0.2-0.8-0.4l-0.9-1.4l-1.3,3.2C16.8,17.7,16.4,18,16,18c0,0,0,0,0,0c-0.4,0-0.7-0.2-0.9-0.6l-1.4-2.8l-1,1C12.5,15.9,12.3,16,12,16H9c-0.6,0-1-0.4-1-1s0.4-1,1-1h2.6l1.7-1.7c0.2-0.2,0.5-0.3,0.9-0.3c0.3,0.1,0.6,0.3,0.7,0.5l1,2l1.2-2.9c0.1-0.3,0.5-0.6,0.8-0.6c0.4,0,0.7,0.1,0.9,0.4l1.7,2.6H23c0.6,0,1,0.4,1,1S23.6,16,23,16z";
  return (
    <>
      <style>{`
        @keyframes heart-fill {
          0% { clip-path: inset(100% 0 0 0); }
          50% { clip-path: inset(0% 0 0 0); }
          51%, 100% { clip-path: inset(0% 0 0 0); }
        }
        @keyframes red-dot-ecg {
          0%, 50% { offset-distance: 20%; opacity: 0; filter: blur(0px) drop-shadow(0 0 0 red); }
          51% { opacity: 1; offset-distance: 20%; filter: blur(0px) drop-shadow(0 0 2px red); }
          70% { offset-distance: 50%; filter: blur(1px) drop-shadow(0 0 4px red); }
          90% { offset-distance: 80%; filter: blur(0px) drop-shadow(0 0 2px red); }
          95% { offset-distance: 80%; opacity: 1; filter: blur(0px) drop-shadow(0 0 0 red); }
          96%, 100% { opacity: 0; offset-distance: 80%; }
        }
        .glow {
          filter: drop-shadow(0 0 8px red);
        }
      `}</style>
      <div className="flex items-center justify-center w-screen h-screen">
  <div className={className}>
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d={fullHeartPath}
        fill="#14B8A6"
        style={{
          clipPath: "inset(100% 0 0 0)",
          animation: `heart-fill ${animationDuration} ease-in-out infinite`,
        }}
      />
      <path d={ecgPathData} fill="white" stroke="white" strokeWidth="0.4" />
      <circle
        className="glow"
        r="1.2"
        fill="red"
        style={{
          offsetPath: `path('${ecgPathData}')`,
          offsetDistance: "20%",
          animation: `red-dot-ecg ${animationDuration} linear infinite`,
        }}
      />
    </svg>
  </div>
</div>

    </>
  );
};

export default ECGHeartSpinner;
