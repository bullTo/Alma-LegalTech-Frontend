"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
};

const LeadManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    typeof window !== "undefined" &&
      localStorage.getItem("isAuthenticated") === "true"
  );
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchLeads = async () => {
        try {
          const res = await fetch("/api/leads");
          if (!res.ok) throw new Error("Failed to fetch leads.");
          const data = await res.json();
          setLeads(data);
        } catch (err) {
          setErrorMessage(err instanceof Error ? err.message : "Unknown error");
        }
      };
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid password. Please try again.");
    }
  };

  const updateLeadStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REACHED_OUT" }),
      });
      if (!res.ok) throw new Error("Failed to update lead status.");
      const updatedLeads = leads.map((lead) =>
        lead.id === id ? { ...lead, status: "REACHED_OUT" } : lead
      );
      setLeads(updatedLeads);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 max-w-sm">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg border border-red-300">
            {errorMessage}
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

  return (
    <div className="container mx-auto p-6">
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg border border-red-300">
          {errorMessage}
        </div>
      )}
      {leads.map((lead) => (
        <Card key={lead.id} className="mb-4">
          <CardContent>
            <div>
              <Label>Full Name</Label>
              <p>
                {lead.firstName} {lead.lastName}
              </p>
            </div>
            <div>
              <Label>Email</Label>
              <p>{lead.email}</p>
            </div>
            <div>
              <Label>Status</Label>
              <p>{lead.status}</p>
            </div>
            <Button
              onClick={() => updateLeadStatus(lead.id)}
              disabled={lead.status === "REACHED_OUT"}
            >
              Mark as Reached Out
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeadManagement;
