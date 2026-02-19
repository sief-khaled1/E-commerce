"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react'

export default function NavList() {

    const pathname = usePathname();
    return (

        <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-3">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link className="font-semibold" href="/products" data-active={pathname === "/products"}>
                            Products
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link className="font-semibold" href="/categories" data-active={pathname === "/categories"}>
                            Categories
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link className="font-semibold" href="/brands" data-active={pathname === "/brands"}>
                            Brands
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
