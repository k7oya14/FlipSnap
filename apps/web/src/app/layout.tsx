import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import type { Viewport } from "next";
import "./globals.css";
import Header from "@/components/header/Header";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlipSnap",
  description:
    "FlipSnap by HiKs - Two Sides, One Post. Share the Moment Behind the Moment.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.className} bg-[#f0f0f0]`}>
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
