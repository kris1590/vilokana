"use client";

import { InternalLink } from "@/sanity.types";
import AppLink from "./link";

export default function Header({ items }: { items: InternalLink[] }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/95 border-b border-base-300">
      <div className="navbar container-content">
        {/* NAVBAR START — Logo */}
        <div className="navbar-start">
          <AppLink href="/" className="btn btn-ghost normal-case text-lg md:text-xl gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-content font-serif font-bold text-sm md:text-base">
                V
              </span>
            </div>
            <span className="font-serif font-semibold text-primary text-base md:text-lg">
              Vilokana
            </span>
          </AppLink>
        </div>

        {/* NAVBAR CENTER — Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {items.map((link) => (
              <li key={link.reference?._ref ?? ""}>
                <AppLink
                  href={`/${link.reference?._ref}`}
                  className="text-sm font-medium text-base-content/70 hover:text-primary"
                >
                  {link.title}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>

        {/* NAVBAR END — Mobile menu + Desktop CTA */}
        <div className="navbar-end">
          {/* Desktop CTA */}
          <div className="hidden lg:flex">
            <AppLink href="/donate" className="btn btn-primary btn-sm px-6">
              Contact
            </AppLink>
          </div>

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-end lg:hidden">
            <label
              tabIndex={0}
              className="btn btn-ghost"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
            >
              {items.map((link) => (
                <li key={link.reference?._ref ?? ""}>
                  <AppLink href={`/${link.reference?._ref}`}>
                    {link.title}
                  </AppLink>
                </li>
              ))}
              <li className="mt-2">
                <AppLink
                  href="/donate"
                  className="btn btn-primary btn-sm w-full"
                >
                  Donate
                </AppLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
