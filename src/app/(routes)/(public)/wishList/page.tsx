import { authOptions } from '@/auth';
import { WishListRes } from '@/components/interfaces/WishListInterface';
import WishList from '@/components/WishList/WishList';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function GetWishList() {
  const session = await getServerSession(authOptions);
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    headers: {
      token: session?.accessToken as string
    }
  })
  const data: WishListRes = await response.json();
  console.log(data);

  return <>
    <WishList wishListData={data.status=='success'? data: null} />
  </>
}
