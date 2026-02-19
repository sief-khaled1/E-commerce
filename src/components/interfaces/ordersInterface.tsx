// ===== SubCategory =====
export interface SubCategory {
    _id: string
    name: string
    slug: string
    category: string
}

// ===== Category =====
export interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

// ===== Brand =====
export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

// ===== Product =====
export interface Product {
    _id: string
    id: string
    title: string
    imageCover: string
    ratingsQuantity: number
    ratingsAverage: number
    subcategory: SubCategory[]
    category: Category
    brand: Brand
}

// ===== Cart Item =====
export interface CartItem {
    _id: string
    count: number
    price: number
    product: Product
}

// ===== Shipping Address =====
export interface ShippingAddress {
    details: string
    phone: string
    city: string
}

// ===== User =====
export interface OrderUser {
    _id: string
    name: string
    email: string
    phone: string
}

// ===== Order =====
export interface Order {
    _id: string
    id: number
    user: OrderUser

    shippingAddress: ShippingAddress

    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number

    paymentMethodType: "card" | "cash"
    isPaid: boolean
    isDelivered: boolean

    paidAt?: string
    createdAt: string
    updatedAt: string

    cartItems: CartItem[]

    __v: number
}
