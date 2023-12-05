import { PreImage } from '@/components/common/PreImage';
import FormBook from '@/components/home/event/FormBook';
import IconLocation from '@/components/icon/event/IconLocation';
import IconSchedule from '@/components/icon/event/IconSchedule';
import { useAppSelector } from '@/hooks/useRedux';
import { formattedDate } from '@/utils/functions/convertDay';
import { formatCurrency } from '@/utils/functions/formatCurrency';
import { Button } from 'antd';
import Head from 'next/head';
import { useState } from 'react';
import { IEvent } from 'src/shared/types/event.type';

interface Props {
  eventData: IEvent;
}
const EventDetail = ({ eventData }: Props) => {
  if (!eventData) return <></>;
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(state => state.appSlice);
  const handleBook = () => {
    setOpen(true)
  };
  /* @ts-ignore */
  const check = Number(eventData.fromAge) <= Number(user?.age) &&  Number(user?.age) <= Number(eventData.toAge);
  return (
    <>
      <Head>
        <title>Sự kiện cửa hàng cà phê</title>
        <meta name='description' content='Sự kiện Coffee Shop' />
        <meta name='keywords' content='Coffee Shop' />
      </Head>
      <div className='w-full h-full flex flex-col justify-start items-start  dark:bg-[#1B1D35] bg-slate-100 pb-12'>
        <div className='relative w-full flex justify-between items-center mx-auto'>
          <div className='relative w-full flex-shrink-0 snap-start'>
            <PreImage
              src={eventData.imageUrl}
              height={400}
              width={1980}
              layer={false}
              alt={'Banner Event'}
              className='w-full object-cover'
            />
          </div>
        </div>
        <div className=' w-full h-1/2 p-5 flex flex-col justify-between items-start gap-3'>
          <div className='flex flex-col justify-start items-start'>
            <h3 className='text-3xl'>Sự kiện: {eventData.name}</h3>
            <p className='mt-3 flex justify-center items-center gap-3 pl-5 text-[#92400e]'>
              <span className='mr-2'>
                <IconSchedule />
              </span>
              {formattedDate(eventData.date)}
            </p>
            <p className='mt-3 flex justify-center items-center gap-3 pl-5 text-[#92400e]'>
              <span className='mr-2'>
                <IconLocation />
              </span>
              <p>Địa chỉ {eventData.address}</p>
            </p>
          </div>
          <h1 className='text-xl min-w-1/2'>{eventData.description}</h1>
          <div className='flex flex-col justify-start items-start gap-3'>
            <p>Chỗ ngồi: {eventData.seatCount}</p>
            <p>Giá: {formatCurrency(eventData.price)} VND</p>
          </div>
          {user?.role === 'Customer' && Number(eventData.seatCount) > 0 && check && (
            <Button className='float-right dark:text-white' onClick={handleBook}>
              Đăng ký
            </Button>
          )}
          <FormBook eventDetail={eventData} open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
};
export async function getStaticProps({ params }: any) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/Event/Detail/${id}`);
  const eventData = await res.json();
  return {
    props: {
      eventData,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
export default EventDetail;
