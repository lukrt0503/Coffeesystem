import { PreImage } from '@/components/common/PreImage';
import { useMutation } from '@tanstack/react-query';
import { Button, message } from 'antd';
import { useState } from 'react';
import { followingService } from 'src/shared/services/following.service';
import { IFollowing, IFollowingAdd } from 'src/shared/types/following.type';


interface Props {
  followingData: IFollowing[];
  userType: string;
  loggedInUserId: number;
}

const Following = ({ followingData, userType, loggedInUserId }: Props) => {
  console.log(loggedInUserId)
  const followingShop = useMutation({
    mutationKey: ['followingShopMutaion'],
    mutationFn: (body: IFollowingAdd) => followingService.newFollowing(body),
    onSuccess: () => {
      message.success('Xoá thành công');
    },
    onError() {
      message.error('Xoá không thành công');
    },
  });

  // Lọc ra các User mà Customer đang đăng nhập đã theo dõi
  const filteredFollowingData = followingData.filter(item => {
    if (userType === 'Customer') {
      return item.user.userId === loggedInUserId;
    } else {
      return item.customer.customerId === loggedInUserId;
    }
  });

  return (
    <section
      id='Following'
      className='w-full flex flex-col justify-around items-center mx-auto px-4 md:px-12 lg:px-32 pb-24'
    >
      <div className='relative w-full mt-5 pb-32 grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-10'>
        {filteredFollowingData.length === 0 ? (
          // Hiển thị thông báo nếu không có ai được theo dõi
          <div className='mt-5'>
            <p className='font-medium text-2xl'>Hiện bạn chưa Follow Cửa Hàng nào cả,

              bấm vào <a href="/shopList" className="underline text-red-500">đây</a> để truy cập List các quán Coffee.
            </p>
          </div>
        ) : (
          // Hiển thị danh sách theo dõi nếu có
          filteredFollowingData.map((item, idx) => (
            <div className='mt-5' key={idx}>
              {/* Rest of your code for rendering User information */}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Following;
