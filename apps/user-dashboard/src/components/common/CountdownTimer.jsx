import { useState, useEffect } from 'react';
import { addMinutes, differenceInSeconds, isPast } from 'date-fns';
import { getScheduleDateTime } from './dateHelpers';

export default function CountdownTimer({ schedule, className = '' }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!schedule?.date || schedule?.shift?.startTime == null) return;

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const calculateTimeRemaining = () => {
      const shiftStartTime = getScheduleDateTime(schedule, userTimezone);

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

    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      const t = calculateTimeRemaining();
      setTimeRemaining(t);

      if (!t || t.totalSeconds <= 0) {
        setIsOver(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  if (!schedule?.date || schedule?.shift?.startTime == null) {
    return <span className={className}>Time not available</span>;
  }

  if (isOver) {
    return <span className={className}>Schedule is over</span>;
  }

  if (!timeRemaining) {
    return <span className={className}>Loading...</span>;
  }

  const { days, hours, minutes, seconds, totalSeconds } = timeRemaining;
  const isUrgent = totalSeconds < 300;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
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
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold tabular-nums">
          {String(hours).padStart(2, '0')}
        </span>
        <span className="text-xs text-gray-500">hrs</span>
      </div>
      <span className="text-gray-400">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold tabular-nums">
          {String(minutes).padStart(2, '0')}
        </span>
        <span className="text-xs text-gray-500">min</span>
      </div>
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
