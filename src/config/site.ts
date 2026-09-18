export interface SiteConfig {
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  url: string;
  supportEmail: string;
  gameUrl?: string;
  heroVideoId?: string;
  social?: {
    discord?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  locales: readonly string[];
  defaultLocale: string;
}

export const siteConfig: SiteConfig = {
  name: "Rotor Ops Rescue Fire Police Wiki",
  shortName: "Rotor Ops",
  logoText: "RO",
  tagline: "Helicopter Guides, Rescue Missions, Firefighting & Police Ops",
  description: "Your ultimate guide to Rotor Ops Rescue Fire Police on Roblox! Learn helicopter controls, medical hoist rescue, aerial firefighting, police air support, mission walkthroughs and progression tips.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rotor-ops-rescue-fire-police.wiki",
  supportEmail: `support@${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rotor-ops-rescue-fire-police.wiki").hostname.replace(/^www\./, "")}`,
  gameUrl: "https://www.roblox.com/games/115441230921165/RotorOps-Secours-Feux-Gendarmerie",
  heroVideoId: "oRwZE1Dlh5Y", // Roblox Rotor Ops Fire & Rescue & Police how-to-play gameplay tutorial
  social: {
    // No standalone official Rotor Ops Discord/YouTube channel is published yet;
    // point at the verified Roblox official channels and label them accordingly.
    discord: "https://discord.gg/roblox",
    youtube: "https://www.youtube.com/@Roblox",
  },
  locales: ["en", "es", "pt", "de", "fr"],
  defaultLocale: "en",
};
