import { useEffect } from 'react';
import axios from 'axios';

const updateTimeout = 10000;

/**
 * Simulates a change in the position of the car
 */
export const useFakeGPS = () => {
  const updateCarPosition = async () => {
    try {
      await axios.patch('/api/position');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      updateCarPosition();
    }, updateTimeout);
    return () => clearInterval(interval);
  }, []);
};
