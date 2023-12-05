import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import InitBasicAnimation from '@/components/common/InitBasicAnimation';
import { PreImage } from '@/components/common/PreImage';
import IconArrowLeft from '@/components/icon/IconArrowLeft';
import IconArrowRight from '@/components/icon/IconArrowRight';
import { IBanner } from 'src/shared/types/banner.type';
interface Props{
  bannerData: IBanner[]
}
const Banner = ({bannerData}: Props) => {
  if(bannerData.length < 0) return <></>
  const [selectedTab, setSelectedTab] = useState<IBanner>(bannerData[0] as IBanner);

  const handleNext = () => {
    setSelectedTab((prevTab): IBanner | any => {
      const nextIndex = bannerData.indexOf(prevTab) + 1;
      return nextIndex < bannerData.length ? bannerData[nextIndex] : bannerData[0];
    });
  };
  const handlePrev = () => {
    setSelectedTab((prevTab): IBanner | any => {
      const prevIndex = bannerData.indexOf(prevTab) - 1;
      return prevIndex >= 0 ? bannerData[prevIndex] : bannerData[bannerData.length - 1];
    });
  };
  
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    document.body.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section id="Banner" className='block h-[500px]'>
      <div className='snap-x-mandatory scrollbar-none absolute top-0 max-h-[700px] flex overflow-hidden dark:text-white'>
        <div className='relative w-full flex justify-between items-center mx-auto'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedTab ? selectedTab.bannerId : 'empty'}
              initial={{ x: -10, opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, damping: 10, stiffness: 50 }}
              className='relative w-full flex-shrink-0 snap-start'
            >
              <PreImage
                src={selectedTab && selectedTab.imageUrl}
                height={1080}
                width={1980}
                layer={true}
                alt={'Banner'}
                className='w-full rounded-lg object-cover'
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <InitBasicAnimation className='absolute bottom-10 left-10 z-40'>
          <div className='flex items-center justify-between gap-5'>
            <div className="flex items-center justify-center gap-5 cursor-pointer z-30">
              <IconArrowLeft onClick={handlePrev} />
              <IconArrowRight onClick={handleNext} />
            </div>
          </div>
        </InitBasicAnimation>
      </div>
    </section>
  );
};

export default Banner;
