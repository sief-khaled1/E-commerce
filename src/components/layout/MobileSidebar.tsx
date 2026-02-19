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
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon, Settings2Icon, ChevronRightIcon } from "lucide-react"
import Link from 'next/link'

export function MobileSidebar() {
  const data = {
    navMain: [
      {
        title: "HOME",
        Link:"/",
        icon: (
          <HomeIcon
          />
        ),
        isActive: true,
      },
      {
        title: "Products",
        Link:"/products",
        icon: (
          <ShoppingCartIcon
          />
        ),
      },
      {
        title: "Cart",
        url: "#",
        icon: (
          <ShoppingBagIcon
          />
        ),
        items: [
          {
            title: "All Products",
            url: "#",
          }
        ],
      },
      {
        title: "Analytics",
        url: "#",
        icon: (
          <UserIcon
          />
        ),
        items: [
          {
            title: "PROFILE",
            url: "#",
          },
          {
            title: "Metrics",
            url: "#",
          },
        ],
      },
    ],

  }

  return (
    <>
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={item.isActive}
                    >
                      <a href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRightIcon
                            />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

    </>
  )
}