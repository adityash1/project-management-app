"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input, Label, Button } from "@/components/ui";
import { register, signin } from "@/lib/api";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome back!",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

const AuthForm = ({ mode }) => {
  const [formState, setFormState] = useState({ ...initial });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "register") {
        await register(formState);
      } else {
        await signin(formState);
      }

      router.push("/home");
      setFormState(initial);
    } catch (e) {
      console.error(e);
    }
  };

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <div className="bg-card text-card-foreground px-16">
      <div className="text-center py-4">
        <h2 className="text-3xl mb-2">{content.header}</h2>
        <p className="text-md text-muted-foreground">{content.subheader}</p>
      </div>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="flex space-x-6 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                required
                type="text"
                placeholder="First Name"
                value={formState.firstName}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, firstName: e.target.value }))
                }
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                required
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, lastName: e.target.value }))
                }
              />
            </div>
          </div>
        )}
        <div className="flex space-x-6 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              placeholder="Password"
              value={formState.password}
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex justify-between space-y-4">
          <Link href={content.linkUrl} className="text-md font-semibold pt-6">
            {content.linkText}
          </Link>
          <Button type="submit" variant="default">
            {content.buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
