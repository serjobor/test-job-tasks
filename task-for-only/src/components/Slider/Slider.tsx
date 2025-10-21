import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

interface IEvent {
  year: number;
  text: string;
}

interface SimpleSliderProps {
  events: IEvent[];
}

const SimpleSlider = ({ events }: SimpleSliderProps) => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [swiper, setSwiper] = useState<any>(null);
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 0);
    }
  }, events);

  const goToPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={80}
        slidesPerView={3}
        navigation={false}
        className="slider"
        onSlideChange={handleSlideChange}
        // onSwiper={handleSwiperInit}
        onSwiper={setSwiper}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="slider-elem" style={(index === 1) ? { width: '400px' } : {}}>
              <h3 className="elem-title">{event.year}</h3>
              <p className="elem-text">{event.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`slider-left-button ${isBeginning ? 'hidden' : 'active'}`}
        onClick={goToPrev}
        disabled={isBeginning}
      >
        <svg width='10' height='14' viewBox='0 0 10 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M8.49988 0.750001L2.24988 7L8.49988 13.25' strokeWidth='2' />
        </svg>
      </button>

      <button
        className={`slider-right-button ${isEnd ? 'hidden' : 'active'}`}
        onClick={goToNext}
        disabled={isEnd}
      >
        <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M1 1L6 6L1 11' strokeWidth='2' />
        </svg>
      </button>
    </>
  );
};

export default SimpleSlider;