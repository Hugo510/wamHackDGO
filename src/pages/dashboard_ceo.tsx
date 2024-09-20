"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, BarChart, PieChart, LineChart, Activity } from 'lucide-react';

const menuItems = [
  { id: 'demographics', label: 'Demographics' },
  { id: 'medicalHistory', label: 'Medical History' },
  { id: 'consultations', label: 'Consultations' },
  { id: 'physicalExams', label: 'Physical Exams' },
  { id: 'treatments', label: 'Treatments' },
];

export default function Component() {
  const [activeMenuItem, setActiveMenuItem] = useState('demographics');

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Medical Dashboard</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeMenuItem === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start hover:text-blue-700 hover:bg-blue-50 transition-all 
                          ${activeMenuItem === item.id ? 'text-white bg-blue-500' : 'text-blue-600 bg-blue-50'}`}
              onClick={() => setActiveMenuItem(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-2 gap-6">
          {/* Age and Sex Distribution */}
          <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-600">Age and Sex Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-blue-50 flex items-center justify-center rounded-md">
                <BarChart className="w-16 h-16 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution of Patients */}
          <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-600">Geographic Distribution of Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-blue-50 flex items-center justify-center rounded-md relative">
                <MapPin className="w-12 h-12 text-blue-500 absolute" style={{ top: '30%', left: '40%' }} />
                <MapPin className="w-8 h-8 text-blue-500 absolute" style={{ top: '50%', left: '60%' }} />
                <MapPin className="w-6 h-6 text-blue-500 absolute" style={{ top: '70%', left: '30%' }} />
              </div>
            </CardContent>
          </Card>

          {/* Non-Pathological Background Trends */}
          <Card className="col-span-2 bg-white shadow-md hover:bg-blue-50 transition-colors">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-600">Non-Pathological Background Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
                <LineChart className="w-16 h-16 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          {/* Distribution of Pathological Background */}
          <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-600">Distribution of Pathological Background</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
                <PieChart className="w-16 h-16 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          {/* Frequency of Hereditary-Familial Diseases */}
          <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
            <CardHeader className="border-b border-blue-100">
              <CardTitle className="text-blue-600">Frequency of Hereditary-Familial Diseases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
                <Activity className="w-16 h-16 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
