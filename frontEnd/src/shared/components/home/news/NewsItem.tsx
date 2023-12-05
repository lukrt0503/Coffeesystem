import BtnCommon from '@/components/common/BtnCommon';
import { PreImage } from '@/components/common/PreImage';
import { useRouter } from 'next/router';
import { INews } from 'src/shared/types/news.type';
interface Props {
  data: INews;
}
const NewsItem = ({ data }: Props) => {
  const router = useRouter()
  return (
    <div className='dark:bg-[#1B1D35] bg-slate-100 grid grid-cols-2 gap-3 cursor-pointer' onClick={() => router.push(`/news/${data.newsId}`)}>
      <div className='w-full'>
        <PreImage
          src={data.imageUrl}
          height={285}
          width={1080}
          layer={false}
          alt={'News'}
          className='w-full rounded-lg object-cover'
        />
      </div>
      <div className='flex flex-col justify-between items-start gap-3 p-5'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-orange-500'>Coffee Shop</p>
          <p className='text-sm text-slate-500'>13/08/2023</p>
        </div>
        <h2 className='text-2xl'>{data.title}</h2>
        <p className='text-sm text-slate-500'>{data.description}</p>
        <p className='text-sm text-slate-500'>Tác giả: {data.coffeeShopName}</p>
        <BtnCommon cls='bg-transparent p-0 m-0' title='Tìm hiểu thêm' />
      </div>
    </div>
  );
};

export default NewsItem;
