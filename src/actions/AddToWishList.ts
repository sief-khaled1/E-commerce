"use server"

import { authOptions } from "@/auth";
import { CartRes, ShippingAddress } from "@/components/interfaces/CartInterfaces";
import { getServerSession } from "next-auth";

export async function AddToWishListAction(productId: string) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                token: session?.accessToken as string,
                "Content-type": "application/json",
            }
        }
        )
        const data: CartRes = await response.json();
        return data
    } else {
        return null
    }
}

export async function RemoveFromWishListAction(productId: string) {
    const session = await getServerSession(authOptions);

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
            method: "DELETE",
            headers: {
                token: session?.accessToken as string,
            },
        }
    );

    return response.json();
}


