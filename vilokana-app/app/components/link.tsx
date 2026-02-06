import NextLink from "next/link";
import * as React from "react";

type AppLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /**
   * Force treating the link as external (plain <a>).
   * By default, hrefs starting with "/" are considered internal.
   */
  external?: boolean;
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}



const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, external, target, rel, ...rest }, ref) => {
    const shouldUseInternal = external === true ? false : isInternalHref(href);

    if (shouldUseInternal) {
      // Internal navigation uses Next.js <Link> for client-side transitions.
      return (
        <NextLink href={href} {...rest} ref={ref}>
          {rest.children}
        </NextLink>
      );
    }

    const finalTarget = target ?? "_blank";
    const finalRel =
      rel ?? (finalTarget === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <a href={href} target={finalTarget} rel={finalRel} ref={ref} {...rest} />
    );
  },
);

AppLink.displayName = "AppLink";

export default AppLink;

