import Dashboard from '@/components/layout/dashboard/DashboardLayout';
import { StopOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { useState } from 'react';

import { ICustomer } from 'src/shared/types/customer.type';
import { PreImage } from '@/components/common/PreImage';
import { customerService } from 'src/shared/services/customer.service';
import { useQuery } from '@tanstack/react-query';
import { ReloadOutlined } from '@ant-design/icons';


type Props = {};

const CustomerManagement = ({ }: Props) => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<string>('');
  const [rowId, setRowId] = useState<number>();
  const [searchText, setSearchText] = useState('');

  const { data: dataCustomer, refetch } = useQuery(['listCustomer'], () => customerService.getAllCustomer());

  const columns: ColumnType<ICustomer>[] = [
    {
      title: '#',
      key: 'id',
      render: (_, record, index) => (
        <div>
          <p>{index}</p>
        </div>
      ),
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
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
          <div
            className='cursor-pointer'
            onClick={() => {
              setAction('ban');
              setOpen(true);
              setRowId(record.customerId);
            }}
          >
            <StopOutlined /> Ban Account
          </div>
        </Space>
      ),
    },
  ];
  const filteredData = dataCustomer?.data?.filter((customer) =>
    customer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {dataCustomer && (
        <>
          <Row className='mb-12' justify='space-between' align='middle' gutter={16}>
            <Col span={12}>
              <h1 className='font-bold text-2xl text-black'>Quản lý khách hàng</h1>
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

CustomerManagement.getLayout = (children: React.ReactNode) => <Dashboard>{children}</Dashboard>;

export default CustomerManagement;
