"use client";

import { useState } from "react";
import {
  HomeIcon,
  CreditCardIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { closeSidebar } from "@/store/sidebarSlice";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  console.log(isOpen);
  const pages = [
    { name: "Dashboard", icon: HomeIcon, href: "/" },
    { name: "Loan Management", icon: CreditCardIcon, href: "/loans" },
    { name: "Transaction History", icon: ClockIcon, href: "/transactions" },
  ];

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className=" hidden min-[480px]:block  bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-16 lg:w-64 min-h-screen p-4 shadow-md">
        <h1 className="text-2xl font-bold hidden lg:block">FinTech App</h1>
        <nav className="mt-14">
          <ul className="space-y-3">
            {filteredPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href}>
                  <span
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      pathname === page.href
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <page.icon className="h-5 w-5" />
                    <span className="hidden lg:inline">{page.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Sheet open={isOpen} onOpenChange={() => dispatch(closeSidebar())}>
        <SheetContent side="left" className="max-w-full w-full p-0">
          <div className="  bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full min-h-screen p-4 shadow-md">
            <h1 className="text-2xl font-bold block">FinTech App</h1>
            <nav className="mt-14">
              <ul className="space-y-3">
                {filteredPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      onClick={() => dispatch(closeSidebar())}
                      href={page.href}
                    >
                      <span
                        className={`flex items-center space-x-2 p-2 rounded-lg ${
                          pathname === page.href
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        <page.icon className="h-5 w-5" />
                        <span className="inline">{page.name}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
