"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router-dom";

const menuItems = [
  { id: "demographics", label: "Demographics" },
  { id: "medicalHistory", label: "Medical History" },
  { id: "consultations", label: "Consultations" },
  { id: "physicalExams", label: "Physical Exams" },
  { id: "treatments", label: "Treatments" },
];

export default function Component() {
  const [activeMenuItem, setActiveMenuItem] = useState("demographics");

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">
            Medical Dashboard
          </h1>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeMenuItem === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start hover:text-blue-700 hover:bg-blue-50 transition-all 
                          ${
                            activeMenuItem === item.id
                              ? "text-white bg-blue-500"
                              : "text-blue-600 bg-blue-50"
                          }`}
              onClick={() => setActiveMenuItem(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
