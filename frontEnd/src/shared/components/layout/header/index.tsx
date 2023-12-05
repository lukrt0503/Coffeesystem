import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/router';
import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { fakeMenu, IMenu } from '@/mocks/menu/website';
import { PreImage } from '@/components/common/PreImage';
import ThemeModeToggle from '@/components/common/ToggleThemeMode';
import { Sheet, SheetContent, SheetTrigger } from '@/components/common/ui/sheet';
import { HambugerMenu } from './HambugerMenu';
import { Button } from '@/components/common/ui/button';
import { getCookie } from 'cookies-next';
import { APP_SAVE_KEY } from '@/utils/constants';
import { Avatar, Dropdown, MenuProps, Modal, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { logout } from 'src/shared/stores/appSlice';
import { useCookies } from 'react-cookie';
import IconUser from '@/components/icon/IconUser';
import { requestService } from 'src/shared/services/request.service'; // Đường dẫn đến request.service.ts
import customer from 'src/pages/admin/customer';
import { useSelector } from 'react-redux';
import { RootState } from 'src/shared/stores';
import { useMutation } from '@tanstack/react-query';

interface Props {
  isLogin: any
}

const Header = ({ isLogin }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.appSlice);
  const [_, __, removeCookie] = useCookies([APP_SAVE_KEY.TOKEN_KEY]);
  const [menuData, setMenuData] = useState<IMenu[]>();
  const [isLogout, setIsLogout] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUser, setIsUser] = useState(false)
  const [menu, setMenu] = useState<MenuProps['items']>();
  const handleRequestButtonClick = (customerId: number) => {
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <span className="hover:bg-gray-200 px-2 py-1">Thông tin cá nhân</span>,
    },
    {
      key: '2',
      icon: <LockOutlined />,
      label: (
        <>
          <span
            className="hover-bg-gray-200 px-2 py-1"
            onClick={() => {
              showModal();
            }}
          >
            Yêu cầu để trở thành Chủ quán cà phê
          </span>
        </>
      ),
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: <span className="hover:bg-gray-200 px-2 py-1">Đăng Xuất</span>,
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      router.push('/profile')
    } else if (e.key === '3') {
      onActionClick()
    }
  };


  const requestMutation = useMutation({
    mutationFn: (id: number) => requestService.sendRequest(id),
    onSuccess(data, _variables, _context) {
      message.success('Yêu cầu đã được gửi thành công');

    },
    onError(error, variables, context) {
      message.error('Đã xảy ra lỗi khi gửi yêu cầu');
    },
  });


  const handleOk = () => {
    setIsModalOpen(false);
    // @ts-ignore
    requestMutation.mutate(user.id as number);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onActionClick = () => {
    Modal.confirm({
      title: 'Chắc chắn đăng xuất chứ?',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(logout());
        removeCookie(APP_SAVE_KEY.TOKEN_KEY, undefined);
        router.push('/login');
      },
    });
  };
  useEffect(() => {
    setIsLogout(true);
    let menuCurrent
    if (isLogin && user?.role === 'Customer') {
      menuCurrent = fakeMenu.slice(0, 7)
    } else if (user?.role === 'User') {
      menuCurrent = fakeMenu
    } else {
      menuCurrent = fakeMenu.slice(0, 7);
    }

    if (user?.role === 'User' || user?.role === 'Admin') {
      let newItems = items.filter(item => item?.key !== '2')
      setMenu(newItems)
    } else setMenu(items)
      ;
    return setMenuData(menuCurrent);
  }, [isLogin, user]);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 150 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <motion.section
      initial={{ height: '100px' }}
      animate={{ height: isScrolled ? '80px' : '100px' }}
      transition={{ duration: 0.3 }}
      className={`bg-white w-full top-0 z-50 flex justify-between items-center gap-5 px-5 md:px-10 transition ${isScrolled
        ? 'sticky light:text-black border-b-[1px] border-opacity-50 border-black-300 inset-0 bg-opacity-10 backdrop-filter backdrop-blur duration-500 ease-in-out light:bg-[#141523]'
        : 'sticky dark:bg-[#141523] bg-opacity-100 duration-500 ease-in-out'
        }`}
    >
      <div className='flex justify-around items-center'>
        <PreImage
          onClick={() => router.push('/')}
          className='cursor-pointer'
          height={100}
          width={100}
          src={'/Logo2.png'}
          alt={'Logo'}
          layer={false}
        />
        <ul className='justify-center items-center gap-10 hidden lg:flex ml-10 dark:text-white'>
          {menuData &&
            menuData.map((item, idx) => (
              <Link href={item.path} key={idx}>
                <li>{item.label}</li>
              </Link>
            ))}
        </ul>
      </div>
      <div className='absolute right-5 flex justify-center items-center gap-2'>
        <div
          id='dropdown'
          className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
        >
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Dashboard
              </a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Settings
              </a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Earnings
              </a>
            </li>
            <li>
              <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Sign out
              </a>
            </li>
          </ul>
        </div>
        <div className='flex gap-8 items-center'>
          <div className='lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <Menu />
                </div>
              </SheetTrigger>
              <SheetContent className='w-[200px]' side={'left'}>
                <div>
                  {fakeMenu.map((item, idx) => (
                    <Link href={item.path} key={idx}>
                      <li>{item.label}</li>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ThemeModeToggle />
          <Modal title="Bạn muốn trở thành Coffee Shop?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ className: 'bg-red-500', style: { borderColor: 'red' } }}>
            <p>Vui lòng xác nhận gửi thông tin cá nhân tới Admin</p>
          </Modal>

          {isLogin ? (
            <Dropdown
              placement='bottomRight'
              menu={{
                items: menu,
                onClick: handleMenuClick,
              }}
            >
              <div className='flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded'>
                <Avatar>
                  <IconUser />
                </Avatar>
                <p className='ipad:hidden text-ellipsis truncate h-max leading-none'>{user && user.name}</p>
              </div>
            </Dropdown>

          ) : (
            <button
              onClick={() => {
                router.push('/login');
              }}
              className='dark:text-white font-bold py-2 px-4 rounded cursor-pointer hidden lg:block'
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>

    </motion.section>
  );
};

export default Header;
