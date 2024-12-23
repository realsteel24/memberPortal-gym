"use client";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";

import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [gymCode, setGymCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/member/signin`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          gymId: gymCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Sign in failed");
      }
      const user = await response.json();
      localStorage.setItem("token", user.jwt);
      localStorage.setItem("userId", user.userId);
      router.push(`/dashboard/${gymCode}`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else setError("An unexpected error occurred");
    }
  };
  return (
    <div className="container flex items-center justify-center min-h-screen py-12 bg-background text-foreground">
      <Card className="w-full max-w-md border-primary">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Dumbbell className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to Mohan's Planet
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gymId">GymCode</Label>
            <Input
              id="gymId"
              type="gymId"
              placeholder="CHAMPS"
              required
              className="border-primary"
              onChange={(e) => {
                e.target.value.toUpperCase().trim() === "CHAMPS"
                  ? setGymCode("MP")
                  : setGymCode(e.target.value.trim().toUpperCase());
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="border-primary"
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              className="border-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1">Don&apos;t have an account?</span>
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
