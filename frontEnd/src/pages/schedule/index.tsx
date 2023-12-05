import Head from 'next/head';
import LayoutWebsite from 'src/shared/components/layout/LayoutWebsite';
import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/hooks/useRedux';
import { scheduleService } from 'src/shared/services/schedule.service';
import Schedule from '@/components/home/schedule';

const ScrollRevealWrapper = dynamic(() => import('src/shared/components/common/ScrollRevealWrapper'), { ssr: false });

export function SchedulePage() {
  const [role, setRole] = useState<string>('');
  const { user } = useAppSelector(state => state.appSlice);
  const [userType, setUserType] = useState<string>();

  const { data: scheduleData, refetch } = useQuery(['listSchedule', userType], () =>
    userType !== 'Customer'
      ? scheduleService.getUserSchedule(user?.id as unknown as number)
      : scheduleService.getCustomerSchedule(user?.id as unknown as number),
  );

  useEffect(() => {
    const role = getCookie(APP_SAVE_KEY.ROLE);
    setRole(role as string);
  }, []);

  useEffect(() => {
    if (role === 'Customer') {
      setUserType('Customer');
    } else if (role === 'User') {
      setUserType('User');
    }
  }, [role]);

  return (
    <>
      <Head>
        <title>Lịch trình Coffee Shop</title>
        <meta name='description' content='Lịch trình Coffee Shop' />
        <meta name='keywords' content='Coffee Shop' />
      </Head>
      {scheduleData ? (
        <ScrollRevealWrapper>
          <Schedule
            scheduleData={scheduleData.data}
            userType={userType as string}
            customerId={Number(user?.id)}
          ></Schedule>
        </ScrollRevealWrapper>
      ) : (
        <p className='mt-10 text-2xl text-center'>Không có lịch đặt nào</p>
      )}
    </>
  );
}
SchedulePage.getLayout = (children: React.ReactNode) => <LayoutWebsite>{children}</LayoutWebsite>;
export default SchedulePage;
