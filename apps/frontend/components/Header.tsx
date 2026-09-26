import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { logoutAction } from "@/app/(app)/actions/auth";
import { getMenus } from "@/app/(app)/menu/product/layoutAction";
import { getProducts } from "@/app/(app)/product/productAction";

export async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const userName = cookieStore.get("userName")?.value || "Khách hàng";
  const isLoggedIn = !!token;

  // Lấy danh sách menu từ Backend
  const menus = await getMenus({ page: 1, limit: 50 });

  // Lấy danh sách sản phẩm từ Backend
  const products = await getProducts({ page: 1, limit: 50 });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 shadow-md border-b border-zinc-200 dark:border-zinc-800">
      {/* Dòng 1: Logo, Search, Dải đỏ tiện ích */}

      <div className="flex items-center justify-between h-[64px] pl-2 md:pl-8">
        <div className="flex items-center h-full pt-1 md:pt-0 md:mt-[50px]">
          <Link href="/" className="relative flex items-center w-[220px] md:w-[500px] h-12 md:h-16 overflow-hidden rounded-lg group">
            {/* Nhúng keyframes animation trực tiếp */}
            <style>{`
              @keyframes driveCar {
                0% { transform: translateX(-60px); opacity: 0; }
                10% { opacity: 1; }
                80% { transform: translateX(350px); opacity: 1; }
                90% { opacity: 0; transform: translateX(380px); }
                100% { opacity: 0; transform: translateX(-60px); }
              }
            `}</style>

            {/* Chiếc xe đang chạy (hiệu ứng lặp vô hạn) */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="inline-block text-[24px] md:text-[40px] leading-none" style={{ animation: "driveCar 3.5s ease-in-out infinite" }}>
                🚗💨
              </div>
            </div>

            {/* Bình nhớt ở góc phải */}
            <div className="absolute inset-0 flex items-center justify-end z-0">
              <div className="text-[40px] leading-none transition-transform group-hover:scale-110">
                🛢️
              </div>
            </div>

            {/* Tên thương hiệu mờ mờ phía sau */}
            <div className="absolute inset-0 flex items-center justify-start pl-[20px] md:pl-[100px] font-black italic text-red-600/30 uppercase tracking-[0.05em] text-xl md:text-4xl drop-shadow-[0_5px_5px_rgba(255,255,255,0.5)] z-0 pointer-events-none">
              HungNhot.VN
            </div>
          </Link>
        </div>

        {/* Cụm Search & Dải Đỏ được gom về bên phải */}
        <div className="flex-1 flex items-center justify-end h-full">
          {/* Search Bar */}
          <div className="relative !w-[300px] hidden md:block mr-6">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="w-full border border-red-600 rounded-md px-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 bg-transparent text-zinc-900 dark:text-zinc-100"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>

          {/* Dải nền đỏ bên phải */}
          <div className="bg-transparent md:bg-[#e31837] text-zinc-800 dark:text-zinc-100 md:text-white h-full flex items-center px-3 md:px-8 rounded-none md:rounded-l-[40px] gap-3 md:gap-6 text-sm font-medium">
            {menus?.map((menu: any, index: number) => (
              <Link
                key={menu.id}
                href={menu.path || "#"}
                className={`hover:text-zinc-200 transition-colors ${index > 1 ? 'hidden lg:block' : 'hidden xl:block'}`}
              >
                {menu.name}
              </Link>
            ))}
            <span className="font-bold hidden lg:block">Hotline: 0984367272</span>

            {/* Auth section */}
            <div className="flex items-center gap-1 md:gap-2 md:border-l md:border-red-400/50 pl-2 md:pl-4 ml-1 md:ml-2">
              {isLoggedIn ? (
                <div className="relative group cursor-pointer">
                  {/* Hiển thị tên người dùng (ẩn chữ đăng xuất đi) */}
                  <div className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="max-w-[150px] truncate">{userName}</span>
                  </div>

                  {/* Menu thả xuống chứa nút Đăng xuất khi hover */}
                  <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <form action={logoutAction} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg p-1 min-w-[120px]">
                      <button type="submit" className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded transition-colors font-semibold">
                        Đăng xuất
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login" className="hover:text-zinc-200 transition-colors">Đăng nhập</Link>
                  <span>/</span>
                  <Link href="/register" className="hover:text-zinc-200 transition-colors">Đăng ký</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dòng 2: Danh sách Hãng Xe (Dữ liệu tạm chờ API) */}
      <nav className="flex flex-col lg:flex-row items-center justify-center gap-2 md:gap-5 py-2 md:py-3 px-2 bg-white dark:bg-zinc-950 text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 border-t border-zinc-100 dark:border-zinc-900">
        {/* Nhãn điều hướng */}
        <div className="flex items-center gap-2 text-[#e31837] w-full lg:w-auto justify-center mb-1 lg:mb-0">
          <span className="uppercase tracking-wide text-[10px] md:text-sm">Chọn dòng sản phẩm</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 animate-pulse transform rotate-90 lg:rotate-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 w-full lg:w-auto px-1 md:px-4">
          {products?.map((product: any, idx: number, arr: any[]) => (
            <div key={product.id || idx} className="flex items-center gap-3 shrink-0">
              <Link
                href={product.path || "#"}
                className="hover:text-[#e31837] dark:hover:text-[#e31837] uppercase transition-colors"
              >
                {product.name}
              </Link>
              {/* Vạch ngăn cách */}
              {idx !== arr.length - 1 && (
                <span className="w-[1.5px] h-4 bg-zinc-300 dark:bg-zinc-700 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
