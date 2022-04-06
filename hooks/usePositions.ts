import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { CarPosition } from 'types';

const getPositionsTimeout = 10000;

interface UsePositions {
  positions: CarPosition[];
  called: boolean;
  getPositions: () => void;
  updateSearchingPhrase: (phraze: string) => void;
}

export const usePositions = (): UsePositions => {
  const [positions, setPositions] = useState<CarPosition[]>([]);
  const [called, setCalled] = useState<boolean>(false);
  const [searchBy, setSearchBy] = useState<string>('');

  const getPositions = useCallback(
    (phraze?: string) => {
      (async () => {
        try {
          const { data } = await axios.get(
            `/api/cars?searchBy=${phraze ?? searchBy}`
          );
          setPositions(data);
          if (!called) {
            setCalled(true);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    },
    [searchBy, setPositions, setCalled, called]
  );

  const updateSearchingPhrase = useCallback(
    (phraze: string) => {
      setSearchBy(phraze);
      getPositions(phraze);
    },
    [getPositions]
  );

  useEffect(() => {
    if (!positions.length) {
      getPositions();
    }

    // should be replace with websocket
    const interval = window.setInterval(() => {
      getPositions();
    }, getPositionsTimeout);
    return () => clearInterval(interval);
  }, [positions, getPositions]);

  return {
    positions,
    called,
    getPositions,
    updateSearchingPhrase,
  };
};
