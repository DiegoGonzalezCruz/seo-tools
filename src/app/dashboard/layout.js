import Aside from "@/components/Layout/Aside";

import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
  title: "Dashboard - SEO Tools",
  description: "Set of Tools for SEO",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();

  return (
    <div className="flex w-full">
      <SidebarProvider>
        <Aside />
        <main className=" w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>

      {/* <main className="flex-1 p-5">{children}</main> */}
    </div>
  );
}
