import "@/styles/globals.css";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/SideBar";

export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="w-screen h-screen flex items-center bg-gray-300 p-6">
          <Sidebar />
          {children}
        <div id="modal"></div>
      </body>
    </html>
  );
}
