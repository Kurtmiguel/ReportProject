'use client'

import React, {useState} from "react";
import {useRouter} from 'next/navigation';
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
} from "@/components/ui/select"

import { Input } from '@/components/ui/input';
import { LoginForm } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Sign } from "crypto";
import { SignUpComponent } from "./sign-up";
import { Link } from "lucide-react";

export const LoginComponent = () => {
    const router = useRouter();

    const form = useForm<LoginForm>({
        resolver: zodResolver(LoginForm),
        defaultValues:{
            username:"",
            password:"",
            role:"user",
        },
    })
    function onSubmit(values: LoginForm) {
        console.log(values);
    }

  return(
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" {...field} />
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
              <div className="flex pt-4 justify-between text-center">
                <button onClick={() => router.push('/register')}>Not yet register?</button>
                <Button className = "bg-emerald-950 text-yellow-400"type="submit">Log In</Button>
              </div>
            </form>
          </Form>
        </aside>
      </div>
    </main>
  );
};

export { LoginForm };
