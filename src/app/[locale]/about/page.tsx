import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <LegalPage title="About">
      <p>{siteConfig.name} is an independent fan-built guide hub covering helicopter flight, medical hoist rescue, aerial firefighting, police air support and mission walkthroughs for {siteConfig.name.replace(/ Wiki$/, "")} on Roblox.</p>
      <p>Our goal is to help new and veteran pilots get airborne faster: how each rescue helicopter handles, which loadout fits a wildfire, how the medical chain works, and how to earn more from every mission.</p>
      <p>The wiki is community-maintained and updated as the game receives new vehicles, missions and map changes. Spotted something out of date? Reach us at {siteConfig.supportEmail}.</p>
    </LegalPage>
  );
}
