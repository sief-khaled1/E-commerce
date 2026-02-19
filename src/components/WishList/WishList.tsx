import React from 'react'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import Image from 'next/image'
import AddButton from '../AddButton/AddButton'
import { Star } from 'lucide-react'
import formatPrice from '../products/cart'
import { WishListRes } from '../interfaces/WishListInterface'

export default function WishList({ wishListData }: { wishListData: WishListRes | null }) {
    const { data } = wishListData || {};
    const wishListIds = data?.map(p => p._id) || [];

    return <>
        <div className="md:p-30 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.map((product) =>

                <div key={product._id}>
                    <Card>
                        <Link href={'/products/' + product.id}>
                            <div>
                                <Image src={product.imageCover} alt={product.title} className="w-full" height={300} width={200} />
                            </div>
                            <CardHeader className="mt-2">
                                <CardDescription>{product.brand.name}</CardDescription>
                                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                                <CardDescription>
                                    <p>{product.category.name}</p>
                                    <div className="mt-2">
                                        <p className="text-lg text-black font-semibold"><span>{formatPrice(product.price)}</span></p>
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
                        <AddButton productId={product.id} wishListIds={wishListIds} />
                    </Card>
                </div>

            )}
        </div>
    </>
}
