import { useState, useMemo } from 'react'
import './App.css'
import CircleList from './components/CircleList';
import { mockData, type IMockData } from './mockData';

function App() {

  const [allPeriods, setAllPeriods] = useState<IMockData[]>(mockData);
  const [activePeriodNum, setActivePeriodNum] = useState<number>(
    allPeriods.find(period => period.isChoose)?.periodNum ?? allPeriods[0].periodNum
  );

  const active = useMemo(() => {
    return allPeriods.find(period => period.periodNum === activePeriodNum)
  }, [allPeriods, activePeriodNum]
  );

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
    setAllPeriods(prev =>
      prev.map(p => ({ ...p, isChoose: p.periodNum === num }))
    );
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
          <span className='start-data-lable'>{active?.startData}</span>
          <span className='end-data-lable'>{active?.endData}</span>
        </h1>

        <div className='circle-container'>
          <ul className='circle'
            style={{
              transform: `rotate(${angleRotate}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 600ms ease-in-out'
            }}>
            {
              allPeriods.map((period, index) => {
                const a = index * 60;
                const b = -a - angleRotate;
                const position = `rotate(${a}deg) translate(264px) rotate(${b}deg)`;
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

        <div className='slider-container'>
          <button className='slider-left-button'>
            <svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M8.49988 0.750001L2.24988 7L8.49988 13.25' strokeWidth='2' />
            </svg>
          </button>

          <ul className='slider'>
            <li className='slider-elem'>
              <h3 className='elem-title'>2015</h3>
              <p className='elem-text'>
                13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
              </p>
            </li>
            <li className='slider-elem' style={{ width: '400px' }}>
              <h3 className='elem-title'>2016</h3>
              <p className='elem-text'>
                Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11
              </p>
            </li>
            <li className='slider-elem'>
              <h3 className='elem-title'>2017</h3>
              <p className='elem-text'>
                Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi
              </p>
            </li>
          </ul>

          <button className='slider-right-button active'>
            <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M1 1L6 6L1 11' strokeWidth='2' />
            </svg>
          </button>
        </div>

      </div>
    </main>
  )
}

export default App
