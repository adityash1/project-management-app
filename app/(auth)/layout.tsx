import "@/styles/globals.css";

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="flex items-center justify-center h-screen">
          {children}
      </body>
    </html>
  );
}
