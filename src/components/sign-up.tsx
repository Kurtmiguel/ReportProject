'use client'

import React, { useState } from "react";
import {useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { RegisterForm, SignUp } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

export const SignUpComponent = () => {
  const colleges = ["College 1", "College 2", "College 3"];
  const department = ["Department 1", "Department 2", "Department 3"];
  const router = useRouter();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(SignUp),
    defaultValues: {
      username:"",
      name: "",
      email: "",
      password: "",
      role: "user",
      college:"",
      department: "",
    },
  });

  function onSubmit(values: RegisterForm) {
    console.log(values);
  }

  return (
    <main className="text-emerald-950">
      <div className="flex justify-center items-center flex-1">
        <aside className="h-full w-[360px] border-2 px-8 py-4 shadow-2xl">
          <div className="flex flex-col gap-y-2 justify-center items-center pb-5">
            <Image 
              src="/trinity_logo.png"
              alt="Trinity logo"
              priority = {true}
              className="w-auto h-auto"
              width={150}
              height={150}
            />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="johndoe@email.com..." {...field} />
                    </FormControl>                  
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="Enter your password" 
                        placeholder="******" {...field} />
                    </FormControl>                
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="TCET">TCET</SelectItem>
                        <SelectItem value="DEAN">DEAN</SelectItem>
                        <SelectItem value="TCCD">TCCD</SelectItem>
                        <SelectItem value="VPAA">VPAA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            placeholder="Select college" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colleges.map((college) => (
                        <SelectItem key={college} value={college}>{college}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {department.map((department) => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-emerald-950 text-yellow-400"onClick={() => router.push('/login')} type="submit">Register</Button>
            </form>
          </Form>
        </aside>
      </div>
    </main>
  );
};

export {SignUp};