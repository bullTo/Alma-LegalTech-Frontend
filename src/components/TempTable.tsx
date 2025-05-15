import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/app/store";
import { updateLeadStatus } from "@/app/slices/leadSlice";

type Lead = {
  id: number | string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  status: string;
};

const TempTable = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/leads");
        setLeads(response.data);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError("Failed to fetch leads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchLeads();
  }, [isAuthenticated]);

  const handleStatusUpdate = async (leadId: number | string) => {
    try {
      const response = await axios.put(`/api/leads/${leadId}`, {
        status: "REACHED_OUT",
      });
      dispatch(updateLeadStatus(response.data));
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId ? { ...lead, status: "REACHED_OUT" } : lead
        )
      );
    } catch (err) {
      console.error("Error updating lead status:", err);
      setError("Failed to update lead status. Please try again later.");
    }
  };

  return (
    <Card className="mb-6 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Leads</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                <th className="border-b p-3 font-medium">First Name</th>
                <th className="border-b p-3 font-medium">Last Name</th>
                <th className="border-b p-3 font-medium">Email</th>
                <th className="border-b p-3 font-medium">Status</th>
                <th className="border-b p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="p-3">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="p-3">
                        <Skeleton className="h-8 w-28" />
                      </td>
                    </tr>
                  ))
                : leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-accent transition-colors"
                    >
                      <td className="border-b p-3">
                        {lead.firstName ||
                          (lead.name ? lead.name.split(" ")[0] : "")}
                      </td>
                      <td className="border-b p-3">
                        {lead.lastName ||
                          (lead.name ? lead.name.split(" ")[1] || "" : "")}
                      </td>
                      <td className="border-b p-3">{lead.email}</td>
                      <td className="border-b p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            lead.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="border-b p-3">
                        {lead.status === "Pending" && (
                          <Button
                            onClick={() => handleStatusUpdate(lead.id)}
                            className="bg-blue-600 text-white rounded-xl"
                            size="sm"
                          >
                            Mark as Reached Out
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempTable;
