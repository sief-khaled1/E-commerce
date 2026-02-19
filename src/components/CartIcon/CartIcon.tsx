"use client"
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'

export default function CartIcon({ serverCartNum, cartId }: { serverCartNum: number, cartId: string }) {

    useEffect(() => {
        if (cartId) {
            localStorage.setItem('cartId', cartId);
        }
    }, [cartId])
    const [cartNum, setCartNum] = useState(serverCartNum);
    console.log(cartNum);


    useEffect(() => {
        function handler(e: Event) {
            const customEvent = e as CustomEvent<number>
            setCartNum(customEvent.detail)
        }

        window.addEventListener('cartUpdated', handler)

        return () => {
            window.removeEventListener('cartUpdated', handler)
        }
    }, [])


    return <>
        <Link href="/cart" className='relative cursor-pointer'>
            <ShoppingCartIcon />
            <span className='absolute -top-2 start-5/6 text-[12px] size-4 bg-accent-foreground text-accent flex justify-center items-center rounded-lg'>
                {cartNum}
            </span>

        </Link>
    </>
}
