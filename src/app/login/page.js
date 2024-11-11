import Image from "next/image";
// import Link from 'next/link'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import SignInComponent from "@/components/Login/SignInComponent";
import Link from "next/link";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

const LoginForm = () => {
  return (
    <div className="w-full  h-full  flex flex-col-reverse md:flex-row items-center justify-center  ">
      <div className="md:w-1/2 flex items-center justify-center py-12 h-full ">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              For access to the SEO tools, you need to login.
            </p>
          </div>
          <div className="grid gap-4 ">
            <SignInComponent className="w-fit  mx-auto" />
          </div>
        </div>
      </div>
      <div className="md:w-1/2  bg-muted lg:block">
        <Image
          src="/seotools.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
};

export default LoginForm;
