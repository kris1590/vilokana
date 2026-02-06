import { InternalLink } from "@/sanity.types";
import AppLink from "./link";

export default function Header({ items }: { items: InternalLink[] }) {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <nav className="container-content flex items-center justify-between gap-6 section-spacing-sm" aria-label="Main navigation">
        <AppLink href="/" className="font-serif text-xl font-semibold text-primary no-underline">
          Vilokana
        </AppLink>
        <ul className="flex list-none flex-wrap items-center gap-6 p-0 m-0">
          {items.map((link: InternalLink) => {
            return (
              <li key={link.reference?._ref ?? ""}>
                <AppLink
                  href={`/${link.reference?._ref}`}
                  className="text-base-content/80 hover:text-base-content text-sm font-medium no-underline transition-colors"
                >
                  {link.title}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
