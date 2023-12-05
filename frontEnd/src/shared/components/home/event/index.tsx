import TitleSection from '@/components/common/TitleSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { IEvent } from 'src/shared/types/event.type';
import { PreImage } from '../../common/PreImage';
import ContentEvent from './ContentEvent';

interface Props {
  eventData: IEvent[]
  count?: number;
  isPage: boolean
}
const Event = ({ count, isPage, eventData }: Props) => {
  if(eventData.length < 0) return <></>
  const router = useRouter();
  const filterData = isPage && eventData.length > 0 ? eventData : eventData.slice(0,count)
  return (
    <section id='Event' className='w-full flex flex-col justify-around items-center mx-auto px-4 md:px-12 lg:px-32 pb-24'>
      <div className='w-full min-h-[700px] flex flex-col justify-around items-center gap-10'>
        <TitleSection title='Sự kiện' description='Sự kiện đặc biệt' findMore={false} />
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between items-start gap-5'>
          <AnimatePresence>
            {filterData && filterData.map((item, idx) => {
              return (
                <div key={idx} onClick={() => router.push(`/event/${item.eventId}`)} className="cursor-pointer overflow-hidden rounded-lg">
                  <motion.div whileHover={{scale: 1.1}}>
                    <PreImage
                      src={item.imageUrl}
                      height={250}
                      width={500}
                      layer={false}
                      alt={'Event'}
                      className='w-full rounded-lg object-cover'
                    />
                  </motion.div>
                  <ContentEvent event={item as IEvent} />
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Event;
