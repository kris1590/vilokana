"use client";

import { useState } from "react";
import { InternalLink } from "@/sanity.types";
import AppLink from "./link";

export default function Header({ items }: { items: InternalLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md border-b border-base-300">
      <nav
        className="container-content flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <AppLink
          href="/"
          className="flex items-center gap-2 no-underline group"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-content font-serif text-lg font-bold">V</span>
          </div>
          <span className="font-serif text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors">
            Vilokana
          </span>
        </AppLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none items-center gap-1 p-0 m-0">
          {items.map((link: InternalLink) => (
            <li key={link.reference?._ref ?? ""}>
              <AppLink
                href={`/${link.reference?._ref}`}
                className="px-4 py-2 text-base-content/70 hover:text-primary hover:bg-primary/5 rounded-lg text-sm font-medium no-underline transition-all"
              >
                {link.title}
              </AppLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <AppLink
            href="/donate"
            className="btn btn-primary btn-sm px-6"
          >
            Donate
          </AppLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-base-content"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100">
          <div className="container-content py-4">
            <ul className="flex flex-col list-none p-0 m-0 gap-1">
              {items.map((link: InternalLink) => (
                <li key={link.reference?._ref ?? ""}>
                  <AppLink
                    href={`/${link.reference?._ref}`}
                    className="block px-4 py-3 text-base-content/80 hover:text-primary hover:bg-primary/5 rounded-lg font-medium no-underline transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </AppLink>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-base-300">
              <AppLink
                href="/donate"
                className="btn btn-primary btn-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate Now
              </AppLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
