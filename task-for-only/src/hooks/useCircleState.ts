import { useState, useCallback } from 'react';
import { ROTATION_ANGLES } from '../constants';
import { CircleState } from '../types';

interface UseCircleStateReturn extends CircleState {
  rotateCircle: (targetNum: number, currentActiveNum: number) => void;
  setActivePeriod: (num: number) => void;
  setLabelPeriod: (num: number) => void;
}

export const useCircleState = (initialActivePeriod: number): UseCircleStateReturn => {
  const [angleRotate, setAngleRotate] = useState(0);
  const [activePeriodNum, setActivePeriodNum] = useState(initialActivePeriod);
  const [labelPeriodNum, setLabelPeriodNum] = useState(initialActivePeriod);

  const rotateCircle = useCallback((targetNum: number, currentActiveNum: number) => {
    const desiredDirection = targetNum > currentActiveNum ? -1 : 1;
    const absoluteTarget = ROTATION_ANGLES[targetNum];

    setAngleRotate(prev => {
      let shortestPath = ((absoluteTarget - prev + 540) % 360) - 180;

      if (desiredDirection === -1 && shortestPath > 0) {
        shortestPath -= 360;
      }
      if (desiredDirection === 1 && shortestPath < 0) {
        shortestPath += 360;
      }

      return prev + shortestPath;
    });
  }, []);

  const setActivePeriod = useCallback((num: number) => {
    setActivePeriodNum(num);
  }, []);

  const setLabelPeriod = useCallback((num: number) => {
    setLabelPeriodNum(num);
  }, []);

  return {
    angleRotate,
    activePeriodNum,
    labelPeriodNum,
    rotateCircle,
    setActivePeriod,
    setLabelPeriod
  };
};
