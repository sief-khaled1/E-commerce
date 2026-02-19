
// products

export interface Root {
    results: number
    metadata: Metadata
    data: productsResponse[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
}

export interface productsResponse {
    sold?: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
    priceAfterDiscount?: number
    availableColors?: any[]
}

export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
}

export interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Categories {
    results: number
    metadata: Metadata
    data: Daum[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
}

export interface Daum {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}



export interface specCategory {
    results: number
    metadata: Metadata
    data: daum[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
}

export interface daum {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    priceAfterDiscount?: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
}


