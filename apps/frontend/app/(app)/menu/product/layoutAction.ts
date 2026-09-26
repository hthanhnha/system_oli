"use server";
import { serverFetch } from "@/lib/serverFetch";
export async function getProducts(params?: { page?: number; limit?: number }) {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
    const res = await serverFetch(`/shop/products${query}`, {
      method: "GET",
    });

    if (!res.ok) {
      console.error("Failed to fetch products", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}