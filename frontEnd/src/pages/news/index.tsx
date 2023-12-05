import Head from 'next/head';
import LayoutWebsite from 'src/shared/components/layout/LayoutWebsite';
import dynamic from 'next/dynamic';
import News from '@/components/home/news';
import axios from 'axios';
import { INews } from 'src/shared/types/news.type';

const ScrollRevealWrapper = dynamic(() => import('src/shared/components/common/ScrollRevealWrapper'), { ssr: false });

interface Props {
  newsData: INews[];
}

export function NewsPage({ newsData }: Props) {
  if(!newsData) return <></>
  return (
    <>
      <Head>
        <title>Tin tức Coffee Shop</title>
        <meta name='description' content='Tin tức Coffee Shop' />
        <meta name='keywords' content='Coffee Shop' />
      </Head>
      <ScrollRevealWrapper>
        <News isPage={true} newsData={newsData} />
      </ScrollRevealWrapper>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const newsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}/News/List`);
    const newsData = newsResponse.data;

    return {
      props: {
        newsData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        newsData: [],
      },
    };
  }
}
NewsPage.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default NewsPage;
