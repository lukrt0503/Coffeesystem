import InputUpload from '@/components/common/UploadInput';
import { useAppSelector } from '@/hooks/useRedux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Row, Col, DatePicker } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { serviceCoffeeService } from 'src/shared/services/serviceCoffee.service';
import { IServiceCoffee } from 'src/shared/types/serviceCoffee.type';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}

const FormServiceCoffee = ({ editId, open, setOpen, refetch }: Props) => {
  const { user } = useAppSelector(state => state.appSlice);
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === 'number';
  const createMutation = useMutation({
    mutationFn: (body: IServiceCoffee) => serviceCoffeeService.newServiceCoffee(body),
    onSuccess(data, _variables, _context) {
      if (!data) return;
      message.success('Tạo thành công');
      setOpen(false);
      refetch();
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công');
    },
  });
  const updateMutation = useMutation({
    mutationFn: (body: IServiceCoffee) => serviceCoffeeService.updateServiceCoffee(body),
    onSuccess(data, _variables, _context) {
      if (!data) return;
      message.success('Cập nhật thành công');
      setOpen(false);
      refetch();
    },
    onError(error, variables, context) {
      message.error('Cập nhật không thành công');
    },
  });

  function handleCreate(value: any) {
    if (editId) {
      const formEdit = {
        serviceId: editId,
        coffeeShopName: user?.name,
        ...value
      }
      updateMutation.mutate(formEdit);
    } else {
      const formCreate = {
        coffeeShopName: user?.name,
        ...value
      }
      createMutation.mutate(formCreate);
    }
  }

  const { data } = useQuery(['ServiceCoffee'], () => serviceCoffeeService.getServiceCoffeeById(editId as number), {
    enabled: isEditIdValidNumber,
  });

  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue(data.data);
    }
  }, [data]);

  return (
    <Modal
      title={editId ? `Chỉnh sửa dịch vụ` : 'Tạo mới dịch vụ'}
      centered
      visible={open} // Sử dụng visible để điều khiển hiển thị Modal
      width={1000}
      footer={false}
      onCancel={() => setOpen(false)} // Sử dụng sự kiện onCancel để đóng Modal
    >
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleCreate}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item label='Tên dịch vụ' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name='imageUrl'
          label='Hình ảnh'
          rules={[{ required: true }]}
        >
          <InputUpload initSrc={data?.data.imageUrl} className='w-full h-[200px] rounded-md' />
        </Form.Item>

        <Row justify={'center'} align={'middle'} gutter={16}>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button onClick={() => setOpen(false)} htmlType='button'>
                Huỷ bỏ
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button htmlType='submit'>{editId ? 'Chỉnh sửa' : 'Tạo mới'}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormServiceCoffee;
