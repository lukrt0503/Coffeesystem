import Dashboard from '@/components/layout/dashboard/DashboardLayout';
import { CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table, message } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { userService } from 'src/shared/services/user.service';
import { IInforUser, IUserbanned } from 'src/shared/types/user.type';
import { PreImage } from '@/components/common/PreImage';

type Props = {};

const RestrictUser = ({}: Props) => {
  const [searchText, setSearchText] = useState('');
  const { data: dataUser, refetch } = useQuery(['bannedUserList'], () => userService.getBannedUsers());

  const unbanUserMutation = useMutation({
    mutationFn: (body: IUserbanned) => userService.unbanUser(body),
    onSuccess() {
      message.success('Unbanned successfully');
      refetch();
    },
    onError(error) {
      console.error('Error unbanning account', error);
      message.error('Failed to unban account');
    },
  });

  const columns: ColumnType<IInforUser>[] = [
    {
      title: '#',
      key: 'id',
      render: (_, record, index) => (
        <div>
          <p>{index + 1}</p>
        </div>
      ),
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
            width={50}
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
       
            icon={<CloseCircleOutlined />}
            onClick={() => {
              const body = {
                role: 'user',
                profileId: Number(record?.userId),
              };
              unbanUserMutation.mutate(body);
            }}
          >
            Unban
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = dataUser?.data?.filter((user) =>
    user.coffeeShopName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {dataUser && (
        <>
          <Row className='mb-12' justify={'space-between'} align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl text-black'>Quản lý người dùng bị Ban</h1>
            </Col>
            <Col span={12}>
              <div className='flex py-2 justify-end items-end gap-3'>
                <Input
                  placeholder="Tìm kiếm theo tên người dùng"
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

RestrictUser.getLayout = (children: React.ReactNode) => <Dashboard>{children}</Dashboard>;

export default RestrictUser;
