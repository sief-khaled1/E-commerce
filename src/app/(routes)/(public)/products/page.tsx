import Image from "next/image";
import { productsResponse, Root } from "../../../../components/interfaces/interfaces";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { HeartIcon, ShoppingBagIcon, ShoppingCartIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import formatPrice from "@/components/products/cart";
import AddButton from "@/components/AddButton/AddButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function Home() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const { data }: Root = await response.json();
  const session = await getServerSession(authOptions);
  let wishListIds: string[] = [];

  if (session?.accessToken) {
    const wishRes = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: session.accessToken as string,
        },
      }
    );

    const wishData = await wishRes.json();

    if (wishData.status === "success") {
      wishListIds = wishData.data.map((item: any) => item.id);
    }
  }


  return <>
    <div className="md:p-30 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((product) =>

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
