import { useState, useEffect } from 'react';

interface UseCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
}

export const useCounter = ({ end, start = 0, duration = 2000, delay = 0 }: UseCounterProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const difference = end - start;
      
      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear (doğrusal) artış
        const currentCount = Math.round(start + difference * progress);
        if (progress < 1) {
          setCount(currentCount);
          setTimeout(updateCounter, 16);
        } else {
          setCount(end); // Son değeri garanti et
        }
      };
      
      updateCounter();
    }, delay);

    return () => clearTimeout(timer);
  }, [end, start, duration, delay]);

  return count;
}; 