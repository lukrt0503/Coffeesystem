import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import HeaderDashboard from './HeaderDashboard';
import { PreImage } from '@/components/common/PreImage';
import { useAppDispatch } from '@/hooks/useRedux';
import { getCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/utils/constants';
import { login } from 'src/shared/stores/appSlice';
import jwt_decode from 'jwt-decode';
import { IInforUserStored } from 'src/shared/types/user.type';
import { menuAdmin, menuUser } from '@/mocks/menu/dashboard';
import { useTheme } from 'next-themes';


const { Content, Footer, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { theme } = useTheme()
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter();
  const currentPath = router.pathname;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie(APP_SAVE_KEY.TOKEN_KEY);
    if (!token) {
      router.push('/login');
    } else {
      const decodeData: IInforUserStored = jwt_decode(token as string);
      if (decodeData.role === "Admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
      dispatch(login(decodeData));
    }
  }, []);
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{ backgroundColor: theme === 'light' ? "#fff" : "#001629" }}>
          <div className='flex justify-center items-center'>
            <PreImage
              className='cursor-pointer'
              height={100}
              width={100}
              src={'/Logo2.png'}
              alt={'Logo'}
              layer={false}
            />
          </div>
          <Menu
            className='items-start justify-start'
            onClick={item => router.push(item.key)}
            theme={theme === 'light' ? 'light' : 'dark'}
            defaultSelectedKeys={[`${currentPath.split('/').splice(0, 3).join('/')}` || `${currentPath}`]}
            mode='inline'
            items={isAdmin ? menuAdmin : menuUser}
          ></Menu>
        </Sider>
        <Layout>
          <HeaderDashboard />
          <Content className='m-6 min-h-screen rounded-lg light:bg-white mobile:m-4'>
            <div className='p-2'>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Created by Coffee Information&Service 2023</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
