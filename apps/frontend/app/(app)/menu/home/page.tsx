"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const mobileImages = [
    "/mobile/a1.png",
    "/mobile/a2.png",
    "/mobile/a3.png",
    "/mobile/a4.png",
    "/mobile/a5.png",
    "/mobile/a6.png",
    "/mobile/a7.png",
    "/mobile/a8.png",
    "/mobile/a9.png",
];

export default function HomePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[calc(100vh-72px)] flex items-center justify-center overflow-hidden">
            {/* Desktop Background */}
            <div className="absolute inset-0 z-0 hidden md:block">
                <Image
                    src="/oli.jpg"
                    alt="System Engine Oil Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* Mobile Background Slider */}
            <div className="absolute inset-0 z-0 block md:hidden">
                {mobileImages.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Mobile Background ${index + 1}`}
                        fill
                        className={`object-contain transition-all duration-[3000ms] ease-in-out ${index === currentImageIndex ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-105'}`}
                        priority={index === 0}
                    />
                ))}
            </div>

            <div className="relative z-10 hidden md:flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">
                    Chăm Sóc Động Cơ<br />
                    <span className="text-blue-500">Hoàn Hảo</span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl font-medium">
                    Khám phá bộ sưu tập dầu nhớt cao cấp, tối ưu sức mạnh và độ bền cho mọi chuyến đi của bạn.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/menu/products"
                        className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                    >
                        Mua Sắm Ngay
                    </Link>
                    <Link
                        href="/register"
                        className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                    >
                        Trở Thành Thành Viên
                    </Link>
                </div>
            </div>
        </div>
    );
}
