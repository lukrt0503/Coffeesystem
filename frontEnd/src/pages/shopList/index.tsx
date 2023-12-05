import { theme } from 'antd';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { userService } from 'src/shared/services/user.service'; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/hooks/useRedux';
import { APP_SAVE_KEY } from '@/utils/constants';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import BrandList from '@/components/home/brandList';

const ScrollRevealWrapper = dynamic(() => import('src/shared/components/common/ScrollRevealWrapper'), { ssr: false });
export function ShopListPage() {

    const [role, setRole] = useState<string>('');
    const { user } = useAppSelector(state => state.appSlice);
    const [userType, setUserType] = useState<string>();

    const { data: userData, refetch } = useQuery(['listUsers'], () => userService.getAllUser());
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
            <title>Danh Sách Coffee Shop</title>
            <meta name='description' content='Sự kiện Coffee Shop' />
            <meta name='keywords' content='Coffee Shop' />
          </Head>
          {userData && (
            <ScrollRevealWrapper>
              <BrandList brandsData={userData.data}></BrandList>
            </ScrollRevealWrapper>
          )}
        </>
      );
}

export default ShopListPage;


