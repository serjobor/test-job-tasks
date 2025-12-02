import { memo } from 'react';

interface DateDisplayProps {
  startYear: number;
  endYear: number;
}

const DateDisplay = memo(({ startYear, endYear }: DateDisplayProps) => {
  return (
    <h1 className="main-lable">
      <span className="start-data-lable">{startYear}</span>
      <span className="end-data-lable">{endYear}</span>
    </h1>
  );
});

DateDisplay.displayName = 'DateDisplay';

export default DateDisplay;
