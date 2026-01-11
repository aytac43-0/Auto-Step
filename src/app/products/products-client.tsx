'use client'

import { useState } from 'react'

type Product = {
    id: string
    name: string
    description: string | null
}

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] | null }) {
    const [search, setSearch] = useState('')

    // Use initial products or empty array
    const products = initialProducts || []

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="container py-20">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Our Products</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Explore our professional tools and resources.
                </p>
            </div>

            <div className="max-w-md mx-auto mb-12">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-input bg-background px-6 py-3 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-sm"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map(product => (
                    <div key={product.id} className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-muted-foreground mb-6 line-clamp-3">
                                {product.description || 'No description available.'}
                            </p>
                            <div className="text-center">
                                {/* Mocking Buy Button - likely would go to a payment link */}
                                <button disabled className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed">
                                    Purchase Now (Demo)
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No products found matching "{search}".
                </div>
            )}
        </div>
    )
}
