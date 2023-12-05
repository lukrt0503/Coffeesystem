import InputUpload from '@/components/common/UploadInput';
import LayoutWebsite from '@/components/layout/LayoutWebsite';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import { useAppSelector } from '@/hooks/useRedux';
import { Row, Col, Form, Input, Button, message } from 'antd';
import React from 'react';
import { useState } from 'react';
import { userService } from 'src/shared/services/user.service';
import { IInforUser } from 'src/shared/types/user.type';

const Profile = () => {
  const { user } = useAppSelector(state => state.appSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<IInforUser | undefined>();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatar);

  const handleAvatarChange = (newAvatarUrl: string) => {
    const updatedAvatarUrl = newAvatarUrl || '';

    setAvatarUrl(updatedAvatarUrl);

    // Kiểm tra nếu formData tồn tại, thì cập nhật avatar trong formData
    if (formData) {
      const updatedFormData = { ...formData, avatar: updatedAvatarUrl };
      setFormData(updatedFormData);
    }
  };

  // Hàm xử lý khi nhấn nút "Cập Nhật Thông Tin"
  const handleUpdateProfile = async (value: any) => {
    try {
      if (value) {
        const body = {
          user_id: user?.id,
          ...value,
        };
        // Gọi phương thức updateUser của userService để cập nhật thông tin người dùng
        const response = await userService.updateUser(body);

        if (response.status === 200) {
          message.success('Cập nhật thông tin thành công');
          setIsEditing(false);
          // Cập nhật lại dữ liệu hiển thị nếu cần thiết

          // Tạo một biến tạm thời để lưu trữ formData sau khi cập nhật avatar
          const updatedFormData = { ...value, avatar: avatarUrl };
          setFormData(updatedFormData);
        } else {
          message.error('Cập nhật thông tin không thành công');
        }
      }
    } catch (error) {
      message.error('Cập nhật thông tin không thành công');
    }
  };

  return (
    <React.Fragment>
      {user?.role === 'Customer' ? (
        <Row className='h-screen w-full p-12' gutter={[16, 16]}>
          <Col className='m-0 h-full w-full p-0' span={12}>
            <div
              className=' w-full h-screen mobile:h-full'
              style={{
                backgroundImage: `url("/bg-login.jpg")`,
                backgroundOrigin: 'initial',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                opacity: 1,
              }}
            ></div>
          </Col>
          <Col span={12}>
            <Form
              name='basic'
              layout='vertical'
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleUpdateProfile}
              autoComplete='off'
            >
              <Form.Item label='Avatar' name='avatar'>
                <InputUpload initSrc={avatarUrl} onChange={handleAvatarChange} />
              </Form.Item>
              <Form.Item label='Tên' name='name'>
                <Input disabled={!isEditing} placeholder={user?.name} />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label='Số điện thoại' name='phone'>
                    <Input disabled={!isEditing} placeholder={user?.phone} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label='Email' name='email'>
                    <Input disabled={!isEditing} placeholder={user?.email} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label='Địa chỉ' name='address'>
                <Input disabled={!isEditing} placeholder={user?.address} />
              </Form.Item>

              {/* Hiển thị nút "Cập Nhật Thông Tin" hoặc "Huỷ" tùy thuộc vào trạng thái chỉnh sửa */}
              {isEditing ? (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button onClick={() => setIsEditing(false)} htmlType='button'>
                        Huỷ
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item style={{ textAlign: 'center' }}>
                      <Button htmlType='submit'>Cập Nhật Thông Tin</Button>
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button onClick={() => setIsEditing(true)}>Chỉnh Sửa Thông Tin</Button>
                </Form.Item>
              )}
            </Form>
          </Col>
        </Row>
      ) : (
        <DashboardLayout>
          <Row className='h-screen w-full' gutter={[16, 16]}>
            <Col className='m-0 h-full w-full p-0' span={12}>
              <div
                className=' w-full h-screen mobile:h-full'
                style={{
                  backgroundImage: `url("/bg-login.jpg")`,
                  backgroundOrigin: 'initial',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  opacity: 1,
                }}
              ></div>
            </Col>
            <Col span={12}>
              <Form
                name='basic'
                layout='vertical'
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleUpdateProfile}
                autoComplete='off'
              >
                <Form.Item label='Avatar' name='avatar'>
                  <InputUpload initSrc={avatarUrl} onChange={handleAvatarChange} />
                </Form.Item>
                <Form.Item label='Tên' name='name'>
                  <Input disabled={!isEditing} placeholder={user?.name} />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label='Số điện thoại' name='phone'>
                      <Input disabled={!isEditing} placeholder={user?.phone} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label='Email' name='email'>
                      <Input disabled={!isEditing} placeholder={user?.email} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label='Địa chỉ' name='address'>
                  <Input disabled={!isEditing} placeholder={user?.address} />
                </Form.Item>

                {/* Hiển thị nút "Cập Nhật Thông Tin" hoặc "Huỷ" tùy thuộc vào trạng thái chỉnh sửa */}
                {isEditing ? (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item style={{ textAlign: 'center' }}>
                        <Button onClick={() => setIsEditing(false)} htmlType='button'>
                          Huỷ
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item style={{ textAlign: 'center' }}>
                        <Button htmlType='submit'>Cập Nhật Thông Tin</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button onClick={() => setIsEditing(true)}>Chỉnh Sửa Thông Tin</Button>
                  </Form.Item>
                )}
              </Form>
            </Col>
          </Row>
        </DashboardLayout>
      )}
    </React.Fragment>
  );
};
export default Profile;
