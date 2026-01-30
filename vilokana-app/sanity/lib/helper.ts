import {
  AllSanitySchemaTypes,
  internalGroqTypeReferenceTo,
} from "../../sanity.types";

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
