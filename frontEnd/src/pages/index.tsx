import Head from 'next/head';
import LayoutWebsite from 'src/shared/components/layout/LayoutWebsite';
import News from 'src/shared/components/home/news';
import dynamic from 'next/dynamic';
import Banner from '@/components/home/banner';
import AboutUs from '@/components/home/aboutUs';
import Event from '@/components/home/event';
import Brands from '@/components/home/brands';
import axios from 'axios';
import { IBanner } from 'src/shared/types/banner.type';
import { IEvent } from 'src/shared/types/event.type';
import { INews } from 'src/shared/types/news.type';
import { IInforUser } from 'src/shared/types/user.type';

const ScrollRevealWrapper = dynamic(() => import('src/shared/components/common/ScrollRevealWrapper'), { ssr: false });

interface Props {
  bannerData: IBanner[]
  brandsData: IInforUser[]
  eventData: IEvent[]
  newsData: INews[]
}
export function Home({bannerData, eventData, newsData, brandsData}: Props) {
  return (
    <>
      <Head>
        <title>Website Coffee</title>
        <meta name='description' content='Website Coffee' />
        <meta name='keywords' content='Website Coffee' />
      </Head>
      <ScrollRevealWrapper>
        <Banner bannerData={bannerData && bannerData.length > 0 ? bannerData : []} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <AboutUs />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <Event isPage={false} count={6} eventData={eventData && eventData.length > 0 ? eventData : []} />
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <Brands brandsData={brandsData}/>
      </ScrollRevealWrapper>
      <ScrollRevealWrapper>
        <News isPage={false} newsData={newsData && newsData.length > 0 ? newsData : []} />
      </ScrollRevealWrapper>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const bannerResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}/Banner/List`);
    const bannerData = bannerResponse.data;

    const brandsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}/User/List`);
    const brandsData = brandsResponse.data;
    
    const eventResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}/Event/List`);
    const eventData = eventResponse.data;

    const newsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}/News/List`);
    const newsData = newsResponse.data;


    return {
      props: {
        bannerData,
        eventData,
        newsData,
        brandsData
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        bannerData: [],
        eventResponse: [],
        newsData: [],
        brandsData: []
      },
    };
  }
}
Home.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default Home;
