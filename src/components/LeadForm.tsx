"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "./ui/checkbox";
import styled from "styled-components";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { LucideBadgeInfo, LucideDice6, HeartIcon } from "lucide-react";

const visaCard = [
  { name: "O-1", id: "o1" },
  { name: "EB-1A", id: "eb-1a" },
  { name: "EB-2 NIW", id: "eb-2-niw" },
  { name: "I don't know", id: "no-know" },
];

const StyledTextarea = styled(Textarea)`
  height: 150px;
`;

const LeadForm = () => {
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    linkedInProfile: string;
    countryOfInterest: string[];
    visasOfInterest: string[];
    resume: File | null;
    additionalInfo: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    linkedInProfile: "",
    countryOfInterest: [],
    visasOfInterest: [],
    resume: null,
    additionalInfo: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value instanceof File ? value : String(value));
      });
      const res = await fetch("/api/leads", {
        method: "POST",
        body: formDataObj,
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          linkedInProfile: "",
          countryOfInterest: [],
          visasOfInterest: [],
          resume: null,
          additionalInfo: "",
        });
      } else {
        alert("Failed to submit lead.");
      }
    } catch (err) {
      alert("Error submitting lead.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {success && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg border border-green-300">
          Lead submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <div className="flex flex-col items-center gap-4 mb-10 justify-center">
            <LucideBadgeInfo size={80} fill="#7b4096" strokeWidth={2} />
            <h2 className="text-2xl font-bold">
              Want to understand your visa options?
            </h2>
            <p className="text-1xl font-bold text-center">
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your
              case based on your goals
            </p>
          </div>
          <Input
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            placeholder="First Name"
          />
        </div>
        <div>
          <Input
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            placeholder="Last Name"
          />
        </div>
        <div>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            placeholder="Email Address"
          />
        </div>
        <div>
          <Select
            value={formData.countryOfInterest[0] || ""}
            onValueChange={(value) =>
              setFormData({ ...formData, countryOfInterest: [value] })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Country of Citizenship" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Country of Citizenship</SelectLabel>
                <SelectItem value="H-1B">United States</SelectItem>
                <SelectItem value="L-1">United Kingdom</SelectItem>
                <SelectItem value="O-1">Vietnam</SelectItem>
                <SelectItem value="E-2">Germany</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            value={formData.linkedInProfile}
            onChange={(e) =>
              setFormData({ ...formData, linkedInProfile: e.target.value })
            }
            placeholder="Linkedin/Personal Website URL"
          />
        </div>
        <div>
          <Label>Resume/CV Upload</Label>
          <Input
            type="file"
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0] || null;
              setFormData({ ...formData, resume: file });
            }}
            required
          />
        </div>
        <div className="flex flex-col items-center gap-4 justify-center">
          <LucideDice6 size={80} fill="#7b4096" strokeWidth={2} />
          <h2 className="text-2xl font-bold">Visa categories of interest?</h2>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          {visaCard.map((visa) => (
            <div key={visa.id} className="flex items-center">
              <Checkbox
                id={visa.id}
                checked={formData.visasOfInterest.includes(visa.name)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({
                      ...formData,
                      visasOfInterest: [...formData.visasOfInterest, visa.name],
                    });
                  } else {
                    setFormData({
                      ...formData,
                      visasOfInterest: formData.visasOfInterest.filter(
                        (v) => v !== visa.name
                      ),
                    });
                  }
                }}
              />
              <label
                htmlFor={visa.id}
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {visa.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 justify-center">
          <HeartIcon size={80} fill="#7b4096" strokeWidth={2} />
          <h2 className="text-2xl font-bold">How can we help?</h2>
        </div>
        <div>
          <StyledTextarea
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
            placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
          />
        </div>
        <Button type="submit" className=" text-white rounded-xl mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;
