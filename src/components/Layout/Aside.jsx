"use client";

import Link from "next/link";
import { Home, Settings, Users, HelpCircle, LogOut } from "lucide-react";
import { configMenu, menu, helpMenu } from "./menu";
import SignOutComponent from "../Login/SignOutComponent";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";

const Aside = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") return null; // Optionally handle loading state

  return (
    <Sidebar>
      <SidebarHeader>SEO Tools</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Start Here:</SidebarGroupLabel>
          <SidebarGroupContent>
            {configMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
                    isActive
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : ""
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="mx-2 text-sm font-medium">{item.title}</span>
                </Link>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            {menu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
                    isActive
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className="mx-2 text-sm font-medium">{item.title}</span>
                </Link>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mt-6 ">
          {session && (
            <div className="flex items-center justify-between mt-6 ">
              <Avatar>
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name || "User Avatar"}
                />
                <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
              </Avatar>

              <SignOutComponent />
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>

    // <asid4e className="sticky left-0 top-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
    //   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
    //     <nav className="-mx-3 space-y-6">
    //       {/* Main Section */}
    //       <div className="space-y-3">
    //         <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
    //           Start Here:
    //         </label>
    //         {configMenu.map((item) => {
    //           const isActive = pathname === item.href
    //           return (
    //             <Link
    //               key={item.href}
    //               href={item.href}
    //               className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
    //                 isActive
    //                   ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
    //                   : ''
    //               }`}
    //             >
    //               <Settings className="w-5 h-5" />
    //               <span className="mx-2 text-sm font-medium">{item.title}</span>
    //             </Link>
    //           )
    //         })}
    //       </div>

    //       <div className="space-y-3">
    //         <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
    //           Main
    //         </label>
    //         {menu.map((item) => {
    //           const isActive = pathname === item.href
    //           return (
    //             <Link
    //               key={item.href}
    //               href={item.href}
    //               className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
    //                 isActive
    //                   ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
    //                   : ''
    //               }`}
    //             >
    //               {item.icon}
    //               <span className="mx-2 text-sm font-medium">{item.title}</span>
    //             </Link>
    //           )
    //         })}
    //       </div>

    //       <div className="space-y-3 ">
    //         <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
    //           Support
    //         </label>
    //         {helpMenu.map((item) => {
    //           const isActive = pathname === item.href
    //           return (
    //             <Link
    //               key={item.href}
    //               href={item.href}
    //               className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${
    //                 isActive
    //                   ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
    //                   : ''
    //               }`}
    //             >
    //               <HelpCircle className="w-5 h-5" />
    //               <span className="mx-2 text-sm font-medium">{item.title}</span>
    //             </Link>
    //           )
    //         })}
    //       </div>
    //     </nav>

    //     {/* User Info and Sign Out */}
    //     <div className="mt-6 ">
    //       {session && (
    //         <div className="flex items-center justify-between mt-6 ">
    //           <Avatar>
    //             <AvatarImage
    //               src={session.user.image}
    //               alt={session.user.name || 'User Avatar'}
    //             />
    //             <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
    //           </Avatar>

    //           <SignOutComponent />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </asid4e>
  );
};

export default Aside;
