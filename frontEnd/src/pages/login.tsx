import BlankLayout from '@/components/layout/BlankLayout';
import { useAppDispatch } from '@/hooks/useRedux';
import { APP_SAVE_KEY } from '@/utils/constants';
import { useMutation } from '@tanstack/react-query';
import { Button, Card, Checkbox, Col, Form, Input, message, Row } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { authService } from 'src/shared/services/authentication.service';
import { login } from 'src/shared/stores/appSlice';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const isLogin = getCookie(APP_SAVE_KEY.LOGIN_STATUS);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (body: { username: string; password: string }) => authService.authenticated(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res.token) return;
      const decodeData: any = jwt_decode(res.token);
      if (decodeData) {
        message.success('Đăng nhập thành công');
        setCookie(APP_SAVE_KEY.ROLE, decodeData.role);
        setCookie(APP_SAVE_KEY.TOKEN_KEY, data.data.token);
        setCookie(APP_SAVE_KEY.LOGIN_STATUS, 'true');
        dispatch(login(decodeData));
        if (decodeData.role === "Admin") {
          router.push("/admin/user")
        } else {
          router.push("/")
        }
      }
    },
    onError(error, variables, context) {
      message.error('Đăng nhập không thành công');
    },
  });

  function handleLogin(value: any) {
    loginMutation.mutate(value);
  }

  return (
    <>
      {!isLogin && (
        <div className='relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
          <div className='relative md:h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
            <div
              className='absolute inset-0 login-background'
              style={{
                backgroundImage: `url("/bg-login.jpg")`,
                backgroundOrigin: 'initial',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backdropFilter: 'blur(3px)',
              }}
            />
            <div className={`bg-black absolute top-0 left-0 w-full h-full opacity-50`}></div>

            <div className='relative z-20 h-10 flex justify-start text-lg font-medium'>
              <a href="/"> <b>COFFEE INFORMATION & SERVICE</b></a>
            </div>
            <div className='relative z-20 mt-auto'>
              <h1 className='text-4xl font-semibold tracking-tight'>
                <div className='text-yellow-400'>COFFEE</div>
                <div>INFORMATION & SERVICE</div>
              </h1>
              <p className='mt-4 text-lg'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nostrum architecto neque. Enim voluptas
                recusandae necessitatibus officia vero porro alias facere non atque aut, adipisci dolores sit libero
                asperiores explicabo.
              </p>
            </div>
            <div className='relative z-20 mt-auto'>
              <p className='text-lg'>Copyright &copy; Coffee Information&Service 2023</p>
            </div>
          </div>
          <div className='lg:p-8'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]'>
              <div className='font-bold text-3xl text-center w-full text-black'>Đăng nhập</div>
              <Card className='shadow' size='default'>
                <Form
                  name='basic'
                  style={{ maxWidth: 700 }}
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  autoComplete='off'
                  className='border-b-2 border-b-slate-200'
                >
                  <Form.Item
                    label='Username'
                    name='username'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input size='large' />
                  </Form.Item>

                  <Form.Item
                    label='Mật khẩu'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password size='large' />
                  </Form.Item>

                  <Row gutter={16} justify={'space-between'}>
                    <Col span={12}>
                      <Form.Item name='remember' valuePropName='checked'>
                        <Checkbox>Ghi nhớ</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col className='text-right' span={12}>
                      <p onClick={() => router.push('/forgot-password')} className='m-0 p-0'>
                        Quên mật khẩu?
                      </p>
                    </Col>
                  </Row>

                  <Form.Item className='w-full text-center'>
                    <Button className='w-1/2' htmlType='submit' loading={loginMutation.isLoading}>
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
                <p className='mt-3'>Chưa có tài khoản? <strong className='hover:text-blue-400 cursor-pointer' onClick={() => router.push("/register")}>Đăng ký</strong></p>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Login.getLayout = (children: React.ReactNode) => <BlankLayout>{children}</BlankLayout>;
export default Login;
