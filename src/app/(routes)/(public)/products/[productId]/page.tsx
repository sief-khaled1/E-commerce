import { productsResponse, Root } from '@/components/interfaces/interfaces';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AwardIcon, HeartIcon, ShoppingCartIcon, Star } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import formatPrice from '@/components/products/cart';
import AddButton from '@/components/AddButton/AddButton';

export default async function ProductDetails({ params }: { params: Params }) {
    const { productId } = await params;
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId);
    const { data: product }: { data: productsResponse } = await response.json();
    console.log(product)
    return <>

        <div key={product._id} className='md:pt-30 pt-10 pb-7'>
            <Card className='max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 items-start'>
                <div className=''>
                    <Carousel>
                        <CarouselContent>
                            {product.images.map((img: string, i: number) => (
                                <CarouselItem key={i}>
                                    <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                                        <Image src={img} alt={product.title} width={300} height={200} className="object-contain w-full h-full" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='ms-12' />
                        <CarouselNext className='me-12' />
                    </Carousel>
                </div>
                <div className="flex flex-col gap-2">

                    <p className="text-sm text-muted-foreground font-medium">
                        {product.brand.name}
                    </p>

                    <h1 className="text-2xl font-bold leading-snug">
                        {product.title}
                    </h1>

                    <p className="text-muted-foreground">
                        {product.category.name}
                    </p>

                    <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">
                            {product.ratingsAverage}
                        </span>
                    </div>

                    <div className="text-2xl font-bold text-black">
                        {formatPrice(product.price)}
                    </div>
                    <div className="quantity mt-5 mb-5">
                        <p className='text-[16px] font-semibold'><span className='text-green-600'>{product.quantity}</span> in stock hurry up before it is out</p>
                    </div>
                    <div className='border-b-2 mt-2 mb-2'></div>
                    <div className="desc mb-6">
                        <p className='text-[20px] font-bold'>Description</p>
                        <span className='font-semibold text-gray-500'>{product.description}</span>
                    </div>
                    <AddButton productId={product.id} />
                </div>

            </Card>
        </div>


    </>
}
