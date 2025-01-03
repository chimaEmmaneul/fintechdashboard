"use client";

import {
  BellIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeProvider";
import { Tooltip } from "./Tooltip";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";

import { openSidebar } from "@/store/sidebarSlice";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between lg:justify-end items-center">
      <h1 className="text-2xl block lg:hidden font-bold text-gray-900 dark:text-white">
        FinTech App
      </h1>
      <div className="flex items-center space-x-4">
        <Tooltip content="Toggle theme">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {theme === "dark" ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </Tooltip>
        <Tooltip content="Notifications">
          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              3
            </span>
          </button>
        </Tooltip>
        <Tooltip content="Profile">
          <button className="relative text-gray-600 dark:text-gray-300">
            <UserCircleIcon className="h-8 w-8 cursor-pointer" />
          </button>
        </Tooltip>

        <div className="min-[480px]:hidden">
          <Tooltip content="Menu">
            <button onClick={() => dispatch(openSidebar())}>
              <Menu />
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}
