'use client'
import React, { useState } from "react";
import LeftMenu from "./leftMenu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface HeaderComponentProps {
  onChangeSidebar: () => void
}

const Header: React.FC<HeaderComponentProps> = ({ onChangeSidebar }) => {
  const [isProfileToggle, setIsProfileToggle] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const sendBooleanToParent = () => {
    onChangeSidebar();
  }

  const toggleDropDown = () => {
    setIsProfileToggle(!isProfileToggle);
  }

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            {/* <img src="assets/img/logo.png" alt=""> */}
            {/* <Image src={''} alt=""/> */}
            <span className="d-none d-lg-block">Admin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"onClick={sendBooleanToParent}></i>
        </div>


        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">

            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown pe-3">

              <Link className={`nav-link nav-profile d-flex align-items-center pe-0 ${isProfileToggle ? 'show' : ''}`} href="#"  data-bs-toggle="dropdown" onClick={toggleDropDown}>
                <Image src="/profile-img.jpg" className="rounded-circle" alt="Profile" width={35} height={35} />
                <span className="d-none d-md-block dropdown-toggle ps-2">{session?.user?.name}</span>
              </Link>

              <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${isProfileToggle? 'show' : ''}`} style={{ position: 'absolute', inset: '0px 0px auto auto', margin: '0px', transform: 'translate(-16px, 38px)'}}>
                <li className="dropdown-header">
                  <h6>{session?.user?.name}</h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item d-flex align-items-center" href='/#' onClick= {() => signOut()}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>

              </ul>
            </li>

          </ul>
        </nav>

      </header>
      <LeftMenu />
    </>
  )
}

export default Header;