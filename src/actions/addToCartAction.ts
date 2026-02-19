"use server"

import { authOptions } from "@/auth";
import { CartRes, ShippingAddress } from "@/components/interfaces/CartInterfaces";
import { getServerSession } from "next-auth";

export async function AddToCartAction(productId: string) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
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
export async function CheckoutAction(cartId: string, shippingAddress: ShippingAddress) {
    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-commerce-aa2r.vercel.app/`, {
            method: 'POST',
            body: JSON.stringify({ shippingAddress }),
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

