"use client";

import { useState } from "react";
import menuArray from "../../public/dashboardmenucontent";
import LogoutButton from "./LogoutButton";
export default function NavbarIndex({}) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-400">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              The Tip Project
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {/* Hamburger Icon */}
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white mb-1"></div>
              <div className="w-6 h-1 bg-white"></div>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {menuArray.map((item: string) => (
                <li className="nav-item" key={item}>
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href={`/dashboard/${item.toLowerCase().replace(/\s/g, "")}`}
                  >
                    <i className="fab  text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">{item} </span>
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
