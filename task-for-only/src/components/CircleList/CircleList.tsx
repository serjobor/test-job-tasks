interface CircleListProps {
  dotNum: number;
  position: string;
  isChoose: boolean;
  onClick: () => void;
}; 

const CircleList = ({ dotNum, position, isChoose, onClick }: CircleListProps) => {
  
  return (
    <li 
      className={`dot ${isChoose ? 'choose-num' : ''}`}
      onClick={onClick}
      style={{
        transform: `${position}`,
      }}
    >
      <span className='dot-num'>{dotNum}</span>
    </li>
  )
};

export default CircleList;