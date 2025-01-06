import { auth } from "@/auth";
import Login from "@/components/Login/Login";

export const metadata = {
  title: "SEO Tools",
};

export default async function Home() {
  const session = await auth();
  // console.log(session, 'session')

  return (
    <main className="flex min-h-screen h-full w-full  flex-col items-center justify-center container">
      Hello there, this is an alpha version of the SEO Tools. Please, be
      patient.
    </main>
  );
}
