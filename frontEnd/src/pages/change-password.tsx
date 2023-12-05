import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import { useAppSelector } from '@/hooks/useRedux';
import { useMutation } from '@tanstack/react-query';
import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import { authService } from 'src/shared/services/authentication.service';
const ChangePassword = () => {
  const { user } = useAppSelector(state => state.appSlice);
  const accountId = Number(user?.id);
  const router = useRouter();
  const updateMutation = useMutation({
    mutationFn: (password: string) => authService.resetPassword({ accountId, password }),
    onSuccess(data, _variables, _context) {
      if (!data) return;
      message.success('Thay đổi thành công');
    },
    onError(error, variables, context) {
      message.error('Thay đổi không thành công');
    },
  });

  function handleLogin(value: any) {
    const formUpdate = {
      password: value.newPassword1,
    };
    updateMutation.mutate(formUpdate.password);
  }

  return (
    <>
      <Row justify={'space-between'} gutter={[16, 16]} align={'middle'}>
        <Col span={24}>
          <Typography.Title level={2} className='mx-auto center'>
            Thay đổi mật khẩu
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Form
            layout='vertical'
            name='basic'
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            autoComplete='off'
          >
            <Form.Item
              label='Mật khẩu hiện tại'
              name='oldpassword'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='Mật khẩu mới'
              name='newPassword1'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='Xác nhận mật khẩu'
              name='newPassword2'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Row align={'middle'} gutter={16}>
              <Col span={12}>
                <Form.Item className='w-full'>
                  <Button className='w-full' htmlType='button' onClick={() => router.push('/')}>
                    Huỷ
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className='w-full'>
                  <Button className='w-full' htmlType='submit' loading={updateMutation.isLoading}>
                    Cập nhật
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
ChangePassword.getLayout = (children: React.ReactNode) => <DashboardLayout>{children}</DashboardLayout>;
export default ChangePassword;
