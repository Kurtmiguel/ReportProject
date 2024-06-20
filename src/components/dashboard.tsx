'use client'

import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import Image from "next/image";
import { DashboardForm } from "@/lib/zod-schema";
import Link from "next/link";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { Label } from "@radix-ui/react-label";
import { ActivitySquare } from "lucide-react";
import axios from "axios";

interface Report {
  title: string;
  date: string;
  status: string;
  remarks: string;
}

export const DashboardComponent = () => {
  const barangay = ["Barangay 1", "Barangay 2", "Barangay 3"];
  const inHouseType = ["Administrator", "Teaching", "Non-teaching", "Others"];
  const studentType = ["Alumni member", "Graduate", "Undergraduate"];
  const form = useForm<DashboardForm>({
    resolver: zodResolver(DashboardForm),
    defaultValues: {
      month: "",
      projectName: "",
      coordinatorName: "",
      event: "",
      title: "",
      date: "",
      venue: "",
      text: "",
      clientfields:[{ numAdults:'', numKids:'', brgy:''}],
      inhousefields:[{ name:'', inhousetype:''}],
      studentfields:[{ name:'', course:'', organization:'', studenttype:''}],
      partnerfields:[{ name:''}],
      narrative: "",
      monitoringUpload: "",
      attendanceUpload: "",
      attachmentsUpload: "",
    },
  });

  const {fields: clientfields, append: clientAddField, remove: clientRemoveField } = useFieldArray({
    control: form.control,
    name: "clientfields",
  });

  const {fields: inhousefields, append: inHouseAddField, remove: inHouseRemoveField } = useFieldArray({
    control: form.control,
    name: "inhousefields",
  });

  const {fields: studentfields, append: studentAddField, remove: studentRemoveField } = useFieldArray({
    control: form.control,
    name: "studentfields",
  });

  const {fields: partnerfields, append: partnerAddField, remove: partnerRemoveField } = useFieldArray({
    control: form.control,
    name: "partnerfields",
  });

  const [activeTab, setActiveTab] = useState('');
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  function onSubmit(values: DashboardForm) {
    axios.post('/api/sumbitReport', values).then(() => {
      alert("Report submitted succesfully.");
    }).catch((error: any) => {
      console.error("There was an error submitting the report!", error);
    });
  }

  const [submittedReports, setSubmittedReports] = useState<Report[]>([]);
  const [approvedReports, setApprovedReports] = useState<Report[]>([]);

  useEffect(() => {
    axios.get('/api/report').then((response: { data: { submitted: Report[]; approved: Report[]; }; }) => {
      setSubmittedReports(response.data.submitted);
      setApprovedReports(response.data.approved);
    });
  },[]);

  return (
    <div className="h-screen w-full flex flex-col text-emerald-950">
      <header className="bg-white flex justify-center items-center border-y-2 border-lightgray">
        <Image
          src="/trinity_logo.png"
          alt="Trinity logo"
          priority = {true}
          className="w-auto h-auto"
          width={150}
          height={150}
        />
      </header>
      <div className="flex flex-1">
        <nav className="bg-white text-yellow-400 w-1/4 p-4 space-y-4 items-center border-x-2 border-lightgray">
          <Button
            onClick={() => handleTabClick('submit')}
            className="block px-4 py-2 bg-emerald-950 text-peach rounded text-center w-full"
          >
            Submit
          </Button>
          <Button
            onClick={() => handleTabClick('view')}
            className="block px-4 py-2 bg-emerald-950 text-peach rounded text-center w-full"
          >
            View
          </Button>
          <Button
            onClick={() => handleTabClick('list')}
            className="block px-4 py-2 bg-emerald-950 text-peach rounded text-center w-full"
          >
            List
          </Button>
        </nav>
        <main className="flex-1 p-4 bg-white overflow-y-auto">
          {activeTab === 'submit' && (
            <div className="space-y-8">
              <div className="bg-gray-200 p-4 rounded">
                <h2 className="text-xl mb-4">Accomplishment Report</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Month</FormLabel>
                          <FormControl className="w-48">
                            <Input 
                              placeholder="Enter month" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Project Name</FormLabel>
                          <FormControl className="w-96">
                            <Input 
                              placeholder="Enter project name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coordinatorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Coordinator Name</FormLabel>
                          <FormControl className="w-96">
                            <Input 
                              placeholder="Enter coordinator name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> 
                  </form>
                </Form>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h2 className="text-xl mb-4">Table Summary</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="event"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Event</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter event name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Date</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="venue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block">Venue</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter venue name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Objective</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter specific objectives"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h3 className="text-lg mt-4">Client/Consumers</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {clientfields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-4">
                        <FormField
                          control={form.control}
                          name={`clientfields.${index}.numAdults`}
                          render={({ field}) => (
                            <FormItem>
                              <FormLabel className="block">Adults</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-56"
                                  placeholder="Number of participants" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`clientfields.${index}.numKids`}
                          render={({ field}) => (
                            <FormItem>
                              <FormLabel className="block">Kids</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-56"
                                  placeholder="Number of participants" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`clientfields.${index}.brgy`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Barangay</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-96">
                                    <SelectValue 
                                      placeholder="Select barangay" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {barangay.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          onClick={() => clientRemoveField(index)} 
                          className="bg-red-700 text-white px-2 py-1 mt-4 rounded"
                          >
                            Remove
                          </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      onClick={() => clientAddField({ numAdults:'', numKids:'', brgy:''})} 
                      className="bg-emerald-950 text-yellow-400 px-4 py-2 rounded"
                      >
                        Add Clients/Consumers
                      </Button>
                  </form>
                </Form>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h3 className="text-lg mt-4">In-house Volunteer</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {inhousefields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-4">
                        <FormField
                          control={form.control}
                          name={`inhousefields.${index}.name`}
                          render={({ field}) => (
                            <FormItem>
                              <FormLabel className="block">Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-56"
                                  placeholder="Enter volunteer name" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`inhousefields.${index}.inhousetype`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-96">
                                    <SelectValue 
                                      placeholder="Select Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {inHouseType.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          onClick={() => inHouseRemoveField(index)} 
                          className="bg-red-700 text-white px-2 py-1 mt-4 rounded"
                          >
                            Remove
                          </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      onClick={() => inHouseAddField({ name:'', inhousetype:''})} 
                      className="bg-emerald-950 text-yellow-400 px-4 py-2 rounded"
                      >
                        Add In-house Volunteer
                      </Button>
                  </form>
                </Form>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h3 className="text-lg mt-4">Student Volunteer</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {studentfields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-4">
                        <FormField
                          control={form.control}
                          name={`studentfields.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-56"
                                  placeholder="Enter volunteer name" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`studentfields.${index}.course`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Course</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-40"
                                  placeholder="Enter Course" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`studentfields.${index}.organization`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Organization</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-64"
                                  placeholder="Enter Organization" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`studentfields.${index}.studenttype`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-40">
                                    <SelectValue 
                                      placeholder="Select Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {studentType.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          onClick={() => studentRemoveField(index)} 
                          className="bg-red-700 text-white px-2 py-1 mt-4 rounded"
                          >
                            Remove
                          </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      onClick={() => studentAddField({ name:'', course:'', organization:'', studenttype:''})}
                      className="bg-emerald-950 text-yellow-400 rounded px-4 py-2"
                      >
                        Add Student Volunteer
                      </Button>
                  </form>
                </Form>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h3 className="text-lg mt-4">Partner Organization or Office</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {partnerfields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-4">
                        <FormField
                          control={form.control}
                          name={`partnerfields.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block">Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-96"
                                  placeholder="Enter organization or office name" {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="button" 
                          onClick={() => partnerRemoveField(index)} 
                          className="bg-red-700 text-white px-2 py-1 mt-4 rounded"
                          >
                            Remove
                          </Button>
                      </div>
                    ))}
                    <Button 
                      type="button" 
                      onClick={() => partnerAddField({ name:''})} 
                      className="bg-emerald-950 text-yellow-400 px-4 py-2 rounded"
                      >
                        Add Partner Name 
                      </Button>
                  </form>
                </Form>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="narrative"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Narrative</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your narrative report here"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="monitoringUpload">Monitoring and Evaluation</Label>
                      <Input id="monitoringUpload" type="file" />
                      <FormDescription>(PDF/DOC/JPEG/PNG)</FormDescription>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="monitoringUpload">Attendance</Label>
                      <Input id="monitoringUpload" type="file" />
                      <FormDescription>(PDF/DOC/JPEG/PNG)</FormDescription>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="attendanceUpload">Attachments</Label>
                      <Input id="attendanceUpload" type="file" />
                      <FormDescription>(PDF/DOC/JPEG/PNG)</FormDescription>
                    </div>
                    <Button className="bg-emerald-950 text-yellow-400"type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>
          )}
          {activeTab === 'view' && (
            <div>
              <h2 className="text-xl mb-4">Submitted Reports</h2>
              <table className="table-auto w-full bg-white rounded border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedReports.map((report, index) => (
                    <tr key={index} className="bg-gray-100">
                      <td className="border px-4 py-2">{report.title}</td>
                      <td className="border px-4 py-2">{report.date}</td>
                      <td className="border px-4 py-2">{report.status}</td>
                      <td className="border px-4 py-2">{report.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'list' && (
          <div>
            <h2>List of Approved Reports</h2>
            {approvedReports.map((report, index) => (
              <div key={index} className="border p-4 mb-4">
                <h3>{report.title} - {report.date}</h3>
                <p>Remarks: {report.remarks}</p>
              </div>
            ))}
          </div>
          )}
          <div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { DashboardForm };