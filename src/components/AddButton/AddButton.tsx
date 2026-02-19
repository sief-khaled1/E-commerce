"use client"

import React, { useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader2, ShoppingCartIcon } from 'lucide-react'
import { CartRes } from '../interfaces/CartInterfaces'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { AddToCartAction } from '@/actions/addToCartAction'
import AddHeartIcon from '../HeartIcon/HeartIcon'

export default function AddButton({ productId, wishListIds }: { productId: string, wishListIds: string[] | undefined }) {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function addToCart(productId: string) {
        try {
            setIsLoading(true);
            const res = await AddToCartAction(productId)
            if (res == null) {
                router.push('/login')
            }

            toast.success(res?.message || "Item added to cart successfully!");
            dispatchEvent(new CustomEvent("cartUpdated", { detail: res?.numOfCartItems }));

        } catch (err) {
            console.log("error" + err);

        }
        setIsLoading(false);
    }
    return <>
        <CardFooter className="gap-2">
            <Button className="grow cursor-pointer" disabled={isLoading} onClick={() => addToCart(productId)}>
                {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCartIcon />}
                Add to cart
            </Button>
            <AddHeartIcon productId={productId} wishListIds={wishListIds || []} />
        </CardFooter>
    </>
}
