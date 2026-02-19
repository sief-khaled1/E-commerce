import React from 'react'

export default function formatPrice(price: number):string{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
    }).format(price);
}
