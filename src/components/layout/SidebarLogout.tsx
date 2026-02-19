"use client"

import { signOut } from "next-auth/react"
import { LogOutIcon } from "lucide-react"

export default function SidebarLogout() {
    return (
        <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-md hover:bg-muted"
        >
            <LogOutIcon size={18} />
            Logout
        </button>
    )
}
