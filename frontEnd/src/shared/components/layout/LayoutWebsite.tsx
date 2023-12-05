import { APP_SAVE_KEY } from '@/utils/constants';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import Footer from './footer';
import Header from './header';
import jwt_decode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { login } from 'src/shared/stores/appSlice';

interface Props {
  children: React.ReactNode;
}
const LayoutWebsite = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.appSlice);
  const isLogin = Boolean(user);


  useEffect(() => {
    const token = getCookie(APP_SAVE_KEY.TOKEN_KEY);
    if (!token) return;
    const decodeData: any = jwt_decode(token as string);
    dispatch(login(decodeData));
  }, []);
  return (
    <>
      <Header isLogin={isLogin} />
      <main className='min-h-screen dark:bg-[#141523]'>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWebsite;
