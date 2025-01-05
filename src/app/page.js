import { auth } from "@/auth";
import Login from "@/components/Login/Login";
import LandingPage from "@/components/Pages/LandingPage/Landing";

export const metadata = {
  title: "SEO Tools by ChileanDeveloper.com",
};

export default async function Home() {
  const session = await auth();
  // console.log(session, "session");

  return <LandingPage />;
}
