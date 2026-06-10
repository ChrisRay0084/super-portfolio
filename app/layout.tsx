import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  name: "description",
  title: "Christopher Ray Portfolio - Fullstack Developer",
  content: "Senior Web Developer / Junior Software Engineer / Fullstack Developer Portfolio accessibility specialist (WCAG 2.1 / WCAG 2.2 / Section 508 / ADA)",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-primaryLight dark:bg-primaryDark text-textLight dark:text-textDark transition-colors duration-300
      bg-black/100
      bg-no-repeat
    bg-[position:center_-50%]
    bg-[length:100%_auto]
  "
  style={{
    backgroundImage: "url('/images/bg.png')"
  }}
      >
       
        {/* Keyboard Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 z-50"
        >
          Skip to main content
        </a>

        {/* Header Landmark */}
        <header>
          <Navbar />
        </header>

        {/* Main Landmark */}
        <main id="main-content">{children}</main>

        {/* Footer Landmark */}
        <footer>
          {/* Footer content */}
        </footer>
      </body>
    </html>
  )
}