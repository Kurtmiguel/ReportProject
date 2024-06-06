'use client'

import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import Image from "next/image";
import { DashboardForm } from "@/lib/zod-schema";
import Link from "next/link";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { Label } from "@radix-ui/react-label";

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
      adult: "",
      kids: "",
      brgy: "",
      inHouseVolunteerName: "",
      inHouseType: "",
      studentVolunteerName: "",
      organization:"",
      course:"",
      studentType:"",
      partnerName: "",
      narrative: "",
      monitoringUpload: "",
      attendanceUpload: "",
      attachmentsUpload: "",
    },
  });

  const [activeTab, setActiveTab] = useState('');
  const [inhousefields, inHouseSetFields] = useState([{ name: '', inHouseType: '' }]);
  const [studentfields, studentSetFields] = useState([{ name: '', course: '', organization:'',studentType:'' }]);
  const [partnerfields, partnerSetFields] = useState([{ name:''}]);
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const handleAddField = () => {
    inHouseSetFields([...inhousefields, { name: '', inHouseType: '' }]);
  };

  const handleStudentAddField = () => {
    studentSetFields([...studentfields, { name: '', course: '', organization:'',studentType:'' }]);
  };

  const handlePartnerAddField = () => {
    partnerSetFields([...partnerfields, { name: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const inHouseNewFields = inhousefields.filter((_, i) => i !== index);
    inHouseSetFields(inHouseNewFields);
  };

  const handleStudentRemoveField = (index: number) => {
    const studentNewFields = studentfields.filter((_, i) => i !== index);
    studentSetFields(studentNewFields);
  };

  const handlePartnerRemoveField = (index: number) => {
    const partnerNewFields = partnerfields.filter((_, i) => i !== index);
    partnerSetFields(partnerNewFields);
  };

  const handleFieldChange = (index: number, key: string, value: string) => {
    const inHouseNewFields = inhousefields.map((field, i) => (
      i === index ? { ...field, [key]: value } : field
    ));
    inHouseSetFields(inHouseNewFields);
  };

  const handleStudentFieldChange = (index: number, key: string, value: string) => {
    const studentNewFields = studentfields.map((field, i) => (
      i === index ? { ...field, [key]: value } : field
    ));
    studentSetFields(studentNewFields);
  };

  const handlePartnerFieldChange = (index: number, key: string, value: string) => {
    const partnerNewFields = partnerfields.map((field, i) => (
      i === index ? { ...field, [key]: value } : field
    ));
    partnerSetFields(partnerNewFields);
  };

  function onSubmit(values: DashboardForm) {
    console.log(values);
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="bg-white flex justify-center items-center border-y-2 border-lightgray">
        <Image
          src="/trinity_logo.png"
          alt="logo"
          width={150}
          height={150}
        />
      </header>
      <div className="flex flex-1">
        <nav className="bg-white text-white w-1/4 p-4 space-y-4 items-center border-x-2 border-lightgray">
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
            <div>
              <h2 className="text-xl mb-4">Accomplishment Report</h2>
              <div className="space-y-4">
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="month"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block">Month</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
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
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
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
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h3 className="text-lg mt-4">Table Summary</h3>
                      <FormField
                        control={form.control}
                        name="event"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block">Event</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
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
                              <Input placeholder="shadcn" {...field} />
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
                              <Input placeholder="shadcn" {...field} />
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
                              <Input placeholder="shadcn" {...field} />
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
                                placeholder="Objectives"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h3 className="text-lg mt-4">Client/Consumers</h3>
                      <FormField
                        control={form.control}
                        name="adult"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block">Adult</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="kids"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block">Kids</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="brgy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barangay</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Barangay" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {barangay.map((barangay) => (
                                  <SelectItem key={barangay} value={barangay}>{barangay}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <h3 className="text-lg mt-4">In-house Volunteer</h3>
                      {inhousefields.map((field, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <FormField
                            control={form.control}
                            name="inHouseVolunteerName"
                            render={({ field: formField }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-96"
                                    value={field.name}
                                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                    placeholder="Name" {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="inHouseType"
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-96">
                                      <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {inHouseType.map((inHouseType) => (
                                      <SelectItem key={inHouseType} value={inHouseType}>{inHouseType}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="button" onClick={handleAddField} className="bg-green-500 text-white">➕</Button>
                          <Button type="button" onClick={() => handleRemoveField(index)} className="bg-red-500 text-white">🗑️</Button>
                        </div>
                      ))}
                      <h3 className="text-lg mt-4">Student Volunteer</h3>
                      {studentfields.map((field, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <FormField
                            control={form.control}
                            name="studentVolunteerName"
                            render={({ field: formField }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-56"
                                    value={field.name}
                                    onChange={(e) => handleStudentFieldChange(index, 'name', e.target.value)}
                                    placeholder="Name" {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="button" onClick={handleStudentAddField} className="bg-green-500 text-white">➕</Button>
                          <Button type="button" onClick={() => handleStudentRemoveField(index)} className="bg-red-500 text-white">🗑️</Button>
                        </div>
                      ))}
                      <h3 className="text-lg mt-4">Partner Organization or Office</h3>
                      {partnerfields.map((field, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <FormField
                            control={form.control}
                            name="partnerName"
                            render={({ field: formField }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-96"
                                    value={field.name}
                                    onChange={(e) => handlePartnerFieldChange(index, 'name', e.target.value)}
                                    placeholder="Partner Organization or Office Name" {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="button" onClick={handlePartnerAddField} className="bg-green-500 text-white">➕</Button>
                          <Button type="button" onClick={() => handlePartnerRemoveField(index)} className="bg-red-500 text-white">🗑️</Button>
                        </div>
                      ))}
                      <FormField
                        control={form.control}
                        name="narrative"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Narrative</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Write your Narrative Report here"
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
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="monitoringUpload">Attendance</Label>
                        <Input id="monitoringUpload" type="file" />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="attendanceUpload">Monitoring and Evaluation</Label>
                        <Input id="attendanceUpload" type="file" />
                      </div>
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </div>
              </div>
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
