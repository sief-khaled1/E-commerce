import { formData } from '@/components/Register/Register';
import React from 'react'


export async function RegisterApi(data: formData) {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            rePassword: data.rePassword,
            phone: data.phone,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response;
    

}
