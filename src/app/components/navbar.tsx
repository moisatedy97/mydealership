import Link from "next/link";
import React from "react";

export default function Navbar() {
  type NavigationMenu = {
    name: string;
    href: string;
  };

  const navigation: NavigationMenu[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Login",
      href: "/login",
    },
  ];

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <MobileMenuIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
            >
              {navigation.map((element: NavigationMenu, index: number) => (
                <li key={index}>
                  <Link href={element.href} rel="canonical">
                    {element.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MyDealership</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navigation.map((element: NavigationMenu, index: number) => (
              <li key={index}>
                <Link href={element.href} rel="canonical">
                  {element.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <ProfileIcon />
        </div>
      </div>
    </>
  );
}

const ProfileIcon = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul tabIndex={0} className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

const MobileMenuIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
    </svg>
  );
};
