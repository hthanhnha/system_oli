"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function registerAction(data: {
    email?: string;
    password?: string;
    fullName?: string;
    phone?: string;
}) {
    try {
        const res = await serverFetch("/users/register", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Đăng ký thất bại",
                error: result
            };
        }

        return {
            success: true,
            message: "Đăng ký thành công",
            data: result
        };
    } catch (error: any) {
        console.error("Lỗi đăng ký (authAction):", error);
        return {
            success: false,
            message: "Lỗi kết nối máy chủ, vui lòng thử lại sau"
        };
    }
}
