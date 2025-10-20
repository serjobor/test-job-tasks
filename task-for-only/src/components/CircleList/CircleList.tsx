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
        transition: '300ms'
      }}
    >
      <span className='dot-num'>{dotNum}</span>
    </li>
  )
};

export default CircleList;