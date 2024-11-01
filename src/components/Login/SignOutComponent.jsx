"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SignOutComponent = () => {
  return (
    <Button
      className="btn btn-outline btn-secondary"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
      <LogOut className="w-5 h-5 ml-2" />
    </Button>
  );
};

export default SignOutComponent;
