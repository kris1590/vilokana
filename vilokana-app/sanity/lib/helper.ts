import {
  AllSanitySchemaTypes,
  internalGroqTypeReferenceTo,
} from "@/sanity.types";

export function resolveReference<T>(obj?: {
  _type: "reference";
  [internalGroqTypeReferenceTo]?: T;
}) {
  if (obj?._type === "reference") {
    console.error("Not expanded --> ", obj);
    throw new Error("Asset reference has not been expanded!");
  }
  return obj as unknown as Extract<AllSanitySchemaTypes, { _type: T }>;
}

export type ExpandedReference = {
  _type: string;
  slug?: string | null;
};

export function getLinkHref(
  reference: ExpandedReference | null | undefined
): string {
  if (!reference) return "#";

  switch (reference._type) {
    case "home":
      return "/";
    case "page":
      return reference.slug ? `/${reference.slug}` : "#";
    case "program":
      return reference.slug ? `/vilokana-foundation/${reference.slug}` : "#";
    default:
      return "#";
  }
}