import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "HungNhot - Dầu nhớt toàn quốc",
  description: "Hệ thống chuyên cung cấp dầu nhớt chất lượng trên khắp tỉnh thành",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className={`${roboto.className} min-h-full flex flex-col overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
