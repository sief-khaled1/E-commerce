"use server"

import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export async function deleteProductAction(productId: string) {
    const session = await getServerSession(authOptions);
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
        method: "DELETE",
        headers: {
            token: session?.accessToken as string
        }
    })
    const data = await response.json();
    return data
}
export async function updateProductAction(productId: string, count: number) {
    const session = await getServerSession(authOptions);
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
        method: "PUT",
        headers: {
            token: session?.accessToken as string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ count })
    })
    const data = await response.json();
    return data
}
export async function deleteAllProducts() {
    const session = await getServerSession(authOptions);
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
        method: "DELETE",
        headers: {
            token: session?.accessToken as string
        }
    })
    const data = await response.json();
    return data
}