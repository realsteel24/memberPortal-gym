"use client";
import {
  Dumbbell,
  Home,
  User,
  CreditCard,
  GroupIcon as Classes,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ gymId: string }>;
}) {
  const [gymId, setGymId] = useState("");
  useEffect(() => {
    const getGymId = async () => {
      try {
        const resolvedGymId = (await params).gymId;
        setGymId(resolvedGymId);
      } catch (err) {
        console.log("Failed to fetch gymId.", err);
      }
    };

    getGymId();
  }, [params]);
  const navItems = [
    { href: `/dashboard/${gymId}`, icon: Home, label: "Dashboard" },
    { href: `/dashboard/${gymId}/profile`, icon: User, label: "Profile" },
    {
      href: `/dashboard/${gymId}/payments`,
      icon: CreditCard,
      label: "Payments",
    },
    { href: `/dashboard/${gymId}/classes`, icon: Classes, label: "Classes" },
  ];
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {!isMobile && (
        <header className="bg-red-700 text-primary-foreground shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6" />
              <span className="text-xl font-bold">Mohans Planet</span>
            </Link>
            <ul className="hidden md:flex md:space-x-4 items-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block hover:text-gray-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </header>
      )}

      <main className="flex-grow container mx-auto px-4 py-8 mb-16 md:mb-0">
        {children}
      </main>
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground shadow-md">
          <ul className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center p-2 ${
                    pathname === item.href ? "text-gray-300" : ""
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <footer className="bg-red-700 text-primary-foreground py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          © 2024 Mohans Planet. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
