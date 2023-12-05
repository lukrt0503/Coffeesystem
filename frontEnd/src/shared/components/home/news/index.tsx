import BtnCommon from '@/components/common/BtnCommon';
import { PreImage } from '@/components/common/PreImage';
import TitleSection from '@/components/common/TitleSection';
import NewsItem from './NewsItem';
import { useRouter } from 'next/router';
import { INews } from 'src/shared/types/news.type';

interface Props {
  isPage: boolean;
  newsData: INews[];
}
const News = ({ isPage, newsData }: Props) => {
  if (newsData.length < 0) return <></>;
  const router = useRouter();
  return (
    <section id='News' className='px-4 md:px-32 py-8'>
      <div className='w-full my-10'>
        <TitleSection title='Tin tức' description='Tin tức cách phát triển doanh nghiệp của bạn.' findMore={false} />
        <div className={`mt-10 w-full grid grid-cols-1 justify-start items-start gap-6 ${!isPage && 'md:grid-cols-2'}`}>
          <div
            className='dark:bg-[#1B1D35] bg-slate-100 flex flex-col justify-between items-center pb-5 rounded-lg cursor-pointer'
            onClick={() => router.push(`/news/${newsData[0].newsId}`)}
          >
            <PreImage
              src={newsData[0].imageUrl}
              height={!isPage ? 350 : 650}
              width={!isPage ? 600 : 1980}
              layer={false}
              alt={'News'}
              className='w-full relative rounded-lg'
            />
            <div className='mt-10 px-5 w-full flex flex-col justify-between items-start gap-3'>
              <div className='w-full flex justify-between items-center'>
                <p className='text-[#92400e]'>Coffee Shop</p>
                <p className='text-sm text-slate-500'>13/08/2023</p>
              </div>
              <h2 className='text-2xl'>{newsData[0].title}</h2>
              <p className='text-sm text-slate-500'>{newsData[0].description}</p>
              <p className='text-sm text-slate-500'>Tác giả: {newsData[0].coffeeShopName}</p>
              <BtnCommon cls='bg-transparent p-0 m-0' title='Tìm hiểu thêm' />
            </div>
          </div>
          {!isPage ? (
            <div className='w-full grid grid-rows-1 md:grid-rows-2 gap-5'>
              {newsData.slice(1, 3).map((item, idx) => (
                <NewsItem key={idx} data={item} />
              ))}
            </div>
          ) : (
            <div className='mt-10 w-full grid grid-rows-1 md:grid-rows-2 gap-5'>
              {newsData.map((item, idx) => (
                <NewsItem key={idx} data={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
