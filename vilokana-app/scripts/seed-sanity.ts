/**
 * Seed Sanity with header/footer settings.
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 * Run from project root: npx tsx scripts/seed-sanity.ts
 * Loads .env.local automatically if present.
 */

import { createClient } from "next-sanity";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// Load .env.local from project root (vilokana-app)
const envPath = resolve(__dirname, "../.env.local");
if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_TOKEN (required for writes)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-28",
  useCdn: false,
  token,
});

// Page IDs from your dataset (internal links reference these)
const PAGE_IDS = {
  home: "ea583a7a-9edc-4dbf-9528-1794a2d54893",
  ourStory: "b6899862-ef82-4545-ba5a-7cc7b5a8bfa8",
  ourWork: "acf779a7-e760-4850-baeb-a344ad5b3a67",
  school: "c8dbefaf-0cf9-4076-a395-b939620015b8",
  donate: "2114f90c-4462-4d64-aa90-9e4e94a14ddb",
} as const;

function internalLink(ref: string, title: string) {
  return {
    _type: "internalLink" as const,
    reference: { _type: "reference" as const, _ref: ref },
    title,
  };
}

function navLink(key: string, ref: string, title: string) {
  return {
    _key: key,
    _type: "link" as const,
    linkType: "internal" as const,
    internalLink: internalLink(ref, title),
  };
}

async function main() {
  // 1) Create or replace settings document (header + footer)
  const settingsId = "settings";
  const header = {
    _type: "header" as const,
    links: [
      navLink("nav-home", PAGE_IDS.home, "Home"),
      navLink("nav-our-story", PAGE_IDS.ourStory, "Our Story"),
      navLink("nav-our-work", PAGE_IDS.ourWork, "Our Work"),
      navLink("nav-school", PAGE_IDS.school, "School"),
      navLink("nav-donate", PAGE_IDS.donate, "Donate"),
    ],
  };
  const footer = {
    _type: "footer" as const,
    links: [
      navLink("ft-our-story", PAGE_IDS.ourStory, "Our Story"),
      navLink("ft-our-work", PAGE_IDS.ourWork, "Our Work"),
      navLink("ft-school", PAGE_IDS.school, "School"),
      navLink("ft-donate", PAGE_IDS.donate, "Donate"),
    ],
    socialLinks: [
      { _key: "social-fb", _type: "externalLink" as const, url: "https://www.facebook.com/vilokana", title: "Facebook", openInNewTab: true },
      { _key: "social-ig", _type: "externalLink" as const, url: "https://www.instagram.com/vilokana", title: "Instagram", openInNewTab: true },
      { _key: "social-li", _type: "externalLink" as const, url: "https://www.linkedin.com/company/vilokana", title: "LinkedIn", openInNewTab: true },
    ],
  };

  // Create or update the settings document (stored as draft)
  await client.createOrReplace({
    _id: settingsId,
    _type: "settings",
    header,
    footer,
  });

  // Publish: copy draft to published so the frontend query sees it
  const draft = await client.getDocument(`drafts.${settingsId}`);
  if (draft) {
    const { _id, _rev, ...rest } = draft;
    await client.createOrReplace({ ...rest, _id: settingsId, _type: draft._type });
    console.log("Settings published.");
  }
  console.log("Settings document created/updated. Header and footer should now appear on the site.");

  // 2) Update home page hero with on-brand copy (Vilokana)
  const block = (text: string, key: string) => ({
    _type: "block" as const,
    _key: key,
    style: "normal" as const,
    children: [{ _type: "span" as const, _key: `${key}-span`, text, marks: [] }],
    markDefs: [],
  });
  const heroTitle = [block("Vilokana — Education and Hope for Every Child", "hero-title")];
  const heroDesc = [
    block(
      "A non-profit foundation and private school for underprivileged children. We believe in calm, trustworthy, human-centered education rooted in community.",
      "hero-desc"
    ),
  ];
  const homeId = "home";
  const existingHome = await client.getDocument(homeId);
  if (existingHome) {
    const sections = Array.isArray(existingHome.sections) ? existingHome.sections : [];
    const heroIndex = sections.findIndex((s: { _type?: string }) => s._type === "hero");
    const updatedSections = [...sections];
    if (heroIndex >= 0) {
      updatedSections[heroIndex] = {
        ...updatedSections[heroIndex],
        title: heroTitle,
        description: heroDesc,
      };
    } else {
      updatedSections.push({
        _type: "hero",
        _key: "seed-hero",
        title: heroTitle,
        description: heroDesc,
      });
    }
    await client.patch(homeId).set({ sections: updatedSections }).commit();
    // Publish home draft if present
    const homeDraft = await client.getDocument(`drafts.${homeId}`);
    if (homeDraft) {
      const { _id, _rev, ...rest } = homeDraft;
      await client.createOrReplace({ ...rest, _id: homeId, _type: homeDraft._type });
    }
    console.log("Home page hero updated.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
