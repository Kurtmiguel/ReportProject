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
        },
    })
    function onSubmit(values: LoginForm) {
        console.log(values);
    }

  return(
    <main className="">
      <div className="flex justify-center items-center flex-1">
        <aside className="h-full w-[360px] border-2 px-8 py-4 shadow-2xl">
          <div className="flex flex-col gap-y-2 justify-center items-center pb-5">
            <Image
              src="/trinity_logo.png"
              alt="logo"
              width={120}
              height={120}
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
                      <Input placeholder="Enter your username" {...field} />
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex pt-4 justify-between text-center">
                <button onClick={() => router.push('/register')}>Not yet register?</button>
                <Button type="submit">Log In</Button>
              </div>
            </form>
          </Form>
        </aside>
      </div>
    </main>
  );
};

export { LoginForm };
