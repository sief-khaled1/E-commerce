import { authOptions } from '@/auth'
import Cart from '@/components/Cart/Cart';
import { CartRes } from '@/components/interfaces/CartInterfaces';
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function GetCartData() {
  const session = await getServerSession(authOptions);
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: {
      token: session?.accessToken as string
    }
  })
  const data: CartRes = await response.json();
  return <>
    <Cart cartData={data.numOfCartItems == 0 ? null : data} />
  </>
}
