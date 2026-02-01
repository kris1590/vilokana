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
              <div className="heading1">{children}</div>
            ),
            heading2: ({ children }) => (
              <div className="heading2">{children}</div>
            ),
            heading3: ({ children }) => (
              <div className="heading3">{children}</div>
            ),
            heading4: ({ children }) => (
              <div className="heading4">{children}</div>
            ),
            heading5: ({ children }) => (
              <div className="heading5">{children}</div>
            ),
            heading6: ({ children }) => (
              <div className="heading6">{children}</div>
            ),
          },
          marks: {
            link: ({ children, value }) => {
              let href = value?.href || "";
              // Add https:// prefix if it's a domain without protocol
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
                  className="hover:underline cursor-pointer"
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
