import { cookies } from "next/headers";

export async function serverFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://system-oli.onrender.com/api/n1";

  // Chuẩn hóa đường dẫn để tránh bị thừa hoặc thiếu dấu gạch chéo (/)
  const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const fullUrl = `${baseUrl}${formattedEndpoint}`;
  console.log("--> Requesting URL:", fullUrl); // Dòng log này sẽ in ra kết quả trên server của Vercel

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  return response;
}