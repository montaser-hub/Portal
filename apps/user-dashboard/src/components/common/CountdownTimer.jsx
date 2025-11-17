import { useState, useEffect } from 'react';
import { addMinutes, differenceInSeconds, isPast } from 'date-fns';

export default function CountdownTimer({ schedule, className = '' }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!schedule?.date || !schedule?.shift?.startTime) {
      return;
    }

    const calculateTimeRemaining = () => {
      const scheduleDate = new Date(schedule.date);
      const shiftStartTime = addMinutes(scheduleDate, schedule.shift.startTime);

      if (isPast(shiftStartTime)) {
        setIsOver(true);
        return null;
      }

      const totalSeconds = differenceInSeconds(shiftStartTime, new Date());

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return { days, hours, minutes, seconds, totalSeconds };
    };

    // Initial calculation
    const initial = calculateTimeRemaining();
    setTimeRemaining(initial);

    // Update every second
    const interval = setInterval(() => {
      const time = calculateTimeRemaining();
      setTimeRemaining(time);

      // Stop interval if schedule is over
      if (!time || time.totalSeconds <= 0) {
        setIsOver(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  if (!schedule?.date || !schedule?.shift?.startTime) {
    return <span className={className}>Time not available</span>;
  }

  if (isOver) {
    return <span className={className}>Schedule is over</span>;
  }

  if (!timeRemaining) {
    return <span className={className}>Loading...</span>;
  }

  const { days, hours, minutes, seconds, totalSeconds } = timeRemaining;

  // Determine if starting soon (less than 1 hour)
  const isStartingSoon = totalSeconds < 3600;
  const isUrgent = totalSeconds < 300; // Less than 5 minutes

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Days */}
      {days > 0 && (
        <>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums">{days}</span>
            <span className="text-xs text-gray-500">
              day{days !== 1 ? 's' : ''}
            </span>
          </div>
          <span className="text-gray-400">:</span>
        </>
      )}

      {/* Hours */}
      {(days > 0 || hours > 0) && (
        <>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold tabular-nums">
              {String(hours).padStart(2, '0')}
            </span>
            <span className="text-xs text-gray-500">hrs</span>
          </div>
          <span className="text-gray-400">:</span>
        </>
      )}

      {/* Minutes */}
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold tabular-nums">
          {String(minutes).padStart(2, '0')}
        </span>
        <span className="text-xs text-gray-500">min</span>
      </div>

      {/* Seconds - Always shown */}
      <span
        className={`${
          isUrgent ? 'animate-pulse text-red-500' : 'text-gray-400'
        }`}
      >
        :
      </span>
      <div className="flex flex-col items-center">
        <span
          className={`text-2xl font-bold tabular-nums ${
            isUrgent ? 'text-red-600' : ''
          }`}
        >
          {String(seconds).padStart(2, '0')}
        </span>
        <span className="text-xs text-gray-500">sec</span>
      </div>
    </div>
  );
}
