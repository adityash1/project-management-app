import "@/styles/globals.css";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/SideBar";

export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="w-screen h-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center">
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
