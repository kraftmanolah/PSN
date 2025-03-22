

// import localFont from "next/font/local";
// import "./globals.css";
// import AuthGuard from "@/app/components/AuthGuard";
// import Breadcrumbs from "@/app/components/Breadcrumbs";
// import { usePathname } from "next/navigation";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
//   display: "swap",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
//   display: "swap",
// });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   console.log("Server rendering RootLayout");

//   // Since usePathname is a client-side hook, we can't use it directly in a server component.
//   // Instead, we'll wrap the layout in a client component or handle this in the Breadcrumbs component.
//   // For simplicity, we'll adjust the structure to avoid usePathname here.

//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
//         <AuthGuard>
//           <Breadcrumbs />
//           <div className="w-full">
//             <main>{children}</main>
//           </div>
//         </AuthGuard>
//       </body>
//     </html>
//   );
// }

import localFont from "next/font/local";
import "./globals.css";
import AuthGuard from "@/app/components/AuthGuard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("Server rendering RootLayout");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AuthGuard>
          <div className="w-full">
            <main>{children}</main>
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}