"use client";
import React, { useEffect, useState } from "react";
import LeadManagement from "@/components/LeadManagement";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LeadHeader } from "@/components/LeadHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const LeadsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  if (isAuthenticated === false) {
    return (
      <div className="container mx-auto p-6 max-w-sm">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg border border-red-300">
            {error}
          </div>
        )}
        <Card>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-blue-600 text-white rounded-xl mt-4"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAuthenticated === null) {
    // Optionally, show a loading spinner here
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <LeadHeader />
        <LeadManagement />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LeadsPage;
