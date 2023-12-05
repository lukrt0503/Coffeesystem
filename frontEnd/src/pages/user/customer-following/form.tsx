// import { useMutation, useQuery } from '@tanstack/react-query';
// import { Button, Form, Input, message, Modal, Row, Col, DatePicker } from 'antd';
// import { useForm } from 'antd/lib/form/Form';
// import { useEffect } from 'react';
// import { customerService } from 'src/shared/services/customer.service';
// import { ICustomer } from 'src/shared/types/customer.type';

// interface Props {
//   editId?: number;
//   open: any;
//   setOpen: any;
//   refetch: any;
// }
// const FormCustomer = ({ editId, open, setOpen, refetch }: Props) => {
//   const [form] = useForm();
//   const isEditIdValidNumber = typeof editId === 'number';
//   const createMutation = useMutation({
//     mutationFn: (body: ICustomer) => customerService.newCustomer(body),
//     onSuccess(data, _variables, _context) {
//       const res = data.data;
//       if (!res) return;
//       message.success('Tạo thành công');
//       setOpen(false);
//       refetch();
//     },
//     onError(error, variables, context) {
//       message.error('Tạo không thành công');
//     },
//   });
//   const updateMutation = useMutation({
//     mutationFn: (body: ICustomer) => customerService.updateCustomer(editId as number, body),
//     onSuccess(data, _variables, _context) {
//       const res = data.data;
//       if (!res) return;
//       message.success('Cập nhật thành công');
//       setOpen(false);
//       refetch();
//     },
//     onError(error, variables, context) {
//       message.error('Cập nhật không thành công');
//     },
//   });
//   function handleCreate(value: any) {
//     if (editId) {
//       updateMutation.mutate(value);
//     } else {
//       createMutation.mutate(value);
//     }
//   }
//   const { data } = useQuery(['Customer'], () => customerService.getCustomerById(editId as number), {
//     enabled: isEditIdValidNumber,
//   });
//   useEffect(() => {
//     if (editId && data) {
//       form.setFieldsValue(data.data);
//     }
//   }, [data]);
//   return (
//     <Modal title={editId ? `Chỉnh sửa khách hàng` : 'Tạo khách hàng mới'} centered open={open} width={1000} footer={false}>
//       <Form
//         form={form}
//         name='basic'
//         initialValues={{ remember: true }}
//         onFinish={handleCreate}
//         autoComplete='off'
//         layout='vertical'
//       >
//         <Form.Item label='Tên khách hàng' name='name' rules={[{ required: true, message: 'Vui lòng nhập khách hàng' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label='Số điện thoại' name='phone' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
//           <Input />
//         </Form.Item>
        
//         <Row justify={'center'} align={'middle'} gutter={16}>
//           <Col>
//             <Form.Item style={{ textAlign: 'center' }}>
//               <Button onClick={() => setOpen(false)} htmlType='button'>
//                 Huỷ bỏ
//               </Button>
//             </Form.Item>
//           </Col>
//           <Col>
//             <Form.Item style={{ textAlign: 'center' }}>
//               <Button htmlType='submit'>{editId ? 'Chỉnh sửa' : 'Tạo mới'}</Button>
//             </Form.Item>
//           </Col>
//         </Row>
//       </Form>
//     </Modal>
//   );
// };

// export default FormCustomer;
