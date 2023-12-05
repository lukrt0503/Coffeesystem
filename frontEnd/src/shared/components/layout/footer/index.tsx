import { PreImage } from '@/components/common/PreImage';
import IconLocation from '@/components/icon/event/IconLocation';
import { footerData } from '@/mocks/footer';

const Footer = () => {
  return (
    <section className='w-full flex flex-col gap-10 justify-start items-start mx-auto px-16 py-10 dark:bg-[#141523] font-thin border-t-2 light:border-slate-400'>
      <div className='w-full grid grid-cols-2 gap-4 justify-start items-start'>
        <div className='flex flex-col justify-start items-start'>
          <PreImage height={200} width={200} src={'/Logo2.png'} alt={'Logo'} layer={false} />
          <p>Địa chỉ: {footerData.contactData.address}</p>
          <p>Số điện thoại: {footerData.contactData.phone}</p>
          <p>Email: {footerData.contactData.email}</p>
        </div>
        <div className='flex flex-col justify-end items-end'>
          <iframe
            src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSU2023fPT%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
            width='340'
            height='500'
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling='no'
            frameBorder='0'
            allowFullScreen={true}
            allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
          ></iframe>
        </div>
      </div>
      <div className='w-full flex justify-between items-center border-t-2 pt-5'>
        <div className='flex justify-between items-center gap-3'>
          <IconLocation />
          <p>CAN THO UNIVERSITY</p>
        </div>
        <ul className='flex justify-between items-center gap-3'>
          <li>Báo cáo rủi ro & vi phạm</li>
          <li>Thông báo pháp lý</li>
          <li>Điều khoản & điều kiện</li>
          <li>Chính sách bảo mật dữ liệu</li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
