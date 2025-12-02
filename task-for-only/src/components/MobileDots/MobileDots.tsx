import CircleList from '../CircleList';
import { IPeriod } from '../../types';

interface MobileDotsProps {
  periods: IPeriod[];
  activePeriodNum: number;
  onPeriodSelect: (num: number) => void;
}

const MobileDots = ({
  periods,
  activePeriodNum,
  onPeriodSelect
}: MobileDotsProps) => {
  return (
    <div className="dot-container">
      <ul className="dot-list">
        {periods.map((period) => (
          <CircleList
            key={period.periodNum}
            dotNum={period.periodNum}
            position=""
            isChoose={period.isChoose}
            onClick={() => onPeriodSelect(period.periodNum)}
          />
        ))}
      </ul>
    </div>
  );
};

export default MobileDots;
