import { useState, useMemo, useCallback, useEffect } from 'react';
import { mockData } from './mockData';
import { IPeriod } from './types';
import { useNumberAnimation } from './hooks/useNumberAnimation';
import { useCircleState } from './hooks/useCircleState';
import { ANIMATION_DURATION } from './constants';

// Components
import TimelineCircle from './components/TimelineCircle';
import DateDisplay from './components/DateDisplay';
import NavigationControls from './components/NavigationControls';
import SimpleSlider from './components/Slider';
import MobileDots from './components/MobileDots';

const App = () => {
  // State management
  const [allPeriods, setAllPeriods] = useState<IPeriod[]>(mockData);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Find initial active period
  const initialActivePeriod = useMemo(() => 
    allPeriods.find(period => period.isChoose)?.periodNum ?? allPeriods[0].periodNum,
    [allPeriods]
  );

  // Custom hooks
  const { displayedStart, displayedEnd, animateNumbers, setDisplayedValues } = useNumberAnimation();
  const { 
    angleRotate, 
    activePeriodNum, 
    labelPeriodNum, 
    rotateCircle, 
    setActivePeriod, 
    setLabelPeriod 
  } = useCircleState(initialActivePeriod);

  // Computed values
  const activePeriod = useMemo(() => 
    allPeriods.find(period => period.periodNum === activePeriodNum),
    [allPeriods, activePeriodNum]
  );

  const periodCount = allPeriods.length;

  // Initialize displayed values on first render
  useEffect(() => {
    if (activePeriod) {
      setDisplayedValues(activePeriod.startData, activePeriod.endData);
    }
  }, []);

  // Period selection handler
  const selectPeriod = useCallback((num: number) => {
    setIsAnimating(true);
    
    // Update periods state
    setAllPeriods(prev =>
      prev.map(p => ({ ...p, isChoose: p.periodNum === num }))
    );

    // Find target period for animation
    const targetPeriod = allPeriods.find(p => p.periodNum === num);
    if (targetPeriod) {
      animateNumbers(
        displayedStart,
        targetPeriod.startData,
        displayedEnd,
        targetPeriod.endData,
        ANIMATION_DURATION
      );
    }

    // Rotate circle and update active period
    rotateCircle(num, activePeriodNum);
    setActivePeriod(num);

    // Reset animation state after duration
    setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, [allPeriods, displayedStart, displayedEnd, animateNumbers, rotateCircle, activePeriodNum, setActivePeriod]);

  // Navigation handlers
  const goLeft = useCallback(() => {
    if (activePeriodNum > 1) {
      selectPeriod(activePeriodNum - 1);
    }
  }, [activePeriodNum, selectPeriod]);

  const goRight = useCallback(() => {
    if (activePeriodNum < periodCount) {
      selectPeriod(activePeriodNum + 1);
    }
  }, [activePeriodNum, periodCount, selectPeriod]);

  // Transition end handler
  const handleTransitionEnd = useCallback(() => {
    setLabelPeriod(activePeriodNum);
    setIsAnimating(false);
  }, [activePeriodNum, setLabelPeriod]);

  return (
    <main className="main">
      <div className="main-container">
        {/* Decorative lines */}
        <div className="horizontal-line"></div>
        <div className="vertical-line"></div>

        {/* Header section */}
        <div className="second-lable">
          <div className="gradient-stick"></div>
          <h2 className="history-date-title">Исторические даты</h2>
        </div>

        {/* Date display */}
        <DateDisplay startYear={displayedStart} endYear={displayedEnd} />

        {/* Timeline circle */}
        <TimelineCircle
          periods={allPeriods}
          angleRotate={angleRotate}
          activePeriodNum={activePeriodNum}
          labelPeriodNum={labelPeriodNum}
          isAnimating={isAnimating}
          onPeriodSelect={selectPeriod}
          onTransitionEnd={handleTransitionEnd}
        />

        {/* Navigation controls */}
        <NavigationControls
          activePeriodNum={activePeriodNum}
          totalPeriods={periodCount}
          onPrevious={goLeft}
          onNext={goRight}
        />

        {/* Events slider */}
        <div 
          className="slider-container"
          style={{ opacity: isAnimating ? 0 : 1 }}
        >
          <SimpleSlider events={activePeriod?.events || []} />
        </div>

        {/* Mobile dots indicator */}
        <MobileDots
          periods={allPeriods}
          activePeriodNum={activePeriodNum}
          onPeriodSelect={selectPeriod}
        />
      </div>
    </main>
  );
};

export default App;