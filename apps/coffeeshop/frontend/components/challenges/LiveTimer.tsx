'use client';

import { useState, useEffect, useCallback } from 'react';

interface LiveTimerProps {
  timeLimitMinutes: number;
  isRunning: boolean;
  onTimeUp?: () => void;
  onTick?: (remainingSeconds: number) => void;
  startTime?: Date;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

export function LiveTimer({
  timeLimitMinutes,
  isRunning,
  onTimeUp,
  onTick,
  startTime,
  size = 'lg',
  showProgress = true,
}: LiveTimerProps) {
  const totalSeconds = timeLimitMinutes * 60;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Calculate elapsed time from start
  const calculateElapsed = useCallback(() => {
    if (!startTime) return 0;
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    return Math.max(0, elapsed);
  }, [startTime]);

  useEffect(() => {
    if (!isRunning) return;

    // Set initial elapsed time
    if (startTime) {
      setElapsedSeconds(calculateElapsed());
    }

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newElapsed = startTime ? calculateElapsed() : prev + 1;

        // Check if time is up
        if (newElapsed >= totalSeconds) {
          onTimeUp?.();
          return totalSeconds;
        }

        // Callback with remaining time
        const remaining = totalSeconds - newElapsed;
        onTick?.(remaining);

        return newElapsed;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, startTime, totalSeconds, calculateElapsed, onTimeUp, onTick]);

  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  // Urgency colors
  const getUrgencyClass = () => {
    const percentRemaining = (remainingSeconds / totalSeconds) * 100;
    if (percentRemaining <= 10) return 'text-red-600 animate-pulse';
    if (percentRemaining <= 25) return 'text-red-500';
    if (percentRemaining <= 50) return 'text-orange-500';
    return 'text-green-600';
  };

  const getProgressColor = () => {
    const percentRemaining = (remainingSeconds / totalSeconds) * 100;
    if (percentRemaining <= 10) return 'bg-red-600';
    if (percentRemaining <= 25) return 'bg-red-500';
    if (percentRemaining <= 50) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <div className="text-center">
      {/* Timer Display */}
      <div className={`font-mono font-bold ${sizeClasses[size]} ${getUrgencyClass()}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      {/* Status text */}
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {remainingSeconds === 0 ? (
          <span className="font-bold text-red-600">TEMPO SCADUTO!</span>
        ) : remainingSeconds <= totalSeconds * 0.1 ? (
          <span className="animate-pulse font-bold text-red-600">SBRIGATI!</span>
        ) : (
          <span>Tempo rimasto</span>
        )}
      </p>

      {/* Progress bar */}
      {showProgress && (
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-1000 ease-linear`}
            style={{ width: `${100 - progress}%` }}
          />
        </div>
      )}

      {/* Elapsed time (smaller) */}
      <p className="mt-2 text-xs text-gray-400">
        Trascorsi: {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, '0')}{' '}
        / {timeLimitMinutes}:00
      </p>
    </div>
  );
}

// Standalone countdown timer for display purposes
export function CountdownDisplay({ minutes, seconds }: { minutes: number; seconds: number }) {
  return (
    <div className="flex items-center justify-center gap-1 font-mono">
      <div className="rounded-lg bg-gray-900 px-3 py-2 text-2xl font-bold text-white">
        {String(minutes).padStart(2, '0')}
      </div>
      <span className="text-2xl font-bold text-gray-600">:</span>
      <div className="rounded-lg bg-gray-900 px-3 py-2 text-2xl font-bold text-white">
        {String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}

// Timer that counts UP (for staff recording)
interface StopwatchProps {
  isRunning: boolean;
  onStop?: (elapsedMinutes: number) => void;
  maxMinutes?: number;
}

export function Stopwatch({ isRunning, onStop, maxMinutes }: StopwatchProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newElapsed = prev + 1;

        // Check if max time reached
        if (maxMinutes && newElapsed >= maxMinutes * 60) {
          onStop?.(maxMinutes);
          return maxMinutes * 60;
        }

        return newElapsed;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, maxMinutes, onStop]);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const elapsedMinutes = elapsedSeconds / 60;

  return (
    <div className="text-center">
      <div className="font-mono text-5xl font-bold text-gray-900 dark:text-white">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Tempo trascorso</p>
      {maxMinutes && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-orange-500 transition-all duration-1000"
            style={{ width: `${Math.min(100, (elapsedMinutes / maxMinutes) * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
