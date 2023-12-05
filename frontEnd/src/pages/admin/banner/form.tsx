import InputUpload from '@/components/common/UploadInput';
import { useAppSelector } from '@/hooks/useRedux';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, message, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { bannerService } from 'src/shared/services/banner.service';
import { IBanner } from 'src/shared/types/banner.type';

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}

const FormBanner = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const { user } = useAppSelector(state => state.appSlice);
  const isEditIdValidNumber = typeof editId === 'number';

  const createMutation = useMutation({
    mutationFn: (body: IBanner) => bannerService.newBanner(body),
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
    mutationFn: (body: IBanner) => bannerService.updateBanner(body),
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
        bannerId: editId,
        userId: user?.id,
        ...value,
      };
      updateMutation.mutate(formEdit);
    } else {
      const formCreate = {
        userId: user?.id,
        ...value,
      };
      createMutation.mutate(formCreate);
    }
  }

  const { data } = useQuery(['Banner'], () => bannerService.getBannerById(editId as number), {
    enabled: isEditIdValidNumber,
  });

  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue(data.data);
    }
  }, [data]);

  return (
    <Modal
      title={editId ? `Chỉnh sửa sự kiện` : 'Tạo sự kiện mới'}
      centered
      visible={open}
      width={1000}
      footer={null} // Bỏ footer
      onCancel={() => setOpen(false)}
    >
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleCreate}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item label='Ảnh' name='imageUrl' rules={[{ required: true, message: 'Vui lòng nhập ảnh' }]}>
          <InputUpload initSrc={data?.data.imageUrl} />
        </Form.Item>

        <Row justify={'center'} align={'middle'} gutter={16}>
          <Col>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type='default' onClick={() => setOpen(false)}>Huỷ bỏ</Button>
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

export default FormBanner;
