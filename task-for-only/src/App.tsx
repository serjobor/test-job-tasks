import { useState, useMemo, useRef, useEffect } from 'react'
import CircleList from './components/CircleList';
import { mockData, type IMockData } from './mockData';
import SimpleSlider from './components/Slider';

function App() {

  const [allPeriods, setAllPeriods] = useState<IMockData[]>(mockData);
  const [activePeriodNum, setActivePeriodNum] = useState<number>(
    allPeriods.find(period => period.isChoose)?.periodNum ?? allPeriods[0].periodNum
  );

  const [labelPeriodNum, setLabelPeriodNum] = useState<number>(activePeriodNum);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const circleRef = useRef<HTMLUListElement>(null);

  const active = useMemo(() => {
    return allPeriods.find(period => period.periodNum === activePeriodNum)
  }, [allPeriods, activePeriodNum]
  );

  const labelPeriod = useMemo(() => {
    return allPeriods.find(period => period.periodNum === labelPeriodNum)
  }, [allPeriods, labelPeriodNum]
  );

  const [displayedStart, setDisplayedStart] = useState<number>(active?.startData ?? 0);
  const [displayedEnd, setDisplayedEnd] = useState<number>(active?.endData ?? 0);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  function animateNumbers(
    fromStart: number,
    toStart: number,
    fromEnd: number,
    toEnd: number,
    duration = 600
  ) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;

    const step = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const p = Math.min(1, elapsed / duration);
      const k = easeOutCubic(p);

      const curStart = Math.round(fromStart + (toStart - fromStart) * k);
      const curEnd = Math.round(fromEnd + (toEnd - fromEnd) * k);

      setDisplayedStart(curStart);
      setDisplayedEnd(curEnd);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }

  // вывод дат выбранного периода при первом рендере
  useEffect(() => {
    if (active) {
      setDisplayedStart(active.startData);
      setDisplayedEnd(active.endData);
    }
  }, []);

  const periodCount = allPeriods.length;
  const leftEnabled = activePeriodNum > 1;
  const rightEnabled = activePeriodNum < periodCount;

  const targetAngles: any = {
    '1': -60,
    '2': -120,
    '3': -180,
    '4': -240,
    '5': -300,
    '6': 0
  };

  const [angleRotate, setAngleRotate] = useState(0);

  function rotateCircle(targetNum: number) {
    const desiredDir = targetNum > activePeriodNum ? -1 : 1;
    const absoluteTarget = targetAngles[targetNum] as number;

    setAngleRotate(prev => {
      let shortest = ((absoluteTarget - prev + 540) % 360) - 180;

      if (desiredDir === -1 && shortest > 0) shortest -= 360;
      if (desiredDir === 1 && shortest < 0) shortest += 360;

      return prev + shortest;
    });
  }

  const selectPeriod = (num: number) => {
    setIsAnimating(true);
    setAllPeriods(prev =>
      prev.map(p => ({ ...p, isChoose: p.periodNum === num }))
    );

    // находим целевые значения до поворота
    const target = allPeriods.find(p => p.periodNum === num);
    if (target) {
      animateNumbers(
        displayedStart,
        target.startData,
        displayedEnd,
        target.endData,
        600 // длительность вращения круга
      );
    }

    rotateCircle(num);
    setActivePeriodNum(num);
  };

  const goLeft = () => {
    if (!leftEnabled) return;
    selectPeriod(activePeriodNum - 1);
  };

  const goRight = () => {
    if (!rightEnabled) return;
    selectPeriod(activePeriodNum + 1);
  };

  return (
    <main className='main'>
      <div className='main-container'>

        <div className='horizontal-line'></div>
        <div className='vertical-line'></div>

        <div className='second-lable'>
          <div className='gradient-stick'></div>
          <h2 className='history-date-title'>Исторические даты</h2>
        </div>

        <h1 className='main-lable'>
          <span className='start-data-lable'>{displayedStart}</span>
          <span className='end-data-lable'>{displayedEnd}</span>
        </h1>

        <div className='circle-container'>
          <span
            className='events-name'
            style={{ opacity: isAnimating ? 0 : 1, transition: 'opacity 150ms ease' }}
          >
            {labelPeriod?.eventsName}
          </span>
          <ul
            ref={circleRef}
            className='circle'
            style={{
              transform: `rotate(${angleRotate}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 600ms ease-in-out'
            }}
            onTransitionEnd={(e) => {
              if (e.target === circleRef.current) {
                setLabelPeriodNum(activePeriodNum);
                setIsAnimating(false);
              }
            }}>
            {
              allPeriods.map((period, index) => {
                const a = index * 60;
                const b = -a - angleRotate;
                const position = `rotate(${a}deg) translate(265px) rotate(${b}deg)`;
                return (
                  <CircleList
                    key={period.periodNum}
                    dotNum={period.periodNum}
                    position={position}
                    isChoose={period.isChoose}
                    onClick={() => selectPeriod(period.periodNum)}
                  />
                );
              })
            }
          </ul>
        </div>

        <div className='switch-container'>
          <div className='selected-switch'>0{activePeriodNum}/06</div>
          <div className='switch-buttons'>
            <button
              className={`left-switch ${(leftEnabled) ? 'selected-btn' : ''}`}
              onClick={goLeft}
              disabled={!leftEnabled}
              aria-disabled={!leftEnabled}
            >
              <svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8.49988 0.750001L2.24988 7L8.49988 13.25' strokeWidth='2' />
              </svg>
            </button>
            <button
              className={`right-switch ${(rightEnabled) ? 'selected-btn' : ''}`}
              onClick={goRight}
              disabled={!rightEnabled}
              aria-disabled={!rightEnabled}>
              <svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M1.50012 0.750001L7.75012 7L1.50012 13.25' strokeWidth='2' />
              </svg>
            </button>
          </div>
        </div>

        <SimpleSlider events={active?.events || []} />

      </div>
    </main>
  )
}

export default App
