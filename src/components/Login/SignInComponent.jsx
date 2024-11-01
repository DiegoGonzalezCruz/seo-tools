"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInComponent = ({ className, redirectTo = "/dashboard" }) => {
  return (
    <Button
      className="btn btn-outline btn-primary"
      onClick={() => signIn("github", { callbackUrl: redirectTo })}
    >
      Signin with Github
    </Button>
  );
};

export default SignInComponent;
