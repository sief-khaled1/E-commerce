import { Category, daum, specCategory } from '@/components/interfaces/interfaces';
import { Params } from 'next/dist/server/request/params'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShoppingCartIcon, Star } from 'lucide-react';
import Image from 'next/image';


export default async function SpecificBrand({ params }: { params: Params }) {
    const { SpecificBrand } = await params;
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products?brand=' + SpecificBrand)
    const { data }: specCategory = await response.json();
    console.log(data)
    return <>
        {data[1] === undefined ? <div className='h-screen flex justify-center items-center'><p className='text-black/50 text-center text-4xl'>No products found in this brand.</p></div> : <div className='md:p-30 p-10 '>
            <div className="title font-bold text-3xl">
                {data[0]?.brand.name}
            </div>
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.map((product) =>

                    <div key={product.id}>
                        <Card>
                            <Link href={'/products/' + product.id}>
                                <div>
                                    <Image src={product.imageCover} alt={product.title} className="w-full" height={300} width={200} />
                                </div>
                                <CardHeader>
                                    <CardDescription>{product.brand.name}</CardDescription>
                                    <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                                    <CardDescription>
                                        <p>{product.category.name}</p>
                                        <div className="mt-2">
                                            <p className="text-lg text-black font-semibold">EGP <span>{product.price}</span></p>
                                        </div>
                                    </CardDescription>
                                    <CardAction>
                                        <div className="flex gap-1">
                                            <Star fill="true" className="fill-yellow-500 text-yellow-500" />
                                            <span>{product.ratingsAverage}</span>
                                        </div>
                                    </CardAction>

                                </CardHeader>
                            </Link>


                            <CardFooter className="gap-2">
                                <Button className="grow"><ShoppingCartIcon />Add to cart</Button>
                                <HeartIcon />
                            </CardFooter>
                        </Card>
                    </div>

                )}
            </div>
        </div >}
    </>
}
