"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Minus,
    Plus,
    Trash2,
    ShoppingCart,
    ShieldCheck,
    Truck,
    ArrowLeft,
    Loader2,
    Check,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import formatPrice from "@/components/products/cart";
import { CartRes } from "../interfaces/CartInterfaces";
import { useMemo, useState } from "react";
import { deleteAllProducts, deleteProductAction, updateProductAction } from "@/actions/CartActions";
import toast from "react-hot-toast";
import Checkout from "../Checkout/Checkout";

type CartItem = {
    id: string;
    title: string;
    brand?: string;
    category?: string;
    price: number;
    image: string;
    qty: number;
};

export default function Cart({ cartData }: { cartData: CartRes | null }) {


    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [cart, setCart] = useState<CartRes | null>(cartData || null);
    dispatchEvent(
        new CustomEvent('cartUpdate', { detail: cartData?.numOfCartItems })
    )

    async function deleteProduct(productId: string) {
        setLoadingId(productId)
        const response: CartRes = await deleteProductAction(productId)
        if (response.status == "success") {
            setCart(response)
            dispatchEvent(
                new CustomEvent('cartUpdate', { detail: response.numOfCartItems })
            )
        }
        setLoadingId(null)

    }

    async function updateProductCount(productId: string, count: number) {
        setLoadingId(productId)
        const response: CartRes = await updateProductAction(productId, count)
        if (response.status == "success") {
            setCart(response);
            toast.success('product count updated')
        }
        setLoadingId(null)

    }
    async function clearProducts() {
        setLoadingId("clear")
        const response: CartRes = await deleteAllProducts()
        if (response.message == "success") {
            setCart(null);
            dispatchEvent(
                new CustomEvent('cartUpdate', { detail: 0 })
            )
        }
        setLoadingId(null)

    }




    const shipping = 0;


    return (
        <div className="container mx-auto px-4 py-22">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Shopping Cart</h1>
                    <p className="text-sm text-muted-foreground">
                        {/*  */}
                        {cart?.numOfCartItems ? `${cart?.numOfCartItems} item(s) in your cart` : "Your cart is empty"}
                    </p>
                </div>

                <Button asChild variant="outline" className="gap-2">
                    <Link href="/products">
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Items */}
                <div className="lg:col-span-8">
                    <Card className="overflow-hidden">

                        <CardContent className="p-0">
                            {Cart === null ? (
                                <EmptyState />
                            ) : (
                                <ScrollArea className="h-105">
                                    <div className="divide-y">
                                        {cart?.data.products.map((item) => (
                                            <div key={item._id} className="p-4">
                                                {loadingId === item.product.id && (
                                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
                                                        <Loader2 className="animate-spin" />
                                                    </div>
                                                )}

                                                <div className="flex gap-4">
                                                    <div className="relative h-24 w-24 overflow-hidden rounded-lg border bg-muted">
                                                        <Image
                                                            src={item.product.imageCover}
                                                            alt={item.product.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex flex-1 flex-col gap-2">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <h3 className="line-clamp-1 font-semibold">{item.product.title}</h3>

                                                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                                                    {item.product.brand.name && <Badge variant="secondary">{item.product.brand.name}</Badge>}
                                                                    {item.product.category.name && (
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {item.product.category.name}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="shrink-0 text-right">
                                                                <div className="font-semibold">{formatPrice(item.price)}</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    each
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    aria-label="decrease"
                                                                    disabled={item.count == 1}
                                                                    onClick={() => updateProductCount(item.product.id, item.count - 1)}
                                                                >
                                                                    <Minus className="h-4 w-4" />
                                                                </Button>

                                                                <div className="w-10 text-center text-sm font-medium">
                                                                    {item.count}
                                                                </div>

                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    aria-label="increase"
                                                                    disabled={item.count == item.product.quantity}
                                                                    onClick={() => updateProductCount(item.product.id, item.count + 1)}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </div>


                                                            <Button
                                                                variant="ghost"
                                                                className="gap-2 text-destructive hover:text-destructive cursor-pointer"
                                                                onClick={() => deleteProduct(item.product.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Remove
                                                            </Button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>

                        {Cart != null && (
                            <>
                                <Separator />
                                <CardFooter className="flex items-center justify-between gap-3 py-4">
                                    <div className="text-sm text-muted-foreground">
                                        Tip: Quantities can be updated whenever you like.
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => clearProducts()}
                                    >
                                        {loadingId == "clear" && <Loader2 className="animate-spin" />}
                                        Clear Cart
                                    </Button>
                                </CardFooter>
                            </>
                        )}
                    </Card>
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-20">
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-base">Order Summary</CardTitle>
                            </CardHeader>

                            <Separator />

                            <CardContent className="space-y-4 py-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Subtotal ({cart?.numOfCartItems} item)
                                    </span>
                                    <span className="font-medium">{formatPrice(cart?.data.totalCartPrice!)}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className={cn("font-medium", shipping === 0 && "text-emerald-600")}>
                                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-lg font-bold">{formatPrice(cart?.data.totalCartPrice!)}</span>
                                </div>
                                <Checkout cartId={cartData?.cartId as string} />

                                <div className="grid gap-2 pt-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" />
                                        Protected payment options
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4" />
                                        Fast shipping options
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex min-h-70 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="rounded-full border bg-muted p-3">
                <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add items to your cart to see them here.
                </p>
            </div>

            <Button asChild className="mt-2 rounded-3xl">
                <Link href="/products">Browse Products</Link>
            </Button>
        </div>
    );
}