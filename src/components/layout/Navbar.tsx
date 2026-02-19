import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { ShoppingCartIcon, UserIcon } from 'lucide-react'
import {
  SidebarTrigger
} from "@/components/ui/sidebar"
import NavList from './NavList'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Logout from './Logout'
import CartIcon from '../CartIcon/CartIcon'
import { CartRes } from '../interfaces/CartInterfaces'

export default async function Navbar() {

  const session = await getServerSession(authOptions);

  let data: CartRes | null = null;

  if (session) {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: session?.accessToken as string
      }
    })
    data = await response.json();
  }


  return (
    <nav className="py-1 border-b border-muted text-xl font-semibold fixed z-50  top-0 inset-x-0 bg-white  px-3 md:px-0">
      <div className="container mx-auto flex justify-between items-center py-3">


        <div className="flex items-center gap-3">

          <h2 className="text-2xl font-bold cursor-pointer flex gap-1">
            <span className="px-3 rounded-lg text-white bg-black">S</span>
            <Link href="/">Shopy</Link>
          </h2>
        </div>

        <NavList />


        <div className="md:flex md:gap-5 md:items-center hidden ">
          {session && data && <CartIcon serverCartNum={data?.numOfCartItems} cartId={data?.data?.cartOwner} />}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserIcon className="cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                {session ? <>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <Link href={'/allorders'}><DropdownMenuItem>  My Orders</DropdownMenuItem></Link>
                  <Link href={'/wishList'}><DropdownMenuItem>Wish list</DropdownMenuItem></Link>
                  <Logout />
                </> : <>
                  <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                  <Link href={'/login'}><DropdownMenuItem>login</DropdownMenuItem></Link>
                </>}

              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </div>
    </nav>
  );
}

