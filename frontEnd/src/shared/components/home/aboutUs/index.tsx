import TitleSection from '@/components/common/TitleSection';
import { aboutUsData } from '@/mocks/aboutUs';
import React, { useRef, useEffect } from 'react';

const AboutUs = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      // @ts-ignore
      videoRef.current.play();
    }
  }, []);

  return (
    <section id='AboutUs' className='mt-28 py-8 px-4 md:px-32'>
      <div className='w-full mb-10'>
        <TitleSection
          title='Về chúng tôi'
          description='Về chúng tôi cách phát triển doanh nghiệp của bạn.'
          findMore={false}
        />
      </div>
      <div className='w-full bg-[#fff7e1] grid grid-cols-1 md:grid-cols-2 gap-20 justify-center items-center p-8 rounded-lg'>
        <div className='w-full'>
          <h3 className='text-2xl mb-3 text-black'>Mô tả</h3>
          {aboutUsData.map((item, idx) => {
            return (
              <p key={idx} className='mb-4 text-black'>
                {item}
              </p>
            );
          })}
        </div>
        <div className='w-2/3 pl-12 ml-12'>
          <video ref={videoRef} src='/about3.mp4' autoPlay loop muted className='w-full'></video>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
