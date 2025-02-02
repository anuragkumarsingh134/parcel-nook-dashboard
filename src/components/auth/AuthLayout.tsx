import { ReactNode } from "react";
import { DarkModeToggle } from "@/components/DarkModeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute top-4 right-4">
        <DarkModeToggle />
      </div>
      {children}
    </div>
  );
}