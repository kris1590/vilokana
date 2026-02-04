import { ExternalLink, InternalLink } from "@/sanity.types";
import Link from "next/link";



export default function Footer({ items }: { items: InternalLink[] }) {
  console.log("items", items);
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="container-content section-spacing">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer navigation">
            <ul className="flex list-none flex-wrap gap-6 p-0 m-0">
              {items.map((link) => (
                <li key={link.reference?._ref ?? ""}>
                  <Link
                    href={`/${link.reference?._ref}`}
                    className="text-base-content/80 hover:text-base-content text-sm no-underline transition-colors"
                  >
                    {link.title ?? ""}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
