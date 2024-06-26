'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Report {
  id: number;
  title: string;
  date: string;
  status: string;
  remarks: string;
}

export const AdminDashboardComponent = () => {
  const [activeTab, setActiveTab] = useState('');
  const [submittedReports, setSubmittedReports] = useState<Report[]>([]);
  const [approvedReports, setApprovedReports] = useState<Report[]>([]);

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    axios.get('/api/submitReport').then((response) => {
      setSubmittedReports(response.data.submitted);
      setApprovedReports(response.data.approved);
    })
    .catch((error) => {
        console.error("Error fetching reports:", error)
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col text-emerald-950">
      <header className="bg-white flex justify-center items-center border-y-2 border-lightgray">
        <Image
          src="/trinity_logo.png"
          alt="Trinity logo"
          priority={true}
          className="w-auto h-auto"
          width={150}
          height={150}
        />
      </header>
      <div className="flex flex-1">
        <nav className="bg-white text-yellow-400 w-1/4 p-4 space-y-4 items-center border-x-2 border-lightgray">
          <Button
            onClick={() => handleTabClick('submitted')}
            className="block px-4 py-2 bg-emerald-950 text-peach rounded text-center w-full"
          >
            Submitted Reports
          </Button>
          <Button
            onClick={() => handleTabClick('approved')}
            className="block px-4 py-2 bg-emerald-950 text-peach rounded text-center w-full"
          >
            Approved Reports
          </Button>
        </nav>
        <main className="flex-1 p-4 bg-white overflow-y-auto">
          {activeTab === 'submitted' && (
            <div>
              <h2>Submitted Reports</h2>
            </div>
          )}
          {activeTab === 'approved' && (
            <div>
              <h2>Approved Reports</h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
