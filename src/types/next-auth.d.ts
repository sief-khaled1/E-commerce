import { UserInterface } from "@/components/interfaces/AuthInterfaces"
import NextAuth, { User } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: UserInterface
        accessToken: string
    }
    interface User {
        userres: UserInterface,
        tokenres: string,
    }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends User { }
}