import { AddToWishListAction, RemoveFromWishListAction } from '@/actions/AddToWishList';
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { set } from 'zod';

export default function AddHeartIcon({ productId, wishListIds }: { productId: string, wishListIds: string[] }) {
    const [isAdded, setIsAdded] = useState(
        wishListIds.includes(productId) // ✅ أهم سطر
    )

    const router = useRouter()

    async function toggleWishlist(productId: string) {
        try {
            if (isAdded) {
                const res = await RemoveFromWishListAction(productId);
                toast.success("Removed from wishlist");
                setIsAdded(false);

            } else {
                const res = await AddToWishListAction(productId);
                toast.success("Added to wishlist");
                setIsAdded(true);
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <HeartIcon
            onClick={() => toggleWishlist(productId)}
            className={
                "cursor-pointer transition " +
                (isAdded
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400")
            }
        />
    )

}
