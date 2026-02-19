import Image from "next/image";
import { Categories, Category, productsResponse, Root } from "../../../../components/interfaces/interfaces";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { HeartIcon, ShoppingBagIcon, ShoppingCartIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CategoriesPage() {

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
  const { data }:Categories  = await response.json()


  return <>
    <div className="md:p-30 p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((brand) =>

        <div key={brand._id}>
          <Link href={'/brands/' + brand._id}>
            <Card className="pt-0">
              <div className="">
                <Image src={brand.image} alt={brand.name} className="w-full rounded-t-xl" height={300} width={200} />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{brand.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>

      )}
    </div>
  </>
}
