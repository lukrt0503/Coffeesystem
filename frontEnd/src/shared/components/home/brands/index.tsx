import { PreImage } from '@/components/common/PreImage';
import { useState } from 'react';
import { IInforUser } from 'src/shared/types/user.type';

interface Props {
  brandsData: IInforUser[];
}

const Brands = ({ brandsData }: Props) => {
  if (brandsData.length < 0) return <></>;
  const [selectedPartner, setSelectedPartner] = useState<number>(brandsData[0].user_id!);
  return (
    <section id='Partner' className='bg-[#fff7e1]'>
      <div className='flex flex-col justify-center items px-32'>
        <h1 className='text-black mt-5 pt-10 text-3xl'>Các nhãn hàng đồng hành cùng Coffee Shop</h1>
        <div className='relative w-full mt-5 pb-32 grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-10'>
          {brandsData.map((item, idx) => (
            <div key={idx}>
              <PreImage
                src={item.avatar}
                height={200}
                width={200}
                layer={false}
                alt={'Service'}
                className={`relative rounded-full cursor-pointer ${
                  item.user_id === selectedPartner ? 'opacity-100' : 'opacity-50'
                } object-cover border-2 border-slate-700`}
                onClick={() => setSelectedPartner(item.user_id!)}
              />
              {item.user_id === selectedPartner ? (
                <div
                  className='absolute bottom-10 left-0 w-full pt-15 flex justify-between items-center gap-5 text-black'
                  style={{ borderTop: '1px solid #555' }}
                >
                  <div className='w-full flex flex-col justify-start items-start gap-3'>
                    <p className='font-medium text-2xl'>{item.coffeeShopName}</p>
                    <p className='font-thin text-sm'>Địa chỉ: {item.address}</p>
                  </div>
                  <p className='w-1/2'>Số điện thoại: {item.phone}</p>
                  <p className='w-1/2'>Email: {item.email}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
