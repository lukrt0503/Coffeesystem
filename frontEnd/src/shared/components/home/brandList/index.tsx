import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followingService } from 'src/shared/services/following.service'; // Sử dụng followingService
import { ICustomer } from 'src/shared/types/customer.type';
import { PreImage } from '@/components/common/PreImage';
import { useAppSelector } from '@/hooks/useRedux';
import { IFollowingAdd } from 'src/shared/types/following.type';

interface Props {
  brandsData: ICustomer[];
}

const BrandList = ({ brandsData }: Props) => {
  const user = useAppSelector(state => state.appSlice.user);
  const queryClient = useQueryClient();

  const { data: brandData, isLoading: brandDataLoading } = useQuery(['listBrands'], () => {
    return followingService.getCustomerList(parseInt(user?.id || '0', 10)); // Sử dụng followingService
  });

  console.log(brandData);


  const followMutation = useMutation(
    (followingData: IFollowingAdd) => followingService.newFollowing(followingData),
    {
      onMutate: (followingData) => {
        const updatedBrandData = brandData?.data.map((brand) => {
          if (brand.user.userId === Number(followingData.user.userId)) {
            return { ...brand, isFollowing: true };
          }
          return brand;
        });

        queryClient.setQueryData(['listBrands'], updatedBrandData);
      },
      onError: () => {
        message.error('Theo dõi không thành công');
      },
    }
  );

  const unfollowMutation = useMutation<void, unknown, IFollowingAdd>(
    async (followingData) => {
      try {
        await followingService.unfollow(followingData);
      } catch (error) {
        throw error;
      }
    },
    {
      onMutate: (followingData) => {
        const updatedBrandData = brandData?.data.map((brand) => {
          if (brand.user.userId === parseInt(followingData.user.userId, 10)) {
            return { ...brand, isFollowing: false };
          }
          return brand;
        });

        queryClient.setQueryData(['listBrands'], updatedBrandData);
      },
      onError: () => {
        message.error('Hủy theo dõi không thành công');
      },
    }
  );

  useEffect(() => {
    const fetchFollowingLists = async () => {
      if (user && !brandDataLoading && Array.isArray(brandData)) { // Kiểm tra brandData là một mảng
        const updatedBrandData = brandData.map((brand) => {
          const isFollowingCustomer = brand.followingId !== null; // Xác định trạng thái theo dõi

          return { ...brand, isFollowing: isFollowingCustomer };
        });

        queryClient.setQueryData(['listBrands'], updatedBrandData);
      }
    };

    fetchFollowingLists();
  }, [user, brandData, brandDataLoading, queryClient]);

  const handleFollowClick = async (brandId: number, isFollowing: boolean): Promise<void> => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để theo dõi.');
      return;
    }

    const brand = brandData?.data.find((brand) => brand.user.userId === brandId);

    if (!brand) {
      message.error('Không tìm thấy thông tin người dùng.');
      return;
    }

    const followingData: IFollowingAdd = {
      followingId: '0', // Đặt followingId thành 0
      customer: {
        customerId: user.profileId || '0', // Sử dụng ID khách hàng của người dùng đã đăng nhập
      },
      user: {
        userId: brand.user.userId.toString(), // Sử dụng ID người dùng của thương hiệu
      },
    };

    if (isFollowing) {
      await unfollowMutation.mutateAsync(followingData);
    } else {
      await followMutation.mutateAsync(followingData);
    }
  };

  return (
    <section className='w-full flex flex-col justify-around items-center mx-auto px-4 md:px-12 lg:px-32 pb-24'>
      <div className='relative w-full mt-5 pb-32 grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-10'>
        {brandDataLoading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(brandsData) && brandsData.map((brand, idx) => (
            <div className='mt-5' key={idx}>
              {/* <PreImage
                src={brand.}
                height={200}
                width={200}
                layer={false}
                alt={brand.user.coffeeShopName}
                className='rounded-md cursor-pointer object-cover border-2 light:border-slate-700 border-slate-100'
              /> */}
              <div className='w-full pt-15 flex justify-between items-center gap-5 light:text-black'>
                <div className='w-full flex flex-col justify-start items-start gap-3'>
                  <p className='font-medium text-2xl'>
                    Tên: {brand.name}
                  </p>
                  <p className='font-thin text-sm'>
                    Địa chỉ: {brand.address}
                  </p>
                  <p className='font-thin text-sm'>
                    Email: {brand.email}
                  </p>
                  <p className='font-thin text-sm'>
                    Sđt: {brand.phone}
                  </p>
                  <Button
                    className='dark:text-white'
                    onClick={() => handleFollowClick(brand.accountId, brand.followed)}
                  >
                    {brand.followed ? 'Đang Theo Dõi' : 'Theo Dõi'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BrandList;
