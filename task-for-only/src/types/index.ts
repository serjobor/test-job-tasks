export interface IEvent {
  year: number;
  text: string;
}

export interface IPeriod {
  periodNum: number;
  startData: number;
  endData: number;
  eventsName: string;
  events: IEvent[];
  isChoose: boolean;
}

export interface CircleListProps {
  dotNum: number;
  position: string;
  isChoose: boolean;
  onClick: () => void;
}

export interface SliderProps {
  events: IEvent[];
}

export interface AnimationState {
  isAnimating: boolean;
  displayedStart: number;
  displayedEnd: number;
}

export interface CircleState {
  angleRotate: number;
  activePeriodNum: number;
  labelPeriodNum: number;
}

export type PeriodCount = 2 | 3 | 4 | 5 | 6;
