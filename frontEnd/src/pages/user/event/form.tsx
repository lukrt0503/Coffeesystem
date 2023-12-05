import InputUpload from '@/components/common/UploadInput';
import { useAppSelector } from '@/hooks/useRedux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Row, Col, DatePicker, TimePicker } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { eventService } from 'src/shared/services/event.service';
import { IEvent } from 'src/shared/types/event.type';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormEvent = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const { user } = useAppSelector(state => state.appSlice);
  const isEditIdValidNumber = typeof editId === 'number';
  const createMutation = useMutation({
    mutationFn: (body: IEvent) => eventService.newEvent(body),
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
    mutationFn: (body: IEvent) => eventService.updateEvent(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
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
        eventId: editId,
        ...value,
      };
      updateMutation.mutate(formEdit);
    } else {
      const formCreate = {
        userId: user && user.id,
        coffeeShopName: user?.name,
        ...value,
      };
      createMutation.mutate(formCreate);
    }
  }
  const { data } = useQuery(['event'], () => eventService.getEventById(editId as number), {
    enabled: isEditIdValidNumber,
  });
  useEffect(() => {
    if (editId && data) {
      console.log(data)
      const body = {
        name: data.data.name,
        address: data.data.address,
        fromAge: data.data.fromAge,
        toAge: data.data.toAge,
        seatCount: data.data.seatCount,
        price: data.data.price,
        description: data.data.description,
      }
      form.setFieldsValue(body);
    }
  }, [data]);

  return (
    <Modal
      title={editId ? `Chỉnh sửa sự kiện` : 'Tạo sự kiện mới'}
      centered
      visible={open}
      width={1000}
      footer={false}
      onCancel={() => setOpen(false)} // Đóng modal khi nhấn "Huỷ bỏ" hoặc bấm dấu X
    >
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleCreate}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item label='Tên sự kiện' name='name' rules={[{ required: true, message: 'Vui lòng nhập sự kiện' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Ảnh' name='imageUrl' rules={[{ required: true, message: 'Vui lòng nhập ảnh' }]}>
          <InputUpload initSrc={data?.data.imageUrl} />
        </Form.Item>

        <Form.Item label='Ngày' name='date' rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item
          label='Giờ bắt đầu'
          name='startTime'
          rules={[{ required: true, message: 'Vui lòng nhập giờ bắt đầu' }]}
        >
          <TimePicker format='HH:mm' />
        </Form.Item>

        <Form.Item
          label='Giờ kết thúc'
          name='endTime'
          rules={[{ required: true, message: 'Vui lòng nhập giờ kết thúc' }]}
        >
          <TimePicker format='HH:mm' />
        </Form.Item>

        <Form.Item
          label='Độ tuổi nhỏ nhất'
          name='fromAge'
          rules={[{ required: true, message: 'Vui lòng nhập độ tuổi' }]}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Độ tuổi lớn nhất' name='toAge' rules={[{ required: true, message: 'Vui lòng nhập độ tuổi' }]}>
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Chỗ ngồi' name='seatCount' rules={[{ required: true, message: 'Vui lòng nhập chỗ ngồi' }]}>
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Giá vé' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá vé' }]}>
          <Input type='number' />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea />
        </Form.Item>

        <Row justify='center' gutter={16}>
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

export default FormEvent;
