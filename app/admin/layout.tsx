'use client'
import "bootstrap-icons/font/bootstrap-icons.css"
import "./admin.css";
import Header from "../component/common/header";
import Footer from "../component/common/footer";
import { useState } from "react";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebar, setIsSidebar] = useState<boolean>(false);

  const handleSidebar = () => {
    setIsSidebar(!isSidebar)
  };

  return (
    <body className={isSidebar ? 'toggle-sidebar' : ''}>
      {/* Header */}
      <Header onChangeSidebar={handleSidebar}  />
      {/* End Header */}
      <main id="main" className="main">
        {children}
      </main>
      <Footer />
    </body>
  );
}
