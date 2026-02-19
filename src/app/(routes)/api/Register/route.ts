// src/app/(routes)/api/Register/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // هنا بنبعت البيانات للـ backend الخارجي
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                rePassword: data.rePassword,
                phone: data.phone,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: result.message || "Signup failed" }, { status: response.status });
        }

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
