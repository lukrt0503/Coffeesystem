import { useAppSelector } from '@/hooks/useRedux';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { scheduleService } from 'src/shared/services/schedule.service';
import { IEvent } from 'src/shared/types/event.type';
interface Props {
  open: any;
  setOpen: any;
  eventDetail: IEvent;
}
const FormBook = ({ eventDetail, open, setOpen }: Props) => {
  const router = useRouter();
  const [successChecked, setSuccessChecked] = useState(false);

  const [form] = useForm();
  const { user } = useAppSelector(state => state.appSlice);
  const createMutation = useMutation({
    mutationFn: (body: any) => scheduleService.bookSchedule(body),
    onSuccess(data, _variables, _context) {
      if (!data) return;
      message.success('Đặt thành công');
      setOpen(false);
      // window.location.reload();
      // router.reload()
    },
    onError(error, variables, context) {
      message.error('Đặt không thành công');
    },
  });
  async function handleCreate(value: any) {
    const body = {
      id: eventDetail.eventId,
      customerId: user?.id,
      ticketCount: value.ticketCount,
      total: value.ticketCount * eventDetail?.price,
    };
    const data = await scheduleService.getVnpay(body);
    window.open(data.data.url);
  }

  useEffect(() => {
    const { query } = router;
    const isSuccess = query.success;

    if (!successChecked && isSuccess !== undefined && isSuccess !== null) {
      const vnpAmount = query.vnp_Amount;
      if (vnpAmount !== undefined && vnpAmount !== null) {
        const formBook = {
          eventId: Number(eventDetail.eventId),
          customerId: Number(user?.id),
          ticketCount: Number(vnpAmount) / 100 / eventDetail.price,
        };
        createMutation.mutate(formBook);
      }
      setSuccessChecked(true);
    }
  }, [router.query.success, successChecked]);

  return (
    <Modal title='Đặt vé' centered open={open} width={500} footer={false}>
      <Form
        form={form}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={handleCreate}
        autoComplete='off'
        layout='vertical'
      >
        <Form.Item
          label='Số lượng vé'
          name='ticketCount'
          rules={[{ required: true, message: 'Vui lòng nhập số lượng vé' }]}
        >
          <Input max={eventDetail.seatCount} type='number' />
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
              <Button htmlType='submit'>Đặt vé</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormBook;
