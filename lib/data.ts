import type { Product } from "./types"

// Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products")
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

// Fetch a single product by ID
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID: ${id}`)
  }
  return response.json()
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch("https://fakestoreapi.com/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}
