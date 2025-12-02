import { memo } from 'react';

interface NavigationControlsProps {
  activePeriodNum: number;
  totalPeriods: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationControls = memo(({
  activePeriodNum,
  totalPeriods,
  onPrevious,
  onNext
}: NavigationControlsProps) => {
  const leftEnabled = activePeriodNum > 1;
  const rightEnabled = activePeriodNum < totalPeriods;

  return (
    <div className="switch-container">
      <div className="selected-switch">0{activePeriodNum}/06</div>
      <div className="switch-buttons">
        <button
          className={`left-switch ${leftEnabled ? 'selected-btn' : ''}`}
          onClick={onPrevious}
          disabled={!leftEnabled}
          aria-disabled={!leftEnabled}
          aria-label="Previous period"
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" strokeWidth="2" />
          </svg>
        </button>
        <button
          className={`right-switch ${rightEnabled ? 'selected-btn' : ''}`}
          onClick={onNext}
          disabled={!rightEnabled}
          aria-disabled={!rightEnabled}
          aria-label="Next period"
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
});

NavigationControls.displayName = 'NavigationControls';

export default NavigationControls;
