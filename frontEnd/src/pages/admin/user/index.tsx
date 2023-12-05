import Dashboard from '@/components/layout/dashboard/DashboardLayout';
import { ReloadOutlined } from '@ant-design/icons';
import { WarningOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table, message } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from 'src/shared/services/user.service';
import { IInforUser, IUserbanned } from 'src/shared/types/user.type';
import { PreImage } from '@/components/common/PreImage';
import { useAppSelector } from '@/hooks/useRedux';

type Props = {};

const UserManagement = ({ }: Props) => {
  const [searchText, setSearchText] = useState('');
  const { user } = useAppSelector((state) => state.appSlice);
  const queryClient = useQueryClient();
  const { data: dataUser, refetch } = useQuery(['listUser'], () => userService.getAllUser());

  const banUserMutation = useMutation({
    mutationFn: (body: IUserbanned) => userService.banUser(body),
    onSuccess(_data, variables, _context) {
      message.success('Ban người dùng thành công!');
      queryClient.invalidateQueries(['listUser']);
    },
    onError(error, variables, context) {
      message.error('Đã xảy ra lỗi khi gửi yêu cầu');
    },
  });

  const columns: ColumnType<IInforUser>[] = [
    {
      title: '#',
      key: 'id',
      render: (_, record, index) => <div><p>{index}</p></div>,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'coffeeShopName',
      key: 'coffeeShopName',
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      render: (_, record) => (
        <div className='w-[50px] rounded-lg'>
          <PreImage
            width={1980}
            height={50}
            alt={`Image ${record.userId}`}
            src={record.avatar}
            className='w-full object-cover rounded-full'
          />
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              const body = {
                role: 'user',
                profileId: Number(record?.userId),
              };
              banUserMutation.mutate(body);
            }}
            icon={<WarningOutlined className='text-xs' />}
            type='primary'
            danger
          >
            Banned
          </Button>
        </Space>
      ),
    },
  ];

  // Lọc danh sách người dùng dựa trên searchText
  const filteredData = dataUser?.data.filter((user) =>
    user.coffeeShopName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {dataUser && (
        <>
          <Row className='mb-12' justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl text-black'>Quản lý người dùng</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-end items-end gap-3'>
                <Input
                  placeholder='Tìm kiếm theo tên người dùng'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: '400px' }}
                />
                <Button
                  onClick={() => {
                    refetch();
                  }}
                  icon={<ReloadOutlined className='text-xs' />}
                >
                  Làm mới
                </Button>
              </div>
            </Col>
          </Row>
          <Table dataSource={filteredData} columns={columns} />
        </>
      )}
    </>
  );
};

UserManagement.getLayout = (children: React.ReactNode) => <Dashboard>{children}</Dashboard>;

export default UserManagement;
