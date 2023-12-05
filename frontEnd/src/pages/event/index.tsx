import Head from 'next/head';
import LayoutWebsite from 'src/shared/components/layout/LayoutWebsite';
import dynamic from 'next/dynamic';
import Event from '@/components/home/event';
import axios from 'axios';
import { IEvent } from 'src/shared/types/event.type';

const ScrollRevealWrapper = dynamic(() => import('src/shared/components/common/ScrollRevealWrapper'), { ssr: false });

interface Props {
  eventData: IEvent[];
}

export function EventPage({ eventData }: Props) {
  return (
    <>
      <Head>
        <title>Sự kiện Coffee Shop</title>
        <meta name='description' content='Sự kiện Coffee Shop' />
        <meta name='keywords' content='Coffee Shop' />
      </Head>
      <ScrollRevealWrapper>
        <Event isPage={true} eventData={eventData} />
      </ScrollRevealWrapper>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const eventResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}/Event/List`);
    const eventData = eventResponse.data;

    return {
      props: {
        eventData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        eventData: [],
      },
    };
  }
}
EventPage.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default EventPage;
