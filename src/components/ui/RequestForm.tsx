import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FormData {
  requestorName: string;
  department: string;
  companyName: string;
  email: string;
  contactPhone: string;
  description: string;
  vendorSelection: string;
  completionDate: Date | undefined;
}

export default function RequestForm() {
  const [formData, setFormData] = useState<FormData>({
    requestorName: '',
    department: '',
    companyName: '',
    email: '',
    contactPhone: '',
    description: '',
    vendorSelection: '',
    completionDate: undefined,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prevState => ({
      ...prevState,
      completionDate: date,
    }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData)
    toast({
      title: "Request Submitted",
      description: "Your purchase request has been submitted successfully.",
    })
    // Reset form after submission
    setFormData({
      requestorName: '',
      department: '',
      companyName: '',
      email: '',
      contactPhone: '',
      description: '',
      vendorSelection: '',
      completionDate: undefined,
    })
  }

  const tomorrow = addDays(new Date(), 1)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Vendor Management Input System</CardTitle>
        <CardDescription>Submit a request to purchase products or services</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requestorName">Requestor Name</Label>
              <Input
                id="requestorName"
                name="requestorName"
                value={formData.requestorName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Select name="companyName" onValueChange={(value) => handleSelectChange('companyName', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Newrez">Newrez</SelectItem>
                <SelectItem value="Rithm">Rithm</SelectItem>
                <SelectItem value="Genesis">Genesis</SelectItem>
                <SelectItem value="SLS">SLS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone Number</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Brief description of goods or services being requested</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendorSelection">Has the business selected a vendor or do they need one?</Label>
            <Select name="vendorSelection" onValueChange={(value) => handleSelectChange('vendorSelection', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="selected">LOB has selected a Vendor</SelectItem>
                <SelectItem value="needsSelection">LOB Requires Procurement to select a Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="completionDate">Requested completion date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.completionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.completionDate ? format(formData.completionDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.completionDate || undefined}
                  onSelect={handleDateChange}
                  disabled={(date) => date < tomorrow}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>
      </CardContent>
      <CardFooter>
      <Button type="submit" className="w-full">Submit Request</Button>
      </CardFooter>
    </Card>
  )
}