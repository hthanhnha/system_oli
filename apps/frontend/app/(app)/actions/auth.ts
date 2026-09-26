"use server";

import { cookies } from "next/headers";
import { serverFetch } from "@/lib/serverFetch";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string | null;
  success?: boolean;
};

export async function loginAction(prevState: any, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await serverFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Đăng nhập thất bại." };
    }

    if (data.accessToken) {
      const cookieStore = await cookies();
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      };
      cookieStore.set("accessToken", data.accessToken, cookieOptions);
      if (data.user?.fullName) {
        // Tên người dùng không cần httpOnly để client cũng có thể đọc (tùy chọn)
        cookieStore.set("userName", data.user.fullName, { ...cookieOptions, httpOnly: false });
      }
    }

    // Return success to allow the component to handle redirection or state
    return { success: true };
  } catch (error) {
    return { error: "Lỗi kết nối tới máy chủ." };
  }
}

export async function registerAction(prevState: any, formData: FormData): Promise<AuthState> {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;

  try {
    const res = await serverFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password, phone }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.message || "Đăng ký thất bại." };
    }

    if (data.accessToken) {
      const cookieStore = await cookies();
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      };
      cookieStore.set("accessToken", data.accessToken, cookieOptions);
      if (data.user?.fullName) {
        cookieStore.set("userName", data.user.fullName, { ...cookieOptions, httpOnly: false });
      }
    }

    return { success: true };
  } catch (error) {
    return { error: "Lỗi kết nối tới máy chủ." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("userName");
  redirect("/");
}
