import { useRef } from 'react';
import CircleList from '../CircleList';
import { ANGLE_STEP, CIRCLE_RADIUS } from '../../constants';
import { IPeriod } from '../../types';

interface TimelineCircleProps {
  periods: IPeriod[];
  angleRotate: number;
  activePeriodNum: number;
  labelPeriodNum: number;
  isAnimating: boolean;
  onPeriodSelect: (num: number) => void;
  onTransitionEnd: () => void;
}

const TimelineCircle = ({
  periods,
  angleRotate,
  activePeriodNum,
  labelPeriodNum,
  isAnimating,
  onPeriodSelect,
  onTransitionEnd
}: TimelineCircleProps) => {
  const circleRef = useRef<HTMLUListElement>(null);

  const activePeriod = periods.find(period => period.periodNum === activePeriodNum);
  const labelPeriod = periods.find(period => period.periodNum === labelPeriodNum);

  return (
    <div className="circle-container">
      <span
        className="events-name"
        style={{ 
          opacity: isAnimating ? 0 : 1, 
          transition: 'opacity 150ms ease' 
        }}
      >
        {labelPeriod?.eventsName}
      </span>
      <ul
        ref={circleRef}
        className="circle"
        style={{
          transform: `rotate(${angleRotate}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 600ms ease-in-out'
        }}
        onTransitionEnd={(e) => {
          if (e.target === circleRef.current) {
            onTransitionEnd();
          }
        }}
      >
        {periods.map((period, index) => {
          const angle = index * ANGLE_STEP;
          const reverseAngle = -angle - angleRotate;
          const position = `rotate(${angle}deg) translate(${CIRCLE_RADIUS}px) rotate(${reverseAngle}deg)`;
          
          return (
            <CircleList
              key={period.periodNum}
              dotNum={period.periodNum}
              position={position}
              isChoose={period.isChoose}
              onClick={() => onPeriodSelect(period.periodNum)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TimelineCircle;
