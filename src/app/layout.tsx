import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        {modal}
        {children}
      </body>
    </html>
  );
}

// import { redirect } from 'next/navigation'
// import { getServerSession } from 'next-auth'
// import { ReactNode } from 'react'
// import { authOptions } from '~/lib/auth'

// const AuthLayout = async ({ children }: { children: ReactNode }) => {
//   const session = await getServerSession(authOptions)
//   if (!session) redirect('/login')

//   return <>{children}</>
// }

// export default AuthLayout
