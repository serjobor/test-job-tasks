import { CircleListProps } from '../../types';

const CircleList = ({ 
  dotNum, 
  position, 
  isChoose, 
  onClick 
}: CircleListProps) => {
  return (
    <li 
      className={`dot ${isChoose ? 'choose-num' : ''}`}
      onClick={onClick}
      style={{
        transform: position,
        transition: '600ms'
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Select period ${dotNum}`}
    >
      <span className="dot-num">{dotNum}</span>
    </li>
  );
};

export default CircleList;