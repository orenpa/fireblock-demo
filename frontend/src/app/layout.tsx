import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className="flex flex-col justify-start   bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white h-screen">
      <Navbar />
      <main className="flex h-full ">{children}</main>
    </body>
  </html>
);

export default RootLayout;
