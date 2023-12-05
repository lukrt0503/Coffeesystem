import IconLocation from '@/components/icon/event/IconLocation';
import IconSchedule from '@/components/icon/event/IconSchedule';
import { formattedDate } from '@/utils/functions/convertDay';
import { IEvent } from 'src/shared/types/event.type';
interface Props {
  event: IEvent;
}
const ContentEvent = ({ event }: Props) => {
  return (
    <div className=' w-full h-1/2 dark:bg-[#1B1D35] bg-slate-100 p-5 flex flex-col justify-between items-start gap-3'>
      <div className='flex flex-col justify-start items-start'>
        <h3>{event.name.length > 22 ? event.name.substring(0, 20) + '...' : event.name}</h3>
        <p className='mt-3 flex justify-center items-center gap-3 pl-5 text-[#92400e]'>
          <span className='mr-2'>
            <IconSchedule />
          </span>
          {formattedDate(event.date)}
        </p>
        <p className='mt-3 flex justify-center items-center gap-3 pl-5 text-[#92400e]'>
          <span className='mr-2'>
            <IconLocation />
          </span>
          <p>Địa chỉ {event.address}</p>
        </p>
      </div>
      <h1 className='text-2xl min-w-1/2'>
        {event.description.length > 22 ? event.description.substring(0, 20) + '...' : event.description}
      </h1>
      <div className='flex flex-col justify-start items-start gap-3'>
        <p>Chỗ ngồi: {event.seatCount}</p>
        <p>Giá: {event.price} VND</p>
      </div>
    </div>
  );
};

export default ContentEvent;
