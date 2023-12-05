import InputUpload from '@/components/common/UploadInput';
import { useAppSelector } from '@/hooks/useRedux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Row, Col, DatePicker } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import user from 'src/pages/admin/user';
import { newsService } from 'src/shared/services/news.service';
import { INews, INewsAdd } from 'src/shared/types/news.type';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}

const FormNews = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const { user } = useAppSelector(state => state.appSlice)
  const isEditIdValidNumber = typeof editId === 'number';
  const createMutation = useMutation({
    mutationFn: (body: INewsAdd) => newsService.createNews(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success('Tạo thành công');
      setOpen(false); // Đóng Modal khi tạo thành công
      refetch();
    },
    onError(error, variables, context) {
      message.error('Tạo không thành công');
    },
  });
  const updateMutation = useMutation({
    mutationFn: (body: INews) => newsService.updateNews(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success('Cập nhật thành công');
      setOpen(false); // Đóng Modal khi cập nhật thành công
      refetch();
    },
    onError(error, variables, context) {
      message.error('Cập nhật không thành công');
    },
  });

  function handleCreate(value: any) {
    if (editId) {
      const formEdit = {
        newsId: editId,
        ...value,
      };
      updateMutation.mutate(formEdit);
    } else {
      const bodyNew = {
        userId: user && user.id,
        ...value,
      }
      createMutation.mutate(bodyNew);
    }
  }

  const { data } = useQuery(['news'], () => newsService.getNewsById(editId as number), {
    enabled: isEditIdValidNumber,
  });

  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue(data.data);
    }
  }, [data]);

  return (
    <Modal
      title={editId ? `Chỉnh sửa tin tức` : 'Tạo tin tức mới'}
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
        <Form.Item label='Tên coffee shop' name='coffeeShopName'>
          <Input />
        </Form.Item>
        <Form.Item label='Tiêu đề' name='title' rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label='Ảnh' name='imageUrl' rules={[{ required: true, message: 'Vui lòng nhập ảnh' }]}>
          <InputUpload initSrc={data?.data.imageUrl} />
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

export default FormNews;
