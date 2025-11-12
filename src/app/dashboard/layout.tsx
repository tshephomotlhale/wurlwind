"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/app-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Sidebar */}
                <AppSidebar />

                {/* Main content area */}
                <div className="flex flex-1 flex-col min-h-screen w-full">
                    {/* Header */}
                    <div className={"sticky top-0 z-0 backdrop-blur-md"}>
                    <Header />
                    </div>

                    {/* Page content */}
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
