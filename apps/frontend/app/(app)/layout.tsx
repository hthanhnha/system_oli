import { AppLayoutComponent } from "./components/AppLayoutComponent";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppLayoutComponent>{children}</AppLayoutComponent>;
}
