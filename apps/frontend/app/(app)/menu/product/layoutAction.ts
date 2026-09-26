"use server";
import { serverFetch } from "@/lib/serverFetch";

export async function getMenus(params?: { page?: number; limit?: number; search?: string }) {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.limit != null) query.set('limit', String(params.limit));
    
    if (params?.page != null) query.set('page', String(params.page));
    else query.set('page', '1'); // Mặc định page 1 nếu không truyền

    const res = await serverFetch(`/menu?${query.toString()}`, {
      method: 'GET',
      next: { revalidate: 0 }, // Không cache, luôn lấy data mới
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.success && result.data) {
      return result.data.filter((menu: any) => menu.isActive);
    }
    return [];
  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
    console.error("Lỗi khi tải danh sách menu:", error);
    return [];
  }
}
