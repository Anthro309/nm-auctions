import { useState, useEffect } from 'react';

export function useCountdown(ends) {
  const [remaining, setRemaining] = useState(ends - Date.now());
  useEffect(() => {
    const t = setInterval(() => setRemaining(ends - Date.now()), 1000);
    return () => clearInterval(t);
  }, [ends]);
  return remaining;
}

export function formatCountdown(ms) {
  if (ms <= 0) return 'Ended';
  const totalSec = Math.floor(ms / 1000);
  const days    = Math.floor(totalSec / 86400);
  const hours   = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (days > 1)    return `${days}d ${hours}h`;
  if (hours > 0)   return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}
