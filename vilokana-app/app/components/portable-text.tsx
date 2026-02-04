import { urlFor } from "@/sanity/lib/image";
import {
  PortableText,
  PortableTextProps as SanityPortableTextProps,
} from "next-sanity";

type PortableTextProps = {
  value: SanityPortableTextProps["value"];
  className?: string;
};

const PortableTextComponent = ({
  value,
  className = "",
}: PortableTextProps) => {
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          types: {
            image: ({ value }) => (
              <img
                src={urlFor(value).url()}
                className="w-full"
                alt={value?.alt || ""}
              />
            ),
          },
          block: {
            heading1: ({ children }) => (
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-base-content tracking-tight">
                {children}
              </h1>
            ),
            heading2: ({ children }) => (
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-base-content tracking-tight">
                {children}
              </h2>
            ),
            heading3: ({ children }) => (
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-base-content">
                {children}
              </h3>
            ),
            heading4: ({ children }) => (
              <h4 className="font-serif text-lg md:text-xl font-semibold text-base-content">
                {children}
              </h4>
            ),
            heading5: ({ children }) => (
              <h5 className="font-serif text-base md:text-lg font-semibold text-base-content">
                {children}
              </h5>
            ),
            heading6: ({ children }) => (
              <h6 className="font-serif text-sm md:text-base font-semibold text-base-content">
                {children}
              </h6>
            ),
          },
          marks: {
            link: ({ children, value }) => {
              let href = value?.href || "";
              if (
                !href.startsWith("http://") &&
                !href.startsWith("https://") &&
                !href.startsWith("/")
              ) {
                href = `https://${href}`;
              }
              const target = !href.startsWith("/") ? "_blank" : undefined;
              return (
                <a
                  href={href}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                  className="link link-primary hover:underline cursor-pointer"
                >
                  {children}
                </a>
              );
            },
            phone: ({ children, value }) => (
              <a
                href={`tel:${value?.phone || children}`}
                className="hover:underline cursor-pointer"
              >
                {children}
              </a>
            ),
            email: ({ children, value }) => (
              <a
                href={`mailto:${value?.email || children}`}
                className="hover:underline cursor-pointer"
              >
                {children}
              </a>
            ),
            address: ({ children, value }) => (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  value?.address || children,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline cursor-pointer"
              >
                {children}
              </a>
            ),
            serif: ({ children }) => (
              <span className="font-serif">{children}</span>
            ),
            sans: ({ children }) => (
              <span className="font-sans">{children}</span>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
            number: ({ children }) => (
              <ol className="list-decimal">{children}</ol>
            ),
          },
          listItem: {
            bullet: ({ children }) => (
              <li className="ml-16">
                <div className="pl-4">{children}</div>
              </li>
            ),
            number: ({ children }) => (
              <li className="ml-16">
                <div className="pl-4">{children}</div>
              </li>
            ),
          },
        }}
      />
    </div>
  );
};

export default PortableTextComponent;
