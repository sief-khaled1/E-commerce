import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  ChevronRightIcon,
  StoreIcon,
  TagIcon,
} from "lucide-react"

import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import SidebarLogout from './SidebarLogout'

export default async function MobileSidebar() {

  const session = await getServerSession(authOptions)



  const navMain = [
    {
      title: "HOME",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Products",
      link: "/products",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Brands",
      link: "/brands",
      icon: <StoreIcon />,
    },
    {
      title: "Categories",
      link: "/categories",
      icon: <TagIcon />,
    },
    {
      title: "Account",
      icon: <UserIcon />,
      items: session
        ? [
          { title: "My Orders", url: "/allorders" },
          { title: "Wish list", url: "/wishList" },
        ]
        : [
          { title: "Register", url: "/register" },
          { title: "Login", url: "/login" },
        ],
    },
  ]

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarMenu>
            {navMain.map((item) => (
              <Collapsible key={item.title} asChild>
                <SidebarMenuItem>


                  {item.link && (
                    <SidebarMenuButton asChild>
                      <Link href={item.link}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}


                  {item.items && (
                    <>
                      <SidebarMenuButton>
                        {item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>

                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction>
                          <ChevronRightIcon />
                        </SidebarMenuAction>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>

                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.url}>
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}

                          {session && (
                            <SidebarMenuSubItem>
                              <SidebarLogout />
                            </SidebarMenuSubItem>
                          )}

                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  )}

                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
