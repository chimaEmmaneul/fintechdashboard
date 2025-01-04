"use client";

import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

const actions = [
  { name: "Transfer Money", icon: "💸" },
  { name: "Pay Bill", icon: "📄" },
  { name: "Check Balance", icon: "💰" },
  { name: "Invest", icon: "📈" },
];

export default function QuickActionsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[500]">
      <div
        className={`transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        hellaljsdlkgjlskddjsljfskdfls
        {isOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              {actions.map((action) => (
                <Button
                  key={action.name}
                  variant="outline"
                  className="flex flex-col items-center justify-center p-4 h-24"
                  onClick={() => {
                    console.log(`${action.name} clicked`);
                    setIsOpen(false);
                  }}
                >
                  <span className="text-2xl mb-2">{action.icon}</span>
                  <span className="text-sm">{action.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <Button
        className="rounded-full w-12 h-12 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <PlusIcon className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
