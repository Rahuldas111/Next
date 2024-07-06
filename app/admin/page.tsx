'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Admin() {
  const { data: session } = useSession();

  return (
    <>
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href='/admin'>Home</Link></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>
      <section className="section">
        <div className="row">
          <div className="col-lg-12"></div>
        </div>
      </section>
      {/* <div>Welcome to admin page </div>
      {session && session?.user && <Link href='/#' onClick= {() => signOut()}  className="btn-signin">Logout</Link>}<br></br>
      <Link href='/admin/profile'>Profile</Link> */}
    </>
  );
}
