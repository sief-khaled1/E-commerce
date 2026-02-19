"use client"
import React, { useEffect, useState } from 'react'
import { Order } from '../interfaces/ordersInterface';
import { format } from 'path';
import formatPrice from '../products/cart';

export default function AllordersData() {

    const [orders, setOrders] = useState<Order[]>([])

    // comment for testing
    async function getOrders() {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + localStorage.getItem('cartId'))
        console.log(localStorage.getItem('cartId'));

        const data = await response.json();
        setOrders(data)

    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6 mt-20">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border rounded-xl shadow-sm p-4 bg-white"
                >
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-bold text-lg">
                            Order #{order.id}
                        </h2>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${order.isPaid
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                                }`}
                        >
                            {order.isPaid ? "Paid" : "Not Paid"}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                        📍 {order.shippingAddress?.city} —{" "}
                        {order.shippingAddress?.details}
                    </p>

                    <div className="space-y-3">
                        {order.cartItems?.map((item: any) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-3 border rounded-lg p-2"
                            >
                                <img
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    className="w-16 h-16 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <h3 className="font-medium text-sm">
                                        {item.product.title}
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Qty: {item.count}
                                    </p>
                                </div>

                                <div className="font-semibold">
                                    {formatPrice(item.price)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 font-bold">
                        <span>Total</span>
                        <span>{formatPrice(order.totalOrderPrice)}</span>
                    </div>
                </div>
            ))}
        </div>
    )

}
