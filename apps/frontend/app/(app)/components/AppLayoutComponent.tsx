import { Header } from "@/components/Header";
import { ReactNode } from "react";

export function AppLayoutComponent({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      <Header />
      <main className="flex-1 mt-[112px]">
        {children}
      </main>
    </div>
  );
}
